<template>
  <div class="home-warrap">
    <div class="head">
      <div class="top-bar">
       <topBar :isShowbgc="isShowbgc"></topBar>
      </div>
      <img class="top-bg" src="@/assets/home/top.png" />
    </div>
    <div class="access-guide">
      <span @click="guide"><IconFont class="iconfont" name="icon-tishi" />接入指南</span>
    </div>
    <div class="dapp-list-content">
      <ul>
        <li v-for="(item, key) in dappList" :key="key" @click="toDetail(item)">
          <div>
            <div class="info">
              <div class="img-content">
                <img v-if="item.logo_url" :src="item.logo_url"/>
                <img v-else :src="dappDefaultLogo" />
              </div>
              <div>
                <p class="title">{{item.appname}}</p>
                <p class="auth" v-if="item.auth">授权状态：{{item.auth}}</p>
              </div>
            </div>
            <div class="brief">{{item.brief}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bttom"><img src="@/assets/home/bottom.png" /></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import { getTableRow, toApiFormatUserName } from '@/utils/'
import config from '@/utils/config'

export default {
  name: 'home',
  components: {topBar, IconFont},
  data () {
    return {
      isShowbgc: false,
      dappDefaultLogo: config.dappDefaultLogo,
      dappList: []
    }
  },
  computed: {
    ...mapState(['isLogin', 'userName'])
  },
  created () {
    let params = {
      code: config.contractAccount,
      scope: config.contractAccount,
      table: 'dapps',
      index_position: 1,
      limit: 50
    }
    this.getTableRowsForAjax(params)
  },
  methods: {
    getTableRowsForAjax (params) {
      let _that = this
      getTableRow(params, function (response) {
        _that.handleResponse(response)
      }, function () {
        window.tip(_that.$t('失败'))
      })
    },
    handleResponse (response) {
      if (response.rows) {
        if (this.userName) {
          this.getUserAuthStatus(response.rows)
        } else {
          this.dappList = response.rows
        }
      }
    },
    getUserAuthStatus (dappList) { // 获取用户授权状态
      let _that = this
      let params = {
        code: config.contractAccount,
        scope: toApiFormatUserName(this.userName),
        index_position: 1,
        table: 'auths',
        limit: 50
      }
      getTableRow(params, function (res) {
        let resultList = []
        if (res.rows && res.rows.length > 0) {
          resultList = res.rows
        }
        dappList.map(item => {
          let someFlag = resultList.some(d => d.contract === item.contract)
          if (someFlag) {
            item.auth = '已授权'
          } else {
            item.auth = '未授权'
          }
          return item
        })
        _that.dappList = dappList
      })
    },
    toDetail (dappInfo) {
      this.$router.push({path: '/detail', query: {contract: dappInfo.contract}})
    },
    guide () {
      this.$router.push({path: '/guide'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  min-width 360px
  .head
    width 100%
    height 100%
    position relative
    .top-bg
      width 100%
      height 100%
    .top-bar
      position absolute
      top 0px
      width 100%
  .access-guide
    max-width 1200px
    margin 0 auto
    position relative
    z-index 2
    text-align right
    cursor pointer
    margin-top -20px
    .iconfont
      margin-right 10px
  .dapp-list-content
    max-width 1224px
    margin 0 auto
    position relative
    z-index 2
    ul
      display flex
      flex-wrap wrap
      margin-top 20px
      li
        flex 0 0 33.33%
        margin-top 24px
        padding 12px
        box-sizing border-box
        & > div
          background rgba(255,255,255,1)
          box-shadow 4px 8px 20px 0px rgba(41,26,204,0.1)
          border-radius 6px
          height 230px
          box-sizing border-box
          padding 40px
          cursor pointer
          .info
            display flex
            align-items center
            color #A8A8A8
            .img-content
              height 60px
              width 60px
              border-radius 50%
              margin-right 10px
              img
                height 60px
                width 60px
                border-radius 50%
            .title
              color #333333
              font-size 22px
          .brief
            margin-top 24px
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
            overflow hidden
          &:hover
            transition 0.3s
            transform scale(1.06)
            border 2px solid #CE2344
            box-shadow 4px 10px 20px 0px rgba(206,35,68,0.12)
            // transform translate(-10px, -10px)
  .bttom
    display flex
    justify-content flex-end
    margin-top -150px
    opacity 0.7
    img
      width 65%
      height 300px
@media screen and (max-width: 920px)
  .home-warrap
    .dapp-list-content
      ul
        li
          flex 0 0 50%
@media screen and (max-width: 768px)
  .home-warrap
    .dapp-list-content
      ul
        li
          flex 0 0 100%
@media screen and (max-width: 640px)
  .home-warrap
    .access-guide
      padding-right 16px
    .bttom img
      height 200px
</style>
