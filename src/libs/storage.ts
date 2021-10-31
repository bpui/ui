import * as febs from 'febs-browser'
import store from 'store2'
import cookies from 'js-cookie'

class Store {
  s: store.StoreAPI

  constructor(s: store.StoreAPI) {
    this.s = s
  }

  /**
   * @desc: 数据条数.
   */
  get length() {
    return this.s.size()
  }

  /**
   * @desc: 所有的key.
   */
  keys() {
    return this.s.keys()
  }

  /**
   * @desc: 设置信息.
   */
  set(key: string, data: any) {
    if (!data) {
      return this.remove(key)
    }

    if (!(data)) {
      return this.remove(key)
    }

    data = JSON.stringify(data);
    data = febs.crypt.base64_encode(data)

    this.s.set(key, data, true)
    return this
  }

  /**
   * @desc: 获取信息.
   * @param alt: 如果获取不到信息, 使用此数据返回.
   */
  get(key: string, alt: any = null) {
    // let r = this.s.get(key, alt)
    if (!this.s.has(key)) {
      return alt
    }
    let r = this.s.get(key)
    if (r) {
      r = febs.crypt.base64_decode(r)
      r = febs.string.bytesToUtf8(r || [])

      try {
        return JSON.parse(r);
      } catch (e) {
        this.remove(key);
        return null;
      }
    }
    return r
  }

  /**
   * @desc: 移除信息.
   */
  remove(key: any) {
    this.s.remove(key)
    return this
  }

  /**
   * @desc: 清空.
   */
  clear() {
    this.s.clearAll()
    return this
  }
}

export const storage = {
  /**
   * @desc: 通用命名空间获取一个新的store.
   */
  namespace: function(nm?: string) {
    return new Store(store.namespace(nm||"default"))
  },

  /**
   * @desc: 使用session方式存储.
   */
  namespace_session: function(nm?: string) {
    return new Store(store.session.namespace(nm||"default"))
  },

  cookies: {

    get default(): any {
      return cookies.defaults;
    },

    /**
     * @desc: 设置信息.
     */
    set(key: string, data: string, options?: any) {
      if (!data) {
        return this.remove(key, options)
      }

      if (febs.string.isEmpty(data)) {
        return this.remove(key, options)
      }

      cookies.set(key, data, options)
      return this
    },

    /**
     * @desc: 获取信息.
     * @param alt: 如果获取不到信息, 使用此数据返回.
     */
    get(key: string, alt: any = null) {
      let v = cookies.get(key)
      return v || alt
    },

    /**
     * @desc: 移除信息.
     */
    remove(key: any, options?: any) {
      try {
        cookies.remove(key, options)
      } catch (e) {}
      return this
    },
  },
}
