import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    offer: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    images: Array
  },{timestamps:true});


  const Product = mongoose.model('Product' , schema)

  export default Product;



