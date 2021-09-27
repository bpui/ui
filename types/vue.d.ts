/// <reference types="@bpui/libs" />

import 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * @desc 计时器.
     */
    $uiTimer: bp.Timer;
    /**
     * @desc 事件管理器; 添加的事件在组件销毁时会自动移除.
     */
    $uiEventMgr: bp.EventMgr;
    /**
     * @desc 事件管理器; 添加的事件在组件销毁时会自动移除.
     */
    $uiGestureMgr: bp.GestureMgr;
  }
}
