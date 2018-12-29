<template>
  <div class="login-wrapper">
    <div class="login_left">
      <div class="login_left--warpper">
        <h1>Sign in</h1>
        <div class="login_form">
          <LimitInput label="Account" warn="4-8位字符，需包含数字1-5和字母a-z两种元素" />
          <LimitInput label="Password" warn="6位字符，需包含数字和字母两种元素" />
          <LimitInput label="Confirm Password" />
        </div>
        <button :class="{disabled: disabled}" @click="handleSubmit">Submit</button>
        <p class="no_acccount">NO EOS ACCOUNT？ <span style="color: #195BDD">REGISTER</span></p>
      </div>
    </div>
    <div ref="circleBox" class="login_right">
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
  name: 'Login',
  components: { LimitInput },
  data () {
    return {
      styleCircle: {
        width: '600px',
        height: '600px'
      },
      disabled: false
    }
  },
  created () {
    window.addEventListener('resize', (e) => {
      if (this.$refs.circleBox) {
        const { clientWidth } = this.$refs.circleBox
        if (clientWidth < 900) {
          let long = clientWidth * 0.6 === 0 ? 600 : clientWidth * 0.6
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
.login-wrapper
  display flex
  width 100%
  height 100%
  min-width 360px
  .login_left
    flex auto
    display flex
    flex-direction column
    position relative
    .login_left--warpper
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
      .login_form
        margin-bottom 48px
        &--item
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
    button
      background-color #CE2344
      padding 10px
      width 100%
      color #fff
      font-weight bold
      cursor pointer
      margin-bottom 20px
      border-radius 5px
      border none
      outline none
      &:hover
        background-color rgba(206, 35, 68, 0.8)
    button.disabled
      background-color #E8E5EE
      pointer-events none
      cursor default
    .no_acccount
      text-align center
  .login_right
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
  .login-wrapper
    .login_right
      .warn_box
        right 8%
@media screen and (max-width: 800px)
  .login-wrapper
    .login_left
      display flex
      justify-content center
      .login_left--warpper
        width 80%
        margin 0 auto
        position initial
    .login_right
      display none
</style>
