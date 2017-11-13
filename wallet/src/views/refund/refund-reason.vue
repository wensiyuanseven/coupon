<template>
<div class="refund-reason">
  <h2>确定要退款吗？请选择您遇到的问题，以便我们更好的为您提供服务</h2>
  <div class="reasons">
    <mt-checklist v-model="checkedReasons"
                  :options="options">
    </mt-checklist>
    <textarea cols="30"
              rows="5"
              placeholder="请在此输入您的意见"
              v-model="reasonText"></textarea>
  </div>
  <div class="next-step">
    <mt-button type="primary"
               @click="handleClickNext">下一步</mt-button>
  </div>
</div>

</template>

<script>
import dataService from '@/service/';
export default {

  name: 'refund-reason',

  data() {
    return {
      options: [],
      checkedReasons: [],
      reasonText: ''
    }
  },

  methods: {
    handleClickNext() {
      if (this.reasonText) {
        this.checkedReasons.push({
          reason: 'other',
          reasonText: this.reasonText
        })
      }
      this.$store.commit('setRefundReason', this.checkedReasons)
      this.$router.push({
        name: 'refund'
      })
    }
  },

  created() {
    dataService.getRefundReasons(this.$store.getters.user.id).then(res => {
      this.options = res.data.data.filter(item => item.reason != 'other').map(item => {
        return {
          label: item.reasonText,
          value: item
        }
      })
    }).catch(e => {
    })
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.refund-reason {
  position: relative;
  height: 100%;
  padding: 5vw 0;
  h2 {
    font-size: 3.7333vw;
    padding: 0 6vw;
    line-height: 5vw;
  }
  .reasons {
    .mint-cell-wrapper {
      background: none;
    }
    .mint-cell:last-child {
      background: none;
    }
    .mint-checkbox-input:checked+.mint-checkbox-core {
      background-color: $color-yellow;
      border-color: $color-yellow;
    }
    .mint-checkbox-core {
      border-radius: 15%;
    }
    textarea {
      display: block;
      width: 93%;
      margin: 0 auto;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      box-sizing: border-box;
      font-size: 3.7333vw;
      background-color: #fff;
      background-image: none;
      border: 1px solid $color-gray-light;
      border-radius: 4px;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline: none;
      -webkit-appearance: none;
    }
  }
  .next-step {
    width: 93%;
    margin: 25vw auto 0;
  }
}
</style>
