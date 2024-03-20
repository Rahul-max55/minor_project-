import jwt from "jsonwebtoken";
import Users from "../schema/signupSchema.js";

export const Authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: false, msg: "Token not found" });
  }
  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET , 14);
     if(!user){
      return res.status(401).json({msg:"Token is not verify"})
     }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, msg:"jwt token is error" , error });
  }

  try {
    user = await Users.find({ email: user.email });
    if (!user) {
      return res.status(401).json({ status: false, msg: "user not found" });
    }
    req.user = user[0];
    next();
    return;
  } catch (error) {
    console.log(error);
    return  res.status(401).json({ status: false, msg: "Internal Server Error" });
  }
  
};
