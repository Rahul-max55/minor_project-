import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import productRouter from './routes/product.js';
import  dotenv from "dotenv";


// config
const app = express();
dotenv.config();


// middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/user' , userRouter);
app.use('/user' , productRouter);


// database connection script
// const port = "8000";

async function dataBaseConn() {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://birlarahul340:A9907761728@cluster0.vmmqdgx.mongodb.net/"
    );

    if (!db) {
      console.log("db connection is failed");
    }
    
    console.log("database connection successfuly");
    app.listen(process.env.PORT , ()=>{
      console.log("server is listen on port: " + process.env.PORT);
    });

  } catch (error) {
    console.log("database Connection error : " + error);
  }
}

dataBaseConn();


export default dataBaseConn;
