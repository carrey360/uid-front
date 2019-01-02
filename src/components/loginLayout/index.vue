<template>
  <div class="login-wrapper">
    <div class="login_left">
      <div class="login_left--warpper">
        <slot></slot>
      </div>
    </div>
    <div ref="circleBox" class="login_right">
      <div class="circle circle_1"></div>
      <div class="circle circle_2" :style="styleCircle"></div>
      <div class="circle circle_3"></div>
      <div class="circle circle_4"></div>
      <div class="warn_box">
        <slot name="title"></slot>
        <!-- <h1>Welcome Back</h1>
        <p>Wether you are an expett or a baeginner.EOS is going to</p>
        <p>become the first platform whiche will faster all your needs </p>
        <p>in a simple, easy and intuotive way</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login-layout',
  data () {
    return {
      styleCircle: {
        width: '400px',
        height: '400px'
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.formatCircle)
      this.formatCircle()
    })
  },
  methods: {
    handleSubmit () {
      this.disabled = !this.disabled
    },
    formatCircle () {
      if (this.$refs.circleBox) {
        const { clientWidth } = this.$refs.circleBox
        if (clientWidth < 900) {
          let long = clientWidth * 0.6 === 0 ? 400 : clientWidth * 0.6
          this.styleCircle.width = `${long}px`
          this.styleCircle.height = `${long}px`
        }
      }
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
      .title
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
@media screen and (max-width: 900px)
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
