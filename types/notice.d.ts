
import bpDialog from '@bpui/dialog';

declare global {

  /**
   * @desc toast.
   */
  function $UIToast(cfg: string | {
      content  : string|any,
      type     ?: 'success'|'error'|'info'|'alert'|'notification',  // default = info.
      duration ?: number, // default = 3000
  }):Promise<void>;
  /**
   * @desc alert对话框.
   */
  const $UIAlert: typeof bpDialog.apiWidget.showAlert;
  /**
   * @desc confirm对话框
   */
  const $UIConfirm: typeof bpDialog.apiWidget.showConfirm;
  const $UIConfirmHide: typeof bpDialog.apiWidget.hideConfirm;
  /**
   * @desc loading
   */
  const $UILoading: typeof bpDialog.apiWidget.showLoading;
  const $UILoadingHide: typeof bpDialog.apiWidget.hideLoading;
}