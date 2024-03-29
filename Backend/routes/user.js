import express from "express";
import multer from "multer";
import signupControllerData, {
  changeDetailProductController,
  loginControllerData,
  passwordResetController,
  uploadImageProductController,
  validEmailController,
} from "../controllers/userController.js";
import { Authorization } from "../middlewares/userAuthorization.js";

const router = express.Router();

// for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../public/images"); // Set the destination folder for uploads
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });


// const upload = multer({
//   storage: storage,
// });

//   image upload code end

router.post("/signup", signupControllerData);
router.post("/login", loginControllerData);

router.put("/account-setting", Authorization, changeDetailProductController);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage:storage })

router.put(
  "/upload",
  Authorization,
  upload.single("profileImage"),
  uploadImageProductController
);
router.post("/email_valid", validEmailController);
router.post("/resetpassword/:token", passwordResetController);

export default router;
