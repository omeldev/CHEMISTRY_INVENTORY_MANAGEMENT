import {AfterViewInit, Component, input, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';
import {SubstanceService} from '../../service/rest/substance/substance.service';
import {BehaviorSubject, firstValueFrom, map, Observable} from 'rxjs';
import {Dropdown, DropdownOption} from '../common/dropdown/dropdown';
import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';
import {AsyncPipe} from '@angular/common';
import {InventoryService} from '../../service/rest/substance/inventory.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Unit, UnitLabel} from '../../obj/enum/unit.enum';

export interface ChemicalSubstanceEntryFormData {
  quantityBase: number;
  unit: Unit;
  purity: string;
  location: string;
  note: string;
}

@Component({
  selector: 'chem-chemical-substance-entry-form',
  imports: [
    Field,
    Dropdown,
    AsyncPipe
  ],
  templateUrl: './chemical-substance-entry-form.html',
  styleUrl: './chemical-substance-entry-form.scss',
})

export class ChemicalSubstanceEntryForm implements AfterViewInit {

  public chemicalSubstanceEntryAnswerModel = signal<ChemicalSubstanceEntryFormData>({
    quantityBase: 0,
    unit: Unit.G,
    purity: '',
    location: '',
    note: ''
  })

  public substanceEntryForm = form(this.chemicalSubstanceEntryAnswerModel);


  public substanceChoices$: Observable<DropdownOption<ChemicalSubstanceBean>[]>;

  private selectedSubstance = signal<ChemicalSubstanceBean | null>(null);
  private selectedUnit = signal<Unit>(Unit.G);
  public substanceEntry = input<ChemicalSubstanceEntryBean>();


  quantityUnitOptions: DropdownOption<Unit>[] = Object.keys(Unit).map(
    key => ({
      label: UnitLabel[key as keyof typeof Unit],
      value: Unit[key as keyof typeof Unit]
    })
  );

  private selectedQuantityUnitIndexSubject = new BehaviorSubject(0);
  public selectedQuantityUnitIndex$ = this.selectedQuantityUnitIndexSubject.asObservable();


  constructor(private readonly substanceService: SubstanceService,
              private readonly inventoryService: InventoryService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.substanceChoices$ = this.substanceService.getAllSubstances$().pipe(
      map(substances => substances?.map(
        substance => ({
            label: substance.name + (substance.molecularFormula ? ` (${substance.molecularFormula})` : ''),
            value: substance
          }
        )) || []
      ));
  }

  public async submitForm() {
    //TODO: NO CLIENT DATES
    if (!this.selectedSubstance()) {
      console.error("No substance selected!");
      return;
    }

    const substanceEntryBean: ChemicalSubstanceEntryBean = {
      chemicalSubstanceId: this.selectedSubstance()?.id,
      quantityBase: this.substanceEntryForm().value().quantityBase,
      unit: this.selectedUnit(),
      purity: this.substanceEntryForm().value().purity,
      location: this.substanceEntryForm().value().location,
      note: this.substanceEntryForm().value().note
    }

    if (this.substanceEntry()) {
      if (this.route.snapshot.queryParamMap.get('id')) {
        return firstValueFrom(this.inventoryService.patchSubstanceInventoryEntry$(Number(this.route.snapshot.queryParamMap.get('id')), substanceEntryBean)).then(() => this.navigateToInventoryOverview());
      }
      return;
    }


    return firstValueFrom(this.inventoryService.createSubstanceInventoryEntry$(substanceEntryBean)).then(() => this.navigateToInventoryOverview());
  }

  ngAfterViewInit(): void {
    if (this.substanceEntry()) {
      this.chemicalSubstanceEntryAnswerModel.set({
        quantityBase: this.substanceEntry()?.quantityBase ?? 0,
        unit: this.substanceEntry()?.unit ?? Unit.G,
        purity: this.substanceEntry()?.purity ?? '',
        location: this.substanceEntry()?.location ?? '',
        note: this.substanceEntry()?.note ?? ''
      });

      this.selectedUnit.set(this.substanceEntry()?.unit ?? Unit.G);
      this.selectedQuantityUnitIndexSubject.next(this.quantityUnitOptions.findIndex(option => option.value === this.substanceEntry()?.unit));
    }

  }

  public onSelectSubstance = (value: any) => {
    console.log("SELECTED SUBSTANCE:", value)
    this.selectedSubstance.set(value as ChemicalSubstanceBean);
  }

  onSelectQuantityUnit(value: any) {
    this.selectedUnit.set(value as Unit);
  }

  public navigateToInventoryOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['inventory', 'overview']))
  }
}
