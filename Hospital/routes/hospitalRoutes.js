import express from "express";
const router = express.Router();
import * as hospitalController from "../controllers/hospitalControllers.js";


router.post('/createHospital', hospitalController.createHospital);

export default router;