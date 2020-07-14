import Cookies from './cookie'
// 如果 code 被使用了
export default function(url, scope) {
  // 去掉code
  url = url || window.location.href.split(',')[0]
  const REDIRECT_URI = window.encodeURIComponent(url);
  const SCOPE = scope // type == 0 ? 'snsapi_base' : 'snsapi_userinfo'
  const STATE = '1'
  const codeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Cookies.get('appid')}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`

  window.location.replace(codeUrl)
}