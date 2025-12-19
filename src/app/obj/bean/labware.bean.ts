import {LabwareCondition} from '../enum/condition.enum';
import {Unit} from '../enum/unit.enum';

export interface Labware {
  id: number;
  name: string;
  condition: LabwareCondition;
  note: string;
  nextInspectionDate: Date;
  lastInspectionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  weightUnit: Unit;
  materialId: number;           // optional, kann auch nur materialId sein
  locationId: number;           // optional, kann auch nur locationId sein
  volume: number;
  volumeUnit: Unit;
  labwareCategoryId: number; // optional, Kategorie-Objekt oder Id
}
