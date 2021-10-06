'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-14 11:16
 * Desc:
 */

import { injectGlobal } from 'vue-styled-components'
import picker from '@bpui/picker';
import { i18n } from '../_utils/i18n'
import renderDom from '../_utils/renderDom'

const _UISelectPicker = {
  name: 'ui-select-picker',
  components: {
    'uix-picker': picker.bpPicker,
    'render-dom': renderDom,
  },
  props: {
    placeholder: String,
    emptyText: String,
    sepText: {
      type: String,
      default: '>',
    },
    datasource: [Array, Object],
    multiple: Boolean,
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: [String, Number, Array],
  },
  computed: {
    placeholderText() {
      return this.placeholder
        ? this.placeholder
        : i18n('common.请选择', '请选择')
    },
    emptyTextText() {
      return this.emptyText ? this.emptyText : i18n('common.无数据', '无数据')
    },
    isMultiple() {
      if (this.isMultipleRender || !this.isMultipleRender) {
        let picker = this.$refs.picker
        return picker ? this.multiple && picker.groupCount == 1 : false
      }
    },
  },
  watch: {
    value: function (val, oldVal) {
      if (val == oldVal) {
        return
      }

      if (
        Array.isArray(val) &&
        oldVal &&
        val.length == oldVal.length
      ) {
        let i
        for (i = 0; i < val.length; i++) {
          if (val[i] != oldVal[i]) {
            break
          }
        }
        if (i >= val.length) {
          return
        }
      }
      
      this.valuePicker = val
    },
  },
  data() {
    return {
      valuePicker: null,
      pickerVisible: false,
      isMultipleRender: false,
    }
  },
  beforeMount() {
    this.valuePicker = this.value
  },
  mounted() {
    this.isMultipleRender = !this.isMultipleRender
  },
  render(createElement) {
    return (
      <div
        class={{
          'bp-select': true,
          'ui-select': true,
          'bp-select__selected': this.pickerVisible,
          'bp-select__multiple': this.isMultiple,
        }}
        onclick={() => (this.pickerVisible = true)}
      >
        <div class="bp-select__main">
          <div class="bp-select__mainContain">
            <span
              style={{
                'white-space': this.isMultiple ? 'initial' : 'nowrap',
              }}
            >
              {' '}
              {this._renderLabel()}
            </span>
          </div>
        </div>
        <bp-icon
          class={{
            'bp-select__arrowDown': true,
            'bp-select__arrowDownR': this.pickerVisible,
          }}
          name="bp-select_arrowDown"
        />

        <uix-picker
          ref="picker"
          maskClose={true}
          visible={this.pickerVisible}
          value={this.valuePicker}
          multiple={this.multiple}
          on={{
            'update:visible': (e) => {
              this.pickerVisible = e
            },
            input: (e) => {
              this.valuePicker = e
            },
            confirm: (picker) => {
              let value = picker.getValue()
              this.$emit('input', value)
              this.pickerVisible = false
            },
          }}
          datasource={this.datasource}
        >{this.$slots.default}</uix-picker>
      </div>
    )
  },
  methods: {
    _renderLabel() {
      let slots = []
      let picker = this.$refs.picker

      if (!this.valuePicker || this.valuePicker.length == 0) {
        return (
          <span class="bp-select__mainContain_placeholder">
            {this.placeholderText || ''}
          </span>
        )
      }

      if (this.$slots.default) {
        if (this.isMultiple) {
          let labelIndex = 0;
          for (let i = 0; i < picker.items0.length; i++) {
            if (this.valuePicker.indexOf(picker.items0[i].value) >= 0) {
              let ii = labelIndex++;

              let jj = 0;
              for (let j = 0; j < this.$slots.default.length; j++) {
                let c = this.$slots.default[j];
                if (!c.tag) continue;
                if (c.tag.indexOf('bpPickerCell') >= 0) {
                  if (jj == i) {
                    const div = document.createElement('div');
                    div.appendChild(c.elm.cloneNode(true));
                    const divString = div.innerHTML;
                    slots.push(
                      <div class="bp-select__label bp-ellipsis" key={'label' + j} >
                        <div domPropsInnerHTML={divString} />
                        <bp-icon
                          class="bp-select_close"
                          name="bp-select_close"
                          onclick={(e) => {
                            this.onRemoveMultipleOption(ii)
                            e.stopPropagation()
                          }}
                        />
                      </div>
                    )
                    break;
                  }
                  jj++;
                }
              }
            }
          }
        } else {
          let value0 = picker.value0;
          for (let j = 0; j < this.$slots.default.length; j++) {
            let c = this.$slots.default[j];
            if (!c.tag) continue;
            if (c.tag.indexOf('bpPickerCell') >= 0) {
              if (c.componentOptions.propsData.value == value0) {
                slots.push(
                  <render-dom
                    node={c}
                    class="bp-select__label"
                  />
                )
                break;
              }
            }
          }
        }
      } else {
        if (this.isMultiple && picker.items0CheckedValue) {
          let labelIndex = 0;
          for (let i = 0; i < picker.items0.length; i++) {
            if (this.valuePicker.indexOf(picker.items0[i].value) >= 0) {
              let ii = labelIndex++;
              slots.push(
                <span class="bp-select__label" key={'label'+i}>
                  {picker.items0[i].label}
                  <bp-icon
                    class="bp-select_close"
                    name="bp-select_close"
                    onclick={(e) => {
                      this.onRemoveMultipleOption(ii)
                      e.stopPropagation()
                    }}
                  />
                </span>
              )
            }
          }
        } else {
          if (Array.isArray(this.valuePicker)) {
            for (let i = 0; i < this.valuePicker.length; i++) {

              let vv = this.valuePicker[i];
              let items = picker['items' + i];
              let j = 0;
              for (; j < items.length; j++) {
                if (items[j].value == vv) {
                  break;
                }
              }

              let iPicker = items[j];
              if (iPicker && i > 0) {
                slots.push(
                  <span class="bp-select__label_sep" key={'label'+i}>{this.sepText}</span>
                )
              }
              if (iPicker) {
                slots.push(
                  <span class="bp-select__label" key={'labelss'+i}>
                    {iPicker.label}
                  </span>
                )
              }
            }
          } else {
            slots.push(
              <span class="bp-select__label">
                {picker.items0[picker._getSelectIndex(0)].label}
              </span>
            )
          }
        }
      } // if..else.

      return slots
    },
    onRemoveMultipleOption(index) {
      this.$nextTick(() => {
        let valuePicker = this.valuePicker.concat([]);
        valuePicker.splice(index, 1)
        this.valuePicker = valuePicker.concat([]);
        this.$emit('input', this.valuePicker)
      });
    },
    show() {
      this.pickerVisible = true;
    },
    hide() {
      this.pickerVisible = false
    },
  },
}

injectGlobal`
  .ui-select .bp-select__label .bp-picker__item_check {
    display: none !important;
  }
  .ui-select .bp-select__label .bp-picker__item_uncheck {
    display: none !important;
  }
`

export const UISelectPicker = _UISelectPicker
