
<template>
  <div id="nodata">
      <img src="./../../assets/img/nodate.png" alt="暂无数据">
      <span>{{nodata}}</span>
  </div>
</template>

<script>
  export default {
    name: "NoDtata",
    props: {
      nodata: String
    }
  };
</script>

<style lang="scss" scoped>
  // 没有更多券
  // 居中
  #nodata {
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center; // position: absolute;
    margin-top: 30vw;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -200%);
    color: #787878;
    // text-align: center;
    img {
      width: 30vw;
      height: 21.344vw;
    }
    span {
      padding-top: 4vw;
      display: inline-block;
      white-space: nowrap;
      font-size: 3.7333vw;
    }
  }
</style>