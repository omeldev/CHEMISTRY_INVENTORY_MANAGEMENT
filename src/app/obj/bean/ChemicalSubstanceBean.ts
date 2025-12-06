export interface ChemicalSubstanceBean {
  id?: string;
  name: string;
  formula?: string;
  casNumber?: string;
  molecularFormula?: string;
  supplier?: string;
  nfpaHealth?: number;
  nfpaFlammability?: number
  nfpaReactivity?: number;
  nfpaSpecifiedHazard?: string;
}
