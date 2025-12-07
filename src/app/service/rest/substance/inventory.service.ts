import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {ChemicalSubstanceEntryBean} from '../../../obj/bean/ChemicalSubstanceEntryBean';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  public REST_PREFIX: string = "/inventory";
  public SUBSTANCE_PREFIX: string = "/substance";

  constructor(private readonly restService: RestService) {
  }

  public createSubstanceInventoryEntry$(chemicalSubstanceEntryBean: ChemicalSubstanceEntryBean) {
    return this.restService.post$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/create", chemicalSubstanceEntryBean);
  }

  public getAllSubstanceInventoryEntries$() {
    return this.restService.get$<ChemicalSubstanceEntryBean[]>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + "/all");
  }

  public patchSubstanceInventoryEntry$(id: number, patchedEntry: ChemicalSubstanceEntryBean) {
    return this.restService.patch$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`, patchedEntry);
  }

  public getSubstanceInventoryEntry$(id: number) {
    return this.restService.get$<ChemicalSubstanceEntryBean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }

  public deleteSubstanceInventoryEntry$(id: number) {
    return this.restService.delete$<boolean>(this.REST_PREFIX + this.SUBSTANCE_PREFIX + `/${id}/`);
  }


}
