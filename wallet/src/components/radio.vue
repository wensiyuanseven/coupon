<template>
<div class="v-radiolist"
     @change="$emit('change', currentValue)">
  <ul>
    <li v-for="option in options">
      <label class="v-radiolist-label">
        <span :class="{'is-right': align === 'right'}"
              class="v-radio">
          <input
            class="v-radio-input"
            type="radio"
            v-model="currentValue"
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="v-radio-core"></span>
        </span>
        <img v-if="option.icon"
             :src="imagePath(option.icon)"
             alt=""
             class="v-radio-icon">
        <span class="v-radio-label"
              v-text="option.label || option"></span>
      </label>
    </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'radio',

  props: {
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: String
  },

  data() {
    return {
      currentValue: this.value
    }
  },

  methods: {
    imagePath(imgName) {
      return imgName ? require('@/assets/img/' + imgName) : ''
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    },

    currentValue(val) {
      this.$emit('input', val)
    }
  }
}

</script>

<style lang="scss">
@import '~@/assets/sass/variables.scss';
.v-radiolist {
  li {
    align-items: center;
    display: flex;
    font-size: 4.26vw;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 6vw;
    width: 100%;
    min-height: 10.5vw;
  }
  .v-radiolist-label {
    display: block;
    flex: 1;
  }
  .v-radio-label {
    vertical-align: middle;
    margin-left: 1.6vw;
  }
  .v-radio-icon{
    width: 5vw;
    vertical-align: middle;
  }
  .v-radio {
    &.is-right {
      float: right;
    }
    .v-radio-input {
      display: none;
      &:checked {
        +.v-radio-core {
          background-color: $color-yellow;
          border-color: $color-yellow;
          &::after {
            border-color: $color-white;
            transform: rotate(45deg) scale(1);
          }
        }
      }
      &[disabled]+.v-radio-core {
        background-color: $color-gray;
        border-color: #ccc;
      }
    }
    .v-radio-core {
      box-sizing: border-box;
      display: inline-block;
      background-color: $color-white;
      border-radius: 100%;
      border: 1px solid #ccc;
      position: relative;
      width: 5.333vw;
      height: 5.333vw;
      vertical-align: middle;
      &::after {
        border: 0.5333vw solid transparent;
        border-left: 0;
        border-top: 0;
        content: " ";
        position: absolute;
        top: 0.9vw;
        left: 1.6vw;
        width: 1.0666vw;
        height: 2.1333vw;
        transform: rotate(45deg) scale(0);
        transition: transform .2s;
      }
    }
  }
}
</style>
