// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import loading from './components/loading/index'
import {
  Button,
  Radio,
  Checklist,
  Popup,
  Toast,
  MessageBox
} from 'mint-ui'
import ajax from './service/fetch.js'

Vue.use(ajax)

Vue.prototype.$loading = loading

Vue.component(Button.name, Button)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component(Popup.name, Popup)
Vue.prototype.$toast = Toast
Vue.prototype.$message = MessageBox

Vue.config.productionTip = false


// 获取与原生通信的bridge
let setupWebViewJavascriptBridge = function(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function() {
        callback(window.WebViewJavascriptBridge)
      },
      false
    )
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

// setTimeout(() => {
// 获取bridge
setupWebViewJavascriptBridge((bridge) => {
    /* Initialize your app here */
    if (!bridge) {
      return
    }
    bridge.registerHandler('getPayResult', (res) => {
      try {
        let result = res
        if (typeof res == 'string') {
          result = JSON.parse(res)
        }
        store.commit('setPayResult', result)
      } catch (e) {
        alert(e)
      }
    })
    bridge.callHandler('getUser', {}, res => {
      try {
        let user
        if (typeof res == 'string') {
          user = JSON.parse(res)
        } else {
          user = res
        }
        if (user.userId) {
          store.commit('setUser', {
            id: user.userId,
            phone: user.phone
          })
          new Vue({
            el: '#app',
            router,
            store,
            template: '<App/>',
            components: {
              App
            }
          })
        } else {
          alert('不能获取用户信息')
        }
      } catch (e) {
        alert(e)
      }
    })
    bridge.callHandler('pageRedirect', {
      name: 'wallet'
    })
    Vue.prototype.$bridge = bridge
  })
  // }, 1000)

/* eslint-disable no-new */

if (process.env.NODE_ENV !== 'production') {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
      App
    }
  })
}

document.getElementById('loading-wrapper').remove()

// window.addEventListener('message', (event) => {
//   console.log('====message1====', event)
// }, false)