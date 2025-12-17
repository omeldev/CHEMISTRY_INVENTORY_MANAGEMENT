import {Routes} from '@angular/router';
import {ErrorComponent} from './components/common/error/error.component';
import {SubstanceForm} from './components/substance/substance-form/substance-form.component';
import {SubstanceEntryForm} from './components/inventory/form/substance-entry-form/substance-entry-form.component';
import {ExperimentOverview} from './components/experiment/experiment-overview/experiment-overview';
import {SubstanceOverview} from './components/substance/substance-overview/substance-overview.component';
import {InventoryOverview} from './components/inventory/inventory-overview/inventory-overview.component';
import {ExperimentForm} from './components/experiment/experiment-form/experiment-form';
import {substanceResolver} from './resolver/substance/substance-resolver';
import {substanceEntryResolver} from './resolver/inventory/substance/substance-entry-resolver';

export const routes: Routes = [

  {
    path: 'inventory',
    children: [
      {
        path: 'overview',
        component: InventoryOverview
      },
      {
        path: 'create',
        component: SubstanceEntryForm
      },
      {
        path: 'edit',
        component: SubstanceEntryForm,
        resolve: {
          substanceEntry: substanceEntryResolver
        }
      }
    ]
  },

  {
    path: 'substance',
    children: [
      {
        path: "edit",
        component: SubstanceForm,
        resolve: {
          substance: substanceResolver
        }
      },
      {
        path: 'create',
        component: SubstanceForm
      },
      {
        path: 'overview',
        component: SubstanceOverview
      },
    ]
  },

  {
    path: 'experiment',
    children: [
      {
        path: 'create',
        component: ExperimentForm
      },
      {
        path: 'overview',
        component: ExperimentOverview
      }
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];
