import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStates, provideStore} from '@ngxs/store';
import {SubstanceState} from './store/substance/substance.state';
import {InventoryState} from './store/inventory/inventory.state';
import {ExperimentState} from './store/experiment/experiment.state';
import {ToastState} from './store/toast/toast.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideStates([SubstanceState, InventoryState, ExperimentState, ToastState])
  ]
};
