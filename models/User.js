const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-as-promised')

const factories = require('../factories')

const userSchema = new Schema({
  name: String,
  owner: Boolean,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  birthday: {type: Date, required: true},
  startDate: {type: Date, required: true},
  factories: factories.generateDatabaseSchema()
}, {
  collection: 'users'
})

userSchema.pre('save', function(next){
  if(!this.isModified('password')) return next()

  bcrypt.genSalt(10)
  .then(salt => bcrypt.hash(this.password, salt))
  .then(password => {this.password = password})
  .then(() => next())
  .catch(next)
})

userSchema.methods.comparePasswords = function(candidatePassword){
  return bcrypt.compare(candidatePassword, this.password).then(() => this)
}

userSchema.methods.clean = function(){const user = this.toObject(); return Object.assign({}, user, {password: undefined, __v: undefined, _id: undefined, id: user._id})}


module.exports = mongoose.model('User', userSchema)
