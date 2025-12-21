import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {SubstanceBean} from '../../obj/bean/substance.bean';
import {SubstanceAction} from './substance.actions';
import {DropdownOption} from '../../components/common/dropdown/dropdown';

export interface SubstanceModel {
  substances: SubstanceBean[];
}

const DEFAULTS: SubstanceModel = {
  substances: []
}

const SUBSTANCE_TOKEN = new StateToken<SubstanceModel>('substance');

@State<SubstanceModel>({
  name: SUBSTANCE_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class SubstanceState {

  @Selector()
  static getSubstances(state: SubstanceModel) {
    return state.substances;
  }

  @Selector()
  static getSubstanceById(state: SubstanceModel) {
    return (id: number) => state.substances.find(substance => Number(substance.id) === id);
  }

  @Selector()
  static entitiesMap(state: SubstanceModel): Record<number, SubstanceBean> {
    return Object.fromEntries(
      state.substances.map(s => [s.id, s])
    );
  }

  @Selector()
  static getSubstancesAsDropdownOptions(state: SubstanceModel): DropdownOption<SubstanceBean>[] {
    return state.substances.map(substance => ({
      label: substance.name,
      value: substance,
    }));
  }

  @Action(SubstanceAction.Add)
  addSubstance(ctx: StateContext<SubstanceModel>, action: SubstanceAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      substances: [...state.substances, action.substance],
    });
  }

  @Action(SubstanceAction.Remove)
  removeSubstance(ctx: StateContext<SubstanceModel>, action: SubstanceAction.Remove) {
    const state = ctx.getState();
    ctx.setState({
      substances: state.substances.filter(substance => Number(substance.id) !== action.substanceId),
    });
  }

  @Action(SubstanceAction.Patch)
  patchSubstance(ctx: StateContext<SubstanceModel>, action: SubstanceAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      substances: state.substances.map(substance =>
        Number(substance.id) === action.substanceId ? action.patchedSubstance : substance
      ),
    });
  }

  @Action(SubstanceAction.Init)
  initSubstances(ctx: StateContext<SubstanceModel>, action: SubstanceAction.Init) {
    ctx.setState({
      substances: action.substances,
    });
  }
}

