
/// <reference path="./vue.d.ts" />
/// <reference path="./storage.d.ts" />
/// <reference path="./network.d.ts" />
/// <reference path="./keyboard.d.ts" />
/// <reference types="@bpui/libs" />
/// <reference types="@bpui/navbar-view" />

import bpDialog from '@bpui/dialog';
import * as febs from 'febs-browser';
import * as os_enum from './os_enum.d';

export * from './actionsheet.d';
export * from './dialog.d';
export * from './os_enum.d';
export * from './picker-date.d';
export * from './picker.d';
export * from './popover.d';
export * from './select.d';
export * from './uploader.d';

type LocaleMessage = string | LocaleMessageObject;
interface LocaleMessageObject { [key: string]: LocaleMessage; }

declare global {
  /**
   * 全局按键操作对象
   */
  const $UIKeyboard: ui.keyboard.IKeyboard;
  /**
   * @desc 网络工具.
   */
  const $UINetwork: ui.network.INetwork;
  /**
   * @desc 本地存储.
   */
  const $UIStorage: typeof ui.storage;
  /**
   * @desc 基础库.
   */
  const $UILibs: typeof bp.bpLibs & {
    /**
     * @desc 设置或获取本地语言; 设置为 '' 则为获取浏览器默认的本地语言. 
     */
    lang: string;
    /**
     * @desc 设置i18n信息.
     */
    setI18nMessage: (cfg:{
      // 默认的本地语言, 找不到对应语言词汇时使用此语言; 默认: zh-cn
      defaultLocale?: string,
      // 包含所有语言的词汇表.
      messages: {
        [locale: string]: LocaleMessageObject
      },
    }) => void;
    /**
     * @desc 获取操作系统信息.
     */
    os: {
      /** @desc 操作系统名 */
      name(): os_enum.OSName
    };
  };
  /**
   * @desc 获取本地语言. 如果 `key` 不存在则返回 `defaultWord`
   */
  const $i18n: (key:string, defaultWordOrParams?:string|any, defaultWord?:string) => string;
  /**
   * @desc febs.
   */
  const $Febs: typeof febs;

  //--------------------------------------------------------
  // notice
  //--------------------------------------------------------
  
  /**
   * @desc toast.
   */
  function $UIToast(cfg: string | {
      content  : string|any,
      type     ?: 'success'|'error'|'info'|'alert'|'notification',  // default = info.
      duration ?: number, // default = 3000
  }):Promise<void>;
  /**
   * @desc alert对话框.
   */
  const $UIAlert: typeof bpDialog.apiWidget.showAlert;
  /**
   * @desc confirm对话框
   */
  const $UIConfirm: typeof bpDialog.apiWidget.showConfirm;
  const $UIConfirmHide: typeof bpDialog.apiWidget.hideConfirm;
  /**
   * @desc loading
   */
  const $UILoading: typeof bpDialog.apiWidget.showLoading;
  const $UILoadingHide: typeof bpDialog.apiWidget.hideLoading;
}

/**
 * 不允许浏览器调试.
 */
export function forbidDebugger(): void;

/**
 * 设置网络处理处理对象.
 */
export function setNetworkHandler(handler: ui.network.INetworkHandler): void

/**
 * set navbarview default config.
 */
export function setNavbarDefaultCfg(cfg: {
  /**
   * default retain page dom in `push` method.
   */
  retainPageInPush?: boolean,
}): void;


/**
 * @desc: 注册app.
 * @param routes: 此app所需的routes结构.
 *      path='*' 的路由为404路由.
 */
export function registerApp(routes: {
  routePath: Array<{ path: string; component: any;[key: string]: any }>,
  basePath?: string,
}): void;

/**
 * 通过route来获得适合的layout组件.
 * @param layouts
 * @param newRoute
 * @param oldRoute
 */
export function getLayout(layouts: any, newRoute: bp.Location, oldRoute: bp.Location): any;

export interface Hook {
  /**
   * @desc: 添加页面抖动hook.
   * 回调方法中的paddingRight参数表示发生抖动时页面中fixed元素应该在原有paddingRight值上增加的像素值.
   */
  addWidgetShake(foo: (paddingRight: number) => void): void;

  /**
   * @desc: 移除页面抖动hook.
   */
  removeWidgetShake(foo: (paddingRight: number) => void): void;
}
export const hook: Hook;