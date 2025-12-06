import {Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ChemicalSubstanceForm} from './components/chemical-substance-form/chemical-substance-form';
import {ChemicalSubstanceOverview} from './components/chemical-substance-overview/chemical-substance-overview';
import {ChemicalSubstanceEdit} from './components/chemical-substance-edit/chemical-substance-edit';

export const routes: Routes = [
  {
    path: 'substance-form',
    component: ChemicalSubstanceForm
  },
  {
    path: 'overview',
    component: ChemicalSubstanceOverview
  },
  {
    path: 'substance',
    children: [
      {
        path: "edit",
        component: ChemicalSubstanceEdit
      }
    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];
