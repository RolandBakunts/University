const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
      type: String, 
      unique: false, 
      required: true, 
    },
    price:{
      type: Number
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
})
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;