// import Clipboard from 'clipboard'
import config from './config'
import Eos from 'eosjs'
import ecc from 'eosjs-ecc'

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
}

// 解析url参数
export function getUrlSearch (url) {
  let uridc = decodeURI(url)
  let obj = {}
  if (uridc.indexOf('?') !== -1) {
    let str = uridc.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return obj
}

// 传到合约需要对用户名处理统一加上 '.uid'
export function toApiFormatUserName (userName) {
  return userName + '.uid'
}

// 获取区块链时间，暂时使用本地时间代替
export function getExpireTime () {
  let sec = parseInt(new Date().getTime() / 1000) + 100
  return sec
}

function ajaxPost (url, data, success, error, from = 'getRow') {
  var _data = JSON.stringify(data)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  if (from === 'server') {
    xhr.timeout = 10000
    xhr.setRequestHeader('Content-Type', 'application/json')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        success.call(this, xhr.responseText)
      } else {
        error && error(xhr.responseText)
      }
    }
  }

  xhr.ontimeout = function () {
    error && error('请求超时')
  }

  xhr.send(_data)
}

// 下载文件
export function downloadFile (fileName, content) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  element.setAttribute('download', fileName)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// 调用get_table_row
export function getTableRow (params, success, error) {
  let commParams = {
    key_type: 'i64',
    json: true
  }
  if (!params.index_position) {
    commParams.index_position = 0
  }
  params = Object.assign(params, commParams)
  let url = config.contractUrl + '/v1/chain/get_table_rows'

  ajaxPost(url, params, function (res) {
    let response = JSON.parse(res)
    success && success.call(this, response)
  }, error, 'getRow')
}

// 调用合约地址
export function transactAction (actionApi, params) {
  let eos = Eos(config.eosConfig)
  let result = eos.transaction({
    actions: [{
      account: config.contractAccount,
      name: actionApi,
      authorization: [{actor: config.transactActor, permission: 'uid'}],
      data: params
    }]
  })
  return result
}

export function signinTools (urlSearch, privateKey, dappList, username) {
  let sec = getExpireTime()
  let contracts = []
  dappList.map(item => {
    contracts.push(item.contract)
  })
  let limits = urlSearch.scope
  let expireIn = +urlSearch.expire_in || (24 * 60 * 60) // 默认24小时
  let formatUserName = toApiFormatUserName(username)
  let pubKey = urlSearch.pubkey
  var data = `${formatUserName}-${contracts.join('-')}-${limits}-${expireIn}-${pubKey}-${sec}`
  let sig = ecc.sign(data, privateKey)
  let params = {
    username: formatUserName,
    contracts: contracts,
    limits: limits,
    expire_in: expireIn,
    pubkey: pubKey,
    expire_time: sec,
    sig: sig
  }
  transactAction('signin', params).then(res => {
    if (res && res.transaction_id) {
      window.tip('授权成功')
      // #error=0&username=xxx&scope=xxx&state=xxx
      setTimeout(() => {
        window.location.href = `${urlSearch.redirect_uri}#error=0&username=${username}&scope=${urlSearch.scope}&state=${urlSearch.state}`
      }, 2000)
    } else {
      window.tip('授权失败')
      setTimeout(() => {
        window.location.href = `${urlSearch.redirect_uri}#error=access_denied`
      }, 2000)
    }
  })
}
