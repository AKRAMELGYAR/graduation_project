import { enumRole, User } from "../../user/model/userModel.js";
import { DoctorDetails } from "../model/doctorDetailsModel.js";

export const addDoctorDetails = async ({ data }) => {
    const doctorDetails = new DoctorDetails(data);
    return await doctorDetails.save();
}

export const deleteDoc = async ({ payload }) => {
    return await User.deleteOne(payload);
}


export const updateDoctorDetails = async ({ user, payload }) => {
    return await DoctorDetails.updateOne(user, payload);
}