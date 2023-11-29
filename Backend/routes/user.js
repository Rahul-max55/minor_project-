import express from 'express';
import signupControllerData, { accountInfoChangeController, loginControllerData, passwordResetController, validEmailController } from '../controllers/userController.js';
import { Authorization } from '../middlewares/userAuthorization.js';


const router = express.Router();

router.post('/signup' , signupControllerData);
router.post('/login' , loginControllerData);
router.put('/account-setting' , Authorization , accountInfoChangeController);
router.post('/email_valid' , validEmailController);
router.post('/resetpassword/:token' , passwordResetController);


export default router;