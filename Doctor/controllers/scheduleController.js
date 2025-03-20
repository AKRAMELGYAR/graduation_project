import Schedule from "../model/scheduleModel.js";
import { generateWeeklySlots } from "../services/scheduleService.js";

export const setDoctorSchedule = async (req, res) => {
    try {
        const { doctorId, workingDays, sessionDuration } = req.body;

        if (!doctorId || !workingDays || !sessionDuration) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const slots = await generateWeeklySlots(doctorId, workingDays, sessionDuration);
        return res.status(201).json({ message: "Schedule created successfully", slots });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const getDoctorSchedule = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const schedule = await Schedule.find({ doctorId });
        return res.status(200).json({ schedule });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
