import {Component, signal} from '@angular/core';
import {form, Field} from '@angular/forms/signals';
import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';
import {SubstanceService} from '../../service/rest/substance/substance.service';
import {firstValueFrom, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

export interface ChemicalSubstanceFormData {
  name: string;
  casNumber: string;
  molecularFormula: string;
  supplier: string;
  nfpaHealth: number;
  nfpaFlammability: number
  nfpaReactivity: number;
  nfpaSpecifiedHazard: string;
}

@Component({
  selector: 'chem-chemical-substance-form',
  imports: [
    Field,
    AsyncPipe
  ],
  templateUrl: './chemical-substance-form.html',
  styleUrl: './chemical-substance-form.scss',
})
export class ChemicalSubstanceForm {

  public readonly allSubstances$: Observable<ChemicalSubstanceBean[] | null>;

  constructor(private readonly substanceService: SubstanceService) {
    this.allSubstances$ = this.substanceService.getAllSubstances$();
  }

  public chemicalSubstanceAnswerModel = signal<ChemicalSubstanceFormData>({
    name: '',
    casNumber: '',
    molecularFormula: '',
    supplier: '',
    nfpaHealth: 0,
    nfpaFlammability: 0,
    nfpaReactivity: 0,
    nfpaSpecifiedHazard: ''
  })

  public chemicalSubstanceForm = form(this.chemicalSubstanceAnswerModel);

  public async submitForm() {
    const chemicalSubstanceBean: ChemicalSubstanceBean = {
      name: this.chemicalSubstanceForm().value().name,
      casNumber: this.chemicalSubstanceForm().value().casNumber,
      molecularFormula: this.chemicalSubstanceForm().value().molecularFormula,
      supplier: this.chemicalSubstanceForm().value().supplier,
      nfpaHealth: this.chemicalSubstanceForm().value().nfpaHealth,
      nfpaFlammability: this.chemicalSubstanceForm().value().nfpaFlammability,
      nfpaReactivity: this.chemicalSubstanceForm().value().nfpaReactivity,
      nfpaSpecifiedHazard: this.chemicalSubstanceForm().value().nfpaSpecifiedHazard
    }

    console.log('submitting Chemical Substance Form Data:', chemicalSubstanceBean);
    return await firstValueFrom(this.substanceService.createSubstance$(chemicalSubstanceBean)).then(() => console.log("SUCCESS"))
  }




}
