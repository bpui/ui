
/// <reference path="./vue.d.ts" />
/// <reference path="./keyboard.d.ts" />
/// <reference path="./storage.d.ts" />
/// <reference path="./network.d.ts" />

import * as febs from 'febs-browser';
import './notice.d';

export * from './actionsheet.d';
export * from './picker.d';
export * from './picker-date.d';

declare global {
  /**
   * 全局按键操作对象
   */
  const $UIKeyboard: bp.keyboard.IKeyboard;
  /**
   * @desc 网络工具.
   */
  const $UINetwork: bp.network.INetwork;
  /**
   * @desc 本地存储.
   */
  const $UIStorage: typeof bp.storage;
  /**
   * @desc 基础库.
   */
  const $UILibs: typeof bp.bpLibs & {
    /**
     * @desc 设置或获取本地语言; 设置为 '' 则为获取浏览器默认的本地语言. 
     */
    lang: string;
    /**
     * @desc 设置或获取i18n对象.
     */
    langI18n: any;
  };
  /**
   * @desc febs.
   */
  const $Febs: typeof febs;
}

/**
 * 不允许浏览器调试.
 */
export function forbidDebugger(): void;

/**
 * 设置网络处理处理对象.
 */
export function setNetworkHandler(handler: bp.network.INetworkHandler): void