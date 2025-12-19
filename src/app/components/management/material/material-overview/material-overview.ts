import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {MaterialState} from '../../../../store/material/material.state';
import {AsyncPipe} from '@angular/common';
import {ButtonType} from '../../../../obj/enum/button.enum';
import {Button} from '../../../common/button/button';
import {Router, RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {MaterialService} from '../../../../service/rest/material/material.service';
import {MaterialAction} from '../../../../store/material/material.actions';
import {MaterialBean} from '../../../../obj/bean/material.bean';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';

@Component({
  selector: 'chem-material-overview',
  imports: [
    AsyncPipe,
    Button,
    RouterLink
  ],
  templateUrl: './material-overview.html',
  styleUrl: './material-overview.scss',
})
export class MaterialOverview {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly materialService = inject(MaterialService);

  public readonly materials$ = this.store.select(MaterialState.getMaterials);

  protected readonly ButtonType = ButtonType;

  editMaterial(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['material', 'edit'], {queryParams: {id}}));
  }

  async deleteMaterial(material: MaterialBean) {
    return await firstValueFrom(this.materialService.deleteMaterial$(material.id)).then(() => {
      this.store.dispatch(new MaterialAction.Remove(material.id));
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Material "${material.name}" deleted successfully.`,
        type: ToastType.SUCCESS,
        duration: 3000
      }))
    })
  }

  navigateToSubstanceCreatePage() {
    return this.router.createUrlTree(['material', 'create']);
  }
}
