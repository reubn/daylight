const http = require('http')
const https = require('https')

const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const {HTTPS: fourcehttps} = require('express-sslify')
const hpp = require('hpp')
const bodyParser = require('body-parser')

const letsEncrypt = require('letsencrypt-express')

const passport = require('passport')
const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)

const mongoose = require('mongoose')

const serverConfig = require('./config/server')
const sessionConfig = require('./config/session')
const sslConfig = require('./config/ssl')
const databaseConfig = require('./config/database')

const User = require('./models/User')
require('./passport/login')
require('./passport/register')

const app = express()
const routes = require('./routes')

// Database
mongoose.Promise = global.Promise
mongoose.connect(databaseConfig.url).then(() => console.info('🗄🗄🗄 - Connected - 🗄🗄🗄'))

// HTTPS
app.use(fourcehttps())

// Auth
app.use(expressSession(sessionConfig(RedisStore)))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(function(id, done){
  User.findById(id)
  .then(user => done(null, user))
  .catch(error => done(error))
})

// Middleware
app.use(morgan(':statusIndicator  :methodIndicator  :secureIndicator  :statusCodeIndicator  :customEmojiIndicator  :pathIndicator ⏱  :response-time ms 📆  [:date[clf]]'))
morgan.token('statusIndicator', serverConfig.statusIndicator)
morgan.token('methodIndicator', serverConfig.methodIndicator)
morgan.token('secureIndicator', serverConfig.secureIndicator)
morgan.token('pathIndicator', serverConfig.pathIndicator)
morgan.token('statusCodeIndicator', serverConfig.statusCodeIndicator)
morgan.token('customEmojiIndicator', serverConfig.customEmojiIndicator)

app.use(bodyParser.json())
app.use(compression())
app.use(helmet())
app.use(hpp())

// Routing
app.use(routes)

// Serving
const lex = letsEncrypt.create(sslConfig.letsEncrypt)

serverConfig.servers.forEach(({port, secure}) => {
  const server = (secure ? https.createServer(lex.httpsOptions, lex.middleware(app)) : http.createServer(lex.middleware(app)))
  server.listen(port, () => console.info(`🚀🚀🚀 - Launched on ${port} - 🚀🚀🚀`))
})
