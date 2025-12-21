import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {Router, RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';
import {Button} from '../../../common/button/button';
import {AsyncPipe} from '@angular/common';
import {ButtonType} from '../../../../obj/enum/button.enum';
import {SupplierService} from '../../../../service/rest/supplier/supplier.service';
import {SupplierState} from '../../../../store/supplier/supplier.state';
import {SupplierAction} from '../../../../store/supplier/supplier.actions';
import {SupplierBean} from '../../../../obj/bean/supplier.bean';

@Component({
  selector: 'chem-location-overview',
  imports: [
    Button,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './supplier-overview.component.html',
  styleUrl: './supplier-overview.component.scss',
})
export class SupplierOverview {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly supplierService = inject(SupplierService);

  public readonly suppliers$ = this.store.select(SupplierState.getSuppliers);


  editSupplier(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['supplier', 'edit'], {queryParams: {id}}));
  }

  async deleteSupplier(supplier: SupplierBean) {
    return await firstValueFrom(this.supplierService.deleteSupplier$(supplier.id)).then(() => {
      this.store.dispatch(new SupplierAction.Remove(supplier.id));
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Supplier "${supplier.name}" deleted successfully.`,
        type: ToastType.SUCCESS,
        duration: 3000
      }))
    })
  }

  navigateToLocationCreatePage() {
    return this.router.createUrlTree(['supplier', 'create']);
  }

  protected readonly ButtonType = ButtonType;
}
