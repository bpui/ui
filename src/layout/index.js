
import Vue from "vue";
import * as febs from 'febs-browser';

import bpNavbarView from '@bpui/navbar-view';
import * as tableview from './tableview';

// global component.
function injectGlobal() {
  if (injectGlobal.installed)
    return;

  Vue.component('ui-table-view', tableview.UITableView);
  Vue.component('ui-table-cell', tableview.UITableCell);
  Vue.component('ui-table-cell-center', tableview.UITableCellCenter);
  Vue.component('ui-table-cell-left', tableview.UITableCellLeft);
  Vue.component('ui-table-cell-right', tableview.UITableCellRight);
  Vue.component('ui-table-cell-editor', tableview.UITableCellEditor);

  Vue.component('ui-navbar-view', bpNavbarView.bpNavbarView);
  Vue.component('ui-navbar', bpNavbarView.bpNavbar);

  injectGlobal.installed = true;
}
injectGlobal();
