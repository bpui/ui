'use strict';

/**
* Copyright (c) 2021 bp Co.,Ltd. All Rights Reserved.
* Author: brian.li
* Date: 2021-08-30 14:54
* Desc: 
*/


import Vue from "vue";
import libs from '@bpui/libs';
var Components = require('bpui.js/src/static/bpui.components');
var componentInstance = require('bpui.js/src/static/componentInstance');

var SymComponentStaticInit = ('$BpSymComponentStaticInit');

export default function init() {

  if (window[SymComponentStaticInit]) {
    return;
  }

  window[SymComponentStaticInit] = true;

  // 加载必须加载的库.
  // (function() { require('@bpui/libs/style/class.scss') })();
  // (function() { require('@bpui/button/style/_index.scss') })();

  // 需要注册.
  Vue.use(libs.VuePlugin());

  var loadComponents = [] ;
  var components = [];
  for (var i = 0; i < Components.length; i++) {
    var element = Components[i];
    components.push(element.name);

    var com = componentInstance.getComponent(element.name);
    if (com) {
      loadComponents.push(com);
    }
  }

  for (var i = 0; i < loadComponents.length; i++) {
    var _de = loadComponents[i].default || loadComponents[i];
    if (_de) {
      if (typeof _de.init === 'function') {
        _de.init();
      }
      if (typeof _de.VuePlugin === 'function') {
        Vue.use(_de.VuePlugin());
      }
    }
  }
}
