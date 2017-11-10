import Vue from 'vue'
import App from './app'
import axios from "axios";
import router from './router'
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);

const Axios = axios.create({
  baseURL: "http://101.132.26.45:8089/v26", //基准路径
  timeout: 10000, //超时时间
  responseType: "json",
  withCredentials: false, //是否携带cookie
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});
Vue.prototype.$ajax=Axios;
Vue.config.productionTip = false

  // 获取与原生通信的bridge
  let setupWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function() {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  };

  setupWebViewJavascriptBridge(bridge => {
    /* Initialize your app here */
    if (!bridge) {
      return;
    }
    Vue.prototype.$bridge = bridge
    
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
