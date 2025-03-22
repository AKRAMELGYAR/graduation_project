import { addDoctorDetails, updateDoctorDetails } from "../repository/doctorRepo.js";
import createRandomPass from "../../utils/createRandomPass/index.js";
import hashed from "../../utils/encrypting/hashing.js";
import { enumRole, User } from "../../user/model/userModel.js";
import { findUser, findUsers, saveUser } from "../../Auth/repo/authRepo.js";
import { deleteDoc } from "../repository/doctorRepo.js";
import mongoose from "mongoose";
import cloudinary from "../../utils/cloudinary/index.js";



export const addDoctor = async (req, res, next) => {

    const { firstName, lastName, speciality, email, location, address, experience, fees, aboutDoctor } = req.body;

    const ifDoctorExists = await findUser({ payload: { email } });

    if (ifDoctorExists)
        return next(new Error("Doctor already exists", { cause: 400 }));

    let image = {};

    if (req.file) {
        let {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: "Appointments_APP/Doctors",
            use_filename: true,
            unique_filename: false
        });
        image = {
            secure_url,
            public_id
        }
    }

    const password = await createRandomPass();

    const id = new mongoose.Types.ObjectId();

    const newDoctor = {
        _id: id,
        firstName,
        lastName,
        userName: email.split('@')[0],
        email,
        password: await hashed(password),
        role: enumRole.doctor
    };

    const newDoctorDetails = {
        userId: id,
        speciality,
        location,
        address,
        experience,
        fees,
        aboutDoctor,
        image
    }

    await Promise.all([
        saveUser({userData: newDoctor}),
        addDoctorDetails({data: newDoctorDetails})
    ])

    return res.status(201).json({
        message: "done", 
        data: {
            email: newDoctor.email,
            password: password
    }});
}



export const getDoctor = async (req, res, next) => {

    const { id } = req.params;

    const doctor = await findUser({ payload: { _id: id } });

    if (!doctor)
        return next(new Error("Doctor not found", { cause: 404 }));

    return res.status(200).json({
        message: "done", data: doctor
    })

}



export const getDoctors = async (req, res, next) => {

    const doctors = await findUsers({ payload: { role: enumRole.doctor } });

    if (!doctors)
        return next(new Error("Doctor not found", { cause: 404 }));

    return res.status(200).json({
        message: "done", data: doctors
    })
}



export const deleteDoctor = async (req, res, next) => {

    const { id } = req.params;

    const doctor = await findUser({ payload: { _id : id } });

    if (!doctor)
        return next(new Error("Doctor not found", { cause: 404 }));

    await deleteDoc({ payload: { _id : id } });

    return res.status(200).json({
        message: "done"
    })

}



export const updateDoctor = async (req, res, next) => {

    const { id } = req.params;

    const doctor = await findUser({ payload: { _id: id, role: enumRole.doctor } });

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