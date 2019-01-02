// import Clipboard from 'clipboard'
import config from './config'
import Eos from 'eosjs'

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
}

// 传到合约需要对用户名处理统一加上 '.uid'
export function toApiFormatUserName (userName) {
  return userName + '.uid'
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

export function getTableRow (params, success, error) {
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
