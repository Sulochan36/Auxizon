import { axiosInstance } from "../utils/axios";

// Customer creates a booking
export const createBookingApi = async (data) => {
    const res = await axiosInstance.post("/customer/bookings", data);
    return res.data;
};

// Get all bookings of the customer
export const getAllBookingsApi = async () => {
    const res = await axiosInstance.get("/customer/bookings");
    return res.data;
};

// Get booking details
export const getBookingDetailsApi = async (bookingId) => {
    const res = await axiosInstance.get(`/customer/bookings/${bookingId}`);
    return res.data;
};

// Cancel booking
export const cancelBookingApi = async (bookingId, reason) => {
    const res = await axiosInstance.patch(`/customer/bookings/${bookingId}/cancel`, { reason });
    return res.data;
};

// Reschedule booking
export const rescheduleBookingApi = async (bookingId, newDate, newTime) => {
    const res = await axiosInstance.patch(`/customer/bookings/${bookingId}/reschedule`, { scheduledDate: newDate, scheduledTime: newTime });
    return res.data;
};