/**
 * 获取url或者自定义字符串中的参数
 * 
 * @param {String} name 不传name则直接返回整个参数对象
 */

export default function getQuery(name, search) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var search = decodeURIComponent(search || window.location.search)
  var r = search.substr(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}