'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-08-25 14:24
 * Desc:
 */

/**
 * @desc 禁止浏览器调试.
 */
export function forbidDebugger() {
  const check = function() {
    function doCheck(a) {
      if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
        ;(function() {}['constructor']('debugger')())
      } else {
        ;(function() {}['constructor']('debugger')())
      }
      doCheck(++a)
    }
    try {
      doCheck(0)
    } catch (err) {}
  }

  const checkDebuggerWindow = function() {
    const thresholdW = 160 // 打开控制台的宽或高阈值
    const thresholdH = 160 + 200 // 打开控制台的宽或高阈值
    if (
      window.outerWidth - window.innerWidth > thresholdW ||
      window.outerHeight - window.innerHeight > thresholdH
    ) {
      window.close()
      ;(window.location as any) = 'about:blank'
    }
  }

  setInterval(function() {
    if (!__debug) {
      checkDebuggerWindow()
      check()
    }
  }, 5000)

  if (!__debug) {
    checkDebuggerWindow()
    check()

    // f12.
    window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
      if (event.keyCode === 123) {
        event.preventDefault()
        window.event.returnValue = false
      }
    }
  }
}
