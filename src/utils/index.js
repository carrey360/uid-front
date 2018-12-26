import Clipboard from 'clipboard'


// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
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
