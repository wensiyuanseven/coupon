<template>
<div class="deposit-share">
  <!-- <pre>{{payInfo}}</pre> -->
  <div class="deposit-info shadow-box card-box">
    <div class="deposit-info-content">
      <div class="should-pay">
        <h2>应交保证金
          <small>仅分时车辆需交纳</small>
          <span class="right-money" v-if="!payInfo.discount">{{payInfo.totalMoney}}元</span>
        </h2>
        <p class="invisible">
          <span class="car-deposit">车辆押金&nbsp;{{payInfo.carDeposit}}元</span>
          <span class="offence-deposit">违章押金&nbsp;{{payInfo.offenceDeposit}}元</span>
        </p>
        <div class="price-after-discount"
             v-if="payInfo.discount">
          <del>{{payInfo.totalMoney}}元</del>
          <span>{{payInfo.shouldPayMoney}}元</span>
        </div>
      </div>
      <div class="discount"
           v-if="payInfo.discount">
        <h2>减免方式</h2>
        <p>{{payInfo.discountMethod}}</p>
      </div>
      <div class="current-balance">
        <h2>已交保证金
          <span>{{currentBalance}}元</span>
        </h2>
      </div>
    </div>
    <!-- <div class="deposit-explain">
      <span>分时保证金说明</span>
    </div> -->
  </div>
  <p class="refund-info"
     v-if="payInfo.hasRefund">您有一笔{{payInfo.refund}}元的退款，预计发起申请后1-3个工作日内原路退回到支付账户，详细进度请打开钱包-明细查看</p>
  <div class="sesame-auth shadow-box card-box">
    <div>
      <h2>芝麻信用认证通道</h2>
      <small>{{payInfo.sesameText}}</small>
    </div>
    <a href="#"
       @click.prevent.stop="$router.push({name: 'sesameCredit'})"
       class="has-arrow has-arrow--small"><span v-if="zhimaIsAuth">已授权</span><span v-else>去认证</span></a>
  </div>
  <mt-button type="primary"
             class="deposit-btn"
             @click="payDeposit"
             v-if="payInfo.overFlow==-1">
    <span>交纳保证金 {{payInfo.overFlowMoney}}元</span>
  </mt-button>
  <mt-button type="primary"
             class="deposit-btn"
             @click="backToHome"
             v-else-if="loaded">
    <span>分时保证金已交纳，去用车吧</span>
  </mt-button>
  <div class="refund"
       v-if="currentBalance">
    <a href="#"
       class="refund-difference"
       @click.prevent="handleClickRefundDiff"
       v-if="payInfo.overFlow==1">退差额</a>
    <a href=""
       class="refund-all"
       @click.prevent.stop="applyForRefund"
       v-if="loaded">申请退款</a>
  </div>
  <!-- <div class="deposit-explain">
    <h5>保证金说明：</h5>
    <p></p>
  </div> -->
  <div class="deposit-instruction">
    <router-link :to="{name: 'shareDepositInstruction'}">保证金说明</router-link>
  </div>
  <v-popup v-model="showRefundDiff"
           v-show="payInfo.overFlow==1"
           :options="refundDiffMethod"
           smallTitle="退款金额"
           :title="payInfo.overFlowMoney + '元'"
           contentTitle="请选择退款方式"
           @confirm="refundDiff"></v-popup>
</div>

</template>

<script>
import dataService from '@/service/';
import vPopup from '@/components/popup';
export default {

  name: 'deposit-share',

  components: {
    vPopup
  },

  data() {
    return {
      loaded: false,
      payInfo: {
        totalMoney: '-', // 应付总额
        carDeposit: '-', // 应付车辆押金
        offenceDeposit: '-', // 应付违章押金
        shouldPayMoney: '-', // 当前实际应付金额
        discount: '-', // 折扣金额
        discountMethod: '-', // 折扣方式
        refund: '-', // 退款金额
        hasRefund: false, // 当前是否有退款
        overFlow: 0, // 应交与实交是否有差，overFlow=-1：需交纳  overFlow=1:可差额退款 overFlow=0:相等
        overFlowMoney: 0 // 应交与实交金额差
      },
      currentBalance: '-', // 当前余额
      sesameText: '-', // 芝麻认证通道文本
      zhimaIsAuth: false, // 是否已经进行芝麻认证
      showRefundDiff: false,
      refundDiffMethod: [
        {
          label: '退回到钱包余额',
          value: 'balance',
          text: '极速退款，即刻退回到您的钱包-余额',
          default: true
        },
        {
          label: '原路退回',
          value: 'return',
          text: '预计1-3个工作日原路退回到支付账户'
        }
      ]
    }
  },
  methods: {
    loadData() {
      dataService.getShareDepositDetail(this.$store.getters.user.id).then(res => {
        this.loaded = true
        let result = res.data
        let data = result.data
        this.payInfo.totalMoney = data.timeShareRentDepositGlobal
        this.payInfo.carDeposit = data.timeShareRentCarDepositGlobal
        this.payInfo.offenceDeposit = data.timeShareRentViolationDepositGlobal
        this.payInfo.shouldPayMoney = data.timeShareRentDepositWaterLine
        this.payInfo.discount = data.timeShareRentDepositGlobal - data.timeShareRentDepositWaterLine
        this.payInfo.discountMethod = data.timeShareRentDepositWaterLineRemark
        this.payInfo.refund = data.hasUnFinishRefund ? data.unFinishRefundAmount : 0
        this.payInfo.hasRefund = data.hasUnFinishRefund
        this.payInfo.overFlow = data.overFlow
        this.payInfo.overFlowMoney = data.overFlowSubAmount
        this.payInfo.sesameText = data.zhimaText
        this.currentBalance = data.timeShareRentDeposit
        this.zhimaIsAuth = data.zhimaIsAuth
      })
    },
    // 支付保证金
    payDeposit() {
      this.$router.push({
        name: 'pay',
        query: {
          type: 'share',
          money: this.payInfo.overFlowMoney
        }
      })
    },
    // 保证金已交纳，去用车
    backToHome() {
      if (this.$bridge) {
        this.$bridge.callHandler('backToHome')
      }
    },
    // 点击退差额回调
    handleClickRefundDiff() {
      // this.$toast('...')
      this.showRefundDiff = true
    },
    // 退差额
    refundDiff(val) {
      if (val == 'return') {
        this.$store.commit('applyForRefund', {
          type: 'share',
          money: this.payInfo.overFlowMoney
        })
        this.$router.push({
          name: 'refund'
        })
      } else {
        dataService.applyForRefund(this.$store.getters.user.id, this.payInfo.overFlowMoney, 'timeShareRentDeposit', true).then(res => {
          this.$toast('已成功退回到余额')
          this.loadData()
        }).catch(e => {

        })
      }
    },
    // 申请退款
    applyForRefund() {
      dataService.canRefund(this.$store.getters.user.id, 'timeShareRentDeposit').then(res => {
        this.$message.confirm('退押金后你将无法使用分时车辆，确定申请退款吗？').then(() => {
          this.$store.commit('applyForRefund', {
            money: this.currentBalance,
            type: 'share'
          })
          this.$router.push({
            name: 'refundReason'
          })
        })
      }).catch(e => {
        if (e.errCode) {
          setTimeout(() => {
            document.querySelector('.mint-toast').remove()
          }, 100)
          this.$message.alert(e.errMsg)
        }
      })
    }
  },
  created() {
    this.loadData()
  }
}

</script>

<style lang="scss" scoped="">
@import '~@/assets/sass/variables.scss';
.deposit-share {
  width: 100%;
  padding: 5vw 3vw;
  .card-box {
    padding: 7vw 5vw;
    margin-bottom: 5vw;
  }
  .deposit-info {
    background-image: url('~@/assets/img/deposit-clock.png');
    background-size: 35vw;
    background-repeat: no-repeat;
    background-position: right bottom;
  }
  .should-pay {
    position: relative;
    h2 {
      font-size: 4.8vw;
      margin-bottom: 2vw;
      small {
        font-size: 2.667vw;
        color: $color-gray-light;
        margin-left: 1vw;
      }
      span {
        float: right;
        font-weight: bold;
      }
    }
    p {
      font-size: 3.2vw;
      color: $color-gray-light;
      span {
        margin-right: 4vw;
        &:before {
          content: '';
          width: 1.5vw;
          height: 1.5vw;
          background-color: red;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2vw;
          vertical-align: middle;
        }
        &.car-deposit {
          &:before {
            background-color: #E38F3F;
          }
        }
        &.offence-deposit {
          &:before {
            background-color: #46E33F;
          }
        }
      }
    }
    .price-after-discount {
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
      margin-top: 1.5vw;
      del {
        font-size: 3.4vw;
        color: #a1a1a1;
        display: block;
      }
      span {
        font-size: 4.8vw;
        display: block;
        margin-top: 1vw;
      }
    }
  }
  .discount {
    margin-top: 5vw;
    p {
      margin-top: 2vw;
    }
  }
  .current-balance {
    font-size: 4.8vw;
    margin-top: 6vw;
    span {
      float: right;
      font-weight: bold;
    }
  }
  .refund-info {
    color: $color-gray-light;
    margin-bottom: 8vw;
    padding: 0 3vw;
    line-height: 4vw;
  }
  .sesame-auth {
    display: flex;
    align-items: center;
    background-image: url('~@/assets/img/deposit-sesame.png');
    background-size: 12vw;
    background-repeat: no-repeat;
    background-position: right bottom;
    >div {
      flex: 1;
    }
    h2 {
      font-size: 4.8vw;
    }
    small {
      font-size: 3.2vw;
      color: $color-gray-light;
      margin-top: 2vw;
      display: block;
    }
    a {
      color: $color-gray-light;
      text-decoration: none;
      font-size: 3.733vw;
      padding: 3vw 0;
    }
  }
  .deposit-btn {
    width: 100%;
    margin-top: 3vw;
  }
  .refund {
    margin-top: 4vw;
    font-size: 3.2vw;
    a {
      text-decoration: none;
      color: $color-gray-light;
      &.refund-all {
        float: right;
      }
    }
  }
  .refund-reason-popup {
    width: 100%;
    height: 100%;
  }
  .deposit-instruction {
    position: fixed;
    text-align: center;
    width: 100%;
    left: 0;
    bottom: 3.3vw;
    a {
      color: $color-gray-white;
      text-decoration: underline;
    }
  }
}

@media screen and (max-height: 450px) {
  .deposit-share .deposit-instruction[data-v-ee504006] {
    position: static;
    margin-top: 2vw;
  }
}
</style>
