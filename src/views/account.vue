<template>
  <login-layout>
    <h1>创建主网账户</h1>
    <div class="account-content">
      <LimitInput label="账号" warn="4-8位字符，需包含数字1-5和字母a-z两种元素"/>
      <div class="account-content-input-label">
        <span>公钥</span>
        <span class="copy">生成新公钥</span>
      </div>
      <textarea class="account-content-textarea"></textarea>
      <p class="account-content-input-remark">所有者和使用者公钥相同</p>
      <br>
      <div class="account-content-input-label">
        <span>私钥</span>
      </div>
      <textarea class="account-content-textarea"></textarea>
      <p class="account-content-input-remark-warn">不要透露给任何人</p>
      <br>
      <br>
      <div class="account-content-text">
        <h4>离线保存</h4>
        <p>建议抄写或打印私钥后放置在安全地点保存</p>
        <br>
        <h4>请勿使用网络传输</h4>
        <p>请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑 客获取造成不可挽回的资产损失</p>
      </div>
      <br>
      <button class="transfer-submit">创建账号</button>
    </div>
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
h1
  color #CE2344
  font-size 3rem
  margin-bottom 46px
  text-align left
  width 100%
.account-content
  font-size 14px
  .copy
    color #455DE1
    fobt-size 12px
    svg
      width 12px
      height 12px
      margin-right 6px
  .account-content-input-label
    display flex
    > span:first-child
      flex 1
  .account-content-textarea
    border 0
    border 1px solid #D8D8D8
    height 70px
    width 100%
    padding 0 12px
    outline none
    box-sizing border-box
    border-radius 2px
    margin-top 10px
    &:hover, &:focus
      border-color #CE2344
  .account-content-input-remark
    font-size 12px
    color #a8a8a8
    margin-top 5px
  .account-content-input-remark-warn
    color #CE2344
    font-size 12px
    margin-top 5px
  .account-content-text
    color rgba(93,66,32,1)
</style>
