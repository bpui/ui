
import Vue from "vue";
import * as febs from 'febs-browser';

import * as dialog from './dialog';

export * from './actionsheet';
export * from './popover';
export * from './dialog';

// global component.
function injectGlobal() {
  if (injectGlobal.installed)
    return;

  Vue.component('ui-dialog', dialog.UIDialog);
  
  injectGlobal.installed = true;
}
injectGlobal();
