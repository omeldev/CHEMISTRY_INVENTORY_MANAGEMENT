import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {AsyncPipe} from '@angular/common';
import {InventoryState} from '../../../store/inventory/inventory.state';
import {map} from 'rxjs';
import {SubstanceState} from '../../../store/substance/substance.state';
import {ExperimentState} from '../../../store/experiment/experiment.state';

@Component({
  selector: 'chem-dashboard',
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  private readonly store = inject(Store);

  public readonly totalSubstances$ = this.store.select(SubstanceState.getSubstances).pipe(
    map(substances => substances.length)
  );
  public readonly totalExperiments$ = this.store.select(ExperimentState.getExperiments).pipe(
    map(experiments => experiments.length)
  );
  public readonly totalOngoingExperiments$ = this.store.select(ExperimentState.getExperiments).pipe(
    map(experiments => experiments.filter(exp => !exp.finalized).length)
  );
  public readonly totalInventoryItems$ = this.store.select(InventoryState.getSubstanceEntries).pipe(
    map(entries => entries.length)
  );
}
