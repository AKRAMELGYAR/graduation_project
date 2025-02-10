import { Router } from "express";
import validation from "../../middlewares/validation.js";
import * as US from "../service/userSchema.js";
import * as userController from "../controllers/userController.js";
const userRoutes = Router();

userRoutes.post("/signup", validation(US.userSignUpSchema), userController.signUp);

export default userRoutes;