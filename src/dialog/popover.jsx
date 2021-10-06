'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

import bpui from '@bpui/popover';
import styled from 'vue-styled-components';

import { getRenderData } from '../_utils/componentUtils';

export const UIPopover = bpui.bpPopover;

const _UIPopoverCell = {
  props: {
    warn: Boolean,
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['bp-popover__cell'];
    if (this.warn) {
      dataRender.class.push('bp-popover__cellWarn');
    }
    let children = this.$slots.default;
    return createElement('div', dataRender, children);
  }
}

export const UIPopoverCell = styled(_UIPopoverCell)`
`;