import {ExperimentReactantBean} from './experiment-reactant.bean';

export interface ExperimentBean {
  id: number;
  title: string;
  finalized: boolean;
  note: string;
  created: string;
  reactants: ExperimentReactantBean[];
}
