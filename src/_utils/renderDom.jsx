import * as febs from 'febs-browser';

export default {
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  render(h) {
    this.node.componentOptions.listeners = this.node.componentOptions.listeners || {};

    this.node.componentOptions.listeners = febs.utils.mergeMap(this.node.componentOptions.listeners, this.$listeners);

    return this.node;
  }
}