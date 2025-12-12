import {Unit} from '../enum/unit.enum';

export interface ChemicalSubstanceEntryBean {
  id?: number;
  chemicalSubstanceId?: number;
  addedAt?: string;
  updatedAt?: string;
  quantityBase: number;
  unit: Unit;
  purity: string;
  location: string;
  note: string;
}
