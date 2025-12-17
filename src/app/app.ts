import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SubstanceService} from './service/rest/substance/substance.service';
import {firstValueFrom} from 'rxjs';
import {Header} from './components/common/header/header';
import {SubstanceAction} from './store/substance/substance.actions';
import {Store} from '@ngxs/store';
import {InventoryService} from './service/rest/inventory/inventory.service';
import {InventoryAction} from './store/inventory/inventory.actions';
import {ExperimentService} from './service/rest/experiment/experiment.service';
import {ExperimentAction} from './store/experiment/experiment.actions';
import {ToastOverlayComponent} from './components/common/toast-overlay/toast-overlay.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToastOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly store = inject(Store);

  constructor(
    substanceService: SubstanceService,
    inventoryService: InventoryService,
    experimentService: ExperimentService) {
    void firstValueFrom(substanceService.getAll$()).then(
      substances => {
        if (substances && substances.length > 0) {
          this.store.dispatch(new SubstanceAction.Init(substances));
        }
      }
    ).then(() => {
      console.log('Substances loaded into store');
    })

    void firstValueFrom(inventoryService.getAllSubstanceEntries$()).then(
      substances => {
        if (substances && substances.length > 0) {
          this.store.dispatch(new InventoryAction.InitSubstances(substances));
        }
      }
    ).then(() => {
      console.log('Inventory substances loaded into store');
    })

    void firstValueFrom(experimentService.getAllExperiments$()).then(
      experiments => {
        if (experiments && experiments.length > 0) {
          this.store.dispatch(new ExperimentAction.Init(experiments));
        }
      }
    ).then(() => {
      console.log('Experiments loaded into store');
    })

  }
}
