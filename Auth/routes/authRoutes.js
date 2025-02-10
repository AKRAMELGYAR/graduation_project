import express from 'express';
import { googleAuth, googleCallback } from '../controllers/authController.js';
import verifying from '../../utils/tokens/veryfing.js';
import validation from "../../middlewares/validation.js";
import * as US from "../service/userSchema.js";
import * as userController from "../controllers/authController.js";

const router = express.Router();

router.get('/google', googleAuth);

router.get('/google/callback', googleCallback);


router.get('/dashboard' ,verifying, (req, res) => {
    res.send('Welcome to the dashboard');
});

router.post("/signup", validation(US.userSignUpSchema), userController.signUp);

export default router;