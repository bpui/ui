
import Vue from "vue";
import * as febs from 'febs-browser';
import * as button from './button';
import * as checkbox from './checkbox';
import * as radio from './radio';
import * as uiswitch from './switch';
import * as input from './input';
import * as select from './select';
import * as selectPicker from './select-picker';
import * as picker from './picker';

export * from './picker';
export * from './picker-time';
export * from './picker-time-range';
export * from './picker-date';
export * from './picker-date-range';
export * from './uploader';

// global component.
function injectGlobal() {
  if (injectGlobal.installed)
    return;
  
  Vue.component('ui-button', button.UIButton);
  Vue.component('ui-button-group', button.UIButtonGroup);
  Vue.component('ui-checkbox', checkbox.UICheckbox);
  Vue.component('ui-checkbox-group', checkbox.UICheckboxGroup);
  Vue.component('ui-radio', radio.UIRadio);
  Vue.component('ui-radio-group', radio.UIRadioGroup);
  Vue.component('ui-switch', uiswitch.UISwitch);
  Vue.component('ui-input', input.UIInput);
  
  if (febs.utils.browserIsMobile()) {
    Vue.component('ui-select', selectPicker.UISelectPicker);
    Vue.component('ui-select-option', picker.UIPickerCell);
  }
  else {
    Vue.component('ui-select', select.UISelect);
    Vue.component('ui-select-option', select.UISelectOption);
  }
  injectGlobal.installed = true;
}
injectGlobal();
