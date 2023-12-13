import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    number: { type: Number },
    profileImage: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", user);

export default Users;
