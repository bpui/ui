
declare namespace ui {
  namespace storage {
    interface IStorage {
      /**
      * @desc: 数据条数.
      */
      readonly length: number;

      /**
      * @desc: 所有的key.
      */
      keys(): string[];

      /**
      * @desc: 设置信息.
      * @param data: 如果不存在, 则进行删除key操作.
      */
      set(key: string, data?: any): IStorage;

      /**
      * @desc: 获取信息.
      * @param alt: 如果获取不到信息, 使用此数据返回.
      */
      get(key: string, alt?: any): any;

      /**
      * @desc: 移除信息.
      */
      remove(key: any): IStorage;

      /**
      * @desc: 清空.
      */
      clear(): IStorage;
    }

    interface ICookieAttributes {
      /**
       * Define when the cookie will be removed. Value can be a Number
       * which will be interpreted as days from time of creation or a
       * Date instance. If omitted, the cookie becomes a session cookie.
       */
      expires?: number | Date | undefined;

      /**
       * Define the path where the cookie is available. Defaults to '/'
       */
      path?: string | undefined;

      /**
       * Define the domain where the cookie is available. Defaults to
       * the domain of the page where the cookie was created.
       */
      domain?: string | undefined;

      /**
       * A Boolean indicating if the cookie transmission requires a
       * secure protocol (https). Defaults to false.
       */
      secure?: boolean | undefined;

      /**
       * Asserts that a cookie must not be sent with cross-origin requests,
       * providing some protection against cross-site request forgery
       * attacks (CSRF)
       */
      sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;

      /**
       * An attribute which will be serialized, conformably to RFC 6265
       * section 5.2.
       */
      [property: string]: any;
    }

    interface ICookies {
  
      readonly default: ICookieAttributes;

      /**
       * @desc: 设置信息.
       */
      set(key: string, data: string, options?: ICookieAttributes): void;

      /**
       * @desc: 获取信息.
       * @param alt: 如果获取不到信息, 使用此数据返回.
       */
      get(key: string, alt?: any): string;

      /**
       * @desc: 移除信息.
       * 
       * IMPORTANT! When deleting a cookie and you're not relying on the default attributes, 
       * you must pass the exact same path and domain attributes that were used to set the cookie.
       */
      remove(key: any, options?: ICookieAttributes): void;
    }

    /**
     * @desc: 通用命名空间获取一个新的store.
     */
    function namespace(name?: string): IStorage;

    /**
     * @desc: 使用session方式存储.
     */
    function namespace_session(name?: string): IStorage;

    /**
     * @desc 获得cookies.
     */
    const cookies: ICookies;
  }
}