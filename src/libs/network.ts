'use strict';

/**
* Copyright (c) 2021 bpui All Rights Reserved.
* Author: brian.li
* Date: 2021-09-08 17:44
* Desc: 
*/

import * as febs from 'febs-browser';
import urlUtils from '../_utils/urlUtils';
import qs from '../_utils/qs/dist';

const DefaultDelayTime = 500 // londing出现的延迟时间
const DefaultTimeout = 20000;

function networkHandlerProvider(): void {
}

function getNetworkHandler(): /*bp.network.INetworkHandler*/any {
  return (networkHandlerProvider as any).handler;
}

export function setNetworkHandler(handler: /*bp.network.INetworkHandler*/any): void {
  (networkHandlerProvider as any).handler = handler;
}

/**
 * @desc: 获取EncodeURIComponent类型url
 * @param params: url|string  params|object
 * @return: string
 */

function _getEncodeURIComponent(url: string, params: any): string {
  url = encodeURIComponent(url);
  if (params) {
    if (url.indexOf('?') < 0) {
      url += '?';
    }
    url += qs.stringify(params);
  }
  return url
}

/**
 * @desc: 网络请求.
 * @return: Promise
 */
function _net(url: string, option: /*bp.network.FetchOption*/any): Promise<any> {
  let handler = getNetworkHandler();

  if (!option.noLoading) {
    handler.onShowLoading(option.loadingDom, DefaultDelayTime);
  }

  let uriLower = url.toLowerCase();
  if (uriLower.indexOf('https://') != 0 && uriLower.indexOf('http://') != 0) {
    uriLower = url;
  }
  else {
    uriLower = urlUtils.join(handler.requestHost, url);
  }

  // set options.
  let defaultOption = febs.utils.mergeMap(handler.defaultRequestOption);
  if (!defaultOption.hasOwnProperty('mode')) {
    defaultOption.mode = 'cors';
  }
  if (!defaultOption.hasOwnProperty('timeout')) {
    defaultOption.timeout = DefaultTimeout;
  }
  defaultOption = febs.utils.mergeMap(defaultOption, option);

  if (defaultOption.body && typeof defaultOption.body !== 'string') {
    if (defaultOption.contentType == 'formData') {
      defaultOption.body = qs.stringify(defaultOption.body);
      defaultOption.headers = defaultOption.headers || {};
      defaultOption.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    else {
      defaultOption.body = JSON.stringify(defaultOption.body);
      defaultOption.headers = defaultOption.headers || {};
      defaultOption.headers['Content-Type'] = 'application/json';
    }
  }

  return febs.net
    .fetch(
      uriLower,
      defaultOption
    )
    .then((res: any) => {
      if (option.rawHandle) {
        return option.rawHandle(res)
      }
      return res
    })
    .then((res: Response) => {
      let contentType = res.headers.get('Content-Type');
      if (contentType.indexOf('json') >= 0) {
        return res.json();
      }
      if (contentType.indexOf('application/octet-stream') >= 0) {
        return res.blob();
      }
      else {
        return res.text();
      }
    })
    .then((res: any) => {
      return handler.onErrorHandler(res);
    })
    .catch((err: any) => {
      console.log('network is error')
      throw err
    })
    .finally(() => {
      if (!option.noLoading) {
        handler.onHideLoading(option.loadingDom)
      }
    });
}


/**
 * @desc: get请求.
 * @param body: 请求参数. get方式作为 querystring 传递.
 * @return: Promise
 */
function get(url: string, body: any, option?: /*bp.network.FetchOption*/any): Promise<any> {
  let uri = _getEncodeURIComponent(url, body);
  return _net(uri, febs.utils.mergeMap(option, {method:'get'}));
}

/**
 * @desc: post请求.
 * @param body: 请求参数.
 * @return: Promise
 */
function post(url: string, body: any, option?: /*bp.network.FetchOption*/any): Promise<any> {
  let uri = _getEncodeURIComponent(url, null);
  return _net(uri, febs.utils.mergeMap(option, {
    method: 'post',
    body: body,
  }));
}

/**
 * @desc: put请求.
 * @param body: 请求参数.
 * @return: Promise
 */
function put(url: string, body: any, option?: /*bp.network.FetchOption*/any): Promise<any> {
  let uri = _getEncodeURIComponent(url, null);
  return _net(uri, febs.utils.mergeMap(option, {
    method: 'post',
    body: body,
  }));
}

/**
 * @desc: delete请求.
 * @param body: 请求参数.
 * @return: Promise
 */
function deleteFoo(url: string, body: any, option?: /*bp.network.FetchOption*/any): Promise<any> {
  let uri = _getEncodeURIComponent(url, null);
  return _net(uri, febs.utils.mergeMap(option, {
    method: 'delete',
    body: body,
  }));
}

export const network = {
  get,
  post,
  put,
  delete: deleteFoo,
}