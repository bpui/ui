'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

import bpui from '@bpui/actionsheet';
import styled from 'vue-styled-components';

import { getRenderData } from '../_utils/componentUtils';

export const UIActionsheet = bpui.bpActionsheet;

const _UIActionsheetGroup = {
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['bp-actionsheet__group'];
    let children = this.$slots.default;
    return createElement('div', dataRender, children);
  }
}

export const UIActionsheetGroup = styled(_UIActionsheetGroup)`
`;


const _UIActionsheetCell = {
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['bp-actionsheet__cell'];
    let children = this.$slots.default;
    return createElement('div', dataRender, children);
  }
}

export const UIActionsheetCell = styled(_UIActionsheetCell)`
`;
