
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
// 居中
#nodata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30vw;
  color: #787878;
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