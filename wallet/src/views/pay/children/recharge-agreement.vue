<template>
  <div class="recharge-agreement">
    <div v-html="agreement" class="agreement"></div>
  </div>
</template>

<script>
import dataService from '@/service'
export default {

  name: 'recharge-agreement',

  data () {
    return {
      agreement: ''
    }
  },

  mounted(){
    dataService.getRechargeAgreement().then(res => {
      this.agreement = res.data
    })
  }
}
</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.recharge-agreement{
  padding: 4vw;
  .agreement{
    *{
      font-size: 3.8vw;
    }
    p{
      margin: 2vw 0;
      color: $color-dark;
    }
    span{
      color: $color-dark;
    }
    strong{
      font-weight: bold;
    }
  }
}
</style>