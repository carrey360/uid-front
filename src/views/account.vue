<template>
  <div class="account-wrapper">
    <div class="account_left">
      <div class="account_left--warpper">
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
      </div>
    </div>
    <div ref="circleBox" class="account_right">
      <div class="circle circle_1"></div>
      <div class="circle circle_2" :style="styleCircle"></div>
      <div class="circle circle_3"></div>
      <div class="circle circle_4"></div>
      <div class="warn_box">
        <h1>Welcome</h1>
        <p>Wether you are an expett or a baeginner.EOS is going to</p>
        <p>become the first platform whiche will faster all your needs </p>
        <p>in a simple, easy and intuotive way</p>
      </div>
    </div>
  </div>
</template>
<script>
import LimitInput from '@/components/input'
export default {
  name: 'Account',
  components: { LimitInput },
  data () {
    return {
      styleCircle: {
        width: '400px',
        height: '400px'
      },
      disabled: false
    }
  },
  created () {
    window.addEventListener('resize', (e) => {
      if (this.$refs.circleBox) {
        const { clientWidth } = this.$refs.circleBox
        if (clientWidth < 900) {
          let long = clientWidth * 0.6 === 0 ? 400 : clientWidth * 0.6
          this.styleCircle.width = `${long}px`
          this.styleCircle.height = `${long}px`
        }
      }
    }, false)
  },
  methods: {
    handleSubmit () {
      this.disabled = !this.disabled
    }
  }
}
</script>
<style lang="stylus" scoped>
.account-wrapper
  display flex
  width 100%
  height 100%
  min-width 360px
  .account_left
    flex auto
    display flex
    flex-direction column
    position relative
    .account_left--warpper
      width 380px
      position absolute
      top 20%
      left 50%
      margin-left -190px
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
  .account_right
    flex 0 0 61.8%
    background-color rgba(206,35,68,1)
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 38% 100%)
    color #fff
    position relative
    .circle
      display inline-block
      border-radius 50%
      position absolute
    .circle_1
      width 440px
      height 440px
      background:linear-gradient(333deg,rgba(245,81,95,1) 0%,rgba(159,4,27,1) 100%);
      opacity 0.18
      top -220px
      left -220px
    .circle_2
      background:linear-gradient(333deg,rgba(245,81,95,1) 0%,rgba(159,4,27,1) 100%);
      opacity 0.6
      top 0
      right 0
    .circle_3
      width 180px
      height 180px
      background linear-gradient(221deg,rgba(245,81,95,1) 0%,rgba(159,4,27,1) 100%)
      opacity 0.8
      bottom 24%
      right 40%
    .circle_4
      width 108px
      height 108px
      background:linear-gradient(333deg,rgba(245,81,95,1) 0%,rgba(159,4,27,1) 100%);
      opacity 0.6
      bottom 20%
      right 10%
    .warn_box
      position absolute
      top 20%
      right 22%
      h1
        font-size 60px
        margin-bottom 50px
      & > p
        font-size 16px
      & > p:nth-child(4)
        text-align right
@media screen and (max-width: 1200px)
  .account-wrapper
    .account_right
      .warn_box
        right 8%
@media screen and (max-width: 800px)
  .account-wrapper
    .account_left
      display flex
      justify-content center
      .account_left--warpper
        width 80%
        margin 0 auto
        position initial
    .account_right
      display none
</style>
