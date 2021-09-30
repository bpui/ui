/// <reference types="@bpui/libs" />
/// <reference path="./storage.d.ts" />
/// <reference path="./network.d.ts" />
/// <reference path="./keyboard.d.ts" />

import 'vue'
import bpDialog from '@bpui/dialog';
import * as febs from 'febs-browser';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * @desc 计时器.
     */
    $uiTimer: bp.Timer
    /**
     * @desc 事件管理器; 添加的事件在组件销毁时会自动移除.
     */
    $uiEventMgr: bp.EventMgr
    /**
     * @desc 事件管理器; 添加的事件在组件销毁时会自动移除.
     */
    $uiGestureMgr: bp.GestureMgr

    /**
     * 全局按键操作对象
     */
    $UIKeyboard: ui.keyboard.IKeyboard
    /**
     * @desc 网络工具.
     */
    $UINetwork: ui.network.INetwork
    /**
     * @desc 本地存储.
     */
    $UIStorage: typeof ui.storage
    /**
     * @desc 基础库.
     */
    $UILibs: typeof bp.bpLibs & {
      /**
       * @desc 设置或获取本地语言; 设置为 '' 则为获取浏览器默认的本地语言.
       */
      lang: string
    }
    /**
     * @desc 获取本地语言. 如果 `key` 不存在则返回 `defaultWord`
     */
    $i18n: (key:string, defaultWord?:string) => string;
    /**
     * @desc febs.
     */
    $Febs: typeof febs

    //--------------------------------------------------------
    // notice
    //--------------------------------------------------------

    /**
     * @desc toast.
     */
    $UIToast(
      cfg:
        | string
        | {
            content: string | any
            type?: 'success' | 'error' | 'info' | 'alert' | 'notification' // default = info.
            duration?: number // default = 3000
          }
    ): Promise<void>
    /**
     * @desc alert对话框.
     */
    $UIAlert: typeof bpDialog.apiWidget.showAlert
    /**
     * @desc confirm对话框
     */
    $UIConfirm: typeof bpDialog.apiWidget.showConfirm
    $UIConfirmHide: typeof bpDialog.apiWidget.hideConfirm
    /**
     * @desc loading
     */
    $UILoading: typeof bpDialog.apiWidget.showLoading
    $UILoadingHide: typeof bpDialog.apiWidget.hideLoading
  }
}
