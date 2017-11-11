<template>
  <div id="coupon">
    <div class="coupon-block" v-for="(item, index) in coupondata" :key="index" @click="changestatue(index)" :class="[bgimg,{bgshadow:index==currentbg}]">
      <div class="coupon-money">
        <span :style="fontcolor">{{"￥"+item.coupons_money}}</span>
        <!-- 这的地方需要判断一下是否显示 -->
        <!-- 没有这个字段就不显示 -->
        <span :style="fontcolor">满{{item.coupons_discount}}元可用</span>
      </div>
      <div class="coupon-rule" >
        <span :style="fontcolor">{{item.coupons_name}}</span>
        <span :style="fontcolor">描述信息{{item.coupons_detail}}</span>
        <!--i如果is_restrict_time ==0永久有效期-->
        <span :style="fontcolor" v-if="item.is_restrict_time!=='0'">有效期:{{item.start_date}}至{{item.end_date}}</span>
        <span :style="fontcolor" v-else-if="coupontype!==2&&item.is_restrict_time==='0'">永久有效</span>
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
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentbg: null, //点击的背景
      allLoaded: false
    };
  },
  mounted() {},
  computed: {
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
    },
    // 优惠券的背景
    bgimg() {
      return `bgimg-${this.coupontype}`;
    }
  },
  methods: {
    // 派发事件
    changestatue(index) {
      // 如果类型为1 让点击
      if (this.coupontype == 1) {
        this.currentbg = index;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 未使用背景
.bgimg-1 {
  background: url("./../../assets/img/bg-noshadow@2x.png");
} // 已经使用 已经失效 背景
.bgimg-2 {
  // 阴影问题
  // box-shadow: 0 0 1.33vw rgba(216, 216, 216, 0.5);
  // box-shadow: 0 0 1.33vw rgba(216, 216, 216, 0.5);
  // filter: drop-shadow(0 0 1.33vw rgba(216, 216, 216, 0.5));
  background: url("./../../assets/img/bg-brace@2x.png");
} // 阴影
.bgshadow {
  filter: drop-shadow(0 0 1.33vw rgba(0, 0, 0, 0.5));
}
#coupon {
  // todo
  margin-top: 5.336vw;
  height: 100%;
  padding: 0 2.666667vw 0 2.666667vw;
} //优惠券区块
.coupon-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25.1vw; // 让背景图自动撑满
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 2.668vw;
  .coupon-money {
    // 正好100vw
    width: 40vw;
    height: 21.344vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; // 禁止换行
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    border-right: 0.3vw dashed rgba(61, 61, 61, 0.3);
    span {
      font-family: PingFangSC-Medium;
      padding-top: 1.007vw;
      width: 98%;
      text-align: center;
      &:first-child {
        font-size: 7.46667vw;
        font-weight: 600;
        color: #3d3d3d;
      }
      &:last-child {
        font-size: 3.7838vw;
        color: #3d3d3d;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  } // 右边去区块 规则
  .coupon-rule {
    display: flex; // 自动填充剩余宽度
    width: 60vw;
    height: 21.344vw;
    flex-direction: column;
    justify-content: center;
    margin-right: 1vw;
    padding-left: 4.46vw; // padding-right: 1vw;
    span {
      font-family: PingFangSC-Regular;
      font-size: 3.2vw;
      color: #ffffff;
      padding-top: 1.007vw; // 需要指定宽度
      width: 52vw;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child {
        font-family: PingFangSC-Medium;
        font-size: 4.8vw;
        color: #3d3d3d;
        font-weight: 600;
      }
      &:last-child {
        color: #3d3d3d;
        overflow: visible;
        text-overflow: clip;
      }
    }
  }
}
</style>