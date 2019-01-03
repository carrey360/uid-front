
let contractUrl = 'http://172.18.12.23:8888'
let chainId = '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85'
let keyProvider = '5KEk58bZuNvjvvPhnkHeCWf5ZQrvBjkNE9W9CFu17qfrwneHfxp'
let transactActor = 'boshuobinode'

let config = {
  contractUrl: contractUrl,
  contractAccount: 'uid',
  transactActor: transactActor,
  eosConfig: {
    chainId: chainId,
    keyProvider: [keyProvider],
    httpEndpoint: contractUrl,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true
  },
  lsUserKeystore: 'uidKeystore',
  dappDefaultLogo: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2895986097,3609514076&fm=173&app=25&f=JPEG?w=600&h=400&s=DBACB7475B8662D2062E5B6D0300E068'
}

module.exports = config
