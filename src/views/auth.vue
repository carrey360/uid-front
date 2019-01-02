<template>
  <login-layout>
    <h1>Login in</h1>
    <div class="login_form">
      <LimitInput label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput label="Password" warn="6位字符，需包含数字和字母两种元素" />
      <p class="login_forget">Forget password?</p>
    </div>
    <div class="login_line">
      <span>BetDice请求获取以下权限</span>
    </div>
    <div class="login_checkbox">
      <label><input type="checkbox" name="NAME" value="VALUE">10000.0000BOS</label>
      <label><input type="checkbox" name="NAME" value="VALUE1">100000.8888DICE</label>
    </div>
    <p class="login_warn">24小时内可以从您的账户与各种扣除以下资产，授权后表示您知晓并同意以上请求。</p>
    <button :class="{'btn-disabled': disabled}" class="transfer-submit" @click="handleSubmit">Login in</button>
    <p class="no_acccount">NO EOS ACCOUNT？ <span style="color: #195BDD">REGISTER</span></p>
    <template slot="title">
      <p class="title">Welcome Back</p>
      <p>Wether you are an expett or a baeginner.EOS is going to</p>
      <p>become the first platform whiche will faster all your needs </p>
      <p>in a simple, easy and intuotive way</p>
    </template>
  </login-layout>
</template>
<script>
import LoginLayout from '@/components/loginLayout'
import LimitInput from '@/components/input'
export default {
  name: 'Login',
  components: { LimitInput, LoginLayout },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    handleSubmit () {
      this.disabled = !this.disabled
    }
  }
}
</script>
<style lang="stylus" scoped>
h1
  color #CE2344
  font-size 3rem
  margin-bottom 46px
  text-align left
  width 100%
.login_form
  margin-bottom 48px
.login_forget
  width 100%
  text-align right
  color #195BDD
  font-size 14px
  cursor pointer
.login_line
  height 1px
  background-color #D9D5E2
  width 100%
  position relative
  margin-bottom 24px
  display flex
  justify-content center
  span
    position absolute
    top -16px
    display inline-block
    padding 6px 20px
    background #fff
    font-size 14px
.login_checkbox
  display flex
  flex-direction column
  padding-left 30%
  label
    margin-bottom 12px
    font-size 16px
    color #333333
    cursor pointer
    input
      margin-right 10px
      width 16px
      height 16px
.login_warn
  font-size 14px
  color #5E6875
  margin-bottom 48px
.no_acccount
  text-align center
  margin-top 20px
</style>
