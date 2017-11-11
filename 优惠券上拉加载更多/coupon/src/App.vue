<template>
  <div id='app'>
    <div class="tab-control">
      <span @click="toggleTabs('unUsed')" :class="{active:currentActive==='unUsed'}" class="tab-item">未使用</span>
      <span @click="toggleTabs('beenUsed')" :class="{active:currentActive==='beenUsed'}" class="tab-item">已使用</span>
      <span @click="toggleTabs('nullBrace')" :class="{active:currentActive==='nullBrace'}" class="tab-item">已失效</span>
    </div>
    <!-- 动态组件渲染的内容 -->
    <div>
      <!-- <keep-alive> -->
      <component :is="currentView"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import unUsed from "./components/un-used"; //未使用
import beenUsed from "./components/been-used"; //已使用
import nullBrace from "./components/null-brace"; //已失效
const ERR_Ok = 0;
export default {
  name: "app",
  components: {
    beenUsed,
    nullBrace,
    unUsed
  },
  data() {
    return {
      currentView: "unUsed", //默认选中未使用组件
      beenUsed: "beenUsed", //已使用组件
      nullBrace: "nullBrace", //已失效组件
      unUsed: "unUsed", //未使用组件
      currentActive: "unUsed" //切换样式
    };
  },
  mounted() {
    setTimeout(() => {
      // let app=document.getElementById('app')
      // app.addEventListener('touchmove',(e)=>{
      //   e.preventDefault()
      // },false)
    }, 20);
  },
  methods: {
    // 绑定切换事件
    toggleTabs: function(tabText) {
      this.currentView = tabText; //当前组件
      this.currentActive = tabText; //切换样式
    }
  }
};
</script>

<style lang='scss'>
@import url("./assets/css/default.css");
html,
body {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // 记得改颜色
}
// 选中的样式
.active {
  border-bottom: 0.53vw solid #fdd000;
}
#app {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  .tab-control {
    // 选项卡标题
    position: fixed;
    top: 0;
    z-index: 999;
    display: flex;
    height: 12vw;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #3d3d3d;
    padding: 0 2.66666vw 0 2.66666vw;
    .tab-item {
      // 选项卡每一个标题
      width: 14.86666vw;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 4.2666vw;
      color: #ffffff;
      padding-bottom: 1.3vw;
    }
  }
}
</style>
