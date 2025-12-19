import {Component, effect, inject, signal} from '@angular/core';
import {Button} from '../../../common/button/button';
import {ButtonType} from '../../../../obj/enum/button.enum';
import {Field, form} from '@angular/forms/signals';
import {Store} from '@ngxs/store';
import {MaterialService} from '../../../../service/rest/material/material.service';
import {firstValueFrom, map} from 'rxjs';
import {MaterialAction} from '../../../../store/material/material.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {MaterialBean} from '../../../../obj/bean/material.bean';

interface MaterialFormData {
  name: string
}

@Component({
  selector: 'chem-material',
  imports: [
    Button,
    Field
  ],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss',
})
export class MaterialForm {

  protected readonly ButtonType = ButtonType;

  private readonly materialFormModel = signal<MaterialFormData>({
    name: ''
  });

  public readonly materialForm = form(this.materialFormModel);

  private readonly store = inject(Store);
  private readonly materialService = inject(MaterialService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public chemicalSubstance = toSignal(
    this.route.data.pipe(map(data => data['material'] as MaterialBean | null)),
    {initialValue: null}
  );

  constructor() {
    effect(() => {
      const material = this.chemicalSubstance();
      if (material) {
        this.materialFormModel.update(() => ({
          name: material.name
        }));
      }
    });
  }


  public async saveMaterial() {
    if (this.route.snapshot.queryParamMap.get('id')) {
      const id = Number(this.route.snapshot.queryParamMap.get('id'));
      return firstValueFrom(this.materialService.updateMaterial$(id, {
        name: this.materialFormModel().name
      })).then((material) => {
        if (material)
          this.store.dispatch(new MaterialAction.Patch(material));
      }).then(() => {
        this.router.navigateByUrl(this.router.createUrlTree(['material', 'overview']));
      })
    }
    return firstValueFrom(this.materialService.createMaterial$({
      name: this.materialFormModel().name
    })).then((material) => {
      if (material)
        this.store.dispatch(new MaterialAction.Add(material));
    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['material', 'overview']));
    })
  }
}
