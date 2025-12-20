import {LabwareCategoryBean} from '../../obj/bean/labware-category.bean';

export namespace LabwareCategoryAction {

  const PREFIX = '[Labware Category]';

  export class Add {
    static readonly type = `${PREFIX} Add`;

    constructor(readonly labwareCategory: LabwareCategoryBean) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch`;

    constructor(readonly labwareCategory: Partial<LabwareCategoryBean>) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove`;

    constructor(readonly id: number) {
    }
  }

  export class Initialize {
    static readonly type = `${PREFIX} Initialize`;

    constructor(readonly labwareCategories: LabwareCategoryBean[]) {
    }
  }

}
