import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {SupplierBean} from '../../../obj/bean/supplier.bean';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  private readonly REST_PATH = '/supplier';

  constructor(private readonly restService: RestService) {
  }

  public getSupplierById$(id: number) {
    return this.restService.get$<SupplierBean>(`${this.REST_PATH}/${id}`);
  }

  public getSuppliers$() {
    return this.restService.get$<SupplierBean[]>(this.REST_PATH);
  }

  public createSupplier$(supplier: Partial<SupplierBean>) {
    return this.restService.post$<SupplierBean>(this.REST_PATH, supplier);
  }

  public updateSupplier$(id: number, supplier: Partial<SupplierBean>) {
    return this.restService.patch$<SupplierBean>(`${this.REST_PATH}/${id}`, supplier);
  }

  public deleteSupplier$(id: number) {
    return this.restService.delete$<boolean>(`${this.REST_PATH}/${id}`);
  }

}
