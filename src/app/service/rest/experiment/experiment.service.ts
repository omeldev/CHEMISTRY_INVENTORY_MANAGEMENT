import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {Observable} from 'rxjs';
import {ExperimentBean} from '../../../obj/bean/experiment.bean';

@Injectable({
  providedIn: 'root',
})
export class ExperimentService {

  public REST_PREFIX: string = "/experiment";

  constructor(private readonly restService: RestService) {
  }

  public createExperiment$(experiment: Partial<ExperimentBean>): Observable<ExperimentBean | null> {
    return this.restService.post$<ExperimentBean>(this.REST_PREFIX, experiment);
  }

  public getExperiment$(id: number): Observable<ExperimentBean | null> {
    return this.restService.get$<ExperimentBean>(this.REST_PREFIX + `/${id}/`);
  }

  public getAllExperiments$(): Observable<ExperimentBean[] | null> {
    return this.restService.get$<ExperimentBean[]>(this.REST_PREFIX);
  }

  public finalizeExperiment$(id: number): Observable<boolean | null> {
    return this.restService.put$<boolean>(this.REST_PREFIX + `/${id}/finalize`, true);
  }

}
