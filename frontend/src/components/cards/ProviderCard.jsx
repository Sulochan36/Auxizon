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
        navigate(`/customer/createBooking/${provider._id}`);
    };

    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition flex gap-6 bg-white">
            <div className="h-50 w-50  bg-gray-200 mb-4 rounded-2xl">
                
                </div> {/* Image placeholder */}

            <div className="flex flex-col justify-between">
                <h3 className="text-2xl font-bold mb-4">{provider.userId.fullName}</h3>
                <p className="text-md text-gray-600 mb-2">{provider.bio || "No bio provided"}</p>
                <div className="my-4 h-5"></div>

                <div className="flex justify-between items-center">
                    <p className="text-md font-semibold mb-2">Base Price: ${provider.basePrice}</p>
                    <Button className="text-md hover:bg-secondary shadow-derek hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer" onClick={handleBook}>
                        View Profile & Book
                    </Button>
                </div>
                
            </div>
            
        </div>
    );
};

export default ProviderCard;