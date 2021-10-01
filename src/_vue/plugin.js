'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-02 15:00
* Desc: 
*/


export let _Vue

function install(vue, options) {
  if (install.installed && _Vue === vue) return
  install.installed = true
  _Vue = vue;

  /**
   * libs
   */
  Object.defineProperty(vue.prototype, '$uiLibs', {
    get: function () { return this.$bpLibs; }
  })
  Object.defineProperty(vue.prototype, '$uiTimer', {
    get: function () { return this.$bpTimer; }
  })
  Object.defineProperty(vue.prototype, '$uiEventMgr', {
    get: function () { return this.$bpEventMgr; }
  })
  Object.defineProperty(vue.prototype, '$uiGestureMgr', {
    get: function () { return this.$bpGestureMgr; }
  })
  Object.defineProperty(vue.prototype, '$UIKeyboard', {
    get: function () { return window.$UIKeyboard; }
  })
  Object.defineProperty(vue.prototype, '$UIStorage', {
    get: function () { return window.$UIStorage; }
  })
  Object.defineProperty(vue.prototype, '$UILibs', {
    get: function () { return window.$UILibs; }
  })
  Object.defineProperty(vue.prototype, '$UINetwork', {
    get: function () { return window.$UINetwork; }
  })
  Object.defineProperty(vue.prototype, '$i18n', {
    get: function () { return window.$i18n; }
  })
  Object.defineProperty(vue.prototype, '$Febs', {
    get: function () { return window.$Febs; }
  })

  /**
   * notice
   */
  Object.defineProperty(vue.prototype, '$UIConfirm', {
    get: function () { return window.$UIConfirm; }
  })
  Object.defineProperty(vue.prototype, '$UIConfirmHide', {
    get: function () { return window.$UIConfirmHide; }
  })
  Object.defineProperty(vue.prototype, '$UIAlert', {
    get: function () { return window.$UIAlert; }
  })
  Object.defineProperty(vue.prototype, '$UIToast', {
    get: function () { return window.$UIToast; }
  })
  Object.defineProperty(vue.prototype, '$UILoading', {
    get: function () { return window.$UILoading; }
  })
  Object.defineProperty(vue.prototype, '$UILoadingHide', {
    get: function () { return window.$UILoadingHide; }
  })
}

export default function() {
  return {
    install
  };
}

