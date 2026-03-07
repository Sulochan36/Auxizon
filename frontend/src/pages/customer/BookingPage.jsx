import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookingStore } from "../../store/useBookingStore";
// import { useProviderStore } from "../../store/useProviderStore"; // optional if you have provider details in store
import { Button } from "../../components/ui/button";

const BookingForm = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const { createBooking, bookingsLoading } = useBookingStore();
    const [provider, setProvider] = useState(null);
    const [form, setForm] = useState({
        address: "",
        city: "",
        scheduledDate: "",
        scheduledTime: "",
        notes: "",
    });

    useEffect(() => {
        // Load provider info if you want to show name/price
        // Example:
        // const prov = await fetchProviderById(providerId);
        // setProvider(prov);
    }, [providerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBooking({
                providerId,
                categoryId: provider?.categoryId || null,
                ...form,
            });
            navigate("/customer/dashboard"); // go back to bookings dashboard
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-md">
            <h2 className="text-2xl font-bold mb-4">Book Service</h2>
            {provider && <p className="mb-2">Provider: {provider.userId.fullName}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="address"
                    placeholder="Service Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    name="scheduledDate"
                    value={form.scheduledDate}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="time"
                    name="scheduledTime"
                    value={form.scheduledTime}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <textarea
                    name="notes"
                    placeholder="Additional notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <Button type="submit" disabled={bookingsLoading}>
                    {bookingsLoading ? "Booking..." : "Book Now"}
                </Button>
            </form>
        </div>
    );
};

export default BookingForm;