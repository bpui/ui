'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

// import styled from 'styled-components';
import styled from 'vue-styled-components';
import { getRenderData } from '../_utils/componentUtils';

const _UIButtonGroup = {
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-btnGroup'];
    let children = this.$slots.default;
    return createElement('div', dataRender, children);
  }
}

export const UIButtonGroup = styled(_UIButtonGroup)`
`;


const _UIButton = {
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-btn', 'ui-btnFill'];
    let children = this.$slots.default;
    return createElement('button', dataRender, children);
  }
}

export const UIButton = styled(_UIButton)`
`;