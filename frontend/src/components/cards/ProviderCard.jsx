import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "../../store/useAuthStore";

const ProviderCard = ({ provider }) => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    const handleBook = () => {
        if (!user || user.role !== "customer") {
            alert("You must be logged in as a customer to book a provider.");
            return;
        }
        navigate(`/bookings/create/${provider._id}`);
    };

    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="h-32 w-full bg-gray-200 mb-4 rounded"></div> {/* Image placeholder */}
            <h3 className="text-lg font-semibold">{provider.userId.fullName}</h3>
            <p className="text-sm text-gray-600 mb-2">{provider.bio || "No bio provided"}</p>
            <p className="text-sm mb-2">Base Price: ${provider.basePrice}</p>
            <Button size="sm" onClick={handleBook}>
                Book Now
            </Button>
        </div>
    );
};

export default ProviderCard;