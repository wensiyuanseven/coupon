<template>
<div class="sesame-auth full">
  <iframe class="full"
          v-if="showFrame"
          v-show="iframeSrc"
          :src="iframeSrc"
          src="http://101.132.26.45:8089/v22/web/zhima-score?params=H7r0y4cDcqb8zUvBlHOrozJynD36f0950fLUFk6yf%2BKqacSVNzD6e0t7xN8Y2ow8HsbZC4kivor8TBiV1diTUWma5QlXIKM%2Bd9a8%2BMqIcdO6Fp6FdpXdj6Tcl6R%2BQw%2FqBajSa4WCM4TabaVwH9AhZzHLZPwnbGdHkjrMA000g8yzCWbEHMd9mkz97Dzs9FlkkVBm3PXThdw6az5m1GxF8hsP%2F6v5XTff2xP30Fq7%2FLIDfqin1q9frhK4%2BMnXQNr%2BFKcCxerocEO4C8ah1CYLRn%2F1%2F8Oy1oIzluiNBxluTuDDb6aRaVmEIREb5TjAcAuhcQAycHRS0S%2FpCxXc7UruFA%3D%3D&sign=LOXrIxDArvOdaOIH8AirgrqRM9015vuxbDWLN%2Bux2dQRRjJC9thu2LxZQtIyN162MSvGrHI8avFj3nOmBRrmHZ%2BUyRlMEejGAggRtB5CFLpaoyDOcIrt5F6qxFp39q21yevgug0qjuV8ZEuMQsa%2BZ68TtMfMkW23g5zTx%2BOc2Ac%3D"
          frameborder="0"
          id="sesameAuthFrame"
          onload=""
          scrolling="auto"></iframe>
</div>

</template>

<script>
export default {

  name: 'sesame-auth',

  data() {
    return {
      showFrame: true,
      iframeSrc: ''
    }
  },

  mounted() {
    this.iframeSrc = this.$route.query.url
    window.onmessage = (event) => {
      console.log('====message====', event)
      let result
      try {
        result = JSON.parse(event.data)
      } catch (e) {
        result = {}
      }
      if (result && result.errCode == 0) {
        this.$toast('芝麻认证成功')
      } else if (result && result.errMsg) {
        this.$toast(result.errMsg)
      } else {
        this.$toast('芝麻认证失败')
      }
      this.$router.replace({
        name: 'sesameCredit'
      })
    }
  }
}

</script>

<style lang="scss">
.sesame-auth {
  -webkit-overflow-scrolling: touch;
  iframe {}
}
</style>
