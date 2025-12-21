import {Injectable} from '@angular/core';
import {RestService} from '../../rest.service';
import {LabwareCategoryBean} from '../../../../obj/bean/labware-category.bean';

@Injectable({
  providedIn: 'root',
})
export class LabwareCategoryService {

  private REST_PATH = '/labwarecategory';

  constructor(private readonly restService: RestService) {

  }

  public getLabwareCategories$() {
    return this.restService.get$<LabwareCategoryBean[]>(this.REST_PATH);
  }

  public getLabwareCategoryById$(id: number) {
    return this.restService.get$<LabwareCategoryBean>(`${this.REST_PATH}/${id}`);
  }

  public createLabwareCategory$(category: Partial<LabwareCategoryBean>) {
    return this.restService.post$<LabwareCategoryBean>(this.REST_PATH, category);
  }

  public updateLabwareCategory$(id: number, category: Partial<LabwareCategoryBean>) {
    return this.restService.patch$<LabwareCategoryBean>(`${this.REST_PATH}/${id}`, category);
  }

  public deleteLabwareCategory$(id: number) {
    return this.restService.delete$<boolean>(`${this.REST_PATH}/${id}`);
  }

}
