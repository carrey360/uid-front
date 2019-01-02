<template>
  <login-layout>
    <h1>Sign in</h1>
    <div class="login_form">
      <LimitInput label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
      <LimitInput label="Password" warn="6位字符，需包含数字和字母两种元素" />
      <LimitInput label="Confirm Password" />
    </div>
    <button class="transfer-submit" :class="{disabled: disabled}" @click="handleSubmit">Submit</button>
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
import LimitInput from '@/components/input'
import LoginLayout from '@/components/loginLayout'
export default {
  name: 'sogin-in',
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
.no_acccount
  text-align center
  margin-top 20px
</style>
