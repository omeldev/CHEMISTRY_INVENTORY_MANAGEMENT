import {Component, effect, inject, signal} from '@angular/core';
import {Field, form} from '@angular/forms/signals';
import {SubstanceBean} from '../../../obj/bean/substance.bean';
import {SubstanceService} from '../../../service/rest/substance/substance.service';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {
  defaultSpecifiedHazardOptionsKeyIndex,
  SpecifiedHazard,
  specifiedHazardOptionsKeys
} from '../../../obj/enum/specific-hazard.enum';
import {Dropdown, DropdownOption} from '../../common/dropdown/dropdown';
import {AsyncPipe} from '@angular/common';
import {Store} from '@ngxs/store';
import {SubstanceAction} from '../../../store/substance/substance.actions';
import {toSignal} from '@angular/core/rxjs-interop';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/toast.bean';

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
  templateUrl: './substance-form.component.html',
  styleUrl: './substance-form.component.scss',
})

export class SubstanceForm {

  public specifiedHazardOptions: DropdownOption<keyof SpecifiedHazard>[] = specifiedHazardOptionsKeys;

  public chemicalSubstanceAnswerModel = signal<ChemicalSubstanceFormData>(DEFAULT_CHEMICAL_SUBSTANCE_FORM_MODEL_DATA);

  public chemicalSubstanceForm = form(this.chemicalSubstanceAnswerModel);

  public defaultSpecifiedHazardOption: number = defaultSpecifiedHazardOptionsKeyIndex;

  private selectedSpecifiedHazardIndexSubject = new BehaviorSubject(this.defaultSpecifiedHazardOption);
  public selectedSpecifiedHazardIndex$ = this.selectedSpecifiedHazardIndexSubject.asObservable();

  private route = inject(ActivatedRoute);

  // Reactive approach: resolved data as observable converted to signal
  public chemicalSubstance = toSignal(
    this.route.data.pipe(map(data => data['substance'] as SubstanceBean | null)),
    {initialValue: null}
  );

  constructor(private readonly substanceService: SubstanceService,
              private readonly router: Router,
              private readonly store: Store) {
    effect(() => {
      if (this.chemicalSubstance() !== null) {
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
    });
  }

  public onSelectSpecifiedHazard = (value: any) => {
    this.chemicalSubstanceAnswerModel.update(current => ({
      ...current,
      nfpaSpecifiedHazard: value as keyof typeof SpecifiedHazard
    }))
  }

  public async submitForm() {
    const chemicalSubstanceBean: Partial<SubstanceBean> = {
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
        return await firstValueFrom(this.substanceService.patch$(Number(this.route.snapshot.queryParamMap.get('id')), chemicalSubstanceBean)).then((substance) => {
          if (substance) {
            this.store.dispatch(new SubstanceAction.Patch(Number(this.route.snapshot.queryParamMap.get('id')), substance));
            this.store.dispatch(new ToastAction.ShowToast({
              message: `Substance "${substance.name}" updated successfully.`,
              type: ToastType.SUCCESS,
              duration: 3000
            }))
          }
          this.navigateToSubstanceOverview()
        });
      }
      return;
    }
    return await firstValueFrom(this.substanceService.create$(chemicalSubstanceBean)).then((substance) => {
      if (substance) {
        this.store.dispatch(new SubstanceAction.Add(substance));
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Substance "${substance.name}" created successfully.`,
          type: ToastType.SUCCESS,
          duration: 3000
        }));
      }
      this.navigateToSubstanceOverview()
    });
  }

  public navigateToSubstanceOverview() {
    return this.router.navigateByUrl(this.router.createUrlTree(['substance', 'overview']))
  }

}
