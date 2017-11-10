import Vue from 'vue'
import App from './App'
import axios from 'axios'
import loading from './components/base/loading/index'
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.config.productionTip = false
const Axios = axios.create({
  baseURL: "http://101.132.26.45:8089/v26", //基准路径
  timeout: 10000, //超时时间
  responseType: "json",
  withCredentials: false, //是否携带cookie
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});
Vue.prototype.$ajax = Axios
Vue.prototype.$loading=loading
new Vue({
  el: '#app',
  render: h => h(App)
})
