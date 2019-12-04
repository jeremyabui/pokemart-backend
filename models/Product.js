const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    description: {
        type: String,
        default: 'No product information available',
    },
    image: {
        type: String,
        default: 'https://www.romamanagement.com/wp-content/uploads/sites/6887/2018/11/image-coming-soon.jpg',
    }, 
    quantity: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    slug: {
        type: String, 
        required: [true, 'Product slug is required']
    }
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;