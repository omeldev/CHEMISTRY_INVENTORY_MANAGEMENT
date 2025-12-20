import {Component, effect, inject, signal} from '@angular/core';
import {Button} from "../../../common/button/button";
import {ButtonType} from '../../../../obj/enum/button.enum';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {firstValueFrom, map} from 'rxjs';
import {Field, form} from '@angular/forms/signals';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';
import {SupplierService} from '../../../../service/rest/supplier/supplier.service';
import {SupplierAction} from '../../../../store/supplier/supplier.actions';
import {SupplierBean} from '../../../../obj/bean/supplier.bean';

interface SupplierFormData {
  name: string
  url: string
}

@Component({
  selector: 'chem-location-form',
  imports: [
    Button,
    Field
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss',
})
export class SupplierForm {

  protected readonly ButtonType = ButtonType;


  private readonly supplierFormModel = signal<SupplierFormData>({
    name: '',
    url: ''
  });

  public readonly supplierForm = form(this.supplierFormModel);

  private readonly store = inject(Store);
  private readonly supplierService = inject(SupplierService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public supplier = toSignal(
    this.route.data.pipe(map(data => data['supplier'] as SupplierBean | null)),
    {initialValue: null}
  );

  constructor() {
    effect(() => {
      const supplier = this.supplier();
      if (supplier) {
        this.supplierFormModel.update(() => ({
          name: supplier.name,
          url: supplier.url
        }));
      }
    });
  }


  public async saveSupplier() {
    if (this.route.snapshot.queryParamMap.get('id')) {
      const id = Number(this.route.snapshot.queryParamMap.get('id'));
      return firstValueFrom(this.supplierService.updateSupplier$(id,
        {
          name: this.supplierFormModel().name,
          url: this.supplierFormModel().url
        })).then((supplier) => {
        if (supplier) {
          this.store.dispatch(new SupplierAction.Patch(supplier));
          this.store.dispatch(new ToastAction.ShowToast({
            message: `Supplier "${supplier.name}" updated successfully.`,
            type: ToastType.SUCCESS,
            duration: 3000
          }))
        }
      }).then(() => {
        this.router.navigateByUrl(this.router.createUrlTree(['supplier', 'overview']));
      })
    }
    return firstValueFrom(this.supplierService.createSupplier$({
      name: this.supplierFormModel().name,
      url: this.supplierFormModel().url
    })).then((location) => {
      if (location) {
        this.store.dispatch(new SupplierAction.Add(location));
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Supplier "${location.name}" created successfully.`,
          type: ToastType.SUCCESS,
          duration: 3000
        }))
      }

    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['supplier', 'overview']));
    })
  }

}
