// fetch 取来 接来
import axios from 'axios'
import qs from 'qs' //序列化表单数据
import {
  Toast
} from 'mint-ui'
import loading from '@/components/loading/'
// import md5 from 'md5'
// 创建实例时设置配置的默认值
const Axios = axios.create({
  baseURL: '/',
  timeout: 10000,
  // responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些  表示跨域请求时是否需要使用凭证  默认为false
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  } //请求头
})

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  // 在发送请求之前做些什么
  config => {
    loading.open()
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 表单序列化
      config.data = qs.stringify(config.data)
    }
    return config
  },
  // 对请求错误做些什么
  error => {
    Toast({
      message: error
    })
    // 捕获错误
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  // 对响应数据做点什么
  res => {
    loading.close()
    if (!res.data.errCode) {
      return res
    }
    //对响应数据做些事
    // 没有请求到数据
    if (res.data && (res.data.errCode != 0)) {
      let msg = res.data.errMsg || res.data.data.errorMsg
      if (msg) {
        Toast({
          message: msg
        })
      } else {
        Toast({
          message: '请求出错'
        })
      }
      return Promise.reject(res.data)
    }
    return res
  },
  // 对响应错误做点什么
  error => {
    let msg = ''
    // try{
    //正常执行
    // }catch(e/*你感觉会出错的 错误类型*/){
    // 可能出现的意外  eg:用户自己操作失误 或者 函数少条件 不影响下面的函数执行 
    // 有时也会用在 比如 focus()  但可恶的ie有可能会第一次没有focus事件 再让他执行一次 
    //  有时一些不是bug的bug  在ie上 他要求必须加上 catch  哪怕就一个空catch 以前在ie8上遇到过这个操蛋的js问题
    // }
    //throw '出错 抛出 效果等同 for循环中的 break 直接停止该函数的运行'

    try {
      msg = error.response.data.message
    } catch (e) {
      msg = error.message || '请求超时，请稍后再试'
    }
    // 找到指定的值
    if (msg.match('timeout')) {
      msg = '请求超时，请稍后再试'
    }
    if (msg.match('Network Error')) {
      msg = '无法连接到网络'
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
  // //这个对象身上有一个默认的方法 叫做install  默认传入的一个参数  
	//外界调用的时候就回默认调用install方法
  install: function (Vue, Option) {

    // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
    // 绑定到vue中

    // var a= {}
    // Object.defineProperty(a,"b",{
    //   value:123
    // })
    // console.log(a.b);//123
    // 第一个参数:目标对象
    
    // 第二个参数:需要定义的属性或方法的名字。
    
    // 第三个参数:目标属性所拥有的特性。（descriptor）
    
    // 前两个参数不多说了，一看代码就懂，主要看第三个参数descriptor，看看有哪些取值
    Object.defineProperty(Vue.prototype, '$http', {
      value: Axios
    })
  }
}
// 把fetch函数导出

export function fetch(url, data, method = 'post') {
  let options = {
    method: method,
    url: url
  }
  // toLowerCase()把字符串转为小写
  // 判断是post 还是get方式
  if (method.toLowerCase().match(/post|put|patch/i)) {
    // post方式传参
    options.data = data
  } else {
    // get方式传参
    options.params = data
  }
  // 把url  data method 当成一个对象传入
  return Axios(options)
}
