
import Vue from "vue";
import * as febs from 'febs-browser';

import bpNavbarView from '@bpui/navbar-view';
import * as tableview from './tableview';
import * as table from './table';
import * as row_col from './row_col';

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

  Vue.component('ui-table', table.UITable);
  Vue.component('ui-thead', table.UIThead);
  Vue.component('ui-tbody', table.UITbody);
  Vue.component('ui-tfoot', table.UITfoot);
  Vue.component('ui-tr', table.UITr);
  Vue.component('ui-th', table.UITh);
  Vue.component('ui-td', table.UITd);

  Vue.component('ui-row', row_col.UIRow);
  Vue.component('ui-col', row_col.UICol);

  injectGlobal.installed = true;
}
injectGlobal();
