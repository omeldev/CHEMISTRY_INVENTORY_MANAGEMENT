import { Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {ChemicalSubstanceForm} from './components/chemical-substance-form/chemical-substance-form';

export const routes: Routes = [
  {
    path: 'substance-form',
    component: ChemicalSubstanceForm
  }
  ,
  {
    path: '**', component: ErrorComponent
  },
];
