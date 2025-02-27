import express from "express";
const router = express.Router();
import * as hospitalController from "../controllers/hospitalControllers.js";

router.get('/gethospitals', hospitalController.getHospitals);
router.post('/createhospital', hospitalController.createHospital);
router.delete('/deletehospital/:id', hospitalController.deleteHospital);
export default router;