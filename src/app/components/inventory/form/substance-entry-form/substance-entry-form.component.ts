import {Component, effect, inject, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {SubstanceEntryBean} from '../../../../obj/bean/substance-entry.bean';
import {firstValueFrom, map} from 'rxjs';
import {Dropdown} from '../../../common/dropdown/dropdown';
import {SubstanceBean} from '../../../../obj/bean/substance.bean';
import {ActivatedRoute, Router} from '@angular/router';
import {Unit, UnitUtil} from '../../../../obj/enum/unit.enum';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../../../store/substance/substance.state';
import {toSignal} from '@angular/core/rxjs-interop';
import {InventoryAction} from '../../../../store/inventory/inventory.actions';
import {LocationBean} from '../../../../obj/bean/location.bean';
import {LocationState} from '../../../../store/location/location.state';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';
import {InventoryService} from '../../../../service/rest/inventory/inventory.service';

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
    Dropdown
  ],
  templateUrl: './substance-entry-form.component.html',
  styleUrl: './substance-entry-form.component.scss',
})

export class SubstanceEntryForm {

  public chemicalSubstanceEntryAnswerModel = signal<ChemicalSubstanceEntryFormData>(DEFAULT_CHEMICAL_SUBSTANCE_ENTRY_FORM_DATA)
  public substanceEntryForm = form(this.chemicalSubstanceEntryAnswerModel);

  protected selectedSubstance = signal<SubstanceBean | null>(null);
  protected selectedUnit = signal<Unit>(Unit.G);
  protected selectedLocation = signal<LocationBean | null>(null);

  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);
  private inventoryService = inject(InventoryService);

  public substanceEntry = toSignal(
    this.route.data.pipe(map(data => data['substanceEntry'] as SubstanceEntryBean | null)),
    {initialValue: null}
  );

  public quantityUnitOptions = UnitUtil.quantityUnitOptions;

  public substanceOptions = toSignal(this.store.select(SubstanceState.getSubstancesAsDropdownOptions), {initialValue: []});
  public locationOptions = toSignal(this.store.select(LocationState.getLocationDropdownOptions), {initialValue: []});

  constructor() {

    effect(() => {
      if (this.substanceEntry()) {
        this.chemicalSubstanceEntryAnswerModel.set({
          quantityBase: this.substanceEntry()?.quantityBase ?? 0,
          unit: this.substanceEntry()?.unit ?? Unit.G,
          purity: this.substanceEntry()?.purity ?? '',
          locationId: this.substanceEntry()?.locationId ?? 0,
          note: this.substanceEntry()?.note ?? ''
        });
        this.selectedUnit.set(this.substanceEntry()?.unit ?? Unit.G);
        this.selectedLocation.set(this.locationOptions().find(option => option.value.id === this.substanceEntry()?.locationId)?.value ?? null);
        this.selectedSubstance.set(this.substanceOptions().find(option => option.value.id === this.substanceEntry()?.chemicalSubstanceId)?.value ?? null);
      }
    });

  }

  public onSelectSubstance(value: SubstanceBean) {
    this.selectedSubstance.set(value);
  }

  public onSelectQuantityUnit(value: Unit) {
    this.selectedUnit.set(value);
  }

  public onSelectLocation(value: LocationBean) {
    this.selectedLocation.set(value);
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
            this.store.dispatch(new InventoryAction.PatchSubstance(substance));
            this.store.dispatch(new ToastAction.ShowToast({
              message: `Substance entry for ${this.selectedSubstance()?.name} updated successfully.`,
              type: ToastType.SUCCESS,
              duration: 3000
            }))
            this.navigateToInventoryOverview()
          }
        });
      }
      return;
    }

    return firstValueFrom(this.inventoryService.createSubstanceEntry$(substanceEntryBean)).then((substance) => {
      if (substance) {
        this.store.dispatch(new InventoryAction.AddSubstance(substance))
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Substance entry for ${this.selectedSubstance()?.name} created successfully.`,
          type: ToastType.SUCCESS,
          duration: 3000
        }));
        this.navigateToInventoryOverview()
      }
    });
  }

  public navigateToInventoryOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['inventory', 'overview']))
  }

}
