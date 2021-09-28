'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-14 11:16
 * Desc:
 */

import { injectGlobal }  from 'vue-styled-components'
import * as febs from 'febs-browser'
import { UIPicker, UIPickerDateDatasource } from './picker'

function i18n(key, defaultWord) {
  let r = window['$UILangI18n'];
  return r ? r[key] : defaultWord;
}

const _UIDatePicker = {
  name: 'ui-date-picker',
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
      default: 'yyyy-MM-dd',
    },
    showMonth: {
      type: Boolean,
      default: true,
    },
    showDate: {
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
        i18n('common.选择日期', '选择日期')
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
          this.valueTime.getFullYear(),
          this.valueTime.getMonth(),
          this.valueTime.getDate(),
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
    showMonth(val) {
      this._resetDatesource()
    },
    showDate(val) {
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
        this.valueTime.getFullYear(),
        this.valueTime.getMonth(),
        this.valueTime.getDate(),
      ]
    }
  },
  render(createElement) {
    return (
      <div class={{ 'ui-date-picker': true }}>
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
            'update:value': (e) => {
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
            'update:value': (e) => {
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
        return this.min.getFullYear() * 12 * 31 +
          this.min.getMonth() * 31 +
          this.min.getDate() >
          this.max.getFullYear() * 12 * 31 +
            this.max.getMonth() * 31 +
            this.max.getDate()
          ? this.max
          : this.min
      } else {
        return this.min
      }
    },
    _max() {
      if (febs.date.isValidate(this.min) && febs.date.isValidate(this.max)) {
        return this.min.getFullYear() * 12 * 31 +
          this.min.getMonth() * 31 +
          this.min.getDate() >
          this.max.getFullYear() * 12 * 31 +
            this.max.getMonth() * 31 +
            this.max.getDate()
          ? this.min
          : this.max
      } else {
        return this.max
      }
    },
    _resetDatesource() {
      let min = this._min()
      let max = this._max()

      this.datasource = new UIPickerDateDatasource({
        yearText: i18n('common.年', '年'),
        monthText: i18n('common.月', '月'),
        dateText: i18n('common.日', '日'),
        showMonth: this.showMonth,
        showDate: this.showDate,
        min: min
          ? {
              year: min.getFullYear(),
              month: min.getMonth(),
              date: min.getDate(),
            }
          : null,
        max: max
          ? {
              year: max.getFullYear(),
              month: max.getMonth(),
              date: max.getDate(),
            }
          : null,
      })
    },
    _formatTime(h, m, s) {
      this.valueTime = new Date()
      this.valueTime.setFullYear(Number(h))
      this.valueTime.setMonth(Number(m)||0)
      this.valueTime.setDate(Number(s)||1)
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
  .ui-date-picker {
    width: 120px;
  }
  .ui-date-picker .bp-input {
    width: auto;
  }
  .ui-date-picker .bp-input input {
    text-align: center;
  }
`;

export const UIDatePicker = _UIDatePicker;