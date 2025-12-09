import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';

export namespace SubstanceAction {

  const PREFIX = '[Substance]';

  export class Add {
    static readonly type = `${PREFIX} Add item`;

    constructor(readonly substance: ChemicalSubstanceBean) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove item`;

    constructor(readonly substanceId: number) {
    }
  }

  export class Init {
    static readonly type = `${PREFIX} Init items`;

    constructor(readonly substances: ChemicalSubstanceBean[]) {
    }
  }
}
