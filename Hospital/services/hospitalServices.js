import * as hospitalRepository from '../repository/hospitalRepository.js';


const createHospital = async (hospital) => {
    const newHospital = await hospitalRepository.createHospital(hospital);
    return newHospital;
}

export default
{
    createHospital
}