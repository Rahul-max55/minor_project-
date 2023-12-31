import jwt from "jsonwebtoken";
import Users from "../schema/singupSchema.js";

export const Authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json(401, { status: false, msg: "Token not found" });
  }
  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET , 14);
     if(!user){
      return res.json(404 , {msg:"Token is not verify"})
     }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: false, msg:"jwt token is error" , error });
  }

  try {
    user = await Users.find({ email: user.email });
    if (!user) {
      return res.json(401, { status: false, msg: "user not found" });
    }
    // console.log(user);
    req.user = user;
    next();
    return;
  } catch (error) {
    console.log(error);
    return res.json(401, { status: false, msg: "Internal Server Error" });
  }
  
};
