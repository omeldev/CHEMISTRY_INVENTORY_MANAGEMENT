import {ExperimentBean} from '../../obj/bean/ExperimentBean';

export namespace ExperimentAction {

  const PREFIX = '[Experiment]';

  export class Add {
    static readonly type = `${PREFIX} Add item`;

    constructor(readonly experiment: ExperimentBean) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove item`;

    constructor(readonly experimentId: number) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch item`;

    constructor(readonly experimentId: number, readonly patchedExperiment: ExperimentBean) {
    }
  }

  export class Init {
    static readonly type = `${PREFIX} Init items`;

    constructor(readonly experiments: ExperimentBean[]) {
    }
  }
}

