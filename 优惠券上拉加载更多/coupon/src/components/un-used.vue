<template>
  <div id="un-used">
    <!-- 输入框区块开始 -->
    <div class="get-coupon" ref="getcoupon" id="getCoupon">
      <input type="text" class="input-coupon" :class="{inputborder:changstate}" placeholder="请输入兑换码" v-model="inputCoupon">
      <span class="click-coupon" :class="{clickbg:changstate}" @click="getcoupon">兑换 </span>
    </div>
    <!-- 输入框区块结束 -->
    <!-- 滚动组件开始 -->
    <!-- 滚动的容器是app -->
    <div class="content" id="contentid">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :autoFill="autoFill" ref="loadmore">
        <div class="coupon-content">
          <coupon :coupondata="resultData" ref="coupon"></coupon>
          <div v-show="resultData.length&&nocoupon">
            <no-coupon></no-coupon>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <!-- 滚动组件 结束-->
    <!-- 暂无数据 -->
    <div v-show="!resultData.length&&noData">
      <no-data nodata="您暂还时还没有优惠券哦~"></no-data>
    </div>
  </div>
</template>

<script>
const ERR_Ok = "OK";
import qs from "qs"; //参数序列化
import coupon from "./base/coupon"; //优惠券组件
import noCoupon from "./base/no-coupon";
import noData from "./base/no-data"; //暂无数据
import { Toast } from "mint-ui";
import { publicjs } from "./../mixin/mixin";
export default {
  name: "UnUsed",
  mixins: [publicjs],
  data() {
    return {
      getcouponUrl: "/coupons/redeem-electronic-coupons", //获取优惠券
      inputCoupon: "", //输入优惠券
      couponType: 1, //优惠券类型
      changstate: false //输入兑换码改变状态
    };
  },
  mounted() {
    setTimeout(() => {
      document.body.style.background = "#ffffff";
      this.$loading.open();
      this.input_show_hide();
    }, 20);
  },
  methods: {
    input_show_hide() {
      // 	需要利用scrolltop函数，纵向滚动的距离进行一下滚动前和滚动开始后的判断。
      // 如果开始滚动时比之前的记录结果大，则是在向下滚动。
      // 如果开始滚动时比之前的记录结果小，则是在向上滚动。
      let new_scroll_position = 0;
      let last_scroll_position;
      let getCoupon = document.getElementById("getCoupon");
      let app = document.getElementById("app");
      app.addEventListener("scroll", e => {
        // 滚动条的距离
        last_scroll_position = app.scrollTop;
        
        if (new_scroll_position < last_scroll_position&&last_scroll_position > getCoupon.clientHeight) {
          getCoupon.classList.remove("slideDown");
          getCoupon.classList.add("slideUp");
          //向下拉
          // 最后的位置被记录了下来
        } else if (new_scroll_position >= last_scroll_position) {
          getCoupon.classList.remove("slideUp");
          getCoupon.classList.add("slideDown");
        }
        // 第一次向下滚动时 让当前的位置等于最后的位置
        new_scroll_position = last_scroll_position;

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
          uid: 87112,
          token: 2342342,
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
                message: "兑换码错误",
                duration: 2000
              });
              return;
            } else {
              //  清空状态
              this.pageNo = 1;
              this.isEmpty = true;
              this.autoFill = false;
              // 发送请求
              this.request();
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
      if (!!fresh) {
        this.changstate = true;
      } else {
        this.changstate = false;
      }
    }
  },
  components: {
    coupon,
    noCoupon,
    noData
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/css/public.scss";
#un-used {
  background: #ffffff;
  height: 100%;
}
.content {
  // background: #787878;
}
// 上滑是是否显示输入框

.slideDown {
  transform: translateY(0);
  transition: transform 0.2s ease-out;
}
.slideUp {
  transform: translateY(-100px);
  transition: transform 0.2s ease-out;
}
.un-used {
  position: relative;
}
.coupon-content {
  margin-top: 33.5vw;
}
// 输入框容器
.get-coupon {
  overflow: hidden;
  position: fixed;
  background: #ffffff;
  top: 12vw;
  z-index: 998;
  width: 100%;
  height: 18.07vw;
  padding: 0 2.666667vw 0 2.666667vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1vw; // 输入框
  .input-coupon {
    height: 11.73vw;
    width: 66.9333333vw;
    text-indent: 3.4667vw;
    font-size: 4.8vw;
    outline: none;
    border: 1px solid #c8c8c8;
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
</style>