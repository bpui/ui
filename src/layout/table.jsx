'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-14 11:16
* Desc: 
*/

// import styled from 'styled-components';
import styled, {injectGlobal} from 'vue-styled-components';
import { getRenderData } from '../_utils/componentUtils';

//--------------------------------------------------------
// table.
//--------------------------------------------------------
const _UITable = {
  data() {
    return {
      cellGroup: [
        // {
        //   width,
        //   color,
        //   align,
        //   vertical,
        // }
      ],
      sss: null,
    };
  },
  beforeMount() {
    let nodes = this.$slots.default;
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node && node.tag && node.tag.indexOf('ui-thead') >= 0) {
          nodes = node.componentOptions.children;
          if (!nodes) break;
          for (i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node && node.tag && node.tag.indexOf('ui-tr') >= 0) {
              nodes = node.componentOptions.children;
              if (!nodes) break;
              for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (node && node.tag && node.tag.indexOf('ui-th') >= 0) {
                  let pd = node.componentOptions.propsData;
                  this.cellGroup.push({
                    width: pd.width,
                    color: pd.color,
                    align: pd.align,
                    vertical: pd.vertical,
                  });
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-table'];
    let children = this.$slots.default || [];
    for (let i = 0; i < children.length; i++) {
      let node = children[i];
      if (node && node.tag) {
        node.componentOptions.propsData.cellGroup = this.cellGroup;
      }
    }

    return createElement('div', dataRender,
      [createElement('table', {
        attrs: {
          border: "0",
          cellpadding: "0",
          cellspacing: "0",
        }
      }, children)]
    );
  }
}

export const UITable = styled(_UITable)`
`;

//--------------------------------------------------------
// thead, tbody, tfoot
//--------------------------------------------------------

const _UIThead = {
  name: 'ui-thead',
  props: {
    cellGroup: [Array]
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-thead'];
    let children = this.$slots.default;
    return createElement('thead', dataRender, children);
  }
}

export const UIThead = styled(_UIThead)`
`;

const _UITbody = {
  name: 'ui-tbody',
  props: {
    cellGroup: [Array]
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-tbody'];
    let children = this.$slots.default;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node && node.tag) {
          node.componentOptions.propsData.cellGroup = this.cellGroup;
        }
      }
    }
    return createElement('tbody', dataRender, children);
  }
}

export const UITbody = styled(_UITbody)`
`;


const _UITfoot = {
  name: 'ui-tfoot',
  props: {
    cellGroup: [Array]
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-tfoot'];
    let children = this.$slots.default;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node && node.tag) {
          node.componentOptions.propsData.cellGroup = this.cellGroup;
        }
      }
    }
    return createElement('tfoot', dataRender, children);
  }
}

export const UITfoot = styled(_UITfoot)`
`;

//--------------------------------------------------------
// tr
//--------------------------------------------------------

const _UITr = {
  name: 'ui-tr',
  props: {
    cellGroup: [Array]
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-tr'];
    let children = this.$slots.default;
    if (children && this.cellGroup) {
      let j = 0;
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node && node.tag) {
          let cell = this.cellGroup[j++];
          if (cell) {
            node.componentOptions.propsData.width = cell.width;
            node.componentOptions.propsData.color = cell.color;
            node.componentOptions.propsData.align = cell.align;
            node.componentOptions.propsData.vertical = cell.vertical;
          }
        }
      }
    } else {
      let j = 0;
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node && node.tag && node.tag.indexOf('ui-th') > 0) {
          node.componentOptions.propsData.cellindex = j++;
        }
      }
    }
    return createElement('tr', dataRender, children);
  }
}

export const UITr = styled(_UITr)`
`;

//--------------------------------------------------------
// th, td
//--------------------------------------------------------

const _UITh = {
  name: 'ui-th',
  props: {
    width: String,
    color: String,
    align: String,
    vertical: String,
    cellindex: Number,
  },
  watch: {
    width(v) {
      this.$parent.$parent.$parent.$parent.$parent.cellGroup[this.cellindex].width = v;
    },
    color(v) {
      this.$parent.$parent.$parent.$parent.$parent.cellGroup[this.cellindex].color = v;
    },
    align(v) {
      this.$parent.$parent.$parent.$parent.$parent.cellGroup[this.cellindex].align = v;
    },
    vertical(v) {
      this.$parent.$parent.$parent.$parent.$parent.cellGroup[this.cellindex].vertical = v;
    },
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-th'];
    dataRender.attrs = {
      colspan: "1",
      rowspan: "1",
    };
    let children = this.$slots.default;
    return createElement('th', dataRender, children);
  }
}

const UIThProps = { 
  width: String,
  color: String,
  align: String,
  vertical: String,
};
export const UITh = styled(_UITh, UIThProps)`
  width: ${props=>props.width||'120px'};
  color: ${props => props.color};
  text-align: ${props => props.align};
  vertical-align: ${props => props.vertical};
`;

const _UITd = {
  name: 'ui-td',
  props: {
  },
  render(createElement) {
    let dataRender = getRenderData(this);
    dataRender.class = ['ui-td'];
    dataRender.attrs = {
      colspan: "1",
      rowspan: "1",
    };
    let children = this.$slots.default;
    return createElement('td', dataRender, children);
  }
}

export const UITd = styled(_UITd, UIThProps)`
  color: ${props=>props.color};
  text-align: ${props => props.align};
  vertical-align: ${props => props.vertical};
`;


//--------------------------------------------------------
// injectGlobal
//--------------------------------------------------------

injectGlobal`

  .ui-table {
    overflow: auto;
    table {
      border: none;
      font-family: "Noto Sans SC";
      font-size: 14px;
      table-layout: fixed;
      border-collapse: separate;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    
    tr {
      min-height: 41px;
      transition: background-color .25s ease;
    }

    th, td {
      word-break: break-word;
      border: none;
      margin: 0;
      padding: 10px 10px;
      &:first-child {
        padding-left: 17px;
      }
    }

    th {
      font-weight: 700;
      user-select: none;
    }

    td {
      font-weight: 400;
      user-select: initial;
      transition: background-color .25s ease;
      -webkit-border-horizontal-spacing: 0px;
      -webkit-border-vertical-spacing: 0px;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;

      @media screen and (max-width: 767px) {
        width: 0px;
        height: 0px;
      }
    }


    /* 滑块颜色 */
    ::-webkit-scrollbar-thumb {

      border-radius: 4px;
      @media screen and (max-width: 767px) {
        border-radius: 2px;
      }
    }

    /* 滑轨两头的监听按钮颜色 */
    ::-webkit-scrollbar-button {
      height: 0px;
      width: 0px;
    }
  }

  html[data-theme="light"] {
    .ui-table {
      box-shadow: 1px 1px 5px 0px #c2c8d728;
      table {
        background: #fff;
      }
      
      tr {
        background: #fff;
      }

      th, td {
        border-bottom: 1px solid #e8e8e8;
      }

      tbody {
        tr {
          &:hover {
            background-color: #f5f7fa;
          }
        }
      }

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        th, td {
          border-bottom: none;
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-position: bottom;
          background-image: linear-gradient(0deg, #e8e8e8 49%, transparent 51%, transparent);
        }
      }

      /* 滚动条的滑轨背景颜色 */
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.001);
      }


      /* 滑块颜色 */
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.25);

        @media screen and (max-width: 767px) {
          background-color: rgba(0, 0, 0, 0);
        }
      }

      /* 滑轨两头的监听按钮颜色 */
      ::-webkit-scrollbar-button {
        background-color: rgba(0, 0, 0, 0.12);
      }

      /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
      ::-webkit-scrollbar-corner {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  html[data-theme="dark"] {
    .ui-table {
      box-shadow: 1px 1px 5px 0px rgba(0,0,0,13%);
      table {
        background: #373737;
      }
      
      tr {
        background: #373737;
      }

      th, td {
        border-bottom: 1px solid #2A282C;
      }

      tbody {
        tr {
          &:hover {
            background-color: #424242;
          }
        }
      }

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        th, td {
          border-bottom: none;
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-position: bottom;
          background-image: linear-gradient(0deg, #2A282C 49%, transparent 51%, transparent);
        }
      }

      /* 滚动条的滑轨背景颜色 */
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.001);
      }


      /* 滑块颜色 */
      ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.78);

        @media screen and (max-width: 767px) {
          background-color: rgba(0, 0, 0, 0);
        }
      }

      /* 滑轨两头的监听按钮颜色 */
      ::-webkit-scrollbar-button {
        background-color: rgba(0, 0, 0, 0.12);
      }

      /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
      ::-webkit-scrollbar-corner {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;