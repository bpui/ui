
import * as febs from 'febs-browser';
import libs from '@bpui/libs';
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

      // 设置语言.
      let i18 = window['$__i18n'];
      if (i18) {
        let lan = (libs as any).lang;
        if (febs.string.isEmpty(lan) || !i18.messages.hasOwnProperty(lan)) {
          lan = i18.defaultLocale;
        }
        if (i18.messages.hasOwnProperty(lan)) {
          window['$__i18nMsg'] = i18.messages[lan];
        }
      }
    }
  });

  Object.defineProperty(libs, 'setI18nMessage', {
    get: function () {
      return (cfg: { defaultLocale?: string, messages: any }) => {
        window['$__i18n'] = { defaultLocale:cfg.defaultLocale||'zh-cn', messages:cfg.messages };

        // 设置语言.
        let i18 = window['$__i18n'];
        if (i18) {
          let lan = (libs as any).lang;
          if (febs.string.isEmpty(lan) || !i18.messages.hasOwnProperty(lan)) {
            lan = i18.defaultLocale;
          }
          if (i18.messages.hasOwnProperty(lan)) {
            window['$__i18nMsg'] = i18.messages[lan];
          }
        }
      };
    },
  });

  window['$UILibs'] = libs;
  window['$UINetwork'] = network;
  window['$Febs'] = febs;
  window['$i18n'] = function (k: string, defaultK: string) {
    let i18 = window['$__i18nMsg'];
    if (!i18) {
      return defaultK || k;
    }
    else {
      let messages = i18;
      let ks = k.split('.');
      for (let i = 0; i < ks.length; i++) {
        let nn = ks[i];
        if (!messages.hasOwnProperty(nn)) {
          return defaultK || k;
        }
        else {
          messages = messages[nn];
        }
      }

      return messages;
    }
  }
}

setup();