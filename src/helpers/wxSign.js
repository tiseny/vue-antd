import Cookies from './cookie'
import axios from '../api/axios'
import getApiPath from './getApiPath'

const sha1 = require("sha1");
const crypto = require("crypto");

export default function() {
  return new Promise((resolve, reject) => {
    // 签名有效期为 7200s ，避免 频繁调用
    // ticket: {value: '', timestamp: 0s}
    let ticket = Cookies.getObject('ticket')
    let valid_timestamp = new Date().getTime() / 1000 - 7000   // 7000s 少于 7200s 避免接口请求耗时导致临界问题
    // ticket 时间有效
    if (ticket && ticket.timestamp > valid_timestamp) {
      let params = wxSign(ticket.value, window.location.href)
      wx.config({
        //debug:true,
        ...params
      })

      resolve(wx)

    } else {
      axios.get(getApiPath('WxAccount/GetTicket')).then(res => {
        if (res.success) {
          // 存储到 cookies
          Cookies.setObject('ticket', {
            value: res.data.ticket,
            timestamp: new Date().getTime() / 1000 
          })
          let params = wxSign(res.data.ticket, window.location.href)
          wx.config({
            //debug:true,
            ...params
          })

          resolve(wx)
        }
      })
    }
  })
}


export function wxSign(ticket, url) {
  let timestamp = parseInt(new Date().getTime() / 1000);
  let noncestr = crypto.randomBytes(8).toString('hex');

  let str = [`jsapi_ticket=${ticket}`, `noncestr=${noncestr}`, `timestamp=${timestamp}`, `url=${url}`].sort().join("&");

  let signature = sha1(str);

  let appid = Cookies.get('appid')

  if (!appid) {
    axios.get(getApiPath('Config/Read', { Code: 'ZDT_WXSERVICE_APPID' }))
    .then(res => {
      if (res.success){
        appid = res.data.Value
        Cookies.set('appid', res.data.Value)
      }
    })
  }

  return {
    signature: signature,
    appId: appid,
    timestamp: timestamp,
    nonceStr: noncestr,
    jsApiList: ['openLocation','getLocation']
  };
}
