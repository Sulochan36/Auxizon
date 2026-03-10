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
            <div className="my-10">
                <h2 className="font-extrabold text-5xl tracking-tight text-balance text-shadow-black text-shadow-2xs mb-2">Service Categories</h2>
                <p className="text-[16px] font-bold text-neutral-400 tracking-tight text-balance">Find the bet verified professionals for all your home needs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;