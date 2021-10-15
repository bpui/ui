'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

// import styled from 'styled-components';
import styled, {injectGlobal} from 'vue-styled-components';

//--------------------------------------------------------
// row.
//--------------------------------------------------------
const UIRowProps = { 
  gutter: [String, Number],
};
export const UIRow = styled('div', UIRowProps)`
  position: relative;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  margin-left: ${props => props.gutter ? (parseInt(props.gutter)==props.gutter?'calc( -' + props.gutter + 'px / 2 )':'calc( -' + props.gutter + ' / 2 )') : null};
  margin-right: ${props => props.gutter ? (parseInt(props.gutter)==props.gutter?'calc( -' + props.gutter + 'px / 2 )':'calc( -' + props.gutter + ' / 2 )') : null};
  & > div {
    padding-left: ${props=>props.gutter ? (parseInt(props.gutter)==props.gutter?'calc( ' + props.gutter + 'px / 2 )':'calc( ' + props.gutter + ' / 2 )') : null};
    padding-right: ${props=>props.gutter? (parseInt(props.gutter)==props.gutter?'calc( ' + props.gutter + 'px / 2 )':'calc( ' + props.gutter + ' / 2 )') : null};
  }
`;

//--------------------------------------------------------
// col.
//--------------------------------------------------------
const UIColProps = { 
  span: [String, Number],
  offset: [String, Number],
};
export const UICol = styled('div', UIColProps)`
  float: left;
  box-sizing: border-box;
  :after {
    clear: both;
    content: "";
  }
  width: ${props=> 1 / 24 * Number(props.span) * 100 + '%' };
  margin-left: ${props=>props.offset? 1 / 24 * Number(props.offset) * 100 + '%': null };
`;

//--------------------------------------------------------
// injectGlobal
//--------------------------------------------------------

// injectGlobal`
// `;