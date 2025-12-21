import {ToastBean} from '../../obj/bean/toast.bean';

export namespace ToastAction {
  const PREFIX = '[Toast]';

  export class ShowToast {

    public static readonly type = `${PREFIX} Show Toast`;

    constructor(public readonly toast: ToastBean) {
    }
  }

  export class RemoveToast {

    public static readonly type = `${PREFIX} Remove Toast`;

    constructor(public readonly toastId: string) {
    }
  }

}
