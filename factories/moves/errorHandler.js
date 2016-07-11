module.exports = (error, req, res, next) => {
  // Reply
  if(error.message === 'FactoryAuthDenied') return res.status(401).json({sucess: false, reason: 'FactoryAuthDenied'})
  if(error.message === 'FactoryAuthError') return res.status(502).json({sucess: false, reason: 'FactoryAuthError'})
  if(error.message === 'FactoryError') return res.status(502).json({sucess: false, reason: 'FactoryError'})

  // Fallthrough
  next(error)
}
