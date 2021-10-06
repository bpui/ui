'use strict'

/**
 * Copyright (c) 2021 bpui All Rights Reserved.
 * Author: brian.li
 * Date: 2021-09-14 11:16
 * Desc:
 */

import * as febs from 'febs-browser'
import { injectGlobal }  from 'vue-styled-components'
import { UIPicker, UIPickerDateDatasource } from './picker'
import { i18n } from '../_utils/i18n';

const _UIDateRangePicker = {
  name: 'ui-date-range-picker',
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
        i18n('common.选择日期', '选择日期')
      );
    },
  },
  watch: {
    value: function(val, oldVal) {
      this._formatTime(val)

      if (this.valueTime) {
        if (febs.date.isValidate(this.valueTime[0])) {
          this.valuePicker1 = [
            this.valueTime[0].getFullYear(),
            this.valueTime[0].getMonth(),
            this.valueTime[0].getDate(),
          ]
        }

        if (febs.date.isValidate(this.valueTime[1])) {
          this.valuePicker2 = [
            this.valueTime[1].getFullYear(),
            this.valueTime[1].getMonth(),
            this.valueTime[1].getDate(),
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
    showMonth(val) {
      this._resetDatesource1();
      this._resetDatesource2();
    },
    showDate(val) {
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
            this.valueTime[0].getFullYear(),
            this.valueTime[0].getMonth(),
            this.valueTime[0].getDate(),
          ]
        }
        if (febs.date.isValidate(this.valueTime[1])) {
          this.valuePicker2 = [
            this.valueTime[1].getFullYear(),
            this.valueTime[1].getMonth(),
            this.valueTime[1].getDate(),
          ]
        }
      }
    }

    this._resetDatesource1();
    this._resetDatesource2();
  },
  render(createElement) {
    return (
      <div class={{ 'ui-date-range-picker': true }}>
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
                this.valueTime[0].getFullYear(),
                this.valueTime[0].getMonth(),
                this.valueTime[0].getDate(),
              ]
            }
            this.pickerVisible1 = true
          }}
          value={this.valueInput1}
          on={{
            input: (e) => {
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
                this.valueTime[1].getFullYear(),
                this.valueTime[1].getMonth(),
                this.valueTime[1].getDate(),
              ]
            }
            this.pickerVisible2 = true
          }}
          value={this.valueInput2}
          on={{
            input: (e) => {
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
            input: (e) => {
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
                value1.setFullYear(value[0])
                value1.setMonth(value[1])
                value1.setDate(Number(value[2]) || 1);
              }
              else {
                value1.setFullYear(value)
                value1.setMonth(0)
                value1.setDate(1)
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
            input: (e) => {
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
                value1.setFullYear(value[0])
                value1.setMonth(value[1])
                value1.setDate(Number(value[2]) || 1);
              }
              else {
                value1.setFullYear(value)
                value1.setMonth(0)
                value1.setDate(1)
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
    _resetDatesource1() {
      let min = this._min();
      let max = this._max();
      if (this.valueTime && febs.date.isValidate(this.valueTime[1])) {
        if (!max || max.getTime() > this.valueTime[1].getTime()) {
          max = this.valueTime[1];
        }
      }

      this.datasource1 = new UIPickerDateDatasource({
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

      this.datasource2 = new UIPickerDateDatasource({
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
  .ui-date-range-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #dcdcdc;
    width: 244px;
  }
  .ui-date-range-picker .bp-input {
    width: auto;
  }
  .ui-date-range-picker .bp-input input {
    text-align: center;
  }
`;

export const UIDateRangePicker = _UIDateRangePicker;