import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";
import * as hospitalService from "../services/hospitalServices.js";


const createHospital = asyncHandler (async (req, res) => {
    const hospital = await hospitalService.createHospital(req.body);
    return res.status(201).json({
        message : "Hospital created successfully",
        hospital
    });
})

const getHospitals = asyncHandler (async (req, res) => {
    const hospitals = await hospitalService.getHospitals();
    return res.status(200).json({
        message: "Hospitals fetched successfully",
        hospitals
    });
})

const deleteHospital = asyncHandler (async (req, res) => {
    const hospital = await hospitalService.deleteHospital(req.params.id);
    return res.status(200).json({
        message: "Hospital deleted successfully",
        hospital
    });
})

export { 
    createHospital,
    getHospitals,
    deleteHospital
 };