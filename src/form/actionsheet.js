'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

import bpui from '@bpui/actionsheet';
import styled from 'vue-styled-components';

export const UIActionsheet = bpui.bpActionsheet;

export const UIActionsheetGroup = styled('div').attrs({
  className: 'bp-actionsheet__group'
})`
`;
export const UIActionsheetCell = styled('div').attrs({
  className: 'bp-actionsheet__cell'
})`
`;