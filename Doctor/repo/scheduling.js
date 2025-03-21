import scheduleModel from "../model/scheduleModel.js";



export const setSchedule = async (availableSlots) => {
    return await scheduleModel.insertMany(availableSlots);
}