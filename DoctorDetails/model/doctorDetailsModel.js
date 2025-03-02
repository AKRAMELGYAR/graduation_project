import mongoose from "mongoose";


const doctorDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    speciality: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});


export const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);