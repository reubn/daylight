module.exports = (error, req, res, next) => {
  // Login Failure
  if(error.name === 'MismatchError' || error.message === 'NoExist' || error.name === 'AuthenticationError') return res.status(401).json({sucess: false, reason: 'LoginFail'})

  // Fallthrough
  next(error)
}
