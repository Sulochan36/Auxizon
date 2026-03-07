import { create } from "zustand";
import { createBookingApi, getAllBookingsApi, getBookingDetailsApi, cancelBookingApi, rescheduleBookingApi } from "../api/bookingApi";

export const useBookingStore = create((set, get) => ({
    bookings: [],
    bookingsLoading: false,

    // Create booking
    createBooking: async (formData) => {
        try {
            set({ bookingsLoading: true });
            const data = await createBookingApi(formData);
            // Optionally, reload bookings
            const updatedBookings = await getAllBookingsApi();
            set({ bookings: updatedBookings, bookingsLoading: false });
            return data;
        } catch (error) {
            console.error("Error creating booking:", error);
            set({ bookingsLoading: false });
            throw error;
        }
    },

    // Load all bookings
    loadBookings: async () => {
        try {
            set({ bookingsLoading: true });
            const data = await getAllBookingsApi();
            set({ bookings: data, bookingsLoading: false });
        } catch (error) {
            console.error("Error loading bookings:", error);
            set({ bookingsLoading: false });
        }
    },

    // Get single booking details
    getBookingDetails: async (id) => {
        try {
            set({ bookingsLoading: true });
            const data = await getBookingDetailsApi(id);
            set({ bookingsLoading: false });
            return data;
        } catch (error) {
            console.error("Error fetching booking details:", error);
            set({ bookingsLoading: false });
            return null;
        }
    },

    // Cancel booking
    cancelBooking: async (id, reason) => {
        try {
            set({ bookingsLoading: true });
            const data = await cancelBookingApi(id, reason);
            await get().loadBookings();
            set({ bookingsLoading: false });
            return data;
        } catch (error) {
            console.error("Error cancelling booking:", error);
            set({ bookingsLoading: false });
            throw error;
        }
    },

    // Reschedule booking
    rescheduleBooking: async (id, newDate, newTime) => {
        try {
            set({ bookingsLoading: true });
            const data = await rescheduleBookingApi(id, newDate, newTime);
            await get().loadBookings();
            set({ bookingsLoading: false });
            return data;
        } catch (error) {
            console.error("Error rescheduling booking:", error);
            set({ bookingsLoading: false });
            throw error;
        }
    },
}));