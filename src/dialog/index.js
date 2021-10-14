
import Vue from "vue";
import * as febs from 'febs-browser';

import * as dialog from './dialog';
import * as popover from './popover';

export * from './actionsheet';
export * from './popover';
export * from './dialog';

// global component.
function injectGlobal() {
  if (injectGlobal.installed)
    return;

  Vue.component('ui-dialog', dialog.UIDialog);
  Vue.component('ui-popover', popover.UIPopover);
  Vue.component('ui-popover-cell', popover.UIPopoverCell);
  
  injectGlobal.installed = true;
}
injectGlobal();
