import joi from 'joi';
import genralRules from '../../utils/generalRules/index.js';



export const addDoctorSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(15).required(),
        lastName: joi.string().min(3).max(15).required(),
        speciality: joi.string().min(3).max(15).required(),
        email: joi.string().email({tlds:true}).required(),
        hospitalId: genralRules.objectId.required()
    })
}


export const updateDoctorSchema = {
    body: joi.object({
        speciality: joi.string().min(3).max(15),
        email: joi.string().email({tlds:true}),
    }),
    query: joi.object({
        id: genralRules.objectId.required()
    })
}