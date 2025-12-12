import {Routes} from '@angular/router';
import {ErrorComponent} from './components/common/error/error.component';
import {ChemicalSubstanceForm} from './components/substance/chemical-substance-form/chemical-substance-form';
import {ChemicalSubstanceEdit} from './components/substance/chemical-substance-edit/chemical-substance-edit';
import {
  ChemicalSubstanceEntryForm
} from './components/substance/chemical-substance-entry-form/chemical-substance-entry-form';
import {SubstanceInventoryEdit} from './components/substance/substance-inventory-edit/substance-inventory-edit';
import {ExperimentOverview} from './components/experiment/experiment-overview/experiment-overview';
import {
  ChemicalSubstanceOverview
} from './components/substance/chemical-substance-overview/chemical-substance-overview';
import {
  SubstanceInventoryOverview
} from './components/substance/substance-inventory-overview/substance-inventory-overview';
import {ExperimentForm} from './components/experiment/experiment-form/experiment-form';

export const routes: Routes = [

  {
    path: 'inventory',
    children: [
      {
        path: 'overview',
        component: SubstanceInventoryOverview
      },
      {
        path: 'create',
        component: ChemicalSubstanceEntryForm
      },
      {
        path: 'edit',
        component: SubstanceInventoryEdit
      }
    ]
  },

  {
    path: 'substance',
    children: [
      {
        path: "edit",
        component: ChemicalSubstanceEdit
      },
      {
        path: 'create',
        component: ChemicalSubstanceForm
      },
      {
        path: 'overview',
        component: ChemicalSubstanceOverview
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
