import Users from "../schema/signupSchema.js";
import jwt from "jsonwebtoken";

const loginControllerData = async (req, res) => {
  const { email, password } = req.body;
  // console.log("🚀 ~ file: userController.js:6 ~ loginControllerData ~ email:", email)

  try {
    const userData = await Users.findOne({ email });
    // console.log("🚀 ~ file: userController.js:10 ~ loginControllerData ~ data:", data?.[0]?.email)

    if (!userData) {
      return res
        .status(200)
        .send({ msg: "User not exists please register", status: false });
    }
    if (userData.password !== password) {
      return res.status(200).send({ msg: "password is wrong", status: false });
    }
    const token = jwt.sign({ email: userData?.email }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    return res.status(200).json({
      token,
      msg: "User is logged in successfully",
      userData,
      status: true,
    });
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

// check the user is valid or not and after the find valid user we can forget the password
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

// User Routes GET, PATCH, DELETE, UPDATE
export const getUserDataController = (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json({ msg: "user found in database", user });
  } catch (error) {
    return res
      .status(501)
      .json({ msg: "some error ocurred for finding user", error });
  }
};

export const changeUserDetailProductController = async (req, res) => {
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

//End User Routes GET, PATCH, DELETE, UPDATE

// // Shipping Address Controller
// export const shippingAddressController = async (req, res) => {
//   let id = req.user?.id;
//   console.log(req.body);
//   try {
//     const data = await Users.findByIdAndUpdate(
//       { _id: id },
//       { shippingAddress: req.body },
//       { new: true }
//     );
//     if (!data) {
//       return res.status(404).json({ msg: "address not added" });
//     }
//     return res.status(200).json({ msg: "address added successfully", data });
//   } catch (error) {
//     return res.status(501).json({ msg: "some error ocurred", error });
//   }
// };

// // End Shipping Address Controller

//End profile Image upload controller

export default signupControllerData;
export { loginControllerData, validEmailController, passwordResetController };
