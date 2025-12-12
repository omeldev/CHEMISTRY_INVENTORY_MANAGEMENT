import {SpecifiedHazard} from '../enum/specific-hazard.enum';

export interface ChemicalSubstanceBean {
  id?: number;
  name: string;
  formula?: string;
  casNumber?: string;
  molecularFormula?: string;
  supplier?: string;
  nfpaHealth?: number;
  nfpaFlammability?: number
  nfpaReactivity?: number;
  nfpaSpecifiedHazard?: keyof typeof SpecifiedHazard;
}
