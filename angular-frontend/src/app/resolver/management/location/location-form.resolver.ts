import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {firstValueFrom, map} from 'rxjs';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/toast.bean';
import {LocationBean} from '../../../obj/bean/location.bean';
import {LocationState} from '../../../store/location/location.state';

export const locationFormResolver: ResolveFn<LocationBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(LocationState.getLocationById).pipe(
    map(selector => selector(id))
  );

  const location = await firstValueFrom(selector$);

  if (!location) {
    await router.navigate(['/management/overview']);
    store.dispatch(new ToastAction.ShowToast({
      message: `Substance with id ${id} not found.`,
      type: ToastType.ERROR,
      duration: 3000
    }));
    return null;
  }
  return location;
};
