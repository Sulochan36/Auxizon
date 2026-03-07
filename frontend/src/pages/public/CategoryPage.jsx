import React, { useEffect } from "react";
import CategoryCard from "../../components/cards/CategoryCard";
import { useCategoryStore } from "../../store/useCategoryStore";

const CategoryPage = () => {
    const { categories, categoriesLoading, loadCategories } = useCategoryStore();

    useEffect(() => {
        loadCategories();
    }, []);

    if (categoriesLoading) return <p className="p-6">Loading categories...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Service Categories</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;