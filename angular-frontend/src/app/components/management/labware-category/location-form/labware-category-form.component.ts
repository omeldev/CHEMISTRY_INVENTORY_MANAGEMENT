import {Component, effect, inject, signal} from '@angular/core';
import {Button} from "../../../common/button/button";
import {ButtonType} from '../../../../obj/enum/button.enum';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {firstValueFrom, map} from 'rxjs';
import {LabwareCategoryBean} from '../../../../obj/bean/labware-category.bean';
import {LabwareCategoryService} from '../../../../service/rest/labware/category/labware-category.service';
import {Field, form} from '@angular/forms/signals';
import {LabwareCategoryAction} from '../../../../store/labware-category/labware-category.actions';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';

interface LabwareCategoryFormData {
  name: string
}

@Component({
  selector: 'chem-labware-category-form',
  imports: [
    Button,
    Field
  ],
  templateUrl: './labware-category-form.component.html',
  styleUrl: './labware-category-form.component.scss',
})
export class LabwareCategoryForm {

  protected readonly ButtonType = ButtonType;


  private readonly labwareCategoryFormModel = signal<LabwareCategoryFormData>({
    name: ''
  });

  public readonly labwareCategoryForm = form(this.labwareCategoryFormModel);

  private readonly store = inject(Store);
  private readonly labwareCategoryService = inject(LabwareCategoryService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public labwareCategory = toSignal(
    this.route.data.pipe(map(data => data['labwareCategory'] as LabwareCategoryBean | null)),
    {initialValue: null}
  );

  constructor() {
    effect(() => {
      const labwareCategory = this.labwareCategory();
      if (labwareCategory) {
        this.labwareCategoryFormModel.update(() => ({
          name: labwareCategory.name
        }));
      }
    });
  }


  public async saveLabwareCategory() {
    if (this.route.snapshot.queryParamMap.get('id')) {
      const id = Number(this.route.snapshot.queryParamMap.get('id'));
      return firstValueFrom(this.labwareCategoryService.updateLabwareCategory$(id,
        {
          name: this.labwareCategoryFormModel().name
        })).then((labwareCategory) => {
        if (labwareCategory) {
          this.store.dispatch(new LabwareCategoryAction.Patch(labwareCategory));
          this.store.dispatch(new ToastAction.ShowToast({
            message: `Labware Category "${labwareCategory.name}" updated successfully.`,
            type: ToastType.SUCCESS,
            duration: 3000
          }))
        }
      }).then(() => {
        this.router.navigateByUrl(this.router.createUrlTree(['labware-category', 'overview']));
      })
    }
    return firstValueFrom(this.labwareCategoryService.createLabwareCategory$({
      name: this.labwareCategoryFormModel().name
    })).then((labwareCategory) => {
      if (labwareCategory) {
        this.store.dispatch(new LabwareCategoryAction.Add(labwareCategory));
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Labware Category "${labwareCategory.name}" created successfully.`,
          type: ToastType.SUCCESS,
          duration: 3000
        }))
      }

    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['labware-category', 'overview']));
    })
  }

}
