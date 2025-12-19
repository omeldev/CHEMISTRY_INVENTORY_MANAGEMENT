import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {SubstanceEntryBean} from '../../../obj/bean/substance-entry.bean';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  private REST_PREFIX: string = "/inventory";
  private SUBSTANCE_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public createSubstanceEntry$(chemicalSubstanceEntryBean: Partial<SubstanceEntryBean>) {
    return this.restService.post$<SubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/create", chemicalSubstanceEntryBean);
  }

  public getAllSubstanceEntries$() {
    return this.restService.get$<SubstanceEntryBean[]>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/all");
  }

  public patchSubstanceEntry$(id: number, patchedEntry: Partial<SubstanceEntryBean>) {
    return this.restService.patch$<SubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`, patchedEntry);
  }

  public getSubstanceEntry$(id: number) {
    return this.restService.get$<SubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }

  public deleteSubstanceEntry$(id: number) {
    return this.restService.delete$<boolean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }


}
