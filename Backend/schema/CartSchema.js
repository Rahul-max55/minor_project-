import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    count: { type: Number, required: true },
    offer: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    thumbnail: String,
    images: Array,
    // Add more fields as needed
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", schema);

export default CartItem;
