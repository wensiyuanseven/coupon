<template>
  <div class="balance">
    <!-- 容器开始 -->
    <div class="content" v-for="(item,index) in totalArr" :key="index">
      <!-- 可用余额开始 -->
      <div class="canuse-money">
        <span>{{userMoneyTotal }}</span>
        <span>可用余额（元）</span>
      </div>
      <!--  可用余额结束-->
      <!-- 充值-赠送余额开始 -->
      <div class="pay">
        <div class="pay-money">
          <span>{{userMoney}}</span>
          <span>充值余额（元）</span>
        </div>
        <div class="give-money">
          <span>{{userMoneyPresentation}}</span>
          <span>赠送余额（元）</span>
        </div>
      </div>
      <!-- 空白背景 -->
      <div class="bg-blank"></div>
      <!-- 充值-赠送余额结束 -->
      <!-- 充值按钮开始 -->
      <div class="pay-botton">
        <!-- 支付类型 -->
        <mt-button type="primary" @click="$router.push({name: 'pay',query:{type:'balance'}})">充值</mt-button>
      </div>
      <!-- 充值按钮结束 -->
      <!-- 充值卡入口开始 -->
      <div class="pay-enter" @click="$router.push({name: 'cardpay'})">
        <span>充值卡入口</span><img src="./../../assets/img/enter.png" alt="充值卡入口">
      </div>
      <!-- 入口结束 -->
    </div>
    <!-- 容器结束 -->
  </div>
</template>

<script>
  import dataService from '@/service/';
  import {
    MessageBox
  } from 'mint-ui';
  const ERR_OK = 'ok';
  //直接调用
  export default {
    data() {
      return {
        totalArr: [], //循环一下数据,否则会出现闪现
        userMoneyTotal: '-', //总的余额
        userMoney: '-', //充值余额  没有数据为“-”
        userMoneyPresentation: '-' //赠送余额
      };
    },
    mounted() {
      setTimeout(() => {
        this.$loading.open();
        dataService.balance(this.$store.getters.user.id).then(res => {
          if (res.data.errMsg === ERR_OK) {
            this.$loading.close();
            this.totalArr.push(res.data.data);
            this.userMoneyTotal = String(res.data.data.userMoneyTotal);
            this.userMoney = String(res.data.data.userMoney.toFixed(2));
            this.userMoneyPresentation = String(res.data.data.userMoneyPresentation.toFixed(2));
          } else {
            let errMsg = res.data.errMsg || '请求错误';
            MessageBox('提示', errMsg);
          }
        }).catch(error => {
          console.log(error)
          // MessageBox('提示', '请求超时')
        });
      }, 20);
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  $publice-width: 2.6666vw;
  .balance {
    background: #ffffff;
    width: 100%;
    height: 100%;
    font-family: PingFangSC-Regular;
  }
  .content {
    display: flex;
    white-space: nowrap;
    flex-direction: column;
    .canuse-money {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 97vw;
      background: url("./../../assets/img/balance-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      span {
        &:first-child {
          font-family: Helvetica-Bold;
          font-size: 17vw;
          color: #3d3d3d;
          font-weight: 600;
          margin-bottom: 3vw;
          width: 98%;
          text-align: center;
        }
        &:last-child {
          font-size: 3.73vw;
          color: #3d3d3d;
        }
      }
    }
    .pay {
      display: flex;
      width: 100%;
      height: 26.66vw;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      div {
        height: 15.73vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      span {
        &:first-child {
          font-family: Helvetica;
          font-size: 5.8666vw;
          color: #3d3d3d;
          font-weight: 600;
          margin-bottom: 2.4vw;
          width: 100%;
          text-align: center;
        }
        &:last-child {
          font-size: 3.7333vw;
          color: #999999;
        }
      }
      .pay-money {
        flex-grow: 1;
        border-right: 1px solid #e7e7e7;
      }
      .give-money {
        flex-grow: 1;
      }
    }
    .bg-blank {
      width: 100%;
      height: $publice-width;
      background: #f7f7f7;
    }
    .pay-botton {
      width: 94.666%;
      height: 11.7333vw;
      margin: 0 auto;
      margin-top: 4vw;
      margin-bottom: 4vw;
      text-align: center;
      line-height: 11.7333vw;
      font-size: 4.2667vw;
      color: #3d3d3d;
    }
    .pay-enter {
      align-self: flex-end;
      width: 26%;
      margin-right: 2.7vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 3.7333vw;
      color: #999999;
      img {
        width: 5.33vw;
        height: 5.33vw;
      }
    }
  }
  .bgother {
    background: red;
  }
  .bgyellow {
    background: #fdd000;
  }
</style>