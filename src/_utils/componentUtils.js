'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-28 17:39
* Desc: 
*/

export function getRenderData(ctx) {
  let dataRender = {};
  // event.
  const handler = (name) => {
    return e => {
      ctx.$emit(name, e);
    }
  }

  const on = {}
  if (ctx.$listeners) {
    for (let e in ctx.$listeners) {
      on[e] = handler(e);
    }
  }

  dataRender.on = on;
  return dataRender;
}