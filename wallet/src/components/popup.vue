<template>
<div class="popup-wrapper"
     v-if="popupVisible">
  <div class="popup">
    <div class="popup-header"
         v-if="title">
      <p v-if="smallTitle">{{smallTitle}}</p>
      <h2 v-if="title">{{title}}</h2>
    </div>
    <div class="popup-content">
      <h3>请选择付款方式</h3>
      <ul class="popup-radio">
        <li v-for="option in options">
          <label class="popup-radiolist-label">
            <span class="popup-radio">
              <input
                class="popup-radio-input"
                type="radio"
                v-model="selectedVal"
                :disabled="option.disabled"
                :value="option.value || option">
              <span class="popup-radio-core"></span>
            </span>
            <span class="popup-radio-label"
                  v-text="option.label || option"></span>
            <p class="popup-radio-text"
               v-if="option.text">{{option.text}}</p>
          </label>
        </li>
      </ul>
    </div>
    <div class="popup-footer">
      <slot name="footer">
        <button class="popup-btn-cancel"
                @click="handleClickCancel">取消</button>
        <button class="popup-btn-confirm"
                @click="handleClickConfirm">确定</button>
      </slot>
    </div>
  </div>
</div>

</template>

<script>
export default {

  name: 'popup',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    smallTitle: {
      type: String,
      default: '退款金额'
    },
    title: {
      type: String,
      default: '200元'
    },
    contentTitle: {
      type: String,
      default: '请选择退款方式'
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      popupVisible: this.value,
      selectedVal: (() => {
              let ret
              this.options.forEach(item => {
                if (item.default) {
                  ret = item.value
                }
              })
              return ret
            })()
    }
  },

  methods: {
    handleClickCancel() {
      this.popupVisible = false
      this.$emit('cancel')
    },
    handleClickConfirm() {
      this.popupVisible = false
      this.$emit('confirm', this.selectedVal)
    }
  },

  created() {},

  watch: {
    value(val) {
      this.popupVisible = val
    },
    popupVisible(val) {
      this.$emit('input', val)
    }
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  .popup {
    width: 72%;
    background-color: rgba(252, 252, 252, 0.95);
    border-radius: 12px;
    .popup-header {
      padding: 12px 0px 0px;
      border-bottom: 1px solid #dddddd;
      text-align: center;
      p {
        font-size: 12px;
      }
      h2 {
        font-size: 20px;
        margin: 5px auto 7px;
      }
    }
    .popup-content {
      min-height: 36px;
      position: relative;
      padding: 15px 15px 5px;
      border-bottom: 1px solid rgb(221, 221, 221);
      h3 {
        font-size: 12px;
        padding-left: 22px;
        padding-bottom: 5px;
      }
    }
    .popup-footer {
      display: flex;
      height: 40px;
      line-height: 40px;
      button {
        line-height: 35px;
        display: block;
        background-color: transparent;
        -webkit-box-flex: 1;
        flex: 1 1 0%;
        margin: 0px;
        font-size: 14px;
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
      }
      .popup-btn-cancel {
        width: 50%;
        border-right: 1px solid rgb(221, 221, 221);
      }
      .popup-btn-confirm {
        color: $color-popup-blue;
        width: 50%;
      }
    }
  }
  .popup-radio {
    li {
      align-items: center;
      display: flex;
      font-size: 14px;
      line-height: 1;
      min-height: inherit;
      overflow: hidden;
      padding: 0 5px;
      width: 100%;
      min-height: 30px;
      margin-bottom: 15px;
    }
    .popup-radiolist-label {
      display: block;
      flex: 1;
    }
    .popup-radio-label {
      vertical-align: middle;
      margin-left: 6px;
      font-size: 14px;
    }
    .popup-radio {
      &.is-right {
        float: right;
      }
      .popup-radio-input {
        display: none;
        &:checked {
          +.popup-radio-core {
            background-color: $color-popup-blue;
            border-color: $color-popup-gray;
          }
        }
        &[disabled]+.popup-radio-core {
          background-color: $color-popup-gray;
          border-color: $color-popup-gray;
        }
      }
      .popup-radio-core {
        box-sizing: border-box;
        display: inline-block;
        background-color: $color-white;
        border-radius: 100%;
        border: 1px solid #ccc;
        position: relative;
        width: 8px;
        height: 8px;
        vertical-align: middle;
        transition: background .1s ease-out;
      }
    }
    .popup-radio-text {
      margin-left: 18px;
      margin-top: 8px;
    }
  }
}
</style>
