
import * as febs from 'febs-browser';
import libs from '@bpui/libs';
import { storage } from './storage';
import { keyboard } from './keyboard';
import { network } from './network';
import navbar from '@bpui/navbar-view';
import dialog from '@bpui/dialog';

export * from './forbidDebugger';
export { setNetworkHandler } from './network';

export function setNavbarDefaultCfg(cfg: {
  /**
   * default retain page dom in `push` method.
   */
  retainPageInPush?: boolean,
}): void {
  navbar.setNavbarDefaultCfg(cfg);
}

/**
 * @desc: 注册app.
 * @param routes: 此app所需的routes结构.
 *      path='*' 的路由为404路由.
 */
export function registerApp(routes: {
  routePath: Array<{ path: string; component: any; [key: string]: any }>;
  basePath?: string;
}): void {
  libs.registerApp(routes.routePath, routes.basePath);
}

export function getLayout(layouts:any, newRoute:any, oldRoute:any) {
  let newRoutePath = newRoute.path;
  if (newRoutePath[0] == '/') newRoutePath = newRoutePath.substring(1);
  for (let p in layouts) {
    if (p[0] == '/') p = p.substring(1);
    if (newRoutePath == p || newRoutePath.indexOf(p + '/') >= 0) {
      return (layouts /*as any*/)[p];
    }
  }

  // 默认值.
  return (layouts /*as any*/)['default'];
}


export const hook = {
  /**
   * 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo: (paddingRight: number) => void) {
    dialog.hook.addWidgetShake(foo);
  },

  /**
   * 移除页面抖动hook.
   */
  removeWidgetShake(foo:(paddingRight:number)=>void) {
    dialog.hook.removeWidgetShake(foo);
  }
}

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
      if (!k) {
        console.warn('$i18n() key is null');
        return defaultK || '';
      }

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