/* eslint no-unused-vars: 0 */

module.exports = (error, req, res, next) => {
  // ID not Found
  if(error.message === 'ResourceNotFound' || error.name === 'CastError') return res.status(404).json({sucess: false, reason: 'ResourceNotFound'})

  // Fallthrough
  next(error)
}
