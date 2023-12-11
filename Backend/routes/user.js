import express from "express";
import multer from "multer";
import signupControllerData, {
  loginControllerData,
  passwordResetController,
  validEmailController,
} from "../controllers/userController.js";
import { Authorization } from "../middlewares/userAuthorization.js";
import path from "path";

const router = express.Router();

// for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images"); // Set the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//   image upload code end

router.post("/signup", signupControllerData);
router.post("/login", loginControllerData);

router.put(
  "/account-setting",
  Authorization,
  upload.single("image"),
  async (req, res) => {
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
          .send({ msg: "data is not iserted in database", status: false });
      }
      res.status(200).json({
        msg: "User detail is updated successfuly",
        status: true,
        data,
      });
    } catch (error) {
      res.status(401).json({
        msg: "some error is occured in accountSetting section" + error,
        satus: false,
      });
    }
  }
);
router.post("/email_valid", validEmailController);
router.post("/resetpassword/:token", passwordResetController);

export default router;
