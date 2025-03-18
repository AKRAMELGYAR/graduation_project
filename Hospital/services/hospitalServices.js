import * as hospitalRepository from '../repository/hospitalRepository.js';


const createHospital = async (hospital) => {
    const newHospital = await hospitalRepository.createHospital(hospital);
    return newHospital;
}

const getHospitals = async () => {
    const hospitals = await hospitalRepository.getHospitals();
    return hospitals;
}

const deleteHospital = async (id) => {
    const hospital = await hospitalRepository.deleteHospital(id);
    return hospital;
}


export { 
    createHospital,
    getHospitals,
    deleteHospital

 };