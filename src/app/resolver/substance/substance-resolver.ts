import {ResolveFn, Router} from '@angular/router';
import {SubstanceBean} from '../../obj/bean/substance.bean';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {SubstanceState} from '../../store/substance/substance.state';
import {firstValueFrom, map} from 'rxjs';
import {ToastAction} from '../../store/toast/toast.action';
import {ToastType} from '../../obj/bean/toast.bean';

export const substanceResolver: ResolveFn<SubstanceBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(SubstanceState.getSubstanceById).pipe(
    map(selector => selector(id))
  );

  const substance = await firstValueFrom(selector$);

  if (!substance) {
    await router.navigate(['/substance/overview']);
    store.dispatch(new ToastAction.ShowToast({
      message: `Substance with id ${id} not found.`,
      type: ToastType.ERROR,
      duration: 3000
    }));
    return null;
  }
  return substance;
};
