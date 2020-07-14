const QQMapWX = require('./qqmap-jssdk.js');
const config = require('../../config')
const $ = require('jquery')

// location 
// { latitude, longitude }
export default function getAddress(coords, callback) {
  $.ajax({
      url: "https://apis.map.qq.com/ws/geocoder/v1/",
      type: "get",
      dataType: 'jsonp',
      data: {
        location: coords.latitude + "," + coords.longitude,
        key: config.qqAK,
        output: "jsonp"
      },
      success: function (res) {
        console.log(res)
        callback(res.result.address)
      }
  });
}


/**
* 坐标转换，百度地图坐标转换成腾讯地图坐标
* lng 腾讯经度（pointy）
* lat 腾讯纬度（pointx）
* 经度>纬度
*/
export function bMapToQQMap(lng, lat) {

  if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];

  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng - 0.0065;
  var y = lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var lng = (z * Math.cos(theta));
  var lat = (z * Math.sin(theta));

  return [lng, lat];

}

/**
* 坐标转换，腾讯地图转换成百度地图坐标
* lng 腾讯经度（pointy）
* lat 腾讯纬度（pointx）
* 经度>纬度
*/

export function qqMapToBMap(lng, lat) {

  if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];

  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng;
  var y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var lng = (z * Math.cos(theta) + 0.0065);
  var lat = (z * Math.sin(theta) + 0.006);
  return [lng, lat];

}