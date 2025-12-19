import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {LocationAction} from './location.actions';
import {LocationBean} from '../../obj/bean/location.bean';

export interface LocationModel {
  locations: LocationBean[];
}

const DEFAULTS: LocationModel = {
  locations: []
}

const LOCATION_TOKEN = new StateToken<LocationModel>('location');

@State<LocationModel>({
  name: LOCATION_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class LocationState {

  constructor() {
  }

  @Selector()
  static getLocations(state: LocationModel) {
    return state.locations;
  }

  @Action(LocationAction.Add)
  add(ctx: StateContext<LocationModel>, action: LocationAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      locations: [...state.locations, action.location]
    });
  }

  @Action(LocationAction.Patch)
  patch(ctx: StateContext<LocationModel>, action: LocationAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      locations: state.locations.map(material => material.id === action.location.id ? {...material, ...action.location} : material)
    });
  }

  @Action(LocationAction.Initialize)
  initialize(ctx: StateContext<LocationModel>, action: LocationAction.Initialize) {
    ctx.setState({
      locations: action.locations
    });
  }

}
