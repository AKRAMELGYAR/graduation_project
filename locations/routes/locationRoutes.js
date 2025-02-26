import { Router } from "express";
import * as locationController from "../controllers/locationController.js";

const locationRoutes = Router();

locationRoutes.post("/add", locationController.addLocation);
locationRoutes.get("/all", locationController.getLocations);
locationRoutes.delete("/delete/:id", locationController.deleteLocation);

export default locationRoutes;