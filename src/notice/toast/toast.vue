<!--
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lanck
* Date: 2020-09-09 15:54
* Desc: toast 组件
*/
 -->


<template>
  <transition @after-enter="afterEnter" @after-leave="afterLeave" name="fade">
    <div
      :date-type="type"
      :style="style"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
      class="ui-toast-row"
      v-show="visible"
    >
      <bp-icon
        v-if="type == 'success'"
        width="20px"
        class="ui-toast-icon"
        name="ok"
      ></bp-icon>
      <bp-icon
        v-else-if="type == 'alert' || type == 'notification'"
        width="20px"
        class="ui-toast-icon"
        name="alert"
      ></bp-icon>
      <bp-icon
        v-else
        width="20px"
        class="ui-toast-icon"
        name="warning"
      ></bp-icon>
      <span class="ui-toast-content">{{ content || "" }}</span>
      <span style="flex: 1"></span>
      <!-- <a  class="ui-toast-close">x</a> -->
      <bp-icon
        width="12px"
        name="cancel"
        @click="handleClose"
        style="font-size: 12px; cursor:pointer;"
      ></bp-icon>
    </div>
  </transition>
</template>

<script lang="js">

import * as febs from 'febs-browser';

export default {
  props: {
    content: { type: [String, Number], required: true },
    type: { type: String, default: "info" }
  },
  data() {
    return {
      visible: false,
      offsetHeight: 0,
      autoClose: 3000,
      timer: null,
      height: 0,
    };
  },
  computed: {
    style() {
      if (febs.utils.browserIsPhone()) {
        let w = 320;
        w = febs.dom.getViewPort().width - w;
        w /= 2; w = Math.ceil(w);

        return {
          position: "fixed",
          top: this.offsetHeight + 5 + "px",
          right: w + "px",
          left: w + "px",
          "z-index": "100099",
          "margin-left": 0,
        };
      }
      else {
        return {
          position: "fixed",
          top: this.offsetHeight + 50 + "px",
          right: "32px",
          "z-index": "100099",
        };
      }
    }
  },
  mounted() {
    this.createTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    createTimer() {
      this.timer = setTimeout(() => {
        this.visible = false;
      }, this.autoClose);
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    handleClose(e) {
      e.preventDefault();
      // this.visible = false;
      this.$emit("close");
    },
    clearTimer() {},
    createTimer() {},
    afterLeave() {
      this.$emit("closed");
    },
    afterEnter() {
      this.height = this.$el.offsetHeight;
    },
  }
}
</script>
