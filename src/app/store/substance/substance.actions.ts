import {SubstanceBean} from '../../obj/bean/substance.bean';

export namespace SubstanceAction {

  const PREFIX = '[Substance]';

  export class Add {
    static readonly type = `${PREFIX} Add item`;

    constructor(readonly substance: SubstanceBean) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove item`;

    constructor(readonly substanceId: number) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch item`;

    constructor(readonly substanceId: number, readonly patchedSubstance: SubstanceBean) {
    }
  }

  export class Init {
    static readonly type = `${PREFIX} Init items`;

    constructor(readonly substances: SubstanceBean[]) {
    }
  }
}

