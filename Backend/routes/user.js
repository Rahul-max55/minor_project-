import express from 'express';
import signupControllerData, { accountInfoChangeController, loginControllerData } from '../controllers/userController.js';
import { Authorization } from '../middlewares/userAuthorization.js';


const router = express.Router();

router.post('/signup' , signupControllerData);
router.post('/login' , loginControllerData);
router.put('/account-setting' , Authorization , accountInfoChangeController);


export default router;