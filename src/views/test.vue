<template>
  <div>
    <button @click="go">uid登陆</button>
    <div>{{ obj }}</div>
  </div>
</template>

<script>
import { getUrlSearch } from '@/utils/'

export default {
  data () {
    return {
      client_id: 'huobichengli',
      redirect_uri: location.href,
      scope: '1.0000 BOS^10.0000 EOS',
      expire_in: 24 * 60 * 60,
      pubkey: 'EOS62qpLicEiGKaBbC2bpzsibtQkvyEEdupKn2DuuyeDMe8DSeRAX',
      state: 1,
      obj: ''
    }
  },
  created () {
    this.back()
  },
  methods: {
    go () {
      let query = `client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&expire_in=${this.expire_in}&pubkey=${this.pubkey}&state=${this.state}`

      let url = location.protocol + '//' + location.hostname + ':' + location.port + '/auth?' + query
      location.href = encodeURI(url)
    },
    back () {
      let url = decodeURI(location.href)
      if (url.indexOf('#') !== -1) {
        let search = url.substr(url.indexOf('#') + 1)
        let obj = getUrlSearch('?' + search)
        this.obj = obj
      }
    }
  }
}
</script>

<style>

</style>
