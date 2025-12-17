import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {ChemicalSubstanceEntryBean} from '../../../obj/bean/ChemicalSubstanceEntryBean';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private REST_PREFIX: string = "/inventory";
  private SUBSTANCE_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public createSubstanceEntry$(chemicalSubstanceEntryBean: Partial<ChemicalSubstanceEntryBean>) {
    return this.restService.post$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/create", chemicalSubstanceEntryBean);
  }

  public getAllSubstanceEntries$() {
    return this.restService.get$<ChemicalSubstanceEntryBean[]>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/all");
  }

  public patchSubstanceEntry$(id: number, patchedEntry: Partial<ChemicalSubstanceEntryBean>) {
    return this.restService.patch$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`, patchedEntry);
  }

  public getSubstanceEntry$(id: number) {
    return this.restService.get$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }

  public deleteSubstanceEntry$(id: number) {
    return this.restService.delete$<boolean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }


}
