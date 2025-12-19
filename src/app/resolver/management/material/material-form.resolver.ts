import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {firstValueFrom, map} from 'rxjs';
import {MaterialBean} from '../../../obj/bean/material.bean';
import {MaterialState} from '../../../store/material/material.state';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/toast.bean';

export const materialFormResolver: ResolveFn<MaterialBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(MaterialState.getMaterialById).pipe(
    map(selector => selector(id))
  );

  const material = await firstValueFrom(selector$);

  if (!material) {
    await router.navigate(['/management/overview']);
    store.dispatch(new ToastAction.ShowToast({
      message: `Substance with id ${id} not found.`,
      type: ToastType.ERROR,
      duration: 3000
    }));
    return null;
  }
  return material;
};
