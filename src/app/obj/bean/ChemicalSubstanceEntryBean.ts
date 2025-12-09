import {Unit} from '../enum/unit.enum';

export interface ChemicalSubstanceEntryBean {
  id?: string;
  chemicalSubstanceId?: string;
  addedAt?: string;
  updatedAt?: string;
  quantityBase: number;
  unit: Unit;
  purity: string;
  location: string;
  note: string;
}
