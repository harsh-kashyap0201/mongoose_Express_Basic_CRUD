// schema for product
const mongoose= require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothes', 'Food', 'Books', 'Others'],
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('Product', schema);