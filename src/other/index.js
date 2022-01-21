'use strict';

/**
* Copyright (c) 2022 Originforest Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2022-01-21 00:09
* Desc: 
*/

import Vue from "vue";

import videoShow from './videoShow.vue';

// global component.
function injectGlobal() {
  if (injectGlobal.installed) return;
  injectGlobal.installed = true;
  
  Vue.component('ui-video-show', videoShow);
}

injectGlobal();