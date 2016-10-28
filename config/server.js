const colors = require('colors/safe')

const {method: httpjiMethod, status: httpjiStatus, secure: httpjiSecure} = require('./httpji')

module.exports = {
  servers: [{port: 80}, {port: 443, secure: true}],
  statusIndicator: (req, {statusCode}) => httpjiStatus(statusCode),
  methodIndicator: ({method}) => httpjiMethod(method),
  secureIndicator: ({secure}) => httpjiSecure(secure),
  pathIndicator: ({originalUrl: url}) => (
    url.split('/')
    .reverse()
    .map((part, index) => colors[['magenta', 'magenta', 'blue', 'cyan', 'green', 'yellow', 'red', 'grey', 'black'][index % 9]](part))
    .reverse()
    .join(colors.white('/'))
  ),
  statusCodeIndicator: (req, {statusCode}) => statusCode,
  customEmojiIndicator: (req, {locals: {emoji='🔗'}}) => emoji
}
