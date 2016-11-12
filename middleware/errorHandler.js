/* eslint no-unused-vars: 0 */

module.exports = (error, req, res, next) => {
  // Auth
  if(error.message === 'NoAuth') return res.status(401).json({sucess: false, reason: 'NoAuth'})

  // Fallthrough
  console.error('Error:', error)
  res.status(500).json({sucess: false, reason: 'Unknown'})
}
