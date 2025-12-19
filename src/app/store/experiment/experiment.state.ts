import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {ExperimentAction} from './experiment.actions';
import {ExperimentBean} from '../../obj/bean/experiment.bean';

export interface ExperimentModel {
  experiments: ExperimentBean[];
}

const DEFAULTS: ExperimentModel = {
  experiments: []
}

const EXPERIMENT_TOKEN = new StateToken<ExperimentModel>('experiment');

@State<ExperimentModel>({
  name: EXPERIMENT_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class ExperimentState {

  @Selector()
  static getExperiments(state: ExperimentModel) {
    return state.experiments;
  }

  @Selector()
  static getExperimentById(state: ExperimentModel) {
    return (id: number) => state.experiments.find(experiment => Number(experiment.id) === id);
  }

  @Selector()
  static entitiesMap(state: ExperimentModel): Record<number, ExperimentBean> {
    return Object.fromEntries(
      state.experiments.map(s => [s.id, s])
    );
  }

  @Action(ExperimentAction.Add)
  addExperiment(ctx: StateContext<ExperimentModel>, action: ExperimentAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      experiments: [...state.experiments, action.experiment],
    });
  }

  @Action(ExperimentAction.Remove)
  removeExperiment(ctx: StateContext<ExperimentModel>, action: ExperimentAction.Remove) {
    const state = ctx.getState();
    ctx.setState({
      experiments: state.experiments.filter(substance => Number(substance.id) !== action.experimentId),
    });
  }

  @Action(ExperimentAction.Patch)
  patchExperiments(ctx: StateContext<ExperimentModel>, action: ExperimentAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      experiments: state.experiments.map(experiment =>
        Number(experiment.id) === action.experimentId ? action.patchedExperiment : experiment
      ),
    });
  }

  @Action(ExperimentAction.Init)
  initExperiments(ctx: StateContext<ExperimentModel>, action: ExperimentAction.Init) {
    ctx.setState({
      experiments: action.experiments,
    });
  }
}

