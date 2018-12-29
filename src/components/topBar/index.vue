<template>
  <div>
    <div class="topBar">
      <div class="item">
        <div class="logo">
          <img src="@/assets/logo.png"/>
        </div>
        <div>我的钱包</div>
        <div>导入Keystore</div>
        <div>导出Keystore</div>
      </div>
      <div class="item">
        <div>登录</div>
        <div>注册</div>
        <!-- <div class="avatar">
          <img src="@/assets/avatar.jpg"/>
          <span>未登录</span>
        </div> -->
        <div>EN</div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.topBar
  position relative
  height 80px
  padding 0 40px 0 40px
  display flex
  justify-content space-between
  color #FFFFFF
  .item
    display flex
    align-items center
    font-size 14px
    font-weight 400
    >div
      margin-left 40px
    .logo
      margin-left 0px
      display flex
      align-items center
      img
        width 80px
        display inline-block
      span
        margin-left 10px
        font-weight bold
    .avatar
      margin-left 0px
      display flex
      align-items center
      img
        height 26px
        width 26px
        border-radius 50%
        display inline-block
      span
        margin-left 10px
        font-weight bold
</style>
