import scheduleModel from "../model/scheduleModel.js";



export const setSchedule = async (availableSlots) => {
    return await scheduleModel.insertMany(availableSlots.flat());
}


export const getScheule = async ({payload}) => {
    return await scheduleModel.findOneAndDelete(payload,{new : true});
}