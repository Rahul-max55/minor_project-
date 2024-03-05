import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    number: { type: Number },
    profileImage: { type: String },
    address: { type: String },
    shippingAddress: { type: Array },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", user);

export default Users;
