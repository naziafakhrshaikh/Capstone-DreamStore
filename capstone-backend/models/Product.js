const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({}, {timestamps: true});

// starting
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category:{type: String, required: true},
    inStock: { type: Boolean, default: true}
}, { timestamps: true });
// ending

const Product = mongoose.model('Product', productSchema);
module.exports = Product;