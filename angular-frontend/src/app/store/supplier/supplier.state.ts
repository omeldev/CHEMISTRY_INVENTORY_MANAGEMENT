import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {SupplierAction} from './supplier.actions';
import {DropdownOption} from '../../components/common/dropdown/dropdown';
import {SupplierBean} from '../../obj/bean/supplier.bean';

export interface SupplierModel {
  suppliers: SupplierBean[];
}

const DEFAULTS: SupplierModel = {
  suppliers: []
}

const SUPPLIER_TOKEN = new StateToken<SupplierModel>('supplier');

@State<SupplierModel>({
  name: SUPPLIER_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class SupplierState {

  constructor() {
  }

  @Selector()
  static getSuppliers(state: SupplierModel) {
    return state.suppliers;
  }

  @Selector()
  static getSupplierDropdownOptions(state: SupplierModel): DropdownOption<SupplierBean>[] {
    return state.suppliers.map(supplier => ({
      label: supplier.name,
      value: supplier
    })) || [];
  }

  @Selector()
  static getSupplierById(state: SupplierModel) {
    return (id: number) => state.suppliers.find(supplier => supplier.id === id);
  }

  @Action(SupplierAction.Add)
  add(ctx: StateContext<SupplierModel>, action: SupplierAction.Add) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      suppliers: [...state.suppliers, action.supplier]
    });
  }

  @Action(SupplierAction.Patch)
  patch(ctx: StateContext<SupplierModel>, action: SupplierAction.Patch) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      suppliers: state.suppliers.map(material => material.id === action.supplier.id ? {...material, ...action.supplier} : material)
    });
  }

  @Action(SupplierAction.Remove)
  remove(ctx: StateContext<SupplierModel>, action: SupplierAction.Remove) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      suppliers: state.suppliers.filter(supplier => supplier.id !== action.id)
    });
  }

  @Action(SupplierAction.Initialize)
  initialize(ctx: StateContext<SupplierModel>, action: SupplierAction.Initialize) {
    ctx.setState({
      suppliers: action.suppliers
    });
  }

}
