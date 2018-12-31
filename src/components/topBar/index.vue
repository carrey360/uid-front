<template>
  <div>
    <div :class="[isShowbgc ? 'bgc' : '', 'topBar']">
      <div class="item pc">
        <div class="logo">
          <a href="/"><img src="@/assets/logo.png"/></a>
        </div>
        <div><a href="/wallet">我的钱包</a></div>
        <div>导入Keystore</div>
        <div @click="exportKey()">导出Keystore</div>
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
        <!-- <div><a href="/login">登录</a></div>
        <div><a href="/register">注册</a></div> -->
        <div>
          <dropdown :close-on-click="true" :class-name="'dropdown'">
            <template slot="btn"><IconFont class="iconfont" name="icon-earth-" />小明</template>
            <template slot="body">
              <ul><li v-for="item in userList" :key="item.key" @click="userMenuChange(item.key)">{{ item.name }}</li></ul>
            </template>
          </dropdown>
        </div>
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

    <!-- 修改用户信息 -->
    <modal class="common-dailog" :visible="updateInfoDailog" @hide="updateInfoDailog = false" defaultWidth="470px" :animation-panel="'modal-slide-top'">
      <div class="dialog-content">
        <div class="dailog-cur-user-info" style="margin-bottom: 20px">
          <div class="avatar"><img width="66" src="@/assets/wallet/wallet-icon.jpg" alt=""></div>
          <div>
            <p class="name">小明</p>
            <p class="sign">如果实现单行文本的溢出显示省略号同学们应该都知道用text-overflow:ellipsis属性来,当然还需要加宽度width属来兼容部</p>
          </div>
        </div>

        <LimitInput label="用户名" warn="4-8位字符，需包含数字1-5和字母a-z两种元素"/>

        <LimitInput label="头像" warn=""/>

        <LimitInput label="性别" warn=""/>

        <LimitInput label="签名" warn=""/>

        <div class='dialog-btn'>
          <div class="cancel">取消</div>
          <div class="submit">创建账号</div>
        </div>
      </div>
    </modal>

    <!-- 导出 -->
    <modal class="common-dailog" :visible="exportDailog" @hide="exportDailog = false" defaultWidth="400px" :animation-panel="'modal-slide-top'">
      <div class="dialog-content">
        <div class="dialog-title">导出Keystore</div>
        <LimitInput label="密码" warn="请输入密码导出key store进行保存"/>

        <div class='dialog-btn'>
          <div class="cancel">取消</div>
          <div class="submit">导出</div>
        </div>
      </div>
    </modal>

  </div>
</template>

<script>
import Dropdown from 'bp-vuejs-dropdown'
import IconFont from '@/components/Iconfont'
import LimitInput from '@/components/input'
import modal from '@/components/modal'

export default {
  name: 'topBar',
  components: {Dropdown, IconFont, LimitInput, modal},
  props: {
    isShowbgc: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      updateInfoDailog: false,
      exportDailog: false,
      lang: 'EN',
      userList: [{key: 'userinfo', name: '账号信息'}, {key: 'layout', name: '退出'}],
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
    },
    userMenuChange (key) {
      if (key === 'userinfo') {
        this.updateInfoDailog = true
      }
    },
    exportKey () {
      this.exportDailog = true
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
    cursor pointer
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
  .topBar
    padding 0 16px
  .topBar .pc
    display none !important
  .topBar .mobile
    display flex !important
    >div
      margin-left 0
  .topBar .item:last-child > div
    margin-left 10px
</style>
<style lang="stylus" scoped>
  @import "../styles/dialog.styl"
</style>
