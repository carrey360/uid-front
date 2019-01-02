<template>
  <login-layout>
    <div class="user-editor">
       <img width="100" height="100" src="../assets/wallet/wallet-icon.jpg" alt="">
       <div class="user-editor--name">
          <h3>Ming Cheng</h3>
          <p>这里是签名Please enter your</p>
       </div>
    </div>
    <LimitInput label="Username" warn="4-8位字符，需包含数字1-5和字母a-z两种元素"/>
    <LimitInput label="Profile Photo" />
    <LimitInput label="Gender"/>
    <LimitInput label="Signature"/>
    <button class="transfer-submit">Submit</button>
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
  name: 'Account',
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
.user-editor
  display flex
  margin-bottom 40px
  &--name
    margin-left 20px
    display flex
    flex-direction column
    justify-content space-between
    padding 20px 0
    h3
      font-size 16px
      font-weight 500
      color #333333
</style>
