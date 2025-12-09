import {Component} from '@angular/core';
import {SubstanceService} from '../../service/rest/substance/substance.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';
import {Router, RouterLink} from '@angular/router';
import {SafetySquare} from '../safety-square/safety-square';
import {SpecifiedHazard} from '../../obj/enum/specific-hazard.enum';

@Component({
  selector: 'chem-chemical-substance-overview',
  imports: [
    AsyncPipe,
    SafetySquare,
    RouterLink
  ],
  templateUrl: './chemical-substance-overview.html',
  styleUrl: './chemical-substance-overview.scss',
})
export class ChemicalSubstanceOverview {


  public substances$: Observable<ChemicalSubstanceBean[] | null>;

  constructor(private readonly substanceService: SubstanceService,
              private readonly router: Router) {
    this.substances$ = this.substanceService.getAllSubstances$();
  }

  editSubstance(id: string) {
    //Create url tree with query parameters
    return this.router.navigateByUrl(this.router.createUrlTree(['/substance/edit'], {queryParams: {id}}));
  }

  protected readonly SpecifiedHazard = SpecifiedHazard;
  protected readonly Object = Object;
  protected readonly console = console;

  navigateToSubstanceCreatePage() {
    return this.router.createUrlTree(['/substance', 'create']);
  }
}
