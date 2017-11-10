<template>
<div class="choose-money">
  <ul>
    <li v-for="(item, index) in moneyList"
        :key="index">
      <div class="money"
           @click="selectMoney(index)"
           :class="{active: index == currentMoneyIndex}">{{item}}元</div>
    </li>
    <li v-if="customizable">
      <input type="number"
             @focus="handleFocusCustom"
             @blur="handleBlueCustom"
             class="custom-money"
             :class="{active: currentMoneyIndex == -1}"
             placeholder="其他">
      <!-- <div class="custom-money"
           @click="selectCustom"
           :class="{active: currentMoneyIndex == -1}">
        <span v-if="customMoney">{{customMoney}}元</span>
        <span v-else>其他</span>
      </div> -->
    </li>
  </ul>
  <!-- {{getMoney()}} -->
</div>

</template>

<script>
export default {

  name: 'choose-money',

  props: {
    // 可供选择的金额列表
    moneyList: {
      type: Array,
      default: []
    },
    // 是否支持自定义金额
    customizable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentMoneyIndex: 0,
      customMoney: 0,
      tmpIndex: 0
    }
  },

  methods: {
    selectMoney(index) {
      this.currentMoneyIndex = index
      let $input = this.$el.querySelector('.custom-money')
      $input.value = ''
      $input.classList.remove('active')
    },
    // selectCustom() {
    //   return
    //   let params = {
    //     confirmButtonHighlight: true,
    //     inputType: 'tel',
    //     inputPattern: /^(([1-9]\d*)|0)(\.\d{1,2})?$/
    //   }
    //   if (this.customMoney > 0) {
    //     params.inputValue = this.customMoney
    //   }
    //   this.$message.prompt('请输入充值金额（元）', '充值', params).then(({value, action}) => {
    //     let money = Number(value)
    //     if (money && money > 0) {
    //       this.currentMoneyIndex = -1
    //       this.customMoney = money
    //     }
    //   }).catch(e => {

    //   })
    // },
    handleFocusCustom() {
      if (this.currentMoneyIndex > -1) {
        this.tmpIndex = this.currentMoneyIndex
      }
      this.currentMoneyIndex = -1
    },
    handleBlueCustom() {
      let $input = this.$el.querySelector('.custom-money')
      let customMoney = Number($input.value)
      let moneyReg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/
      if (!isNaN(customMoney) && customMoney > 0 && moneyReg.test(customMoney)) {
        this.customMoney = customMoney
      } else {
        if($input.value !== ''){
          $input.value = ''
          this.$toast('您输入的金额不正确')
        }
        this.currentMoneyIndex = this.tmpIndex
      }
    },
    getMoney() {
      if (this.currentMoneyIndex == -1) {
        return this.customMoney
      }
      return this.moneyList[this.currentMoneyIndex]
    }
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.choose-money {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      padding: 1vw;
      >div {
        height: 16vw;
        text-align: center;
        line-height: 16vw;
        background-color: #D8D8D8;
      }
      .money {
        &.active {
          background-color: $color-yellow;
          box-shadow: 0 0 3px rgba(0, 0, 0, .3);
        }
      }
      .custom-money {
        width: 100%;
        height: 16vw;
        text-align: center;
        background-color: #D8D8D8;
        display: block;
        outline: 0px;
        box-shadow: none;
        border-radius: 0;
        -webkit-appearance: none;
        &::-webkit-input-placeholder {
          color: $color-dark;
        }
        &:focus::-webkit-input-placeholder {
          color: transparent;
          visibility: hidden;
          display: none;
        }
        &.active {
          border: 1px solid $color-yellow;
          background-color: $color-white;
          color: $color-dark;
        }
        &:focus {
          border: 1px solid $color-yellow;
          background-color: $color-white;
          color: $color-dark;
        }
      }
    }
  }
}

.mint-msgbox-btn {
  font-size: 16px;
}
</style>
