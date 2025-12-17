import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {ExperimentState} from '../../../store/experiment/experiment.state';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'chem-experiment-overview',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './experiment-overview.html',
  styleUrl: './experiment-overview.scss',
})
export class ExperimentOverview {

  public readonly experiments$ = inject(Store).select(ExperimentState.getExperiments);
  private readonly router = inject(Router);

  public navigateToCreateExperiment() {
    return this.router.createUrlTree(['experiment', 'create']);
  }
}
