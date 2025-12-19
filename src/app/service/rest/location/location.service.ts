import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {LocationBean} from '../../../obj/bean/location.bean';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private readonly REST_PATH = '/location';

  constructor(private readonly restService: RestService) {
  }

  public getLocationById$(id: number) {
    return this.restService.get$<LocationBean>(`${this.REST_PATH}/${id}`);
  }

  public getLocations$() {
    return this.restService.get$<LocationBean[]>(this.REST_PATH);
  }

  public createLocation$(location: Partial<LocationBean>) {
    return this.restService.post$<LocationBean>(this.REST_PATH, location);
  }

  public updateLocation$(id: number, location: Partial<LocationBean>) {
    return this.restService.put$<LocationBean>(`${this.REST_PATH}/${id}`, location);
  }

}
