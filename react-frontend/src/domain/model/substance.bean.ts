import {SpecifiedHazard} from '../enum/specific-hazard.enum';

export interface SubstanceBean {
  id: number;
  name: string;
  formula: string;
  casNumber: string;
  molecularFormula: string;
  supplierId: number;
  nfpaHealth: number;
  nfpaFlammability: number
  nfpaReactivity: number;
  nfpaSpecifiedHazard: SpecifiedHazard;
}
