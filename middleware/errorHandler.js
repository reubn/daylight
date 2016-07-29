/* eslint no-unused-vars: 0 */

module.exports = (error, req, res, next) => {
  // Login
  if(error.name === 'MismatchError' || error.message === 'NoExist' || error.name === 'AuthenticationError') return res.status(401).json({sucess: false, reason: 'LoginFail'})

  // Register
  if(error.message === 'TakenUsername') return res.status(409).json({sucess: false, reason: 'TakenUsername'})

  // Auth
  if(error.message === 'NoAuth') return res.status(401).json({sucess: false, reason: 'NoAuth'})

  // Fallthrough
  console.error('Error:', error)
  res.status(500).json({sucess: false, reason: 'Unknown'})
}
