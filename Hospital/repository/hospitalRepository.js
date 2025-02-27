import { Hospital } from "../model/hospitalModel.js";


const createHospital = async (hospital) => {
    const newHospital = new Hospital(hospital);
    await newHospital.save();
    return newHospital;
}

const getHospitals = async () => {
    const hospitals = await Hospital.find();
    return hospitals;
}

const deleteHospital = async (id) => {
    const hospital = await Hospital.findByIdAndDelete(id);
    return hospital;
}


export { 
    createHospital,
    getHospitals,
    deleteHospital
 };
