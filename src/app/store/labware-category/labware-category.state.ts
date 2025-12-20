import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {LabwareCategoryAction} from './labware-category.actions';
import {DropdownOption} from '../../components/common/dropdown/dropdown';
import {LabwareCategoryBean} from '../../obj/bean/labware-category.bean';

export interface LabwareCategoryModel {
  labwareCategories: LabwareCategoryBean[];
}

const DEFAULTS: LabwareCategoryModel = {
  labwareCategories: []
}

const LABWARE_CATEGORY_TOKEN = new StateToken<LabwareCategoryModel>('labwarecategory');

@State<LabwareCategoryModel>({
  name: LABWARE_CATEGORY_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class LabwareCategoryState {

  constructor() {
  }

  @Selector()
  static getLabwareCategories(state: LabwareCategoryModel) {
    return state.labwareCategories;
  }

  @Selector()
  static getLabwareCategoryDropdownOptions(state: LabwareCategoryModel): DropdownOption<LabwareCategoryBean>[] {
    return state.labwareCategories.map(labwareCategory => ({
      label: labwareCategory.name,
      value: labwareCategory
    })) || [];
  }

  @Selector()
  static getLabwareCategoryById(state: LabwareCategoryModel) {
    return (id: number) => state.labwareCategories.find(labwareCategory => labwareCategory.id === id);
  }

  @Action(LabwareCategoryAction.Add)
  add(ctx: StateContext<LabwareCategoryModel>, action: LabwareCategoryAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      labwareCategories: [...state.labwareCategories, action.labwareCategory]
    });
  }

  @Action(LabwareCategoryAction.Patch)
  patch(ctx: StateContext<LabwareCategoryModel>, action: LabwareCategoryAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      labwareCategories: state.labwareCategories.map(labwareCategory => labwareCategory.id === action.labwareCategory.id ? {...labwareCategory, ...action.labwareCategory} : labwareCategory)
    });
  }

  @Action(LabwareCategoryAction.Remove)
  remove(ctx: StateContext<LabwareCategoryModel>, action: LabwareCategoryAction.Remove) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      labwareCategories: state.labwareCategories.filter(labwareCategory => labwareCategory.id !== action.id)
    });
  }

  @Action(LabwareCategoryAction.Initialize)
  initialize(ctx: StateContext<LabwareCategoryModel>, action: LabwareCategoryAction.Initialize) {
    ctx.setState({
      labwareCategories: action.labwareCategories
    });
  }

}
