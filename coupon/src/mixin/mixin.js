const ERR_Ok = 0;
import qs from "qs"; //参数序列化
import {
  MessageBox
} from "mint-ui";
// import md5 from 'js-md5';

// 获取与原生通信的bridge
let setupWebViewJavascriptBridge = function (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function () {
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
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

export const publicjs = {
  data() {
    return {
      listcouponUrl: "/coupons/get-user-coupons-list", //领券列表
      params: {
        rnd: String(Math.floor(new Date().getTime() / 1000)), //时间戳
        token: '',
        client: 1, //客户端类型 1=ios，2=安卓  int
        uid: '', //用户87253
        version: '', //版本号 int
        sign: '', //安全验证串 String
        pageNo: 1, //当前页数
        pageSize: 10, //当前数量
        totalSize: 0, //总数
      },
      resultData: [], //数据
      nocoupon: false, //没有更多优惠券
      noData: false, //暂无数据
      isEmpty: true, //上划加载标志位
      showLoading: true, //loading显示
      infiniteScrollDisabled: true, //是否已经加载完毕 若为真 无限加载不会被触发
      showBottomLoading: false, //底部loading显示
    }
  },
  mounted() {
    // 如果不是生产环境 执行这段代码
    if (process.env.NODE_ENV !== 'production') {
      this.params.uid = '87112'   //87164  87112  我 87107
      this.request();
    }
    setTimeout(() => {
      this.$loading.open()
      // 阻止loading弹出页面滚动
      document.querySelector('.content').addEventListener("touchmove", e => {　　
        e.preventDefault();　　　　
        e.stopPropagation();　　
      }, false);
      // 获取bridge
      setupWebViewJavascriptBridge(bridge => {
        /* Initialize your app here */
        if (!bridge) {
          return;
        }
        bridge.callHandler("getUser", {}, res => {
          try {
            let user
            if (typeof res == 'string') {
              user = JSON.parse(res)
            } else {
              user = res
            }
            if (user.userId) {
              this.params.uid = user.userId;
              this.request();
            } else {
              MessageBox.alert("不能获取用户信息");
            }
          } catch (e) {
            MessageBox.alert(e);
          }
        });
      });
    }, 20)
  },
  methods: {

    // 屏幕没撑满会加载
    loadMore() {
      this.request();
      // 禁止重复加载
      this.infiniteScrollDisabled = true;
    },
    request() {
      this.$ajax({
          url: this.listcouponUrl,
          data: qs.stringify({
            // token: this.token,
            // rnd: this.params.rnd,
            // client: this.params.client,
            uid: this.params.uid || null, //64
            type: this.couponType,
            page: this.params.pageNo,
            pagesize: this.params.pageSize
          }),
          method: "post"
        })
        .then(res => {
          if (res.data.errCode === ERR_Ok) {
            // 请求数据
            this.params.totalSize = res.data.data.total_list;
          //  !res.data.data.list ? document.body.style.background = "#ffffff" : this.couponType !== 1 ?   document.body.style.background = "#F1F1F2" :  null
            this._genResult(res.data.data.list);
          } else {
            let errMsg = res.data.errMsg || "请求错误";
            MessageBox("提示", errMsg);
          }
        })
        .catch(error => {
          console.log(error);
          this.$loading.close()
          // MessageBox("提示", "服务器错误");
        })
        // 成功与错误
        .then(res => {
          this.noData = true; //显示暂无数据
        });
    },
    // 处理数据
    _genResult(data) {
      //背景
      // !data.length ? document.body.style.background = "#ffffff" : this.couponType !== 1 ?   document.body.style.background = "#F1F1F2" :  null
      this.$loading.close();
      if (!this.isEmpty) {
        this.resultData = this.resultData.concat(data);
      } else {
        this.resultData = data;
        this.isEmpty = false;
      }
      if (!this.resultData || this.params.pageSize * this.params.pageNo >= this.params.totalSize) {
        this.nocoupon = true;
        this.infiniteScrollDisabled = true;
        // 屏幕没撑满 走这里 禁止一下(手动调用了一下) 
        this.showBottomLoading = false;
      } else {
        //手动加载  因为infiniteScrollDisabled默认为true 程序在这之前不会触发
        this.showBottomLoading = true;
        this.infiniteScrollDisabled = false;
      }
      this.params.pageNo++;
      // console.log(this.resultData)
      this.$emit('get_data_length',this.resultData.length)
    }
  }

}
