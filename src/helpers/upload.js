import getPath from './getApiPath'
import axios from '../api/axios'


export default function uploadFile(params, callback) {
  var url = getPath(params.url, params.header); // 接收上传文件的后台地址
  var form = new FormData(); // FormData 对象

  for (var key in params.body) {
    form.append(key, params.body[key]); // 文件对象
  }

  axios({
    url:url,
    method: 'post',
    data: form,
    timeout: 480000,
    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
    contentType: false,   // 告诉axios不要去设置Content-Type请求头
  }).then((res)=>{
    callback(res)
  })
}


