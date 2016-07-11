module.exports = (req, res, next) => {
  if(req.isAuthenticated()){res.locals.emoji = '🔑'; return next()}
  res.locals.emoji = '🚧'; next(new Error('NoAuth'))
}
