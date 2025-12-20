import {SupplierBean} from '../../obj/bean/supplier.bean';

export namespace SupplierAction {

  const PREFIX = '[Supplier]';

  export class Add {
    static readonly type = `${PREFIX} Add`;

    constructor(readonly supplier: SupplierBean) {
    }
  }

  export class Patch {
    static readonly type = `${PREFIX} Patch`;

    constructor(readonly supplier: Partial<SupplierBean>) {
    }
  }

  export class Remove {
    static readonly type = `${PREFIX} Remove`;

    constructor(readonly id: number) {
    }
  }

  export class Initialize {
    static readonly type = `${PREFIX} Initialize`;

    constructor(readonly suppliers: SupplierBean[]) {
    }
  }

}
