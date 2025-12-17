import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {firstValueFrom, map} from 'rxjs';
import {ChemicalSubstanceEntryBean} from '../../../obj/bean/ChemicalSubstanceEntryBean';
import {InventoryState} from '../../../store/inventory/inventory.state';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/ToastBean';


export const substanceEntryResolver: ResolveFn<ChemicalSubstanceEntryBean | null> = async (route, _) => {
  const id = Number(route.queryParamMap.get('id'));
  const store = inject(Store);
  const router = inject(Router);

  const selector$ = store.select(InventoryState.getSubstanceEntryById).pipe(
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
