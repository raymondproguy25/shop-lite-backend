import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
 name: { type: String, required: true},
 price: Number,
 category: String,
 description: String, },
  { timestamps: true});

const Product = mongoose.model('Products', productSchema);

export default Product;
