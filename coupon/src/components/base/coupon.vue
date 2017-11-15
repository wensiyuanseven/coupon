<template>
  <div id="coupon">
    <div class="coupon-block" v-for="(item, index) in coupondata" :key="index"  :class="[bgimg]">
      <div class="coupon-money">
        <div>
          <span v-if="item.coupons_type==='1'" class="coupons-money" :class="{fontcolor:coupontype===2||3}">￥</span>
          <span  v-if="item.coupons_type==='1'" :class="{fontcolor:coupontype===2||3}">{{item.coupons_money| money }}</span>
          <span  v-else :class="{fontcolor:coupontype===2||3}">{{item.coupons_discount/10+'折'}} </span>
        </div>
        <span class="coupons-use-money" :class="{fontcolor:coupontype===2||3}">{{item.qualification}}</span>
      </div>
      <div class="coupon-rule">
        <span  class="coupons-name" :class="{fontcolor:coupontype===2||3}">{{item.coupons_name}}</span>
        <span   class="coupons-detail" :class="{fontcolor:coupontype===2||3}">{{item.coupons_detail}}</span>
        <span  class="coupons-data" v-if="item.start_date" :class="{fontcolor:coupontype===2||3}">有效期：{{item.start_date+'至'+item.end_date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  props: {
    // 优惠券种类
    // 如果优惠券种类不同  背景颜色也不同
    coupontype: {
      type: Number,
      default: 1
    },
    // 字体颜色
    fontcolor: String,
    // 优惠券数据
    coupondata: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      currentbg: null, //点击的背景
      allLoaded: false
    };
  },
  computed: {
    // 优惠券的背景
    bgimg () {
      return `bgimg-${this.coupontype}`;
    }
  },
  filters: {
    money (value) {
      return value.split('.')[0]
    }
  }
};
</script>

<style lang="scss" scoped>
// 未使用背景
.bgimg-1 {
  background: url("./../../assets/img/bg-noshadow@2x.png");
}

// 已经使用 已经失效 背景
.bgimg-2 {
  // 阴影问题
  background: url("./../../assets/img/bg-brace@2x.png");
  // transform: translate3d(0, 0, 0);
}
#coupon {
  height: 100%;
  padding: 0 2.666667vw 0 2.666667vw;
} //优惠券区块
.coupon-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25.1vw; // 让背景图自动撑满
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 2.668vw;
  .coupon-money {
    width: 29vw;
    height: 21.344vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; // 禁止换行
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    border-right: 0.3vw dashed rgba(61, 61, 61, 0.3);
    div {
      display: flex;
      font-family: PingFangSC-Medium;
      align-items: center;
      justify-content: center;
      width: 98%;
      font-size: 7.46667vw;
      font-weight: 600;
      color: #3d3d3d;
      .coupons-money {
        font-size: 4.0838vw;
        margin-top: 2vw;
        .coupons-discount {
          font-size: 3.0838vw;
          color: #3d3d3d;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .coupons-use-money {
      color: #3d3d3d;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 3.74vw;
      font-family: PingFangSC-Regular;
    }
  } // 右边去区块 规则
  .coupon-rule {
    display: flex; // 自动填充剩余宽度
    width: 70.7vw;
    height: 21.344vw;
    flex-direction: column;
    justify-content: center;
    padding-left: 4.46vw;
    span {
      font-family: PingFangSC-Regular;
      font-size: 3.2vw;
      padding-top: 1.007vw; // 需要指定宽度
      width: 61vw;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    // 优惠券名字
    .coupons-name {
      font-family: PingFangSC-Medium;
      font-size: 4.8vw;
      color: #3d3d3d;
      font-weight: 600;
    }
    // 描述
    .coupons-detail {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      color: #ffffff !important;
    }
    // 时间
    .coupons-data {
      color: #3d3d3d;
      overflow: visible;
      text-overflow: clip;
    }
  }
}
.yang {
  font-size: 5.0838vw !important;
}
.fontcolor {
  color: #d6d6d6 !important;
}
</style>