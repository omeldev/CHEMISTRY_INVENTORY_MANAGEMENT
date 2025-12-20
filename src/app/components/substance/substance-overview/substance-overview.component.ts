import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {map, Observable} from 'rxjs';
import {SubstanceBean} from '../../../obj/bean/substance.bean';
import {Router, RouterLink} from '@angular/router';
import {SafetySquare} from '../../common/safety-square/safety-square';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../../store/substance/substance.state';
import {SupplierState} from '../../../store/supplier/supplier.state';

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

  public substances$: Observable<SubstanceBean[]> = inject(Store).select(SubstanceState.getSubstances);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  editSubstance(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['/substance/edit'], {queryParams: {id}}));
  }

  navigateToSubstanceCreatePage() {
    return this.router.createUrlTree(['/substance', 'create']);
  }

  public getSupplierById(id: number) {
    return this.store.select(SupplierState.getSupplierById).pipe(
      map(fn => fn(id))
    )
  }
}
