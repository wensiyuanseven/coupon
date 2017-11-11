const ERR_Ok = "OK";
import qs from "qs"; //参数序列化
export const publicjs = {
  data() {
    return {
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
    }
  },
  mounted() {
    setTimeout(() => {
      this.$loading.open()
      this.$refs.loadmore.$el.style.color = "#d6d6d6";
      this.request();
    }, 20);
  },
  methods: {
    loadBottom() {
      // 设置一个延时 凸显下拉加载状态
      setTimeout(() => {
        this.$refs.loadmore
        this.request();
      }, 500);
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
      this.$loading.close()
      if (!this.isEmpty) {
        this.resultData = this.resultData.concat(data);
        // 回到初始位置
        this.$refs.loadmore.onBottomLoaded();
      } else {
        this.resultData = data;
        this.isEmpty = false;
      }
      // 重新初始化
      this.$refs.loadmore.init();
      if (!this.resultData || this.pageSize * this.pageNo >= this.totalSize) {
        this.allLoaded = true; // 若数据已全部获取完毕
        // this.$refs.loadmore.onBottomLoaded();
        this.nocoupon = true;
      }
      this.pageNo++;
    },
    handleBottomChange(statue) {
      this.bottomStatus = status;
    }
  }
}
