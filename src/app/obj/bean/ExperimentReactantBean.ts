import {Unit} from '../enum/unit.enum';

export interface ExperimentReactantBean {
  id?: number;
  substanceEntryId: number;
  quantity: number;
  unit: Unit;
}
