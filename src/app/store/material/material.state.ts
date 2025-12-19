import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {MaterialAction} from './material.actions';
import {MaterialBean} from '../../obj/bean/material.bean';

export interface MaterialModel {
  materials: MaterialBean[];
}

const DEFAULTS: MaterialModel = {
  materials: []
}

const MATERIAL_TOKEN = new StateToken<MaterialModel>('material');

@State<MaterialModel>({
  name: MATERIAL_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class MaterialState {

  constructor() {
  }

  @Selector()
  static getMaterials(state: MaterialModel) {
    return state.materials;
  }

  @Selector()
  static getMaterialById(state: MaterialModel) {
    return (id: number) => state.materials.find(material => material.id === id);
  }

  @Action(MaterialAction.Add)
  add(ctx: StateContext<MaterialModel>, action: MaterialAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      materials: [...state.materials, action.material]
    });
  }

  @Action(MaterialAction.Patch)
  patch(ctx: StateContext<MaterialModel>, action: MaterialAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      materials: state.materials.map(material => material.id === action.material.id ? {...material, ...action.material} : material)
    });
  }

  @Action(MaterialAction.Remove)
  remove(ctx: StateContext<MaterialModel>, action: MaterialAction.Remove) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      materials: state.materials.filter(material => material.id !== action.id)
    });
  }

  @Action(MaterialAction.Initialize)
  initialize(ctx: StateContext<MaterialModel>, action: MaterialAction.Initialize) {
    ctx.setState({
      materials: action.materials
    });
  }

}
