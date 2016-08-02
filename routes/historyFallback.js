const fs = require('fs')

module.exports = (req, res, next) => {
  if(req.method === 'GET' && req.accepts('html')){
    fs.readFile('./front/index.html', 'utf8', function(err, content){
      if(err) res.status(500).json(err)
      res.send(content.replace('`${user}`', JSON.stringify(req.user ? req.user.clean() : {})))
    })
  } else next()
}
