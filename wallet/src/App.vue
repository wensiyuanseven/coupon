<template>
<div id="app">
  <transition :name="transitionName">
    <router-view class="router"></router-view>
  </transition>
</div>

</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      transitionName: 'slide-right' // 默认动态路由变化为slide-right
    }
  },

  mounted() {
    if (window.FastClick) {
      window.FastClick.attach(document.body)
    }
  },
  watch: {
    '$route'(to, from) {
      let isBack = to.query.direction == 'back'
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
@import '~@/assets/sass/base.scss';
* {
  box-sizing: border-box;
  text-size-adjust: none;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: $color-white;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: $color-text;
  .mint-button {
    background-color: $color-yellow;
    color: $color-dark;
    border-radius: 0;
    height: 11.733vw;
    font-size: 4.266vw;
    width: 100%;
    &.mint-button--default {
      background-color: $color-gray;
      color: $color-white;
    }
    &.mint-button--primary {
      background-color: $color-yellow;
      color: $color-dark;
    }
  }
  .mint-button:not(.is-disabled):active::after {
    opacity: .2;
  }
}

input::-webkit-input-placeholder {
  color: $color-placeholder;
}

.mint-msgbox {
  border-radius: 12px;
  background-color: rgba(252, 252, 252, 0.95);
  width: 72%;
  .mint-msgbox-header {
    display: none;
  }
  .mint-msgbox-content {
    padding: 30px 25px 25px;
    .mint-msgbox-input {
      margin-bottom: -15px;
    }
  }
  .mint-msgbox-message {
    font-size: 14px;
    color: $color-dark;
    line-height: 20px; // text-align: left;
  }
  .mint-msgbox-btns {
    height: 45px;
  }
  .mint-msgbox-btn {
    font-size: 16px;
    background-color: transparent;
  }
  .mint-msgbox-cancel {
    color: $color-dark;
  }
  .mint-msgbox-confirm {
    color: $color-popup-blue;
    &:active {
      color: darken($color-popup-blue, 3%);
    }
  }
}

.mint-toast {
  background-color: RGBA(96, 96, 96, 0.8);
  border-radius: 8px;
}

.shadow-box {
  box-shadow: 0 0px 7px 4px rgba(217, 226, 233, 0.5);
  background-color: #fff;
}

.router {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  // background-color: #E9ECF3;
  background-color: #fdfdfe;
  box-shadow: 0 0 3px #aaa;
  transition: all .2s ease-out;
}

.slide-left-enter {
  // opacity: 0.5;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  z-index: 99;
}

.slide-right-leave-active {
  // opacity: 0;
  -webkit-transform: translate(5%, 0);
  transform: translate(5%, 0);
}

.slide-right-enter {
  // opacity: 0.5;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
  z-index: 99;
}

.slide-left-leave-active {
  // opacity: 0;
  -webkit-transform: translate(-5%, 0);
  transform: translate(-5% 0);
}
</style>
