
import Vue from "vue";
import { UIIcon } from './icon';
import bpLibs from '@bpui/libs';

// global component.
function injectGlobal() {
  if (injectGlobal.installed)
    return;
  
  Vue.component('ui-icon', UIIcon);

  /**
   * 注册图标.
   */
  bpLibs.icons.registerFontIcon('ui-alert', 'ui-iconAlert', 'ui-icon');
  bpLibs.icons.registerFontIcon('ui-warning', 'ui-iconWarning', 'ui-icon');

  injectGlobal.installed = true;
}
injectGlobal();
