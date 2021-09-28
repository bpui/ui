'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-14 11:16
 * Desc:
 */

import * as febs from 'febs-browser'
import { injectGlobal }  from 'vue-styled-components'
import { UIPicker, UIPickerTimeDatasource } from './picker'

function i18n(key, defaultWord) {
  let r = window['$UILangI18n'];
  return r ? r[key] : defaultWord;
}

const _UITimeRangePicker = {
  name: 'ui-time-range-picker',
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
        return (
          !value ||
          (Array.isArray(value) &&
            ((value.length == 2 &&
              (!value[0] || value[0] instanceof Date) &&
              (!value[1] || value[1] instanceof Date)) ||
              (value.length == 1 && (!value[0] || value[0] instanceof Date))))
        )
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
      this._formatTime(val)

      if (this.valueTime) {
        if (febs.date.isValidate(this.valueTime[0])) {
          this.valuePicker1 = [
            this.valueTime[0].getHours(),
            this.valueTime[0].getMinutes(),
            this.valueTime[0].getSeconds(),
          ]
        }

        if (febs.date.isValidate(this.valueTime[1])) {
          this.valuePicker2 = [
            this.valueTime[1].getHours(),
            this.valueTime[1].getMinutes(),
            this.valueTime[1].getSeconds(),
          ]
        }
      }

      this._resetDatesource1();
      this._resetDatesource2();
    },
    min: function (val) {
      this._resetDatesource1();
      this._resetDatesource2();
    },
    max: function (val) {
      this._resetDatesource1();
      this._resetDatesource2();
    },
    showMinute(val) {
      this._resetDatesource1();
      this._resetDatesource2();
    },
    showSecond(val) {
      this._resetDatesource1();
      this._resetDatesource2();
    },
  },
  data() {
    return {
      valueInput1: '',
      valueInput2: '',
      valueTime: null,
      valuePicker1: [0, 0, 0],
      valuePicker2: [0, 0, 0],
      pickerVisible1: false,
      pickerVisible2: false,
      datasource1: [],
      datasource2: [],
    }
  },
  mounted() {
    if (this.value) {
      this._formatTime(this.value)

      if (this.valueTime) {
        if (febs.date.isValidate(this.valueTime[0])) {
          this.valuePicker1 = [
            this.valueTime[0].getHours(),
            this.valueTime[0].getMinutes(),
            this.valueTime[0].getSeconds(),
          ]
        }
        if (febs.date.isValidate(this.valueTime[1])) {
          this.valuePicker2 = [
            this.valueTime[1].getHours(),
            this.valueTime[1].getMinutes(),
            this.valueTime[1].getSeconds(),
          ]
        }
      }
    }

    this._resetDatesource1();
    this._resetDatesource2();
  },
  render(createElement) {
    return (
      <div class={{ 'ui-time-range-picker': true }}>
        <ui-input
          ref="input1"
          disabled={this.disabled}
          readonly={true}
          placeholder={this.placeholderText}
          onfocus={() => {
            if (this.readonly) {
              return
            }
            if (febs.date.isValidate(this.valueTime[0])) {
              this.valuePicker1 = [
                this.valueTime[0].getHours(),
                this.valueTime[0].getMinutes(),
                this.valueTime[0].getSeconds(),
              ]
            }
            this.pickerVisible1 = true
          }}
          value={this.valueInput1}
          on={{
            'update:value': (e) => {
              this.valueInput1 = e
            },
          }}
        ></ui-input>
        <span>-</span>
        <ui-input
          ref="input2"
          disabled={this.disabled}
          readonly={true}
          placeholder={this.placeholderText}
          onfocus={() => {
            if (this.readonly) {
              return
            }

            if (febs.date.isValidate(this.valueTime[1])) {
              this.valuePicker2 = [
                this.valueTime[1].getHours(),
                this.valueTime[1].getMinutes(),
                this.valueTime[1].getSeconds(),
              ]
            }
            this.pickerVisible2 = true
          }}
          value={this.valueInput2}
          on={{
            'update:value': (e) => {
              this.valueInput2 = e
            },
          }}
        ></ui-input>
        <ui-picker
          ref="picker1"
          maskClose={true}
          visible={this.pickerVisible1}
          value={this.valuePicker1}
          on={{
            'update:value': (e) => {
              this.valuePicker1 = e
            },
            'update:visible': (e) => {
              this.pickerVisible1 = e
            },
            confirm: (picker) => {
              this.pickerVisible1 = false
              let value = picker.getValue()
              let value1 = new Date()

              if (Array.isArray(value)) {
                value1.setHours(value[0])
                value1.setMinutes(value[1])
                value1.setSeconds(Number(value[2]) || 0);
              }
              else {
                value1.setHours(value)
                value1.setMinutes(0)
                value1.setSeconds(0)
              }
              
              value1 = [value1, this.valueTime[1]]

              this._formatTime(value1)
              this.$emit('input', this.valueTime);

              this._resetDatesource1();
              this._resetDatesource2();
            },
          }}
          datasource={this.datasource1}
        ></ui-picker>
        <ui-picker
          ref="picker2"
          maskClose={true}
          visible={this.pickerVisible2}
          value={this.valuePicker2}
          on={{
            'update:value': (e) => {
              this.valuePicker2 = e
            },
            'update:visible': (e) => {
              this.pickerVisible2 = e
            },
            confirm: (picker) => {
              this.pickerVisible2 = false
              let value = picker.getValue()
              let value1 = new Date()

              if (Array.isArray(value)) {
                value1.setHours(value[0])
                value1.setMinutes(value[1])
                value1.setSeconds(Number(value[2]) || 0);
              }
              else {
                value1.setHours(value)
                value1.setMinutes(0)
                value1.setSeconds(0)
              }

              value1 = [this.valueTime[0], value1]

              this._formatTime(value1)
              this.$emit('input', this.valueTime)
              this._resetDatesource1();
              this._resetDatesource2();
            },
          }}
          datasource={this.datasource2}
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
    _resetDatesource1() {
      let min = this._min();
      let max = this._max();
      if (this.valueTime && febs.date.isValidate(this.valueTime[1])) {
        if (!max || max.getTime() > this.valueTime[1].getTime()) {
          max = this.valueTime[1];
        }
      }

      this.datasource1 = new UIPickerTimeDatasource({
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
      });
    },
    _resetDatesource2() {
      let min = this._min();
      let max = this._max();
      if (this.valueTime && febs.date.isValidate(this.valueTime[0])) {
        if (!min || min.getTime() < this.valueTime[0].getTime()) {
          min = this.valueTime[0];
        }
      }

      this.datasource2 = new UIPickerTimeDatasource({
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
      });
    },
    _formatTime(val) {
      this.valueTime = val
      if (!val || val.length == 0) {
        this.valueInput1 = ''
        this.valueInput2 = ''
      } else {
        if (val.length >= 2) {
          if (febs.date.isValidate(val[0]) && febs.date.isValidate(val[1])) {
            if (val[0].getTime() > val[1].getTime()) {
              this.valueTime = val = [val[1], val[0]]
              this.$emit('input', this.valueTime)
            }
          }

          if (!febs.date.isValidate(val[1])) {
            this.valueInput2 = ''
          } else {
            this.valueInput2 = febs.date.getTimeString(
              val[1].getTime(),
              this.format
            )
          }
        }

        if (val.length >= 1) {
          if (!febs.date.isValidate(val[0])) {
            this.valueInput1 = ''
          } else {
            this.valueInput1 = febs.date.getTimeString(
              val[0].getTime(),
              this.format
            )
          }
        }
      }
    },
    getText() {
      return [this.$refs.input1.text(), this.$refs.input2.text()];
    },
    showStart() {
      this.$refs.input1.focus()
    },
    hideStart() {
      this.pickerVisible1 = false
    },
    showEnd() {
      this.$refs.input2.focus()
    },
    hideEnd() {
      this.pickerVisible2 = false
    },
  },
}

injectGlobal`
  .ui-time-range-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #dcdcdc;
    width: 200px;
  }
  .ui-time-range-picker .bp-input {
    width: auto;
  }
  .ui-time-range-picker .bp-input input {
    text-align: center;
  }
`;

export const UITimeRangePicker = _UITimeRangePicker;
