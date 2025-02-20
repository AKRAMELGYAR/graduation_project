import joi from "joi";
import genralRules from "../../utils/generalRules/index.js";

export const userSignUpSchema = {
    body: joi.object({
        firstName: joi.string().min(3).max(15).required(),
        lastName: joi.string().min(3).max(15).required(),
        userName: joi.string().min(3).max(15).required(),
        email: genralRules.email.required(),
        password: genralRules.password.required()
    })
}

export const userSignInSchema = {
    body: joi.object({
        email: genralRules.email.required(),
        password: genralRules.password.required()
    })
}
