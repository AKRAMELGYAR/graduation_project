import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";
import * as hospitalService from "../services/hospitalServices.js";



export const createHospital = asyncHandler (async (req, res) => {
    const hospital = await hospitalService.createHospital(req.body);
    return res.status(201).json({
        message : "Hospital created successfully",
        hospital
    });
})