import { cookie_prefix } from '../../config'

export default class CustomCookies {
  
  static get(name) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    const value = localStorage.getItem(name)
    return value != "undefined" ? value : ''
  }

  static set(name, value) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    localStorage.setItem(name, value)
  }

  static remove(name) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    localStorage.removeItem(name)
  }

  // 针对数组类型
  static push(name, value) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    var str = localStorage.getItem(name)
    var arr = str ? JSON.parse(str) : []
    if (!str || str && str.indexOf(JSON.stringify(value)) == -1) {
      arr.unshift(value)
    }
    localStorage.setItem(name, JSON.stringify(arr.slice(0, 20)))
  }

  // 直接返回对象
  static getObject(name) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    const value = localStorage.getItem(name)
    return value ? JSON.parse(value) : null
  }

  // 设置对象
  static setObject(name, params) {
    name = `${cookie_prefix}_${name}`.toUpperCase()
    localStorage.setItem(name, JSON.stringify(params))
  }

  // 清除所有，只保留记住密码
  static clearAll() {
    let remember = null
    if(this.getObject('remember_me')) {
      remember = this.getObject('remember_me')
    }

    localStorage.clear()
    if(remember) {
      this.setObject('remember_me', remember)
    }
  }
} 
