const mongoose = require('mongoose')

//Schema is nothing but table structure, no of columns with the types
let userSchema = new mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, require: true, unique: true},  // String is shorthand for {type: String}
  password: {type: String, require: true},
  avatar: {type: String, require: true},
  isAdmin: {type: Boolean, require: true},
  created: {type: Date, default: Date.now()},
})

let User = mongoose.model('user', userSchema)

module.exports = User
