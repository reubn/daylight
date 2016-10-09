const colors = require('colors/safe')

module.exports = {
  servers: [{port: 80}, {port: 443, secure: true}],
  statusIndicator: (req, {statusCode}) => ['', '', '✅', '🌀', '⚠️', '‼️'][statusCode.toString()[0]],
  methodIndicator: ({method}) => ({GET: '⛽️', POST: '📮', PUT: '📥', DELETE: '🗑', HEAD: '👨🏽', TRACE: '🔎', PATCH: '📝'}[method]),
  secureIndicator: ({secure}) => (secure ? '🔐' : '🔓'),
  pathIndicator: ({originalUrl: url}) => url.split('/').map((part, index) => colors[['magenta', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'red', 'grey', 'black'][index % 9]](part)).join(colors.white('/')),
  statusCodeIndicator: (req, {statusCode}, {0: a, 1: b, 2: c}=statusCode.toString()) => `${a}\uFE0F\u20E3 ${b}\uFE0F\u20E3 ${c}\uFE0F\u20E3`,
  customEmojiIndicator: (req, {locals: {emoji}}) => emoji || '🔗'
}
