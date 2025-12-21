import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {Router, RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';
import {LabwareCategoryService} from '../../../../service/rest/labware/category/labware-category.service';
import {LabwareCategoryBean} from '../../../../obj/bean/labware-category.bean';
import {LabwareCategoryAction} from '../../../../store/labware-category/labware-category.actions';
import {LabwareCategoryState} from '../../../../store/labware-category/labware-category.state';
import {Button} from '../../../common/button/button';
import {AsyncPipe} from '@angular/common';
import {ButtonType} from '../../../../obj/enum/button.enum';

@Component({
  selector: 'chem-labware-category-overview',
  imports: [
    Button,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './labware-category-overview.component.html',
  styleUrl: './labware-category-overview.component.scss',
})
export class LabwareCategoryOverview {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly labwareCategoryService = inject(LabwareCategoryService);

  public readonly labwareCategories$ = this.store.select(LabwareCategoryState.getLabwareCategories);


  editLabwareCategory(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['labware-category', 'edit'], {queryParams: {id}}));
  }

  async deleteLabwareCategory(labwareCategory: LabwareCategoryBean) {
    return await firstValueFrom(this.labwareCategoryService.deleteLabwareCategory$(labwareCategory.id)).then(() => {
      this.store.dispatch(new LabwareCategoryAction.Remove(labwareCategory.id));
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Labware Category "${labwareCategory.name}" deleted successfully.`,
        type: ToastType.SUCCESS,
        duration: 3000
      }))
    })
  }

  navigateToLabwareCategoryCreatePage() {
    return this.router.createUrlTree(['labware-category', 'create']);
  }

  protected readonly ButtonType = ButtonType;
}
