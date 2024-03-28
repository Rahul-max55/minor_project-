import mongoose from "mongoose";

// const ImageSchema = mongoose.Schema({
//   id: { type: String, required: true },
//   width: { type: Number, required: true },
//   height: { type: Number, required: true },
//   url: { type: String, required: true },
//   filename: { type: String, required: true },
//   size: { type: Number, required: true },
//   type: { type: String, required: true },
// });

const schema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    colors: { type: Array, required: true },
    featured: { type: Boolean },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "Dispatched", "delivered"],
      required: true,
      default: "pending",
    },
    thumbnail: { type: String, required: true },
    images: { type: Array, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", schema);

export default Product;
