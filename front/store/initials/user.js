import User from '../../models/User'

export default new User(window.dUD.id ? window.dUD : {})
