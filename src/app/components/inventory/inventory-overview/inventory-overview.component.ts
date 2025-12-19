import {Component, inject} from '@angular/core';
import {firstValueFrom, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {QuantityPipe} from '../../../pipe/quantity.pipe';
import {InventoryService} from '../../../service/rest/inventory/inventory.service';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../../store/substance/substance.state';
import {InventoryState} from '../../../store/inventory/inventory.state';
import {Button} from '../../common/button/button';
import {ButtonType} from '../../../obj/enum/button.enum';
import {InventoryAction} from '../../../store/inventory/inventory.actions';


@Component({
  selector: 'chem-substance-inventory-overview',
  imports: [
    AsyncPipe,
    RouterLink,
    QuantityPipe,
    Button
  ],
  templateUrl: './inventory-overview.component.html',
  styleUrl: './inventory-overview.component.scss',
})
export class InventoryOverview {

  private readonly store = inject(Store);

  public substanceEntries$ = this.store.select(InventoryState.getSubstanceEntries)

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly router: Router,
  ) {
  }

  editSubstanceEntry(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['/inventory/edit'], {queryParams: {id}}));
  }

  protected readonly Number = Number;

  async deleteSubstanceEntry(number: number) {
    await firstValueFrom(this.inventoryService.deleteSubstanceEntry$(number))
      .then(() => this.store.dispatch(new InventoryAction.RemoveSubstance(number)));
  }

  navigateToSubstanceCreateEntryPage() {
    return this.router.createUrlTree(['/inventory', 'create']);
  }

  public getSubstanceById(id: number) {
    return this.store.select(SubstanceState.getSubstanceById).pipe(
      map(fn => fn(id))
    )
  }

  protected readonly ButtonType = ButtonType;
}
