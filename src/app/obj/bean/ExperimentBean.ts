import {ExperimentReactantBean} from './ExperimentReactantBean';

export interface ExperimentBean {
  id?: string;
  title: string;
  finalized?: boolean;
  note: string;
  created?: string;
  reactants: ExperimentReactantBean[];
}
