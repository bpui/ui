/*
 * @Author: lanck.xie 
 * @Date: 2020-09-04 16:42:27 
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2020-09-04 17:13:40
 *  侧边栏Mixin
 */


import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

@Component
export class UIDialogMixin extends Vue {

  dialog: any = null;

  @Prop({ type: Boolean, default: false, })
  value: boolean;

  @Watch("value")
  ___onValueChange(newVal: boolean, old: boolean ) {
    if (newVal) {
      this.dialog.show();
    } else {
      this.dialog.hide();
    }
  }

  mounted() {
    this.dialog = this.$children[0];
    this.dialog._hackOnUpdateVisible = this.___onChangeVisible;
  }

  ___onChangeVisible(v) {
    if (v != this.value) {
      this.$emit('input', v);
    }
  }

  show() {
    this.dialog && this.dialog.show();
  }
  hide() {
    this.dialog && this.dialog.hide();
  }
  
}