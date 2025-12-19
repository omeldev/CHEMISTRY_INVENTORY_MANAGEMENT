import {Component, effect, inject, signal} from '@angular/core';
import {Button} from "../../../common/button/button";
import {ButtonType} from '../../../../obj/enum/button.enum';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {firstValueFrom, map} from 'rxjs';
import {MaterialBean} from '../../../../obj/bean/material.bean';
import {LocationService} from '../../../../service/rest/location/location.service';
import {Field, form} from '@angular/forms/signals';
import {LocationAction} from '../../../../store/location/location.actions';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';

interface LocationFormData {
  name: string
}

@Component({
  selector: 'chem-location-form',
  imports: [
    Button,
    Field
  ],
  templateUrl: './location-form.html',
  styleUrl: './location-form.scss',
})
export class LocationForm {

  protected readonly ButtonType = ButtonType;


  private readonly locationFormModel = signal<LocationFormData>({
    name: ''
  });

  public readonly locationForm = form(this.locationFormModel);

  private readonly store = inject(Store);
  private readonly locationService = inject(LocationService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public location = toSignal(
    this.route.data.pipe(map(data => data['location'] as MaterialBean | null)),
    {initialValue: null}
  );

  constructor() {
    effect(() => {
      const location = this.location();
      if (location) {
        this.locationFormModel.update(() => ({
          name: location.name
        }));
      }
    });
  }


  public async saveLocation() {
    if (this.route.snapshot.queryParamMap.get('id')) {
      const id = Number(this.route.snapshot.queryParamMap.get('id'));
      return firstValueFrom(this.locationService.updateLocation$(id,
        {
          name: this.locationFormModel().name
        })).then((location) => {
        if (location) {
          this.store.dispatch(new LocationAction.Patch(location));
          this.store.dispatch(new ToastAction.ShowToast({
            message: `Location "${location.name}" updated successfully.`,
            type: ToastType.SUCCESS,
            duration: 3000
          }))
        }
      }).then(() => {
        this.router.navigateByUrl(this.router.createUrlTree(['location', 'overview']));
      })
    }
    return firstValueFrom(this.locationService.createLocation$({
      name: this.locationFormModel().name
    })).then((location) => {
      if (location) {
        this.store.dispatch(new LocationAction.Add(location));
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Location "${location.name}" created successfully.`,
          type: ToastType.SUCCESS,
          duration: 3000
        }))
      }

    }).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['location', 'overview']));
    })
  }

}
