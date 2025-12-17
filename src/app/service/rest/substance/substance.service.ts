import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubstanceService {

  private REST_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public create$(substance: Partial<ChemicalSubstanceBean>): Observable<ChemicalSubstanceBean | null> {
    return this.restService.post$<ChemicalSubstanceBean>(this.REST_PREFIX, substance);
  }

  public getAll$() {
    return this.restService.get$<ChemicalSubstanceBean[]>(this.REST_PREFIX);
  }

  public getById$(id: number) {
    return this.restService.get$<ChemicalSubstanceBean>(this.REST_PREFIX + `/${id}/`);
  }

  public patch$(id: number, patchedSubstance: Partial<ChemicalSubstanceBean>): Observable<ChemicalSubstanceBean | null> {
    return this.restService.patch$<ChemicalSubstanceBean>(this.REST_PREFIX + `/${id}/`, patchedSubstance);
  }

}
