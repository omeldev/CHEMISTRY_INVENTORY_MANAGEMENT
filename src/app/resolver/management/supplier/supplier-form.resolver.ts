import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {firstValueFrom, map} from 'rxjs';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/toast.bean';
import {SupplierBean} from '../../../obj/bean/supplier.bean';
import {SupplierState} from '../../../store/supplier/supplier.state';

export const supplierFormResolver: ResolveFn<SupplierBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(SupplierState.getSupplierById).pipe(
    map(selector => selector(id))
  );

  const supplier = await firstValueFrom(selector$);

  if (!supplier) {
    await router.navigate(['/management/overview']);
    store.dispatch(new ToastAction.ShowToast({
      message: `Supplier with id ${id} not found.`,
      type: ToastType.ERROR,
      duration: 3000
    }));
    return null;
  }
  return supplier;
};
