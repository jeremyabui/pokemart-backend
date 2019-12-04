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
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
        }
    ],
})

const User = mongoose.model('User', UserSchema);
module.exports = User;