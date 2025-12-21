import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {firstValueFrom, map} from 'rxjs';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/toast.bean';
import {LabwareCategoryBean} from '../../../obj/bean/labware-category.bean';
import {LabwareCategoryState} from '../../../store/labware-category/labware-category.state';

export const labwareCategoryFormResolver: ResolveFn<LabwareCategoryBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(LabwareCategoryState.getLabwareCategoryById).pipe(
    map(selector => selector(id))
  );

  const labwareCategory = await firstValueFrom(selector$);

  if (!labwareCategory) {
    await router.navigate(['/management/overview']);
    store.dispatch(new ToastAction.ShowToast({
      message: `Labware Category with id ${id} not found.`,
      type: ToastType.ERROR,
      duration: 3000
    }));
    return null;
  }
  return labwareCategory;
};
