import {Component} from '@angular/core';
import {ChemicalSubstanceForm} from '../chemical-substance-form/chemical-substance-form';
import {SubstanceService} from '../../../service/rest/substance/substance.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';

@Component({
  selector: 'chem-chemical-substance-edit',
  imports: [
    ChemicalSubstanceForm,
    AsyncPipe
  ],
  templateUrl: './chemical-substance-edit.html',
  styleUrl: './chemical-substance-edit.scss',
})
export class ChemicalSubstanceEdit {


  public substance$: Observable<ChemicalSubstanceBean | null>;

  constructor(private readonly substanceService: SubstanceService,
              private readonly route: ActivatedRoute) {

    this.substance$ = this.substanceService.getSubstance$(Number(this.route.snapshot.queryParamMap.get('id')));
  }

}
