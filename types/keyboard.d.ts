
declare namespace ui {
  namespace keyboard {
    type KeyHandler = (keyboardEvent: KeyboardEvent) => boolean | void;

    export interface IKeyboard {
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
      on(keyname: string, callback: KeyHandler): IKeyboard;

      /**
       * 解除按键handler.
       */
      off(keyname: string): IKeyboard;

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
      isPressed(keyCode: number | string): boolean;

      /**
       * 检查shift键是否按下.
       */
      readonly shift: boolean;
      readonly '⇧': boolean;

      /**
       * 检查alt键是否按下.
       */
      readonly alt: boolean;
      readonly option: boolean;
      readonly '⌥': boolean;

      /**
       * 检查control键是否按下.
       */
      readonly ctrl: boolean;
      readonly control: boolean;
      readonly '⌃': boolean;

      /**
       * 检查command键是否按下.
       */
      readonly command: boolean;
      readonly '⌘': boolean;

      /**
       * 获得按下按键的keyCode列表.
       */
      readonly pressedKeyCodes: number[];
    }
  }
}