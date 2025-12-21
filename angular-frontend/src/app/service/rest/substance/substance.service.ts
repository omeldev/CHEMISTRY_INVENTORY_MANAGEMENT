import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {SubstanceBean} from '../../../obj/bean/substance.bean';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubstanceService {

  private REST_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public create$(substance: Partial<SubstanceBean>): Observable<SubstanceBean | null> {
    return this.restService.post$<SubstanceBean>(this.REST_PREFIX, substance);
  }

  public getAll$() {
    return this.restService.get$<SubstanceBean[]>(this.REST_PREFIX);
  }

  public getById$(id: number) {
    return this.restService.get$<SubstanceBean>(this.REST_PREFIX + `/${id}/`);
  }

  public patch$(id: number, patchedSubstance: Partial<SubstanceBean>): Observable<SubstanceBean | null> {
    return this.restService.patch$<SubstanceBean>(this.REST_PREFIX + `/${id}/`, patchedSubstance);
  }

}
