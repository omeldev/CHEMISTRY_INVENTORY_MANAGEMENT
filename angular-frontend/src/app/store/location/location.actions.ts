import {LocationBean} from '../../obj/bean/location.bean';

export namespace LocationAction {

  const PREFIX = '[Location]';

  export class Add {
    static readonly type = `${PREFIX} Add`;

    constructor(readonly location: LocationBean) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch`;

    constructor(readonly location: Partial<LocationBean>) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove`;

    constructor(readonly id: number) {
    }
  }

  export class Initialize {
    static readonly type = `${PREFIX} Initialize`;

    constructor(readonly locations: LocationBean[]) {
    }
  }

}
