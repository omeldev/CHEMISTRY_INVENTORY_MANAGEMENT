import {Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ChemicalSubstanceForm} from './components/chemical-substance-form/chemical-substance-form';
import {ChemicalSubstanceOverview} from './components/chemical-substance-overview/chemical-substance-overview';
import {ChemicalSubstanceEdit} from './components/chemical-substance-edit/chemical-substance-edit';
import {ChemicalSubstanceEntryForm} from './components/chemical-substance-entry-form/chemical-substance-entry-form';
import {SubstanceInventoryOverview} from './components/substance-inventory-overview/substance-inventory-overview';
import {SubstanceInventoryEdit} from './components/substance-inventory-edit/substance-inventory-edit';

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
    path: '**', component: ErrorComponent
  },
];
