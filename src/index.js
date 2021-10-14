'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-02 14:52
* Desc: 
*/

import Vue from "vue";
import plugin from './_vue/plugin';
import './libs';
import './base';
import './notice';

export * from './libs';
export * from './form';
export * from './dialog';
export * from './layout';

// bpui plugin.

import bpLibs from '@bpui/libs';
import bpActionsheet from '@bpui/actionsheet';
import bpCheckbox from '@bpui/checkbox';
import bpDialog from '@bpui/dialog';
import bpInput from '@bpui/input';
import bpNavbarView from '@bpui/navbar-view';
import bpPicker from '@bpui/picker';
import bpPopover from '@bpui/popover';
import bpRadio from '@bpui/radio';
import bpSelect from '@bpui/select';
import bpSwitch from '@bpui/switch';
import bpTabbar from '@bpui/tabbar';
import bpTableView from '@bpui/table-view';
import bpUploader from '@bpui/uploader';

// import '../fonts/noto-sans-sc/fout.js';

const INIT_KEY = '$$uiSysInited';

const loadComponents = [
  bpLibs,
  bpActionsheet,
  bpCheckbox,
  bpDialog,
  bpInput,
  bpNavbarView,
  bpPicker,
  bpPopover,
  bpRadio,
  bpSelect,
  bpSwitch,
  bpTabbar,
  bpTableView,
  bpUploader
];

function init() {
  if (window[INIT_KEY]) {
    return;
  }
  window[INIT_KEY] = true;

  // bpui.
  for (let i = 0; i < loadComponents.length; i++) {
    let _de = loadComponents[i];
    if (_de) {
      if (typeof _de.init === 'function') {
        _de.init();
      }
      if (typeof _de.VuePlugin === 'function') {
        Vue.use(_de.VuePlugin());
      }
    }
  }

  // plugin.
  Vue.use(plugin());
}
init();

