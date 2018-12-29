<template>
  <div>
    <div :class="[isShowbgc ? 'bgc' : '', 'topBar']">
      <div class="item pc">
        <div class="logo">
          <a href="/"><img src="@/assets/logo.png"/></a>
        </div>
        <div><a href="/wallet">我的钱包</a></div>
        <div>导入Keystore</div>
        <div>导出Keystore</div>
      </div>
      <div class="item mobile">
        <dropdown :close-on-click="true" :class-name="'dropdown'">
          <template slot="btn">
            <div class="logo">
              <img src="@/assets/logo.png"/>
            </div>
          </template>
          <template slot="body">
            <ul><li v-for="item in menuList" :key="item.key" @click="menuChange(item.key)">{{ item.name }}</li></ul>
          </template>
        </dropdown>
      </div>
      <div class="item">
        <div><a href="/login">登录</a></div>
        <div><a href="/register">注册</a></div>
        <!-- <div class="avatar">
          <img src="@/assets/avatar.jpg"/>
          <span>未登录</span>
        </div> -->
        <div style="display: flex;align-items: center;">
          <IconFont class="iconfont" name="icon-earth-" />
          <dropdown :close-on-click="true" :class-name="'dropdown'">
            <template slot="btn">{{ lang }}</template>
            <template slot="body">
              <ul><li v-for="item in ['EN', 'CN']" :key="item" @click="langChange(item)">{{ item }}</li></ul>
            </template>
          </dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from 'bp-vuejs-dropdown'
import IconFont from '@/components/Iconfont'

export default {
  name: 'topBar',
  components: {Dropdown, IconFont},
  props: {
    isShowbgc: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      lang: 'EN',
      menuList: [{key: 'home', name: '首页'}, {key: 'wallet', name: '我的钱包'}, {key: 'import', name: '导入Keystore'}, {key: 'export', name: '导出Keystore'}]
    }
  },
  methods: {
    langChange (lang) {
      this.lang = lang
    },
    menuChange (key) {
      if (key === 'wallet') {
        this.$router.push({path: '/wallet'})
      } else if (key === 'home') {
        this.$router.push({path: '/'})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.bgc
  background-color #CE2344
.iconfont
  margin-right 5px

.mobile
  display none !important

>>>.bp-dropdown__btn
  border 0 none
>>>.dropdown-bp__body
  background #CE2344
  color #ffffff
  li
    padding 5px
    cursor pointer
>>>.bp-dropdown__btn--active
  background #CE2344

.topBar
  position relative
  height 80px
  // line-height 80px
  padding 0 40px 0 40px
  display flex
  justify-content space-between
  color #FFFFFF
  a
    text-decoration none
    color #fff
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

@media screen and (max-width: 640px)
  .topBar .pc
    display none !important
  .topBar .mobile
    display flex !important
    >div
      margin-left 0
  .topBar .item:last-child > div
    margin-left 10px
</style>
