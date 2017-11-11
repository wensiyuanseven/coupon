
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #787878;
  text-align: center;
  img {
    width: 30vw;
    height: 21.344vw;
  }
  span {
    display: inline-block;
    white-space: nowrap;
  }
}
</style>