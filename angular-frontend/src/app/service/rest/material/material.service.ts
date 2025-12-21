import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {MaterialBean} from '../../../obj/bean/material.bean';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {

  private readonly REST_PATH = '/material';

  constructor(private readonly restService: RestService) {
  }

  public getMaterialById$(id: number) {
    return this.restService.get$<MaterialBean>(`${this.REST_PATH}/${id}`);
  }

  public getMaterials$() {
    return this.restService.get$<MaterialBean[]>(this.REST_PATH);
  }

  public createMaterial$(material: Partial<MaterialBean>) {
    return this.restService.post$<MaterialBean>(this.REST_PATH, material);
  }

  public updateMaterial$(id: number, material: Partial<MaterialBean>) {
    return this.restService.patch$<MaterialBean>(`${this.REST_PATH}/${id}`, material);
  }

  public deleteMaterial$(id: number) {
    return this.restService.delete$<boolean>(`${this.REST_PATH}/${id}`);
  }

}
