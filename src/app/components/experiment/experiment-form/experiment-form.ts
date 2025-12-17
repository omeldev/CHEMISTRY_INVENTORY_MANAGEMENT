import {Component, inject, signal} from '@angular/core';
import {ExperimentService} from '../../../service/rest/experiment/experiment.service';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {ChemicalSubstanceEntryBean} from '../../../obj/bean/ChemicalSubstanceEntryBean';
import {Dropdown, DropdownOption} from '../../common/dropdown/dropdown';
import {Unit, UnitLabel} from '../../../obj/enum/unit.enum';
import {Field, form} from '@angular/forms/signals';
import {AsyncPipe} from '@angular/common';
import {ExperimentReactantBean} from '../../../obj/bean/ExperimentReactantBean';
import {ExperimentBean} from '../../../obj/bean/ExperimentBean';
import {Store} from '@ngxs/store';
import {InventoryState} from '../../../store/inventory/inventory.state';
import {ExperimentAction} from '../../../store/experiment/experiment.actions';
import {Router} from '@angular/router';

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
export class ExperimentForm {
  protected readonly Number = Number;
  protected readonly UnitLabel = UnitLabel;

  //TODO REWORK THIS. THIS IS CRAP!

  public experimentFormModel = signal<ExperimentFormData>({
    title: '',
    note: '',
    quantity: 0
  });

  public experimentForm = form(this.experimentFormModel);

  public substanceOptions$ = inject(Store).select(InventoryState.getSubstanceEntrysDropdownOptions);

  public selectedUnit = signal<Unit>(Unit.G);

  public onSelectUnit = (value: Unit) => {
    this.selectedUnit.set(value);
  }

  private experimentReactantsSubject = new BehaviorSubject<Partial<ExperimentReactantBean>[]>([]);
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

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  constructor(private readonly experimentService: ExperimentService) {

  }

  public async addSubstanceToExperiment() {
    if (!this.selectedSubstanceEntry()) {
      console.error("No substance selected!");
      return;
    }
    const currentReactants = await firstValueFrom(this.experimentReactants$);
    const newReactant: Partial<ExperimentReactantBean> = {
      substanceEntryId: Number(this.selectedSubstanceEntry()?.id),
      quantity: this.experimentForm().value().quantity,
      unit: this.selectedUnit()
    };

    this.experimentReactantsSubject.next([...currentReactants, newReactant]);

  }

  public async submitExperiment() {
    const currentReactants = await firstValueFrom(this.experimentReactants$);

    const experimentData: Partial<ExperimentBean> = {
      title: this.experimentForm().value().title,
      note: this.experimentForm().value().note,
      reactants: currentReactants as ExperimentReactantBean[]
    };

    return await firstValueFrom(this.experimentService.createExperiment$(experimentData)).then((experiment) => {
      // Reset form after submission
      if (experiment) {
        this.store.dispatch(new ExperimentAction.Add(experiment));

      }
      this.navigateToExperimentOverview();
    });
  }

  public getSubstanceFromEntryById$(entryId: number) {
    return this.store.select(InventoryState.getSubstanceFromEntryById).pipe(
      map(fn => fn(entryId))
    )
  }

  public navigateToExperimentOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['experiment', 'overview']));
  }

  public async removeReactant(reactant: Partial<ExperimentReactantBean>) {
    const currentReactants = await firstValueFrom(this.experimentReactants$);
    const updatedReactants = currentReactants.filter(r => r !== reactant);
    this.experimentReactantsSubject.next(updatedReactants);
  }
}
