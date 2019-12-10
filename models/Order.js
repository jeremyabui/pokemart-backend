const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }, 
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  total: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: String,
    default: 'Free Shipping'
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;