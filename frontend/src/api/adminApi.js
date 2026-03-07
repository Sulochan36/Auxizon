import { axiosInstance } from "../utils/axios";

//Categories
export const fetchCategories = async () => {
    const res = await axiosInstance.get("/categories");
    return res.data;
};

export const createCategoryApi = async (formData) => {
    const res = await axiosInstance.post("/admin/categories", formData);
    return res.data;
};

export const updateCategoryApi = async (categoryId, formData) => {
    const res = await axiosInstance.put(`/admin/categories/${categoryId}`, formData);
    return res.data;
};

export const toggleCategoryApi = async (categoryId) => {
    const res = await axiosInstance.post(`/admin/categories/${categoryId}/toggle`);
    return res.data;
};

//Providers
export const fetchProviders = async () => {
    const res = await axiosInstance.get("/admin/providers");
    return res.data;
};

export const approveProviderApi = async (providerId) => {
    const res = await axiosInstance.patch(`/admin/providers/${providerId}/approve`);
    return res.data;
};

export const rejectProviderApi = async (providerId) => {
    const res = await axiosInstance.patch(`/admin/providers/${providerId}/reject`);
    return res.data;
};

// Bookings
export const fetchBookings = async () => {
    const res = await axiosInstance.get("/admin/bookings");
    return res.data;
};