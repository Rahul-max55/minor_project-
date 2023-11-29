import Users from "../schema/singupSchema.js";
import jwt from "jsonwebtoken";

const loginControllerData = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await Users.find({ email });
    if (!data) {
      return res.status(200).send({ msg: "User not exists", status: false });
    }
    if (data[0]?.password !== password) {
      return res.status(200).send({ msg: "password is wrong", status: false });
    }
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    res
      .status(200)
      .json({ token, msg: "User is loged in successfuly", data, status: true });
  } catch (error) {
    res.json(
      500,
      "🚀 ~ file: userController.js:24 ~ loginControllerData ~ error:",
      error
    );
  }
};

const signupControllerData = async (req, res) => {
  let userDetail = req.body;
  console.log(
    "🚀 ~ file: userController.js:34 ~ signupControllerData ~ userDetail:",
    userDetail
  );

  try {
    const { email } = userDetail;
    const userExists = await Users.find({ email });
    if (userExists) {
      return res.status(200).send({
        msg: "Email is already exists please use another or forgate",
        status: false,
      });
    }

    const data = await Users.create(userDetail);
    if (!data) {
      return res
        .status(200)
        .send({ msg: "data is not iserted in database", status: false });
    }
    return res
      .status(200)
      .send({ msg: "data is submited successfuly in database", status: true });
  } catch (error) {
    return res.status(500).send({
      msg: "🚀 ~ file: userController.js:48 ~ signupControllerData ~ error:",
      error,
      status: false,
    });
  }
};

const validEmailController = async (req, res) => {
  let userDetail = req.body;

  try {
    const { email } = userDetail;
    const userExists = await Users.find({ email });
 
    if (!userExists || userExists.length === 0) {
      return res.status(200).send({
        msg: "Email is not exists please use another email or register with new email",
        status: false,
      });
    }

    const mailLink = jwt.sign(
      { id: userExists?.[0]?._id },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
        algorithm: "HS256",
      }
    );

    return res.status(200).send({
      email,
      mailLink,
      msg: "OTP is send to the email address",
      status: true,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "🚀 ~ file: userController.js:88 ~ validEmailController ~ error:",
      error,
      status: false,
    });
  }
};

const accountInfoChangeController = async (req, res) => {
  let id = req.user[0]._id;
  console.log(req.body);
  console.log(id);

  try {
    const data = await Users.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    console.log(data);
    if (!data) {
      res.status(404).send("data is not iserted in database");
    }
    res.status(200).send("data is submited successfuly in database");
  } catch (error) {
    res
      .status(401)
      .send("some error is occured in accountSetting section" + error);
  }
};

const passwordResetController = async (req, res) => {
  const { token } = req.params;
  const {password} = req.body;
  
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ file: userController.js:137 ~ passwordResetController ~ isValid:", isValid)
   
    if (!isValid) {
      return res.status(200).send({
        msg: "Link is not valid please generate another link",
        status: false,
      });
    }

    const { id } = isValid;

    const data = await Users.findByIdAndUpdate(
      { _id: id },
      { password: password },
      { new: true }
    );

    console.log(data);

    if (!data) {
      res.status(404).send({msg:"data is not iserted in database" , status:false});
    }
    res.status(200).send({msg:"password updated successfuly" , status:true});
  } catch (error) {
    res
      .status(401)
      .send({
        msg:"🚀 ~ file: userController.js:161 ~ passwordResetController ~ error:",
        error , status:false
      });
  }
};

export default signupControllerData;
export {
  loginControllerData,
  accountInfoChangeController,
  validEmailController,
  passwordResetController,
};
