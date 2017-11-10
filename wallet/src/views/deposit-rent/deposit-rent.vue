<template>
<div class="deposit-rent">
  <div class="title-card shadow-box">
    <h2 @click="applyForRefund">长租保证金</h2>
    <p>仅长租车辆需交纳</p>
  </div>
  <div class="deposit-info">
    <!-- 违章押金 -->
    <div class="deposit-item offence-deposit">
      <div class="deposit-item--name">
        <h2>违章押金</h2>
        <a href="#"
           v-if="payInfo.overflow == -1"
           @click.prevent="goPay('offence')">去交纳<span>＞</span></a>
        <small v-else-if="payInfo.hasOffenceRefund">退款中，预计发起申请后1-3个工作日内原路退回到支付账户</small>
        <small v-else-if="Number(payInfo.offenceBalance)">已交纳</small>
        <small v-else>读取中...</small>
      </div>
      <div class="deposit-item--balance">
        <span>{{payInfo.offenceBalance}}元</span>
        <a href="#"
           @click.prevent="applyForRefund('offence')"
           v-if="payInfo.offenceBalance && !payInfo.hasOffenceRefund">申请退款</a>
      </div>
    </div>
    <!-- 车辆押金 -->
    <div class="deposit-item car-deposit">
      <div class="deposit-item--name">
        <h2>车辆押金</h2>
        <small v-if="payInfo.hasCarRefund">退款中，预计发起申请后1-3个工作日内原路退回到支付账户</small>
        <a href="#"
           v-else-if="!isNaN(Number(payInfo.carBalance))"
           @click.prevent="goPay('car')">去交纳<span>＞</span></a>
        
        <small v-else>读取中...</small>
      </div>
      <div class="deposit-item--balance">
        <span>{{payInfo.carBalance}}元</span>
        <a href="#"
           @click.prevent="applyForRefund('car')"
           v-if="payInfo.carBalance && !payInfo.hasCarRefund">申请退款</a>
      </div>
    </div>
  </div>
  <!-- <div class="deposit-explain">
    <p>保证金说明：</p>
    <p>车辆押金用户XXX，违章押金用于XXXX，退款规则XXXX</p>
  </div> -->
</div>

</template>

<script>
import dataService from '@/service/';
export default {

  name: 'deposit-rent',

  data() {
    return {
      payInfo: {
        offenceDeposit: '', // 应交违章押金
        carDeposit: '', // 应交车辆押金
        hasOffenceRefund: false, // 是否有违章押金退款
        offenceRefund: '', // 违章押金退款金额
        hasCarRefund: false, // 是否有车辆押金退款
        carRefund: '', // 车辆押金退款金额
        offenceBalance: '-', // 违章押金余额
        carBalance: '-', // 车辆押金余额
        overflow: '', // 是否需要交纳违章押金,overFlow=-1：需缴纳  overFlow=1:可差额退款 overFlow=0:相等
        overflowAmount: '', // 违章押金应交和实交差
      }
    }
  },

  methods: {
    goPay(type) {
      if (type === 'offence') {
        this.$router.push({
          name: 'pay',
          query: {
            money: this.payInfo.overflowAmount,
            type: 'rentOffence'
          }
        })
      } else if (type === 'car') {
        this.$router.push({
          name: 'pay',
          query: {
            type: 'rentCar',
            canUseCar: this.payInfo.overflow == -1 ? 0 : 1
          }
        })
      }
    },
    applyForRefund(type) {
      this.$message.confirm('退押金后你将无法使用长租车辆<br>确定申请退款吗？', '提示').then(action => {
        let refundType = type == 'offence' ? 'longTermRentViolationDeposit' : 'longTermRentCarDeposit'
        dataService.canRefund(this.$store.getters.user.id, refundType).then(res => {
          if (type === 'offence') {
            this.$store.commit('applyForRefund', {
              money: this.payInfo.offenceBalance,
              type: 'rentOffence'
            })
          } else if (type === 'car') {
            this.$store.commit('applyForRefund', {
              money: this.payInfo.carBalance,
              type: 'rentCar'
            })
          }
          this.$router.push({
            name: 'refund'
          })
        }).catch(e => {

        })
      }).catch(e => {
        // this.$message.alert('2017-9-18 15:53 是您最近一次用车需还车3个工作日后，才可申请退款').then(action => {
        //   this.$message.alert('您有一笔进行中的订单，暂不可申请退款').then(action => {

        //   })
        // })
      })
    }
  },
  created() {
    dataService.getRentDepositDetail(this.$store.getters.user.id).then(res => {
      let result = res.data
      let data = result.data
      this.payInfo.offenceDeposit = data.longTermRentViolationDepositWaterLine
      // this.payInfo.carDeposit
      this.payInfo.hasOffenceRefund = data.hasUnFinishViolationRefund
      this.payInfo.offenceRefund = data.unFinishViolationRefundAmount
      this.payInfo.hasCarRefund = data.hasUnFinishCarRefund
      this.payInfo.carRefund = data.unFinishCarRefundAmount
      this.payInfo.offenceBalance = data.longTermRentViolationDeposit
      this.payInfo.carBalance = data.longTermRentCarDeposit
      this.payInfo.overflow = data.overFlow
      this.payInfo.overflowAmount = data.overFlowSubAmount
    })
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.deposit-rent {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 3vw;
  .title-card {
    height: 38.7vw;
    border-radius: 3vw;
    overflow: hidden;
    background-image: url('~@/assets/img/deposit-car.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom right;
    h2 {
      margin-top: 4vw;
      margin-left: 5vw;
    }
    p {
      margin-top: 3vw;
      margin-left: 5vw;
    }
  }
  .deposit-info {
    margin-top: 5vw;
    .deposit-item {
      display: flex;
      align-items: center;
      height: 20vw;
      border-bottom: 1px solid $color-gray-border;
      .deposit-item--name {
        flex: 1;
        padding-right: 10vw;
        h2 {
          font-size: 3.7333vw;
          margin-bottom: 2vw;
          font-weight: bold;
        }
        a {
          font-size: 3.7333vw;
          color: $color-gray;
        }
        small {
          color: $color-gray-light;
        }
      }
      .deposit-item--balance {
        span {
          font-weight: bold;
          font-size: 5.86667vw;
        }
        a {
          display: block;
          text-align: right;
          padding-top: 2vw;
          color: $color-gray-light;
        }
      }
    }
  }
  .deposit-explain {
    margin-top: 5vw;
    line-height: 5vw;
  }
}
</style>
