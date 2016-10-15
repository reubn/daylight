const colors = require('colors/safe')

module.exports = {
  servers: [{port: 80}, {port: 443, secure: true}],
  statusIndicator: (req, {statusCode}) => ['', '', '✅', '🌀', '⚠️', '‼️'][statusCode.toString()[0]],
  methodIndicator: ({method}) => ({GET: '⛽️', POST: '📮', PUT: '📥', DELETE: '🗑', HEAD: '👨🏽', TRACE: '🔎', PATCH: '📝'}[method]),
  secureIndicator: ({secure}) => (secure ? '🔐' : '🔓'),
  pathIndicator: ({originalUrl: url}) => url.split('/').map((part, index) => colors[['magenta', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'red', 'grey', 'black'][index % 9]](part)).join(colors.white('/')),
  statusCodeIndicator: (req, {statusCode}) => statusCode.toString(),
  customEmojiIndicator: (req, {locals: {emoji}}) => emoji || '🔗'
}
