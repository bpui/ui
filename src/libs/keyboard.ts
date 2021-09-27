'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-06 13:55
 * Desc:
 */

import key from 'keymaster'

export const keyboard = {
  /**
   * @desc: 定义一个快捷键.
   *
   * 可以使用如下的修饰键:
   * - `⇧`, `shift`
   * - `option`, `⌥`, `alt`
   * - `ctrl`, `control`, `command`, and `⌘`.
   *
   * 可以使用如下的特殊键:
   * - `backspace`, `tab`, `clear`
   * - `enter`, `return`
   * - `esc`, `escape`, `space`,
   * - `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`
   * - `f1` through `f19`.
   *
   * @example
   *
   * keyboard.on('a', () => {});
   * keyboard.on('ctrl+r', () => {});
   * keyboard.on('ctrl+r, ⌘+r', () => {});
   */
  on: function(keyname: string, callback: /*bp.keyboard.KeyHandler*/any) {
    key(keyname, callback)
    return this
  },

  /**
   * 解除按键handler.
   */
  off: function(keyname: string) {
    key.unbind(keyname)
    return this
  },

  /**
   * 检查指定的按键是否按下.
   *
   * @example
   * if (keyboard.isPressed('M')) {
   *     alert('M key is pressed, can ya believe it!?');
   * }
   * if (keyboard.isPressed(77)) {
   *     alert('M key is pressed, can ya believe it!?');
   * }
   */
  isPressed(keyCode: number | string): boolean {
    return key.isPressed(keyCode)
  },

  /**
   * 检查shift键是否按下.
   */
  get shift(): boolean {
    return key.shift
  },
  get '⇧'(): boolean {
    return key['⇧']
  },

  /**
   * 检查alt键是否按下.
   */
  get alt(): boolean {
    return key.alt
  },
  get option(): boolean {
    return key.option
  },
  get '⌥'(): boolean {
    return key['⌥']
  },

  /**
   * 检查control键是否按下.
   */
  get ctrl(): boolean {
    return key.ctrl
  },
  get control(): boolean {
    return key.control
  },
  get '⌃'(): boolean {
    return key['⌃']
  },

  /**
   * 检查command键是否按下.
   */
  get command(): boolean {
    return key.command
  },
  get '⌘'(): boolean {
    return key['⌘']
  },

  /**
   * 获得按下按键的keyCode列表.
   */
  get pressedKeyCodes(): number[] {
    return key.getPressedKeyCodes()
  },
}
