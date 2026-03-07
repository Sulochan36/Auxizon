import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategoryStore } from "../../store/useCategoryStore";
import { fetchProvidersByCategory } from "../../api/categoryApi";
import ProviderCard from "../../components/cards/ProviderCard";

const CategoryDetail = () => {
    const { id } = useParams(); // category ID from URL
    const { getCategoryById } = useCategoryStore();

    const [category, setCategory] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loadingProviders, setLoadingProviders] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategory = async () => {
            setLoadingCategory(true);
            setError(null);
            try {
                const cat = await getCategoryById(id);
                if (!cat) {
                    setError("Category not found");
                } else {
                    setCategory(cat);
                }
            } catch (err) {
                setError("Failed to load category");
            } finally {
                setLoadingCategory(false);
            }
        };

        const loadProviders = async () => {
            setLoadingProviders(true);
            try {
                const provs = await fetchProvidersByCategory(id);
                setProviders(provs);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingProviders(false);
            }
        };

        loadCategory();
        loadProviders();
    }, [id, getCategoryById]);

    if (loadingCategory || loadingProviders) {
        return <p className="p-6">Loading category details...</p>;
    }

    if (error) {
        return <p className="p-6 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="mb-6">{category.description}</p>

            <h2 className="text-2xl font-semibold mb-4">Providers</h2>
            {providers.length === 0 ? (
                <p>No providers found for this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {providers.map((provider) => (
                        <ProviderCard key={provider._id} provider={provider} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryDetail;