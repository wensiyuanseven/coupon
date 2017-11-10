<template>
  <div id="un-used">
    <!-- 滚动组件开始 -->
    <!-- 滚动的容器是app -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10" id="couponblock">
      <div>
        <coupon :coupondata="resultData" ref="coupon"></coupon>
        <div v-show="resultData.length&&nocoupon">
          <no-coupon></no-coupon>
        </div>
      </div>
      <div v-show="showBottomLoading" class="loading">
        <mt-spinner type="fading-circle" :size="20"></mt-spinner>
        <span>加载中...</span>
      </div>
    </div>
    <!-- 滚动组件结束-->
    <!-- 暂无数据 -->
    <div v-show="!resultData.length&&noData">
      <no-data nodata="您暂时还没有优惠券哦~" style="margin-top:40vw;"></no-data>
    </div>
  </div>
</template>
<script>
  import coupon from "./base/coupon"; //优惠券组件
  import noCoupon from "./base/no-coupon";
  import noData from "./base/no-data"; //暂无数据
  import {
    publicjs
  } from "./../mixin/mixin";
  export default {
    name: "UnUsed",
    mixins: [publicjs],
    data() {
      return {
        couponType: 1 //优惠券类型
      };
    },
    methods: {
      // 外部调用清空状态
      clear_data() {
        this.params.pageNo = 1;
        this.isEmpty = true;
      }
    },
    mounted() {
      // document.body.style.background = "#ffffff"
    },
    components: {
      coupon,
      noCoupon,
      noData
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../assets/css/public-loading.scss";
  #un-used {
    margin-top: 33.3vw;
  }
</style>