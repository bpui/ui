import Vue, { VNode } from "vue";

/* eslint-disable */
declare global {
  namespace JSX {
    // interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

/* eslint-enable */