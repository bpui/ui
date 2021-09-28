
declare namespace ui {
  namespace network {
    type FetchOptionBase = {
      /**
       * @desc timeout
       */
      timeout?: number, // 默认20000ms.
      mode?: RequestMode,
      credentials?: RequestCredentials,
      headers?: any,
      /**
       * @desc 请求体格式. 默认为json.
       */
      contentType?: 'json' | 'formData',
    }

    /**
     * @desc 请求的参数.
     */
    type FetchOption = FetchOptionBase & {
      /**
       * @desc 接收到服务器反馈消息后, 先进行一次原始数据的处理并将处理后的结果返回.
       */
      rawHandle?: (serverData: any) => any,
      /**
       * @desc 不触发遮罩层，默认有遮罩层.
       */
      noLoading?: boolean,
      /**
       * @desc loading遮罩层所处的DOM，默认为 'body'.
       */
      loadingDom?: any,
    };


    /**
     * @desc 网络消息处理器.
     */
    interface INetworkHandler {
      /**
       * @desc 获取网络请求的站点地址;
       * 
       * 如果请求的url不是http/https开头, 将使用此站点地址作为前缀.
       */
      readonly requestHost: string;
      /**
       * @desc 默认的请求选项.
       */
      readonly defaultRequestOption: FetchOptionBase;
      /**
       * @desc: 处理api错误.
       * @param data: 服务器返回的消息.
       * @param err_msg: 使用err_msg来代替服务器的错误消息.
       * @return: 如果正确将返回data, 否则返回null.
       */
      onErrorHandler(data: any): any;

      /**
       * 显示loading.
       * @param loadingDom 要显示loading的dom.
       * @param delay      延迟多久显示
       */
      onShowLoading(loadingDom?: any, delay?: number): void;

      /**
       * 隐藏loading.
       * @param loadingDom 正在显示loading的dom.
       */
      onHideLoading(loadingDom?: any): void;
    }

    interface INetwork {
      /**
       * @desc: get请求.
       * @param body: 请求参数. get方式作为 querystring 传递.
       * @return: Promise
       */
      get(url: string, body: any, option?: FetchOption): Promise<any>;
      /**
       * @desc: post请求.
       * @param body: 请求参数.
       * @return: Promise
       */
      post(url: string, body: any, option?: FetchOption): Promise<any>;
      /**
       * @desc: put请求.
       * @param body: 请求参数.
       * @return: Promise
       */
      put(url: string, body: any, option?: FetchOption): Promise<any>;
      /**
       * @desc: delete请求.
       * @param body: 请求参数.
       * @return: Promise
       */
      delete(url: string, body: any, option?: FetchOption): Promise<any>;
    }
  }
}