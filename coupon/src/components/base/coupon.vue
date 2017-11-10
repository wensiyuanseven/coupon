<template>
  <div id="coupon">
    <div class="coupon-block" v-for="(item, index) in coupondata" :key="index" @touchend="changestatue(index)" :class="[bgimg,{bgshadow:index==currentbg}]">
    <!-- <div class="coupon-block" v-for="(item, index) in coupondata" :key="index"  :class="[bgimg,{bgshadow:index==currentbg}]"> -->
      
      <div class="coupon-money">
        <!-- 优惠券 -->
        <div>
          <span :style="fontcolor" v-if="item.coupons_type==='1'" class="coupons-money">￥</span>
          <span :style="fontcolor" v-if="item.coupons_type==='1'">{{item.coupons_money| money }}</span>
          <span :style="fontcolor" v-else>{{item.coupons_discount/10+'折'}} </span>
        </div>
        <!-- 折扣券 -->
        <!-- 这的地方需要判断一下是否显示 -->
        <!-- 没有这个字段就不显示 -->
        <span :style="fontcolor" class="coupons-use-money" >{{item.qualification}}</span>
      </div>
      <div class="coupon-rule">
        <span :style="fontcolor">{{item.coupons_name}}</span>
        <span :style="fontcolor" class="describe">{{item.coupons_detail}}</span>
        <!--判断一下起始时间是否为空 为空不显示 -->
        <span :style="fontcolor" v-if="item.start_date">有效期：{{item.start_date+'至'+item.end_date}}</span>
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
  mounted() {
    setTimeout(()=>{

    },20)
  },
  computed: {
    // 优惠券的背景
    bgimg() {

      return `bgimg-${this.coupontype}`;
 
    }
  },
  filters: {
    // 处理金钱
    // todo这个地方需要改
    // money(value) {

    //   let m = Number(value);
    //   // if (isNaN(m)) {
    //   //   throw "money must be a number";
    //   // }
    //   m = m.toFixed(2);
    //   let n = Number(m.split(".")[1]);
    //   if (n === 0) {
    //     return m.split(".")[0];
    //   } else if (n % 10 == 0) {
    //     return m.substr(0, m.length - 1);
    //   } else {
    //     return m;
    //   }
    // }
   money(value) {
      return value.split('.')[0]
    }
  },
  methods: {
    // 派发事件
    changestatue(index) {
      // 如果类型为未使用的优惠券 让点击
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
    // transform: translate3d(0, 0, 0);
} 
.bgshadow {
  // backface-visibility: hidden;
  filter: drop-shadow(0 0 1.33vw rgba(0, 0, 0, 0.5));
  // transform:scale(1.1);
  transform: translate3d(0, 0, 0);
}
// 已经使用 已经失效 背景
.bgimg-2 {
  // 阴影问题
  background: url("./../../assets/img/bg-brace@2x.png");
  // 这个属性不能乱用
    // transform: translate3d(0, 0, 0);
} // 阴影

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
    // 正好100vw
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
      color: #ffffff;
      padding-top: 1.007vw; // 需要指定宽度
      width: 61vw;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .describe {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
  }
}
.yang {
  font-size: 5.0838vw !important;
}
</style>