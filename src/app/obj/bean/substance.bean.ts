import {SpecifiedHazard} from '../enum/specific-hazard.enum';

export interface SubstanceBean {
  id: number;
  name: string;
  formula: string;
  casNumber: string;
  molecularFormula: string;
  supplier: string;
  nfpaHealth: number;
  nfpaFlammability: number
  nfpaReactivity: number;
  nfpaSpecifiedHazard: keyof typeof SpecifiedHazard;
}
