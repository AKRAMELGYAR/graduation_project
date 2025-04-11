import * as bookingService from "../services/bookingService.js";
import * as bookingRepo from "../repo/bookingRepo.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const bookSlot = asyncHandler (async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { scheduleId, slotId , patientId } = req.body;
        const booking = await bookingService.bookSlot(patientId, scheduleId, slotId, next);
        res.status(201).json({ message: "success", data: booking });
});

export const respondToBooking = asyncHandler(async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { bookingId, accept , doctorId } = req.body; 
        const booking = await bookingService.respondToBooking(bookingId, doctorId, accept, next);
        res.status(200).json({ message: "success", data: booking });
});

export const getDoctorBookings = asyncHandler (async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const doctorId = req.body; 
        const bookings = await bookingRepo.findBookingsByDoctor(doctorId);
        res.status(200).json({ message: "success", data: bookings });
});

export const getAvailableSlots = asyncHandler(async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { doctorId} = req.body;
        const slots = await bookingService.getAvailableSlots(doctorId);
        res.status(200).json({ message: "success", data: slots });
});