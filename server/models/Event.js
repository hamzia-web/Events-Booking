const mongoose = require('mongoose')

//Schema is nothing but table structure, no of columns with the types
let eventSchema = new mongoose.Schema({
      name: {type: String, require: true},
      image: {type: String, require: true},  // String is shorthand for {type: String}
      date: {type: String, require: true},
      price: {type: Number, require: true},
      type: {type: String, require: true},
      info: {type: String, require: true},
      created: {type: Date, default: Date.now()},
})

let Event = mongoose.model('event', eventSchema)

module.exports = Event
