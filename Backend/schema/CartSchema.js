import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
  id: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  url: { type: String, required: true },
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
});

const schema = mongoose.Schema(
  {
    id: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: Array, required: true },
    description: { type: String },
    category: { type: String, required: true },
    featured: { type: Boolean },
    shipping: { type: Boolean },
    stock: { type: Number, required: true },
    reviews: { type: Number, required: true },
    stars: { type: Number, required: true },
    image: { type: [ImageSchema], required: true },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", schema);

export default CartItem;
