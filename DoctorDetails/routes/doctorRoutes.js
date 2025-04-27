import { Router } from "express";
import * as doctorController from "../controllers/doctorController.js";
import validation from "../../middlewares/validation.js";
import * as DS from "../services/doctor.schema.js";
import { multerWithCloudinary, fileTypes } from "../../middlewares/multer.js";
import authentication from "../../middlewares/authentication.js";

const doctorRouter = Router();

doctorRouter.post("/addDoctor", multerWithCloudinary([...fileTypes.image]).single("image"), authentication, validation(DS.addDoctorSchema), doctorController.addDoctor);

doctorRouter.get("/allDoctors", authentication, doctorController.getAllDoctors);

doctorRouter.get("/:id", authentication, doctorController.getDoctor);

doctorRouter.delete("/:id", authentication, doctorController.deleteDoctor);

doctorRouter.patch("/:id", authentication, validation(DS.updateDoctorSchema), doctorController.updateDoctor);

export default doctorRouter;