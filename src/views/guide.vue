<template>
  <div>
    <topBar></topBar>
    <article class="markdown-body">
      <h1 id="-id-">柚ID接入文档</h1>
      <h2 id="-">目的</h2>
      <ol>
        <li>解决没有BOS账户的用户无法使用BOS上DApp的问题。</li>
        <li>解决BOS链上普通用户CPU不足的问题。</li>
        <li>解决BOS链上使用DApp需要用户频繁确认的问题，优化用户体验。</li>
        <li>为BOS链引入新用户。</li>
      </ol>
      <p>使用柚ID系统，玩家无需BOS账户，也无需抵押BOS获取CPU、NET等资源，即可使用BOS上的DApp。</p>
      <h2 id="-">系统构成</h2>
      <p>柚ID系统主要有三部分构成：认证服务器、柚ID合约和管理系统。使用流程如下：</p>
      <ol>
        <li>用户在系统注册。</li>
        <li>接入柚ID系统的DApp以OAuth2的方式获取用户授权。</li>
        <li>用户在使用DApp的过程中，如果需要收取费用，DApp可以使用第2步中获取的授权信息，直接从玩家的个人资产中扣除相应费用。</li>
      </ol>
      <h3 id="-">认证服务器</h3>
      <p>认证服务器主要为DApp提供用户授权功能，接入地址为：<a href="https://test.uid.red/auth。">https://test.uid.red/auth。</a> 认证流程如下：</p>
      <ol>
        <li>用户在DApp网站点击“登录”按钮，DApp网站将用户重定向到认证服务器，在参数中传递如下信息：<ul>
            <li>client_id: 需要授权的合约账户列表，如有多个使用“^”连接。合约账户必须事先在柚ID合约中进行注册。</li>
            <li>redirect_uri: 用户授权后，授权结果的回调地址。</li>
            <li>scope: 授权范围列表，如有多个使用&quot;^&quot;连接，包含币种、额度等信息，格式如下：“1.0000 BOS^1.0000 EOS”</li>
            <li>expire_in: 授权的过期时间，单位为秒，可省略，默认为24小时。</li>
            <li>pubkey: 交易公钥。请求授权时，前端生成一对密钥，公钥传给授权服务器，私钥用作后续扣费时的凭证。</li>
            <li>state: 客户端的当前状态，可选项，可指定任意值，认证服务器将该值原样返回。</li>
          </ul>
        </li>
        <li>用户在认证服务器的网页中输入用户名、密码，确认授权信息后，点击“登录”按钮。认证服务器在执行完登录流程后跳转到步骤1中提供的redirect_uri，在url中携带授权结果。<ul>
            <li>成功: redirect_uri#error=0&amp;username=xxx&amp;scope=xxx&amp;state=xxx</li>
            <li>失败: redirect_url#error=access_denied</li>
          </ul>
        </li>
        <li>授权成功后，DApp可使用步骤1中生成的私钥调用柚ID合约收取费用。</li>
      </ol>
      <h3 id="-id-">柚ID合约</h3>
      <p>柚ID合约提供DApp管理、用户管理等功能。DApp相关接口如下</p>
      <h4 id="dapp-">DApp注册</h4>
      <pre><code>eosio.token transfer(name from, name to, asset quantity, string memo)
      </code></pre><p>DApp通过自身合约账户转账支付一定数量的押金才能进行注册，只能有DApp合约账户调用，最小押金为100 BOS，用户押金数量影响用户授权额度。memo格式为：<code>reg^manager^original_memo</code></p>
      <ul>
        <li>reg: 命令类型: DApp注册</li>
        <li>manager: 合约管理账户</li>
        <li>original_memo: 自定义memo</li>
      </ul>
      <h4 id="dapp-">DApp修改信息</h4>
      <pre><code>appupdate(name contract, name manager, string appname, string appname, string owner, string logo_url, string brief, string desc)
      </code></pre><p>contract为DApp合约账户，项目方可根据contract修改其余信息。该接口只能由contract账户或修改之前的manager账户调用。</p>
      <ul>
        <li>contract: DApp合约账户</li>
        <li>manager: DApp管理账户</li>
        <li>appname: DApp名称，32 bytes</li>
        <li>owner: DApp项目方名称，64 btyes</li>
        <li>logo_url: DApp logo地址，128 bytes</li>
        <li>brief: DApp简介，64 bytes</li>
        <li>desc: DApp详细介绍，512 bytes</li>
      </ul>
      <h4 id="dapp-">DApp充值押金</h4>
      <pre><code>eosio.token transfer(name from, name to, asset quantity, string memo)
      </code></pre><p>DApp增加自身押金，memo格式为：<code>rc^contract^original_memo</code></p>
      <ul>
        <li>rc: 命令类型: 充值押金</li>
        <li>contract: DApp合约账户</li>
        <li>original_memo: 自定义memo</li>
      </ul>
      <h4 id="-">项目方提取押金</h4>
      <pre><code>withdraw(name contract, asset quantity, string memo)
      </code></pre><p>DApp提取押金，如果提取后数量小于最小押金，则会提取失败。该接口只能由contract或manager调用。</p>
      <ul>
        <li>contract: DApp合约账户</li>
        <li>quantity: 要提取的押金的数量</li>
        <li>memo: 自定义memo</li>
      </ul>
      <h4 id="-">项目方退出</h4>
      <pre><code>appquit(name contract, string memo)
      </code></pre><p>DApp退出，退还全部押金。该接口只能由contract或manager调用。</p>
      <ul>
        <li>contract: DApp合约账户</li>
        <li>memo: 自定义memo</li>
      </ul>
      <h4 id="-">向用户转账</h4>
      <pre><code>eosio.token tranfer(name from, name to, asset quantity, string memo)
      </code></pre><p>向柚ID系统中用户转账时和向主网用户转账一样，其中to为柚ID合约账户<code>uid</code>，具体用户在memo中标识。memo格式为：<code>rf^username^original_memo</code></p>
      <ul>
        <li>tf: 命令类型，转账</li>
        <li>username: 用户名称</li>
        <li>original_memo: 自定义memo</li>
      </ul>
      <h4 id="-">向用户扣款</h4>
      <pre><code>charge(name username, name contract, asset quantity, uint32_t expire_time, string memo, signature sig)
      </code></pre><p>项目方通过用户授权的私钥进行扣款，柚ID合约校验通过后，调用tranfer接口向DApp合约账户进行转账。</p>
      <ul>
        <li>username: 要扣款的用户名</li>
        <li>contract: DApp合约账户</li>
        <li>quantity: 交易额</li>
        <li>expire_time: 交易超时时间，距1970年1月1日0时的秒数，需在当前时间180s以内。</li>
        <li>memo: transfer接口需要的memo信息（<strong>DApp需要将username放入memo以识别具体账户</strong>）</li>
        <li>sig: 将除sig外其余参数转成字符串，以&quot;-&quot;连接，然后使用交易私钥进行签名。</li>
      </ul>
      <p><strong>charge 接口不验证调用者权限，只验证签名是否有效，项目方需妥善保存用户授权后的交易私钥。</strong></p>
      <h3 id="-">管理系统</h3>
      <p>主要提供用户管理功能，供普通用户使用。</p>
      <h2 id="-">接入流程</h2>
      <ol>
        <li>项目方通过转账向柚ID系统注册DApp。</li>
        <li>修改DApp合约以支持柚ID系统<ul>
            <li>修改转账接口，向用户转账时修改为向柚ID合约转账，在memo中标识具体用户</li>
            <li>接收转账时，从memo中判断具体转账用户</li>
          </ul>
        </li>
        <li>修改DApp前端，支持柚ID系统。</li>
      </ol>
    </article>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
export default {
  name: 'detail',
  components: {topBar}
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

.markdown-body {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  line-height: 1.5;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body .pl-c {
  color: #6a737d;
}

.markdown-body .pl-c1,
.markdown-body .pl-s .pl-v {
  color: #005cc5;
}

.markdown-body .pl-e,
.markdown-body .pl-en {
  color: #6f42c1;
}

.markdown-body .pl-smi,
.markdown-body .pl-s .pl-s1 {
  color: #24292e;
}

.markdown-body .pl-ent {
  color: #22863a;
}

.markdown-body .pl-k {
  color: #d73a49;
}

.markdown-body .pl-s,
.markdown-body .pl-pds,
.markdown-body .pl-s .pl-pse .pl-s1,
.markdown-body .pl-sr,
.markdown-body .pl-sr .pl-cce,
.markdown-body .pl-sr .pl-sre,
.markdown-body .pl-sr .pl-sra {
  color: #032f62;
}

.markdown-body .pl-v,
.markdown-body .pl-smw {
  color: #e36209;
}

.markdown-body .pl-bu {
  color: #b31d28;
}

.markdown-body .pl-ii {
  color: #fafbfc;
  background-color: #b31d28;
}

.markdown-body .pl-c2 {
  color: #fafbfc;
  background-color: #d73a49;
}

.markdown-body .pl-c2::before {
  content: "^M";
}

.markdown-body .pl-sr .pl-cce {
  font-weight: bold;
  color: #22863a;
}

.markdown-body .pl-ml {
  color: #735c0f;
}

.markdown-body .pl-mh,
.markdown-body .pl-mh .pl-en,
.markdown-body .pl-ms {
  font-weight: bold;
  color: #005cc5;
}

.markdown-body .pl-mi {
  font-style: italic;
  color: #24292e;
}

.markdown-body .pl-mb {
  font-weight: bold;
  color: #24292e;
}

.markdown-body .pl-md {
  color: #b31d28;
  background-color: #ffeef0;
}

.markdown-body .pl-mi1 {
  color: #22863a;
  background-color: #f0fff4;
}

.markdown-body .pl-mc {
  color: #e36209;
  background-color: #ffebda;
}

.markdown-body .pl-mi2 {
  color: #f6f8fa;
  background-color: #005cc5;
}

.markdown-body .pl-mdr {
  font-weight: bold;
  color: #6f42c1;
}

.markdown-body .pl-ba {
  color: #586069;
}

.markdown-body .pl-sg {
  color: #959da5;
}

.markdown-body .pl-corl {
  text-decoration: underline;
  color: #032f62;
}

.markdown-body .octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}

.markdown-body a {
  background-color: transparent;
}

.markdown-body a:active,
.markdown-body a:hover {
  outline-width: 0;
}

.markdown-body strong {
  font-weight: inherit;
}

.markdown-body strong {
  font-weight: bolder;
}

.markdown-body h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

.markdown-body img {
  border-style: none;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

.markdown-body hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

.markdown-body input {
  font: inherit;
  margin: 0;
}

.markdown-body input {
  overflow: visible;
}

.markdown-body [type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

.markdown-body * {
  box-sizing: border-box;
}

.markdown-body input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.markdown-body a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body strong {
  font-weight: 600;
}

.markdown-body hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
}

.markdown-body hr::before {
  display: table;
  content: "";
}

.markdown-body hr::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body table {
  border-spacing: 0;
  border-collapse: collapse;
}

.markdown-body td,
.markdown-body th {
  padding: 0;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body h1 {
  font-size: 32px;
  font-weight: 600;
}

.markdown-body h2 {
  font-size: 24px;
  font-weight: 600;
}

.markdown-body h3 {
  font-size: 20px;
  font-weight: 600;
}

.markdown-body h4 {
  font-size: 16px;
  font-weight: 600;
}

.markdown-body h5 {
  font-size: 14px;
  font-weight: 600;
}

.markdown-body h6 {
  font-size: 12px;
  font-weight: 600;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 10px;
}

.markdown-body blockquote {
  margin: 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body ol ol,
.markdown-body ul ol {
  list-style-type: lower-roman;
}

.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
  list-style-type: lower-alpha;
}

.markdown-body dd {
  margin-left: 0;
}

.markdown-body code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

.markdown-body .octicon {
  vertical-align: text-bottom;
}

.markdown-body .pl-0 {
  padding-left: 0 !important;
}

.markdown-body .pl-1 {
  padding-left: 4px !important;
}

.markdown-body .pl-2 {
  padding-left: 8px !important;
}

.markdown-body .pl-3 {
  padding-left: 16px !important;
}

.markdown-body .pl-4 {
  padding-left: 24px !important;
}

.markdown-body .pl-5 {
  padding-left: 32px !important;
}

.markdown-body .pl-6 {
  padding-left: 40px !important;
}

.markdown-body::before {
  display: table;
  content: "";
}

.markdown-body::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.markdown-body .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

.markdown-body .anchor:focus {
  outline: none;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.markdown-body blockquote>:first-child {
  margin-top: 0;
}

.markdown-body blockquote>:last-child {
  margin-bottom: 0;
}

.markdown-body kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
  color: #1b1f23;
  vertical-align: middle;
  visibility: hidden;
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
  text-decoration: none;
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
  visibility: visible;
}

.markdown-body h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
}

.markdown-body h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body h5 {
  font-size: 0.875em;
}

.markdown-body h6 {
  font-size: 0.85em;
  color: #6a737d;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li {
  word-wrap: break-all;
}

.markdown-body li>p {
  margin-top: 16px;
}

.markdown-body li+li {
  margin-top: 0.25em;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

.markdown-body dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-body table {
  display: block;
  width: 100%;
  overflow: auto;
}

.markdown-body table th {
  font-weight: 600;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.markdown-body table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

.markdown-body img[align=right] {
  padding-left: 20px;
}

.markdown-body img[align=left] {
  padding-right: 20px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}

.markdown-body pre {
  word-wrap: normal;
}

.markdown-body pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-body .highlight {
  margin-bottom: 16px;
}

.markdown-body .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-body pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body .full-commit .btn-outline:not(:disabled):hover {
  color: #005cc5;
  border-color: #005cc5;
}

.markdown-body kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #d1d5da;
  border-bottom-color: #c6cbd1;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #c6cbd1;
}

.markdown-body :checked+.radio-label {
  position: relative;
  z-index: 1;
  border-color: #0366d6;
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item+.task-list-item {
  margin-top: 3px;
}

.markdown-body .task-list-item input {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

.markdown-body hr {
  border-bottom-color: #eee;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
