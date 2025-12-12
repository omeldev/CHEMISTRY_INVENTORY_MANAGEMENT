import {AfterViewInit, Component, input, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';
import {SubstanceService} from '../../../service/rest/substance/substance.service';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {
  defaultSpecifiedHazardOptionsKeyIndex,
  SpecifiedHazard,
  specifiedHazardOptionsKeys
} from '../../../obj/enum/specific-hazard.enum';
import {Dropdown, DropdownOption} from '../../common/dropdown/dropdown';
import {AsyncPipe} from '@angular/common';

interface ChemicalSubstanceFormData {
  name: string;
  casNumber: string;
  molecularFormula: string;
  supplier: string;
  nfpaHealth: number;
  nfpaFlammability: number
  nfpaReactivity: number;
  nfpaSpecifiedHazard: keyof typeof SpecifiedHazard;
}

const DEFAULT_CHEMICAL_SUBSTANCE_FORM_MODEL_DATA: ChemicalSubstanceFormData = {
  name: '',
  casNumber: '',
  molecularFormula: '',
  supplier: '',
  nfpaHealth: 0,
  nfpaFlammability: 0,
  nfpaReactivity: 0,
  nfpaSpecifiedHazard: 'NONE'
};

@Component({
  selector: 'chem-chemical-substance-form',
  imports: [
    Field,
    Dropdown,
    AsyncPipe
  ],
  templateUrl: './chemical-substance-form.html',
  styleUrl: './chemical-substance-form.scss',
})

export class ChemicalSubstanceForm implements AfterViewInit {

  public specifiedHazardOptions: DropdownOption<keyof SpecifiedHazard>[] = specifiedHazardOptionsKeys;

  public chemicalSubstanceAnswerModel = signal<ChemicalSubstanceFormData>(DEFAULT_CHEMICAL_SUBSTANCE_FORM_MODEL_DATA);

  public chemicalSubstanceForm = form(this.chemicalSubstanceAnswerModel);

  public defaultSpecifiedHazardOption: number = defaultSpecifiedHazardOptionsKeyIndex;

  private selectedSpecifiedHazardIndexSubject = new BehaviorSubject(this.defaultSpecifiedHazardOption);
  public selectedSpecifiedHazardIndex$ = this.selectedSpecifiedHazardIndexSubject.asObservable();

  public chemicalSubstance = input<ChemicalSubstanceBean>();

  constructor(private readonly substanceService: SubstanceService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
  }

  public onSelectSpecifiedHazard = (value: any) => {
    this.chemicalSubstanceAnswerModel.update(current => ({
      ...current,
      nfpaSpecifiedHazard: value as keyof typeof SpecifiedHazard
    }))
  }

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

    if (this.chemicalSubstance()) {
      if (this.route.snapshot.queryParamMap.get('id')) {
        return await firstValueFrom(this.substanceService.patchSubstance$(Number(this.route.snapshot.queryParamMap.get('id')), chemicalSubstanceBean)).then(() => this.navigateToSubstanceOverview());
      }
      return;
    }
    return await firstValueFrom(this.substanceService.createSubstance$(chemicalSubstanceBean)).then(() => this.navigateToSubstanceOverview());
  }

  public navigateToSubstanceOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['substance', 'overview']))
  }

  ngAfterViewInit(): void {
    if (this.chemicalSubstance()) {
      this.chemicalSubstanceAnswerModel.set({
        name: this.chemicalSubstance()?.name ?? '',
        casNumber: this.chemicalSubstance()?.casNumber ?? '',
        molecularFormula: this.chemicalSubstance()?.molecularFormula ?? '',
        supplier: this.chemicalSubstance()?.supplier ?? '',
        nfpaHealth: this.chemicalSubstance()?.nfpaHealth ?? 0,
        nfpaFlammability: this.chemicalSubstance()?.nfpaFlammability ?? 0,
        nfpaReactivity: this.chemicalSubstance()?.nfpaReactivity ?? 0,
        nfpaSpecifiedHazard: this.chemicalSubstance()?.nfpaSpecifiedHazard ?? 'NONE'
      });
      this.selectedSpecifiedHazardIndexSubject.next(this.specifiedHazardOptions.findIndex(option => option.value === this.chemicalSubstance()?.nfpaSpecifiedHazard as keyof SpecifiedHazard));
    }
  }

}
