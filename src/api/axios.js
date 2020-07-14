import { Dialog } from 'vant'
import { baseAlias, token_sign } from '../../config'
import Cookies from '../helpers/cookie'
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  headers: {
    "Accept": "ajax",
    "Content-Type": "application/json"
  },
  //baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  timeout: 30000
})


//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    let cancel
    let token = Cookies.get('token')
    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function(c) {
    	cancel = c
    })

    // 将 token 添加到请求头
    if (token) {
      config.headers[token_sign] = token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code == '000002') {
        Cookies.remove('token')
        Cookies.remove('userInfo')
        Dialog.confirm({
          title: '提示',
          message: '您还未登录或登录已失效'
        }).then(() => {
          window.location.href = `${baseAlias}/home`
        }).catch(() => {
          // on cancel
        });
      } 
      return Promise.resolve(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    switch (error.response.status) {
      case 401:
      case 403:
      case 404:
      case 500:
      default:
        console.error('请求错误')
    }
    return Promise.resolve(error.response.data)
  }
)

export default instance
