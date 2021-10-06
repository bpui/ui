'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-14 11:16
 * Desc:
 */

import { injectGlobal }  from 'vue-styled-components'
import * as febs from 'febs-browser'
import { UIPicker, UIPickerTimeDatasource } from './picker'
import { i18n } from '../_utils/i18n';

const _UITimePicker = {
  name: 'ui-time-picker',
  components: {
    'ui-picker': UIPicker,
  },
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    showMinute: {
      type: Boolean,
      default: true,
    },
    showSecond: {
      type: Boolean,
      default: true,
    },
    max: {
      validator: function(value) {
        return !value || value instanceof Date
      },
    },
    min: {
      validator: function(value) {
        return !value || value instanceof Date
      },
    },
    value: {
      validator: function(value) {
        return !value || value instanceof Date
      },
    },
  },
  computed: {
    placeholderText() {
      return this.placeholder ? this.placeholder : (
        i18n('common.选择时间', '选择时间')
      );
    },
  },
  watch: {
    value: function(val, oldVal) {
      this.valueTime = val
      if (this.valueTime) {
        this.valueInput = febs.date.getTimeString(
          this.valueTime.getTime(),
          this.format
        )
        this.valuePicker = [
          this.valueTime.getHours(),
          this.valueTime.getMinutes(),
          this.valueTime.getSeconds(),
        ]
      } else {
        this.valueInput = ''
        this.valuePicker = [0, 0, 0]
      }
    },
    max: function(val) {
      this._resetDatesource()
    },
    min: function(val) {
      this._resetDatesource()
    },
    showMinute(val) {
      this._resetDatesource()
    },
    showSecond(val) {
      this._resetDatesource()
    },
  },
  data() {
    return {
      valueInput: '',
      valueTime: null,
      valuePicker: [0, 0, 0],
      pickerVisible: false,
      datasource: [],
    }
  },
  mounted() {
    this._resetDatesource()
    if (this.value) {
      this.valueTime = this.value
      this.valueInput = febs.date.getTimeString(
        this.valueTime.getTime(),
        this.format
      )
      this.valuePicker = [
        this.valueTime.getHours(),
        this.valueTime.getMinutes(),
        this.valueTime.getSeconds(),
      ]
    }
  },
  render(createElement) {
    return (
      <div class={{ 'ui-time-picker': true }}>
        <ui-input
          ref="input"
          disabled={this.disabled}
          readonly={true}
          placeholder={this.placeholderText}
          onfocus={() => {
            if (this.readonly) {
              return
            }
            this.pickerVisible = true
          }}
          value={this.valueInput}
          on={{
            input: (e) => {
              this.valueInput = e
            },
          }}
        ></ui-input>
        <ui-picker
          ref="picker"
          maskClose={true}
          visible={this.pickerVisible}
          value={this.valuePicker}
          on={{
            'update:visible': (e) => {
              this.pickerVisible = e
            },
            input: (e) => {
              this.valuePicker = e
            },
            confirm: (picker) => {
              this.pickerVisible = false
              let value = picker.getValue()
              if (Array.isArray(value)) {
                this._formatTime(value[0], value[1], value[2])
              }
              else {
                this._formatTime(value, null, null)  
              }
              this.$emit('input', this.valueTime)
            },
          }}
          datasource={this.datasource}
        ></ui-picker>
      </div>
    )
  },
  methods: {
    _min() {
      if (febs.date.isValidate(this.min) && febs.date.isValidate(this.max)) {
        return this.min.getHours() * 60 * 60 +
          this.min.getMinutes() * 60 +
          this.min.getSeconds() >
          this.max.getHours() * 60 * 60 +
            this.max.getMinutes() * 60 +
            this.max.getSeconds()
          ? this.max
          : this.min
      } else {
        return this.min
      }
    },
    _max() {
      if (febs.date.isValidate(this.min) && febs.date.isValidate(this.max)) {
        return this.min.getHours() * 60 * 60 +
          this.min.getMinutes() * 60 +
          this.min.getSeconds() >
          this.max.getHours() * 60 * 60 +
            this.max.getMinutes() * 60 +
            this.max.getSeconds()
          ? this.min
          : this.max
      } else {
        return this.max
      }
    },
    _resetDatesource() {
      let min = this._min()
      let max = this._max()

      this.datasource = new UIPickerTimeDatasource({
        hourText: i18n('common.时', '时'),
        minuteText: i18n('common.分', '分'),
        secondText: i18n('common.秒', '秒'),
        showSecond: this.showSecond,
        showMinute: this.showMinute,
        min: min
          ? {
              hour: min.getHours(),
              minute: min.getMinutes(),
              second: min.getSeconds(),
            }
          : null,
        max: max
          ? {
              hour: max.getHours(),
              minute: max.getMinutes(),
              second: max.getSeconds(),
            }
          : null,
      })
    },
    _formatTime(h, m, s) {
      this.valueTime = new Date()
      this.valueTime.setHours(Number(h))
      this.valueTime.setMinutes(Number(m)||0)
      this.valueTime.setSeconds(Number(s)|| 0)
      this.valueInput = febs.date.getTimeString(
        this.valueTime.getTime(),
        this.format
      )
    },
    getText() {
      return this.$refs.input.text();
    },
    show() {
      this.$refs.input.focus()
    },
    hide() {
      this.pickerVisible = false
    },
  },
}


injectGlobal`
  .ui-time-picker {
    width: 95px;
  }
  .ui-time-picker .bp-input {
    width: auto;
  }
  .ui-time-picker .bp-input input {
    text-align: center;
  }
`;

export const UITimePicker = _UITimePicker;
