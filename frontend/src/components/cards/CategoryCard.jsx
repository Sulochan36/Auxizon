import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate(`/category-detail/${category._id}`);
    };

    return (
        <div className="border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white">

            {/* Image Placeholder */}
            <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Category Image</span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">

                <h3 className="text-lg font-semibold">
                    {category.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {category.description}
                </p>

                <Button
                    onClick={handleExplore}
                    className="w-full mt-2"
                >
                    Explore
                </Button>

            </div>
        </div>
    );
};

export default CategoryCard;