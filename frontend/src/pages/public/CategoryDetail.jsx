import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategoryStore } from "../../store/useCategoryStore";
import { fetchProvidersByCategory } from "../../api/categoryApi";
import ProviderCard from "../../components/cards/ProviderCard";
import Container from "../../components/Container";
import CategoryHeader from "../../components/cards/CategoryHeader";

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
            <Container>

            <header className="mb-20">
                    <CategoryHeader key={category._id} category={category} />
            </header>

            <h2 className="text-3xl font-bold mb-4">Providers</h2>
            {providers.length === 0 ? (
                <p>No providers found for this category.</p>
            ) : (
                <div className="flex flex-col justify-center items-start gap-6">
                    {providers.map((provider) => (
                        <ProviderCard key={provider._id} provider={provider} />
                    ))}
                </div>
            )}
            </Container>
        </div>
    );
};

export default CategoryDetail;