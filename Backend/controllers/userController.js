import Users from "../schema/signupSchema.js";
import jwt from "jsonwebtoken";

const loginControllerData = async (req, res) => {
  const { email, password } = req.body;
  // console.log("🚀 ~ file: userController.js:6 ~ loginControllerData ~ email:", email)

  try {
    const data = await Users.find({ email });
    // console.log("🚀 ~ file: userController.js:10 ~ loginControllerData ~ data:", data?.[0]?.email)

    if (!data) {
      return res
        .status(200)
        .send({ msg: "User not exists please register", status: false });
    }
    if (data[0]?.password !== password) {
      return res.status(200).send({ msg: "password is wrong", status: false });
    }
    const token = jwt.sign(
      { email: data?.[0]?.email },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
      }
    );
    return res
      .status(200)
      .json({ token, msg: "User is logged in successfully", data, status: true });
  } catch (error) {
    return res.json(
      500,
      "🚀 ~ file: userController.js:24 ~ loginControllerData ~ error:",
      error
    );
  }
};

const signupControllerData = async (req, res) => {
  let userDetail = req.body;
  // console.log(
  //   "🚀 ~ file: userController.js:34 ~ signupControllerData ~ userDetail:",
  //   userDetail
  // );

  try {
    const { email } = userDetail;
    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res.status(200).send({
        msg: "Email is already exists please use another or forgat",
        status: false,
      });
    }

    const data = await Users.create(userDetail);

    if (!data) {
      return res
        .status(200)
        .send({ msg: "data is not inserted in database", status: false });
    }
    return res
      .status(200)
      .send({ msg: "Account is created successfully", status: true });
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

export const changeDetailProductController = async (req, res) => {
  console.log("🚀 ~ file: user.js:39 ~ req:", req.file);
  let id = req.user?._id;

  try {
    const data = await Users.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      res
        .status(404)
        .send({ msg: "data is not inserted in database", status: false });
    }
    res.status(200).json({
      msg: "User detail is updated successfully",
      status: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      msg: "some error is occured in accountSetting section" + error,
      status: false,
    });
  }
};

// profile Image upload controller
export const uploadImageProductController = async (req, res) => {
  console.log(req.body);
  console.log(req.file?.filename);
  console.log("🚀 ~ file: user.js:39 ~ req:", req.file);
  let id = req.user?._id;
  try {
    const data = await Users.findByIdAndUpdate(
      { _id: id },
      { profileImage: req?.file?.filename },
      { new: true }
    );
    if (!data) {
      res.status(404).send({ msg: "Image is not uploaded", status: false });
    }
    res.status(200).json({
      msg: "image is uploaded successfully",
      status: true,
      data,
    });
  } catch (error) {
    res.status(401).json({
      msg:
        "some error is occured in upload Image Product Controller section" +
        error,
      status: false,
    });
  }
};
//End profile Image upload controller

const passwordResetController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      "🚀 ~ file: userController.js:137 ~ passwordResetController ~ isValid:",
      isValid
    );

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
      res
        .status(404)
        .send({ msg: "data is not inserted in database", status: false });
    }
    res
      .status(200)
      .send({ msg: "password updated successfully", status: true });
  } catch (error) {
    res.status(401).send({
      msg: "🚀 ~ file: userController.js:161 ~ passwordResetController ~ error:",
      error,
      status: false,
    });
  }
};

export default signupControllerData;
export { loginControllerData, validEmailController, passwordResetController };
