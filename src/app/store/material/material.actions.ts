import {MaterialBean} from '../../obj/bean/material.bean';

export namespace MaterialAction {

  const PREFIX = '[Material]';

  export class Add {
    static readonly type = `${PREFIX} Add`;

    constructor(readonly material: MaterialBean) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove`;

    constructor(readonly id: number) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch`;

    constructor(readonly material: Partial<MaterialBean>) {
    }
  }

  export class Initialize {
    static readonly type = `${PREFIX} Initialize`;

    constructor(readonly materials: MaterialBean[]) {
    }
  }

}
