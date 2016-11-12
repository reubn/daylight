module.exports = (error, req, res, next) => {
  // Username Taken
  if(error.message === 'TakenUsername') return res.status(409).json({sucess: false, reason: 'TakenUsername'})

  // Fallthrough
  next(error)
}
