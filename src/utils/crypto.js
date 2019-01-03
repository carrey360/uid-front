import Crypto from 'crypto-js'

// 生成32位随机字符串
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function randomStr32 () {
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}
// 加密
function encrypt (privateKey, password) {
  const salt = randomStr32()
  const cleartext = `${privateKey}${salt}` // 明文
  // Encrypt
  const ciphertext = Crypto.AES.encrypt(cleartext, password).toString() // 密文
  const ripemd160 = Crypto.RIPEMD160(`${ciphertext}${salt}`).toString()
  console.log('加密前-盐', salt)
  console.log('加密前-私钥', privateKey)
  return `UID${ciphertext}${salt}${ripemd160.substr(0, 4)}`
}
// 解密
function decrypt (keystore, password) {
  const jointtext = keystore.substring(3, keystore.length - 4)
  const ripe = keystore.slice(-4)
  const checkripe = Crypto.RIPEMD160(jointtext).toString()
  if (checkripe.substr(0, 4) === ripe) {
    console.log('check 通过')
    // Decrypt
    const bytes = Crypto.AES.decrypt(jointtext, password)
    const originalText = bytes.toString(Crypto.enc.Utf8)
    const salt = originalText.slice(-32)
    const cleartext = originalText.substring(0, originalText.length - 32)
    console.log('解密后-加盐', salt)
    console.log('解密后-私钥', cleartext)
    return cleartext
  } else {
    return false // 您输入的keystore不正确
  }
}

export default {
  encrypt, decrypt
}
