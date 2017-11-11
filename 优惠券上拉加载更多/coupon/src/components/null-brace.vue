<template>
  <div id="null-brace">
    <!-- 滚动组件 -->
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :autoFill="autoFill" ref="loadmore"> -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="infiniteScrollDisabled" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
      <div class="coupon-block">
        <coupon :coupondata="resultData" ref="coupon" :coupontype="2" fontcolor="color: #D6D6D6"></coupon>
        <div v-show="resultData.length&&nocoupon">
          <no-coupon></no-coupon>
        </div>
      </div>
      <div v-show="showBottomLoading"  class="loading">
        <mt-spinner type="fading-circle" ></mt-spinner><span>加载中...</span>
      </div>
    </div>
    <!-- </mt-loadmore> -->
    <!-- 暂无数据 -->
    <div v-show="!resultData.length&&noData">
      <no-data nodata="您暂时还没有失效的优惠券哦~"></no-data>
    </div>
  </div>
</template>
<script>
const ERR_Ok = "OK";
import qs from "qs"; //参数序列化
import coupon from "./base/coupon"; //优惠券组件
import noCoupon from "./base/no-coupon";
import noData from "./base/no-data"; //暂无数据
import { publicjs } from "./../mixin/mixin";
export default {
  name: "NullBrace",
  // mixins: [publicjs],
  mounted() {
    setTimeout(() => {
      this.showBottomLoading = false;
      document.body.style.background = "#F1F1F2";
      this.$loading.open();
      this.request();
    }, 20);
  },
  data() {
    return {
      couponType: 2,
      listcouponUrl: "/coupons/get-user-coupons-list", //领券列表
      bottomDistance: 15,
      resultData: [], //数据
      nocoupon: false, //没有更多优惠券
      noData: false, //暂无数据
      isEmpty: true, //上划加载标志位
      pageNo: 1, //当前页数
      pageSize: 6, //当前数量
      totalSize: 0, //总数
      bottomStatus: null, //上划加载状态
      allLoaded: false, //是否加载到底部
      showLoading: true, //loading显示
      autoFill: false, //上拉加载不让它自动撑满屏幕
      infiniteScrollDisabled: false,
      showBottomLoading: true
    };
  },
  methods: {
    loadMore() {
      this.request();
    },
    request() {
      this.$ajax({
        url: this.listcouponUrl,
        data: qs.stringify({
          token: 2342342,
          uid: 87112, //64
          // uid: 87112, //7
          // uid: 87164, //2
          type: this.couponType,
          money: 1,
          page: this.pageNo,
          pagesize: this.pageSize
        }),
        method: "post"
      })
        .then(res => {
          if (res.statusText === ERR_Ok) {
            this.showBottomLoading = true;
            // 请求数据
            this.totalSize = res.data.data.total_list;
            this._genResult(res.data.data.list);
          }
        })
        .catch(error => {
          console.log(error);
        })
        // 成功与错误
        .then(res => {
          this.noData = true; //显示暂无数据
        });
    },
    // 处理数据
    _genResult(data) {
      this.$loading.close();
      if (!this.isEmpty) {
        this.resultData = this.resultData.concat(data);
        // 回到初始位置
        // this.$refs.loadmore.onBottomLoaded();
      } else {
        this.resultData = data;
        this.isEmpty = false;
      }
      // 重新初始化
      // this.$refs.loadmore.init();
      if (!this.resultData || this.pageSize * this.pageNo >= this.totalSize) {
        // this.allLoaded = true; // 若数据已全部获取完毕
        // this.$refs.loadmore.onBottomLoaded();
        this.infiniteScrollDisabled = true;
        this.nocoupon = true;
        this.showBottomLoading = false;
      }
      this.pageNo++;
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
.coupon-block {
  margin-top: 15.67vw;
}
.loading {
  display: flex;
color: #ccc;
  justify-content: center;
  align-items: center;
  span{
    margin-left: 3vw;
  }
}
</style>