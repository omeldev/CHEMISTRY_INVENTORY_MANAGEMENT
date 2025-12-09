import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';
import {SubstanceAction} from './substance.actions';

export interface SubstanceModel {
  substances: ChemicalSubstanceBean[];
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

  @Action(SubstanceAction.Init)
  initSubstances(ctx: StateContext<SubstanceModel>, action: SubstanceAction.Init) {
    ctx.setState({
      substances: action.substances,
    });
  }
}
