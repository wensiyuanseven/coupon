<template>
<div class="wallet-index">
  <ul>
    <li>
      <div class="card shadow-box card-balance"
           @click="routeTo('balance')">
        <h2>余额</h2>
        <a href="#"
           @click.prevent.stop="routeTo('balance')"
           class="card-link">
              <span>{{balance}}</span>
              <span class="card-link-money">元</span>
              <span class="card-link-arrow"></span>
            </a>
      </div>
    </li>
    <li>
      <div class="card shadow-box card-share"
           @click="routeTo('depositShare')">
        <h2>分时保证金</h2>
        <p>{{shareNote}}</p>
        <a href="#"
           @click.prevent.stop="routeTo('depositShare')"
           class="card-link">
              <span>{{shareDeposit}}&nbsp;元</span>
              <!-- <span>去交纳</span> -->
              <span class="card-link-arrow"></span>
            </a>
      </div>
    </li>
    <li>
      <div class="card shadow-box card-rent"
           @click="routeTo('depositRent')">
        <h2>长租保证金</h2>
        <p>{{rentNote}}</p>
        <a href="#"
           @click.prevent.stop="routeTo('depositRent')"
           class="card-link">
              <span>{{rentDeposit}}&nbsp;元</span>
              <!-- <span>去交纳</span> -->
              <span class="card-link-arrow"></span>
            </a>
      </div>
    </li>
  </ul>
  <!-- <mt-button type="primary"
             @click="$router.push({name: 'test'})">test</mt-button> -->
</div>

</template>

<script>
import dataService from '@/service/';
export default {

  name: 'wallet',

  data() {
    return {
      balance: '-', // 钱包余额
      shareDeposit: '-', // 分时保证金余额
      shareNote: '-', // 分时保证金提示文字
      rentDeposit: '-', // 长租保证金余额
      rentNote: '-' // 分时保证金提示文字
    }
  },
  methods: {
    routeTo(route) {
      this.$router.push({
        name: route
      })
    }
  },
  created() {
    let getUser = () => {
      if (this.$store.getters.user) {
        dataService.getUserMoneyDetail(this.$store.getters.user.id).then(res => {
          let result = res.data
          this.balance = result.data.userMoneyTotal

          this.shareDeposit = result.data.timeShareRentDeposit
          this.shareNote = result.data.timeShareRentDepositNote

          this.rentDeposit = result.data.longTermRentDeposit
          this.rentNote = result.data.longTermRentDepositNote
        }).catch().then(() => {
        })
      }else{
        setTimeout(() => {
          getUser()
        }, 100)
      }
    }
    getUser()
  },
  mounted() {}
}

</script>

<style lang="scss" scoped="">
@import '~@/assets/sass/variables.scss';
.wallet-index {
  width: 100%;
  padding: 6vw 3vw;
  li {
    margin-bottom: 4vw;
  }
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 34.5vw;
    padding-left: 5.8vw;
    overflow: hidden;
    border-radius: 1vw;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right;
    &.card-balance {
      background-image: url('~@/assets/img/wallet-balance.png');
    }
    &.card-share {
      background-image: url('~@/assets/img/wallet-deposit-share.png');
    }
    &.card-rent {
      background-image: url('~@/assets/img/wallet-deposit-rent.png');
    }
    h2 {
      color: $color-dark;
      font-size: 6.5vw;
      margin-bottom: 1.5vw;
    }
    p {
      font-size: 3vw;
      color: $color-gray-light;
    }
    .card-link {
      color: $color-gray;
      font-size: 4.9vw;
      text-decoration: none;
      margin-top: 3vw;
      .card-link-money {
        margin-left: 1.6vw;
      }
      .card-link-arrow {
        margin-left: 2vw;
        width: 2.15vw;
        height: 5.3vw;
        display: inline-block;
        background-image: url('~@/assets/img/wallet-arrow.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
      }
    }
  }
}
</style>
