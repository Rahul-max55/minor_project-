import mongoose from "mongoose";

const user = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    secreatKey:String
}, {timestamps: true});


const Users = mongoose.model('User' , user);

export default Users;