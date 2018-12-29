<template>
  <div class="form-item">
    <label for="">{{label}}</label>
    <input type="text" :placeholder="placeholder" :value="inputVal" @input="handleInput">
    <p>{{warn}}</p>
  </div>
</template>
<script>
export default {
  name: 'limit-input',
  props: {
    value: '',
    numberType: {
      type: String,
      default: 'string'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    warn: {
      type: String,
      default: '4-8位字符，需包含数字1-5和字母a-z两种元素'
    }
  },
  data () {
    return {
      inputVal: this.value === 0 ? 0 : this.value || ''
    }
  },
  methods: {
    handleInput (e) {
      this.inputVal = e.target.value
    },
    limit (val, oVal) {
      if (this.numberType === 'nolimit') return val
      if (!val) return
      if (this.numberType === 'string') {
        let reg = /^[a-z1-5.]{0,12}$/ // 数字1-5 字符a-z大小写 最多12位
        if (!reg.test(val)) {
          val = oVal
        }
      } else if (this.numberType === 'int') {
        let reg = /^[1-9]{1}\d*$/ // 大于零正整数
        if (!reg.test(val)) {
          val = oVal
        }

        if (+this.maxValue > 0 && val > +this.maxValue) {
          val = +this.maxValue
        }
      } else if (this.numberType === 'float') {
        let reg = /^(0|[1-9]+\d*)([.]{1}[0-9]{0,4}){0,1}$/ // 小数最多四位
        if (!reg.test(val)) {
          val = oVal
        }
      }
      return val
    }
  },
  watch: {
    value (nVal, oVal) {
      // 改变input框中的内容
      this.inputVal = this.limit(nVal, oVal)
      this.$emit('input', this.inputVal)
    },
    inputVal (nVal, oVal) {
      // 改变input框中的内容
      this.inputVal = this.limit(nVal, oVal)
      // // 重发事件，改变父组件v-model绑定的值
      this.$emit('input', this.inputVal)
    }
  }
}
</script>
<style lang="stylus" scoped>
.form-item
  display flex
  flex-direction column
  margin-bottom 24px
  label
    font-size 14px
    color #333333
    margin-bottom 8px
  input
    border 1px solid #D9D5E2
    height 40px
    width 100%
    padding 0 12px
    outline none
    box-sizing border-box
  p
    font-size 12px
    color #A8A8A8
    margin-top 10px
</style>
