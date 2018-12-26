import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let enConfig = {
  '普': 'share'
}

let cnConfig = {
  '普': '普'
}

const messages = {
  en: {
    ...enConfig
  },
  cn: {
    ...cnConfig
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('redLang') || 'cn',
  messages
})

export default i18n
