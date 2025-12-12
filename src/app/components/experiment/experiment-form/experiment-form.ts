import {AfterViewInit, Component, signal} from '@angular/core';
import {ExperimentService} from '../../../service/rest/experiment/experiment.service';
import {InventoryService} from '../../../service/rest/substance/inventory.service';
import {BehaviorSubject, combineLatest, firstValueFrom, map, Observable} from 'rxjs';
import {ChemicalSubstanceEntryBean} from '../../../obj/bean/ChemicalSubstanceEntryBean';
import {Dropdown, DropdownOption} from '../../common/dropdown/dropdown';
import {SubstanceService} from '../../../service/rest/substance/substance.service';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';
import {Unit, UnitLabel} from '../../../obj/enum/unit.enum';
import {Field, form} from '@angular/forms/signals';
import {AsyncPipe} from '@angular/common';
import {ExperimentReactantBean} from '../../../obj/bean/ExperimentReactantBean';
import {ExperimentBean} from '../../../obj/bean/ExperimentBean';

interface ExperimentFormData {
  title: string;
  note: string;
  quantity: number;
}

@Component({
  selector: 'chem-experiment-form',
  imports: [
    Field,
    Dropdown,
    AsyncPipe
  ],
  templateUrl: './experiment-form.html',
  styleUrl: './experiment-form.scss',
})
export class ExperimentForm implements AfterViewInit {

  //TODO REWORK THIS. THIS IS CRAP!

  public experimentFormModel = signal<ExperimentFormData>({
    title: '',
    note: '',
    quantity: 0
  });

  public experimentForm = form(this.experimentFormModel);

  public substanceOptions$: Observable<DropdownOption<ChemicalSubstanceEntryBean>[]>;

  public selectedUnit = signal<Unit>(Unit.G);

  public onSelectUnit = (value: Unit) => {
    this.selectedUnit.set(value);
  }

  private experimentReactantsSubject = new BehaviorSubject<ExperimentReactantBean[]>([]);
  public experimentReactants$ = this.experimentReactantsSubject.asObservable();

  public selectedSubstanceEntry = signal<ChemicalSubstanceEntryBean | null>(null);

  public onSelectSubstanceEntry = (value: ChemicalSubstanceEntryBean) => {
    this.selectedSubstanceEntry.set(value);
  }

  public unitOptions: DropdownOption<Unit>[] = Object.keys(Unit).map(
    key => ({
      label: UnitLabel[key as keyof typeof Unit],
      value: Unit[key as keyof typeof Unit]
    })
  );

  public substanceMap$: Observable<Map<number, ChemicalSubstanceBean>>;
  public substanceEntryMap$: Observable<Map<number, ChemicalSubstanceEntryBean>>;

  constructor(private readonly experimentService: ExperimentService,
              private readonly inventoryService: InventoryService,
              private readonly substanceService: SubstanceService) {

    this.substanceOptions$ = combineLatest([
      this.inventoryService.getAllSubstanceInventoryEntries$(),
      this.substanceService.getAllSubstances$()]).pipe(
      map(([substanceEntries, substances]) => {
        const substanceMap = new Map<number, ChemicalSubstanceBean>();
        if (!substances || substances.length === 0 || !substanceEntries || substanceEntries.length === 0) {
          return [];
        }

        substances.forEach(substance => {
          substanceMap.set(substance.id!, substance);
        });

        return substanceEntries.map(entry => ({
            label: substanceMap.get(Number(entry.chemicalSubstanceId))?.name + ` (Qty: ${entry.quantityBase} ${UnitLabel[entry.unit as keyof typeof Unit]})`,
            value: entry
          }
        ))
      }) || []);


    this.substanceMap$ = this.substanceService.getAllSubstances$().pipe(
      map(substances => {
        const map = new Map<number, ChemicalSubstanceBean>();
        substances?.forEach(substance => {
          map.set(substance.id!, substance);
        });
        return map;
      })
    )

    this.substanceEntryMap$ = this.inventoryService.getAllSubstanceInventoryEntries$().pipe(
      map(entries => {
        const map = new Map<number, ChemicalSubstanceEntryBean>();
        entries?.forEach(entry => {
          map.set(Number(entry.chemicalSubstanceId), entry);
        });
        return map;
      })
    )
  }

  ngAfterViewInit(): void {

  }

  public async addSubstanceToExperiment() {
    if (!this.selectedSubstanceEntry()) {
      console.error("No substance selected!");
      return;
    }
    const currentReactants = await firstValueFrom(this.experimentReactants$);
    const newReactant: ExperimentReactantBean = {
      substanceEntryId: Number(this.selectedSubstanceEntry()?.chemicalSubstanceId),
      quantity: this.experimentForm().value().quantity,
      unit: this.selectedUnit()
    };

    this.experimentReactantsSubject.next([...currentReactants, newReactant]);

  }

  public async submitExperiment() {
    const experimentData: ExperimentBean = {
      title: this.experimentForm().value().title,
      note: this.experimentForm().value().note,
      reactants: await firstValueFrom(this.experimentReactants$)
    };

    return await firstValueFrom(this.experimentService.createExperiment$(experimentData)).then(() => {
      // Reset form after submission
      this.experimentFormModel.set({
        title: '',
        note: '',
        quantity: 0
      });
      this.experimentReactantsSubject.next([]);
      this.selectedSubstanceEntry.set(null);
      this.selectedUnit.set(Unit.G);
    });
  }


  protected readonly Number = Number;
}
