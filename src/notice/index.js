

import bpui from '@bpui/dialog';
import { toast } from './toast';

function i18n(key, defaultWord) {
  let r = window['$UILangI18n'];
  return r ? r[key] : defaultWord;
}

//--------------------------------------------------------
// confirm
//--------------------------------------------------------

window['$UIConfirm'] = function (cfg) {
  cfg = cfg || {};
  if (typeof cfg === 'string') {
    cfg = {
      content: cfg
    }
  }
  if (!cfg.okText) {
    cfg.okText = i18n('common.确认', '确认');
  }
  if (!cfg.cancelText) {
    cfg.cancelText = i18n('common.取消', '取消');
  }

  return bpui.apiWidget.showConfirm(cfg);
}

window['$UIConfirmHide'] = bpui.apiWidget.hideConfirm;

//--------------------------------------------------------
// alert
//--------------------------------------------------------

window['$UIAlert'] = function (cfg) {
  cfg = cfg || {};
  if (typeof cfg === 'string') {
    cfg = {
      content: cfg
    }
  }
  if (!cfg.okText) {
    cfg.okText = i18n('common.确认', '确认');
  }

  return bpui.apiWidget.showAlert(cfg);
}

//--------------------------------------------------------
// loading.
//--------------------------------------------------------

window['$UILoading'] = bpui.apiWidget.showLoading;
window['$UILoadingHide'] = bpui.apiWidget.hideLoading;


//--------------------------------------------------------
// toast
//--------------------------------------------------------

window['$UIToast'] = toast;