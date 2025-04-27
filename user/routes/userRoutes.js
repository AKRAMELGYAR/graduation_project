import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authentication from "../../middlewares/authentication.js";
import * as doctorController from "../../DoctorDetails/controllers/doctorController.js";

const userRoutes = Router();

userRoutes.get('/allDoctors', authentication, doctorController.getAllDoctors);

userRoutes.get("/profile", authentication, userController.getProfile);

userRoutes.get("/:id", authentication, doctorController.getDoctor);


export default userRoutes;