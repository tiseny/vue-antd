// 将对象转换成参数序列
export default function param(paramData) {

  let params = []

  if (!paramData || typeof paramData !== 'object') {
    return ''
  }

  for (let key in paramData) {
    let val = paramData[key]
    let p;
    if (Array.isArray(val) && val.length > 0) {
      for (let i = 0; i < val.length; i++) {
        let value = val[i] ? val[i].replace(/%([^\d].)/, "%25$1") : '';
        p = `${encodeURIComponent(key + '[' + i + ']')}=${encodeURIComponent(value)}`;
        params.push(p);
      }
    } else {
      p = `${encodeURIComponent(key)}=${val === undefined || val === null ? '' : encodeURIComponent(val)}`
      params.push(p);
    }
  }

  return params.join('&');
}

export function setParam(url, name, value) {

  var oUrl = decodeURIComponent(url);
  var reg = eval(`/(${name}=)([^&]*)/gi`);
  var nUrl = oUrl ? oUrl.replace(reg,`${name}=${value}`) : `${name}=${value}`;
  return encodeURIComponent(nUrl);
}