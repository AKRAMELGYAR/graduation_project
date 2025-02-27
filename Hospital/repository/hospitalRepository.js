import { Hospital } from "../model/hospitalModel.js";


export const createHospital = async (hospital) => {
    const newHospital = new Hospital(hospital);
    await newHospital.save();
    return newHospital;
}