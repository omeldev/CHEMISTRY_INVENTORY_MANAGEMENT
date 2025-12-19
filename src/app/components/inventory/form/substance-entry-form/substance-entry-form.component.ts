import {AfterViewInit, Component, inject, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {SubstanceEntryBean} from '../../../../obj/bean/substance-entry.bean';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {Dropdown} from '../../../common/dropdown/dropdown';
import {SubstanceBean} from '../../../../obj/bean/substance.bean';
import {AsyncPipe} from '@angular/common';
import {InventoryService} from '../../../../service/rest/inventory/inventory.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Unit, UnitUtil} from '../../../../obj/enum/unit.enum';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../../../store/substance/substance.state';
import {toSignal} from '@angular/core/rxjs-interop';
import {InventoryAction} from '../../../../store/inventory/inventory.actions';
import {LocationBean} from '../../../../obj/bean/location.bean';
import {LocationState} from '../../../../store/location/location.state';

interface ChemicalSubstanceEntryFormData {
  quantityBase: number;
  unit: Unit;
  purity: string;
  locationId: number;
  note: string;
}

const DEFAULT_CHEMICAL_SUBSTANCE_ENTRY_FORM_DATA = {
  quantityBase: 0,
  unit: Unit.G,
  purity: '',
  locationId: 0,
  note: ''
};

@Component({
  selector: 'chem-chemical-substance-entry-form',
  imports: [
    Field,
    Dropdown,
    AsyncPipe
  ],
  templateUrl: './substance-entry-form.component.html',
  styleUrl: './substance-entry-form.component.scss',
})

export class SubstanceEntryForm implements AfterViewInit {

  public chemicalSubstanceEntryAnswerModel = signal<ChemicalSubstanceEntryFormData>(DEFAULT_CHEMICAL_SUBSTANCE_ENTRY_FORM_DATA)
  public substanceEntryForm = form(this.chemicalSubstanceEntryAnswerModel);

  private selectedSubstance = signal<SubstanceBean | null>(null);
  private selectedUnit = signal<Unit>(Unit.G);

  private selectedLocation = signal<LocationBean | null>(null);


  private route = inject(ActivatedRoute);

  // Reactive approach: resolved data as observable converted to signal
  public substanceEntry = toSignal(
    this.route.data.pipe(map(data => data['substanceEntry'] as SubstanceEntryBean | null)),
    {initialValue: null}
  );

  public quantityUnitOptions = UnitUtil.quantityUnitOptions;
  public locationOptions$ = inject(Store).select(LocationState.getLocationDropdownOptions);

  private selectedQuantityUnitIndexSubject = new BehaviorSubject(0);
  public selectedQuantityUnitIndex$ = this.selectedQuantityUnitIndexSubject.asObservable();

  private selectedLocationIndexSubject = new BehaviorSubject(0);
  public selectedLocationIndex$ = this.selectedLocationIndexSubject.asObservable();

  public substanceChoices$ = inject(Store).select(SubstanceState.getSubstancesAsDropdownOptions);
  public store = inject(Store);
  public locationSignal = toSignal(this.locationOptions$);

  constructor(private readonly inventoryService: InventoryService,
              private readonly router: Router) {

  }

  public onSelectSubstance = (value: SubstanceBean) => {
    this.selectedSubstance.set(value);
  }

  public onSelectQuantityUnit = (value: Unit) => {
    this.selectedUnit.set(value);
  }


  public async submitForm() {
    if (!this.selectedSubstance()) {
      console.error("No substance selected!");
      return;
    }

    const substanceEntryBean: Partial<SubstanceEntryBean> = {
      chemicalSubstanceId: this.selectedSubstance()?.id,
      quantityBase: this.substanceEntryForm().value().quantityBase,
      unit: this.selectedUnit(),
      purity: this.substanceEntryForm().value().purity,
      locationId: this.selectedLocation()?.id,
      note: this.substanceEntryForm().value().note
    }

    if (this.substanceEntry()) {
      if (this.route.snapshot.queryParamMap.get('id')) {
        return firstValueFrom(this.inventoryService.patchSubstanceEntry$(Number(this.route.snapshot.queryParamMap.get('id')), substanceEntryBean)).then((substance) => {
          if (substance) {
            this.store.dispatch(new InventoryAction.PatchSubstance(substance))
            this.navigateToInventoryOverview()
          }
        });
      }
      return;
    }

    return firstValueFrom(this.inventoryService.createSubstanceEntry$(substanceEntryBean)).then((substance) => {
      if (substance) {
        this.store.dispatch(new InventoryAction.AddSubstance(substance))
        this.navigateToInventoryOverview()
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.substanceEntry()) {
      this.chemicalSubstanceEntryAnswerModel.set({
        quantityBase: this.substanceEntry()?.quantityBase ?? 0,
        unit: this.substanceEntry()?.unit ?? Unit.G,
        purity: this.substanceEntry()?.purity ?? '',
        locationId: this.substanceEntry()?.locationId ?? 0,
        note: this.substanceEntry()?.note ?? ''
      });

      this.selectedUnit.set(this.substanceEntry()?.unit ?? Unit.G);
      this.selectedQuantityUnitIndexSubject.next(this.quantityUnitOptions.findIndex(option => option.value === this.substanceEntry()?.unit));
      this.selectedLocationIndexSubject.next(this.locationSignal()!.findIndex(option => option.value.id === this.substanceEntry()?.locationId));
    }

  }

  public navigateToInventoryOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['inventory', 'overview']))
  }

  onSelectLocation(location: LocationBean) {
    this.selectedLocation.set(location);
  }
}
