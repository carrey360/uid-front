<template>
  <div class="insert" @click="importKey()">
    {{title}}
    <div style="display:none">
      <input id="upload" type="file" accept=".txt" @change="uploadFile()"/>
    </div>
  </div>
</template>
<script>
import config from '@/utils/config'
export default {
  name: 'insert-txt',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    importKey () {
      document.getElementById('upload').click()
    },
    uploadFile (e) {
      let selectedFile = document.getElementById('upload').files[0]
      if (!selectedFile) {
        return
      }
      let reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = function (oFREvent) {
        var pointsTxt = oFREvent.target.result
        localStorage.setItem(config.lsUserKeystore, pointsTxt)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.insert
  cursor pointer
</style>
