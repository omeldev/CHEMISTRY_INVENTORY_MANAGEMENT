/**
 import {Injectable} from '@angular/core';
 import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
 import {InventoryAction} from './inventory.actions';
 import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';

 export interface SubstanceModel {
 substances: ChemicalSubstanceEntryBean[];
 }

 const DEFAULTS: SubstanceModel = {
 substances: []
 }

 const SUBSTANCE_TOKEN = new StateToken<SubstanceModel>('inventory');

 @State<SubstanceModel>({
  name: SUBSTANCE_TOKEN,
  defaults: DEFAULTS
  })
 @Injectable()
  export class InventoryState {

 @Selector()
  static getSubstanceEntries(state: SubstanceModel) {
  return state.substances;
  }

 @Selector()
  static getSubstanceEntryById(state: SubstanceModel) {
  return (id: number) => state.substances.find(substance => Number(substance.id) === id);
  }

 @Action(InventoryAction.AddSubstance)
  addSubstance(ctx: StateContext<SubstanceModel>, action: InventoryAction.AddSubstance) {
  const state = ctx.getState();
  ctx.setState({
  substances: [...state.substances, action.substance],
  });
  }

 @Action(InventoryAction.RemoveSubstance)
  removeSubstance(ctx: StateContext<SubstanceModel>, action: InventoryAction.RemoveSubstance) {
  const state = ctx.getState();
  ctx.setState({
  substances: state.substances.filter(substance => Number(substance.id) !== action.substanceId),
  });
  }

 @Action(InventoryAction.InitSubstances)
  initSubstances(ctx: StateContext<SubstanceModel>, action: InventoryAction.InitSubstances) {
  ctx.setState({
  substances: action.substances,
  });
  }
  }

 */
