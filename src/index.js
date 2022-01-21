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
export * from './other';

// bpui plugin.
import "bpui.js";
import bpui_static from './static';

// import '../fonts/noto-sans-sc/fout.js';

const INIT_KEY = '$$$uiSysInited';

function init() {
  if (window[INIT_KEY]) {
    return;
  }
  window[INIT_KEY] = true;
  
  bpui_static();
  // plugin.
  Vue.use(plugin());
}
init();

