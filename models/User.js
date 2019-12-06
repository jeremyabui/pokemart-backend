const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String, 
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  zipcode: {
    type: String,
    required: [true, 'Zipcode is required']
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    }
  ],
  shoppingCart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    }
  ],
})

const User = mongoose.model('User', UserSchema);
module.exports = User;