
import Vue from "vue";
import * as button from './button';
import * as checkbox from './checkbox';
import * as radio from './radio';
import * as uiswitch from './switch';
import * as input from './input';
import * as select from './select';

export * from './picker';
export * from './picker-time';
export * from './picker-time-range';
export * from './picker-date';
export * from './picker-date-range';
export * from './actionsheet';
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
  Vue.component('ui-select', select.UISelect);
  Vue.component('ui-select-option', select.UISelectOption);

  injectGlobal.installed = true;
}
injectGlobal();
