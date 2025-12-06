import {AfterViewInit, Component, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';

export interface ChemicalSubstanceEntryFormData {
  chemicalSubstanceId: string;
  addedAt: string;
  updatedAt: string;
  quantity: string;
  purity: string;
  location: string;
  note: string;
}

@Component({
  selector: 'chem-chemical-substance-entry-form',
  imports: [
    Field
  ],
  templateUrl: './chemical-substance-entry-form.html',
  styleUrl: './chemical-substance-entry-form.scss',
})

export class ChemicalSubstanceEntryForm implements AfterViewInit {

  public chemicalSubstanceEntryAnswerModel = signal<ChemicalSubstanceEntryFormData>({
    chemicalSubstanceId: '',
    addedAt: '',
    updatedAt: '',
    quantity: '',
    purity: '',
    location: '',
    note: ''
  })

  public substanceEntryForm = form(this.chemicalSubstanceEntryAnswerModel);

  public async submitForm() {
    //TODO: NO CLIENT DATES
    const substanceEntryBean: ChemicalSubstanceEntryBean = {
      chemicalSubstanceId: this.substanceEntryForm().value().chemicalSubstanceId,
      addedAt: new Date(this.substanceEntryForm().value().addedAt).toString(),
      updatedAt: new Date(this.substanceEntryForm().value().updatedAt).toString(),
      quantity: this.substanceEntryForm().value().quantity,
      purity: this.substanceEntryForm().value().purity,
      location: this.substanceEntryForm().value().location,
      note: this.substanceEntryForm().value().note
    }
  }

  ngAfterViewInit(): void {
  }

}
