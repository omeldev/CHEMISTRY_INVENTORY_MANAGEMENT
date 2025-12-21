import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {Router, RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ToastAction} from '../../../../store/toast/toast.action';
import {ToastType} from '../../../../obj/bean/toast.bean';
import {LocationService} from '../../../../service/rest/location/location.service';
import {LocationBean} from '../../../../obj/bean/location.bean';
import {LocationAction} from '../../../../store/location/location.actions';
import {LocationState} from '../../../../store/location/location.state';
import {Button} from '../../../common/button/button';
import {AsyncPipe} from '@angular/common';
import {ButtonType} from '../../../../obj/enum/button.enum';

@Component({
  selector: 'chem-location-overview',
  imports: [
    Button,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './location-overview.html',
  styleUrl: './location-overview.scss',
})
export class LocationOverview {

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly locationService = inject(LocationService);

  public readonly locations$ = this.store.select(LocationState.getLocations);


  editLocation(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['location', 'edit'], {queryParams: {id}}));
  }

  async deleteLocation(location: LocationBean) {
    return await firstValueFrom(this.locationService.deleteLocation$(location.id)).then(() => {
      this.store.dispatch(new LocationAction.Remove(location.id));
      this.store.dispatch(new ToastAction.ShowToast({
        message: `Location "${location.name}" deleted successfully.`,
        type: ToastType.SUCCESS,
        duration: 3000
      }))
    })
  }

  navigateToLocationCreatePage() {
    return this.router.createUrlTree(['location', 'create']);
  }

  protected readonly ButtonType = ButtonType;
}
