import axios from 'axios'
import qs from 'qs' //序列化表单数据
import {
  Toast
} from 'mint-ui'
import loading from '@/components/loading/'
// import md5 from 'md5'

const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    loading.open()
      // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Toast({
      message: error
    })
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    loading.close()
    if (!res.data.errCode) {
      return res
    }
    //对响应数据做些事
    if (res.data && (res.data.errCode != 0)) {
      let msg = res.data.errMsg || res.data.data.errorMsg
      if(msg){
        Toast({
          message: msg
        })
      }else{
        Toast({
          message: '请求出错'
        })
      }
      return Promise.reject(res.data)
    }
    return res
  },
  error => {
    let msg = ''
    try {
      msg = error.response.data.message
    } catch (e) {
      msg = error.message || '请求超时，请稍后再试'
    }
    if(msg.match('timeout')){
      msg = '请求超时，请稍后再试'
    }
    loading.close()
    Toast({
      message: msg || error
    })
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}

export function fetch(url, data, method = 'post') {
  let options = {
    method: method,
    url: url
  }
  if (method.toLowerCase().match(/post|put|patch/i)) {
    options.data = data
  } else {
    options.params = data
  }
  return Axios(options)
}