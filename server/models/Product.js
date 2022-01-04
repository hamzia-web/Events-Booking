const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
      name: {type: String, require: true},
      image: {type: String, require: true},  // String is shorthand for {type: String}
      price: {type: Number, require: true},
      qty: {type: Number, require: true},
      info: {type: String, require: true},
      created: {type: Date, default: Date.now()},
})

let Product = mongoose.model('products', ProductSchema)

module.exports = Product
