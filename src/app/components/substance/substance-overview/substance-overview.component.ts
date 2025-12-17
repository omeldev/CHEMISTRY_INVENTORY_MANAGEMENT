import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';
import {Router, RouterLink} from '@angular/router';
import {SafetySquare} from '../../common/safety-square/safety-square';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../../store/substance/substance.state';

@Component({
  selector: 'chem-chemical-substance-overview',
  imports: [
    AsyncPipe,
    SafetySquare,
    RouterLink
  ],
  templateUrl: './substance-overview.component.html',
  styleUrl: './substance-overview.component.scss',
})
export class SubstanceOverview {

  public substances$: Observable<ChemicalSubstanceBean[]> = inject(Store).select(SubstanceState.getSubstances);
  private readonly router = inject(Router);

  editSubstance(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['/substance/edit'], {queryParams: {id}}));
  }

  navigateToSubstanceCreatePage() {
    return this.router.createUrlTree(['/substance', 'create']);
  }
}
