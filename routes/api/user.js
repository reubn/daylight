module.exports = (req, res) => res.json(req.user.clean())
