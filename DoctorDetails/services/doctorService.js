import { DoctorDetails } from "../model/doctorDetailsModel.js";
import { addDoctorDetails, updateDoctorDetails } from "../repository/doctorRepo.js";
import createRandomPass from "../../utils/createRandomPass/index.js";
import hashed from "../../utils/encrypting/hashing.js";
import { enumRole, User } from "../../user/model/userModel.js";
import { findUser, saveUser } from "../../Auth/repo/authRepo.js";
import { getAllDoctors, deleteDoc } from "../repository/doctorRepo.js";



export const addDoctor = async (req, res, next) => {

    const { firstName, lastName, speciality, email, hospitalId } = req.body;

    const ifDoctorExists = await findUser({ payload: { email } });

    if (ifDoctorExists)
        return next(new Error("Doctor already exists", { cause: 400 }));

    const password = await createRandomPass();

    const newDoctor = new User({
        firstName,
        lastName,
        userName: email.split('@')[0],
        email,
        password: await hashed(password),
        role: enumRole.doctor,
        hospitalId
    })

    const newDoctorDetails = new DoctorDetails({
        userId: newDoctor._id,
        speciality,
        hospitalId
    })

    await Promise.all([
        saveUser({userData: newDoctor}),
        addDoctorDetails({data: newDoctorDetails})
    ])

    return res.status(201).json({
        message: "done", data: {
            email: newDoctor.email,
            password: password
    }});
}



export const getDoctor = async (req, res, next) => {

    const { id } = req.query;

    const doctor = await findUser({ payload: { _id: id } });

    if (!doctor)
        return next(new Error("Doctor not found", { cause: 404 }));

    return res.status(200).json({
        message: "done", data: doctor
    })

}



export const getDoctors = async (req, res, next) => {

    const doctors = await getAllDoctors();

    if (!doctors)
        return next(new Error("Doctor not found", { cause: 404 }));

    return res.status(200).json({
        message: "done", data: doctors
    })
}



export const deleteDoctor = async (req, res, next) => {

    const { id } = req.query;

    const doctor = await findUser({ payload: { _id : id } });

    if (!doctor)
        return next(new Error("Doctor not found", { cause: 404 }));

    await deleteDoc({ payload: { _id : id } });

    return res.status(200).json({
        message: "done"
    })

}



export const updateDoctor = async (req, res, next) => {

    const { id } = req.query;

    const doctor = await findUser({ payload: { _id: id } });

    if (!doctor)
        return next(new Error("Doctor not found", { cause: 404 }));

    if (req.body.email) {
        if (await User.findOne({ email: req.body.email }))
            return next(new Error("Email already exists", { cause: 400 }));
        doctor.email = req.body.email;
        doctor.userName = req.body.email.split('@')[0];
    }

    if (req.body.speciality)
        await updateDoctorDetails({user:{ userId: doctor._id }, payload: { speciality: req.body.speciality }});

    await saveUser({ userData: doctor });

    return res.status(200).json({
        message: "done"
    })
}