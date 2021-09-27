
import * as febs from 'febs-browser';
import libs from '@bpui/libs';
import dialog from '@bpui/dialog';
import { storage } from './storage';
import { keyboard } from './keyboard';
import { network } from './network';

export * from './forbidDebugger';
export { setNetworkHandler } from './network';

function setup() {
  if ((setup as any).installed) {
    return;
  }
  (setup as any).installed = true;

  window['$UIKeyboard'] = keyboard;
  window['$UIStorage'] = storage;

  Object.defineProperty(libs, 'lang', {
    get: function () {
      try {
        let s = storage.namespace('$lang').get('lang');
        if (!febs.string.isEmpty(s)) return s.toLowerCase();
      } catch (e) {}
      let lang = navigator.languages ? navigator.languages[0] : (navigator.language || (navigator as any).userLanguage);
      return lang.toLowerCase();
    },
    set: function (s) {
      storage.namespace('$lang').set('lang', s);
    }
  });
  Object.defineProperty(libs, 'langI18n', {
    get: function () {
      return window['$UILangI18n'];
    },
    set: function (s) {
      window['$UILangI18n'] = s;
    }
  });

  window['$UILibs'] = libs;
  window['$UINetwork'] = network;
  window['$Febs'] = febs;
}

setup();