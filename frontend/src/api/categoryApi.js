// frontend/api/categoryApi.js
import { axiosInstance } from "../utils/axios";

// Get all categories
export const fetchAllCategories = async () => {
    const res = await axiosInstance.get("/categories");
    return res.data;
};

// Get single category by ID
export const fetchCategoryById = async (categoryId) => {
    const res = await axiosInstance.get(`/categories/${categoryId}`);
    return res.data;
};

export const fetchProvidersByCategory = async (categoryId) => {
    const res = await axiosInstance.get(`/categories/providers?categoryId=${categoryId}`);
    return res.data;
};