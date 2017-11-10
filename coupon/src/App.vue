<template>
  <div id='app'>
    <div class="tab-control" id="tab-control">
      <div class="tab-item" @touchend="toggleTabs('unUsed')">
        <span>未使用</span>
        <span :class="{'empty-show':currentActive==='unUsed'}" class="empty"></span>
      </div>
      <div class="tab-item" @touchend="toggleTabs('beenUsed')">
        <span>已使用</span>
        <span :class="{'empty-show':currentActive==='beenUsed'}" class="empty"></span>
      </div>
      <div class="tab-item" @touchend="toggleTabs('nullBrace')">
        <span>已失效</span>
        <span :class="{'empty-show':currentActive==='nullBrace'}" class="empty"></span>
      </div>
    </div>
    <!-- 输入框区块开始 -->
    <div class="get-coupon" id="getCoupon" v-show="getCoupon">
      <input type="text" class="input-coupon" :class="{inputborder:changstate}" placeholder="请输入兑换码" v-model="inputCoupon">
      <span class="click-coupon" :class="{clickbg:changstate}" @click="getcoupon">兑换 </span>
    </div>
    <!-- 输入框区块结束 -->
    <!-- 动态组件渲染的内容 -->
    <div id="scroll-content"  :class="{'white':(currentActive!=='unUsed'&&!couponLength)||currentActive==='unUsed','gray':currentActive!=='unUsed'&&couponLength}">
      <!-- <keep-alive> -->
      <component :is="currentView" ref="content" @get_data_length="getDataLength"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
  import unUsed from "./components/un-used"; //未使用
  import beenUsed from "./components/been-used"; //已使用
  import nullBrace from "./components/null-brace"; //已失效
  import qs from "qs"; //参数序列化
  // import md5 from 'js-md5';
  import {
    Toast
  } from "mint-ui";
  const ERR_Ok = "OK";
  export default {
    name: "app",
    components: {
      beenUsed,
      nullBrace,
      unUsed
    },
    data() {
      return {
        currentView: "unUsed", //默认选中未使用组件
        beenUsed: "beenUsed", //已使用组件
        nullBrace: "nullBrace", //已失效组件
        unUsed: "unUsed", //未使用组件
        currentActive: "unUsed", //切换样式
        getcouponUrl: "/coupons/redeem-electronic-coupons", //获取优惠券
        couponType: 1, //优惠券类型
        inputCoupon: "", //:输入优惠券
        changstate: false, //输入兑换码改变状态
        getCoupon: true, //兑换区块显示与隐藏
        couponLength:0
      };
    },
    mounted() {
      setTimeout(() => {
        document.body.style.background = "#ffffff"
        // 解决点击延迟
        // FastClick.attach(document.body);
        this.input_show_hide();
      }, 20);
    },
    methods: {
      getDataLength(length){
        this.couponLength=length;
      },
      // 绑定切换事件
      toggleTabs: function(tabText) {
        this.currentView = tabText; //当前组件
        this.currentActive = tabText; //切换样式
       tabText === "unUsed" ?this.getCoupon = true : this.getCoupon = false;  
      },
      public_border() {
        let tabControl = document.getElementById('tab-control')
        if (this.$refs.content.$el.clientHeight < document.body.clientHeight - (getCoupon.clientHeight + tabControl.clientHeight)) {   return }
        if (this.$refs.content.couponType !== 1) {  return   }
      },
      input_show_hide() {
        let getCoupon = document.getElementById("getCoupon");
        let scrollcontent = document.getElementById("scroll-content");
        let couponblock = document.querySelectorAll('.coupon-block')
        var startX, startY, moveEndX, moveEndY, X, Y,
          startMoveTime = 0,
          lastMoveTime = 0;
        let last_scroll_position, new_scroll_position = 0;
        scrollcontent.addEventListener("scroll", e => {
          this.public_border()
          // 滚动条的距离
          last_scroll_position = scrollcontent.scrollTop; //10
          if (new_scroll_position < last_scroll_position && last_scroll_position > getCoupon.clientHeight) {
            // 隐藏
            getCoupon.classList.remove("slideDown");
            getCoupon.classList.add("slideUp");
          } else if (new_scroll_position >= last_scroll_position && last_scroll_position <= getCoupon.clientHeight) {
            getCoupon.classList.remove("slideUp");
            getCoupon.classList.add("slideDown");
            return
          }
          new_scroll_position = last_scroll_position; //10
        });
        scrollcontent.addEventListener("touchstart", e => {
          if (this.$refs.content.couponType !== 1) {
            return
          }
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          startMoveTime = e.timeStamp || Data.now() //初始时间
          console.log(startMoveTime + "：开始时间")
        });
        scrollcontent.addEventListener("touchmove", e => {
          this.public_border()
          moveEndX = e.changedTouches[0].pageX;
          moveEndY = e.changedTouches[0].pageY;
          X = moveEndX - startX;
          Y = moveEndY - startY;
          lastMoveTime = e.timeStamp || Data.now(); //最后时间
          let moveSpeed = Math.abs(Y) / (lastMoveTime - startMoveTime);
          console.log(moveSpeed + "：速度")
          console.log(scrollcontent.scrollTop)
          // 向下拉 触摸
          if (Math.abs(Y) > Math.abs(X) && moveSpeed > 0.5 && Y > 0) {
            getCoupon.classList.remove("slideUp");
            getCoupon.classList.add("slideDown");
          }
          // up
          else if (Math.abs(Y) > Math.abs(X) && moveSpeed > 0.5 && Y < 0) {
            getCoupon.classList.remove("slideDown");
            getCoupon.classList.add("slideUp");
          }
        });
      },
      // 兑换优惠券
      getcoupon() {
        if (!this.inputCoupon) {
          return;
        }
        this.$loading.open();
        this.$ajax({
            url: this.getcouponUrl,
            data: qs.stringify({
              redeem_code: this.inputCoupon,
              uid: this.$refs.content.params.uid,
              // token:this.$refs.content.params.token,
              type: this.couponType
            }),
            method: "post"
          })
          .then(res => {
            if (res.statusText === ERR_Ok) {
              this.$loading.close();
              // 请求数据
              if (res.data.errCode === -1) {
                Toast({
                  message: res.data.errMsg,
                  duration: 2000
                });
                return;
              } else {
                //  调用内部组件清空状态
                this.$refs.content.clear_data();
                // 发送请求
                this.$refs.content.request();
                Toast({
                  message: "兑换成功",
                  duration: 2000
                });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    watch: {
      inputCoupon(fresh, old) {
        return !!fresh ? (this.changstate = true) : (this.changstate = false);
      }
    }
  };
</script>

<style lang='scss'>
  @import "./assets/css/default.css";
  html,
  body {
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  } // 选中的样式
  .empty {
    display: none;
    height: 0.53vw;
    width: 110%;
    background: #fdd000;
    border-radius: 2px; // 解决安卓手机圆角失效问题
    background-clip: padding-box;
  }
  .empty-show {
    display: block;
  }
  #app {
    width: 100%;
    height: 100%;
    .tab-control {
      // 选项卡标题
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      display: flex;
      height: 11.8vw;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      background: #3d3d3d;
      padding: 0 15vw 0 15vw;
      .tab-item {
        // 选项卡每一个标题
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-family: PingFangSC-Regular;
        white-space: nowrap;
        font-size: 4.2666vw;
        color: #ffffff; // padding-bottom: 1.6vw;
        // background: red;
        span {
          &:first-child {
            padding-bottom: 1.6vw;
          }
        }
      }
    }
    #scroll-content {
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      height: 100%;
    }
  }
  .slideDown {
    transform: translateY(0);
    transition: transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  .slideUp {
    transform: translateY(-100px);
    transition: transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
  // 输入框容器
  .get-coupon {
    overflow: hidden;
    position: fixed;
    background: #ffffff;
    top: 11.8vw;
    z-index: 998;
    width: 100%;
    height: 21.37vw;
    padding: 0 2.666667vw 0 2.666667vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input-coupon {
      height: 11.73vw;
      width: 66.9333333vw;
      text-indent: 3.4667vw;
      font-size: 4.8vw;
      outline: none;
      border: 1px solid #c8c8c8;
      border-radius: 0; //解决ios圆角边框问题
      &::-webkit-input-placeholder {
        line-height: 6.4vw;
        font-family: PingFangSC-Regular;
        font-size: 4.8vw;
        color: #c8c8c8;
        text-indent: 3.4667vw;
      }
    } // 点击按钮
    .click-coupon {
      height: 11.73vw;
      width: 24.533333vw;
      line-height: 11.73vw;
      text-align: center;
      background: #c8c8c8;
      font-family: PingFangSC-Regular;
      font-size: 4.86667vw;
      color: #3d3d3d;
    }
    .clickbg {
      background: #fdd000;
    }
    .inputborder {
      border: 1px solid #fdd000;
    }
  }
  .flesh {
    color: #d6d6d6;
  }
  .white{
    background:#ffffff;
  }
  .gray{
    background: #F1F1F2;
  }
</style>
