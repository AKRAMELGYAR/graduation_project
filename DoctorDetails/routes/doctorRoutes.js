import { Router } from "express";
import * as doctorController from "../controllers/doctorController.js";
import validation from "../../middlewares/validation.js";
import * as DS from "../services/doctor.schema.js";
import { multerWithCloudinary, fileTypes } from "../../middlewares/multer.js";


const doctorRouter = Router();

doctorRouter.post("/addDoctor", multerWithCloudinary([...fileTypes.image]).single("image"), validation(DS.addDoctorSchema), doctorController.addDoctor);

doctorRouter.get("/:id", doctorController.getDoctor);

doctorRouter.get("/getAllDoctors", doctorController.getAllDoctors);

doctorRouter.delete("/:id", doctorController.deleteDoctor);

doctorRouter.patch("/:id", validation(DS.updateDoctorSchema), doctorController.updateDoctor);

export default doctorRouter;