import { Router } from "express";
import * as doctorController from "../controllers/doctorController.js";
import validation from "../../middlewares/validation.js";
import * as DS from "../services/doctor.schema.js";


const doctorRouter = Router();

doctorRouter.post("/addDoctor", validation(DS.addDoctorSchema), doctorController.addDoctor);

doctorRouter.get("/getDoctor", doctorController.getDoctor);

doctorRouter.get("/getAllDoctors", doctorController.getAllDoctors);

doctorRouter.delete("/deleteDoctor", doctorController.deleteDoctor);

doctorRouter.patch("/updateDoctor", validation(DS.updateDoctorSchema), doctorController.updateDoctor);

export default doctorRouter;