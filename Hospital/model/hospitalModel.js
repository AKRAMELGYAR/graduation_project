import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Hospital name must be at least 3 characters long"],
        maxlength: [20, "Hospital name must be at most 20 characters long"]
    },
    location:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Location',
        required : true
    },
    address:{
        type: String,
        required: true,
        minlength: [10, "Address must be at least 10 characters long"],
        maxlength: [100, "Address must be at most 100 characters long"]
    },
})

export const Hospital = mongoose.model('Hospital', hospitalSchema);