import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {ChemicalSubstanceBean} from '../../../obj/bean/ChemicalSubstanceBean';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubstanceService {

  public REST_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public createSubstance$(substance: ChemicalSubstanceBean): Observable<ChemicalSubstanceBean | null> {
    return this.restService.post$<ChemicalSubstanceBean>(this.REST_PREFIX + "/create", substance);
  }

  public getAllSubstances$() {
    return this.restService.get$<ChemicalSubstanceBean[]>(this.REST_PREFIX + "/all");
  }

  public getSubstance$(id: number) {
    return this.restService.get$<ChemicalSubstanceBean>(this.REST_PREFIX + `/${id}/`);
  }

  public patchSubstance$(id: number, patchedSubstance: ChemicalSubstanceBean): Observable<ChemicalSubstanceBean | null> {
    return this.restService.patch$<ChemicalSubstanceBean>(this.REST_PREFIX + `/${id}/`, patchedSubstance);
  }

}
