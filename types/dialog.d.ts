
/// <reference path="./vue.d.ts" />

import Vue from "vue";
import { VueClass } from "vue-class-component/lib/declarations";

export const UIDialog: Vue;

export const UIDialogMixin: VueClass<Vue>;

/**
 * 在对话框高度改变时, 使用此方法来正确设置出合理的top位置, 以便不会有内容超出视图.
 * 
 * @param dialog html dom 或 vue对象.
 */
export function dialogRightTop(dialog:HTMLElement|any): void;