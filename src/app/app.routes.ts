import {Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ChemicalSubstanceForm} from './components/chemical-substance-form/chemical-substance-form';
import {ChemicalSubstanceEdit} from './components/chemical-substance-edit/chemical-substance-edit';
import {ChemicalSubstanceEntryForm} from './components/chemical-substance-entry-form/chemical-substance-entry-form';
import {SubstanceInventoryEdit} from './components/substance-inventory-edit/substance-inventory-edit';
import {ExperimentOverview} from './components/overview/experiment-overview/experiment-overview';
import {ChemicalSubstanceOverview} from './components/overview/chemical-substance-overview/chemical-substance-overview';
import {
  SubstanceInventoryOverview
} from './components/overview/substance-inventory-overview/substance-inventory-overview';
import {ExperimentForm} from './components/form/experiment-form/experiment-form';

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
