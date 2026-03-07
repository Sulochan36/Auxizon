import { create } from "zustand";
import {
    createCategoryApi,
    updateCategoryApi,
    toggleCategoryApi,
    fetchProviders,
    approveProviderApi,
    rejectProviderApi,
    fetchBookings,
    fetchCategories
} from "../api/adminApi";

export const useAdminStore = create((set) => ({
    // Categories
    categories: [],
    categoriesLoading: false,

    loadCategories: async () => {
        set({ categoriesLoading: true });
        try {
            const data = await fetchCategories();
            set({ categories: data, categoriesLoading: false });
        } catch (error) {
            console.log("Error loading categories:", error);
            set({ categoriesLoading: false });
        }
    },

    createCategory: async (formData) => {
        try {
            const newCategory = await createCategoryApi(formData);
            set((state) => ({ categories: [...state.categories, newCategory] }));
        } catch (error) {
            console.log("Error creating category:", error);
        }
    },

    updateCategory: async (categoryId, formData) => {
        try {
            const updated = await updateCategoryApi(categoryId, formData);
            set((state) => ({
                categories: state.categories.map(cat =>
                    cat._id === categoryId ? updated : cat
                ),
            }));
        } catch (error) {
            console.log("Error updating category:", error);
        }
    },

    toggleCategory: async (categoryId) => {
        try {
            const toggled = await toggleCategoryApi(categoryId);
            set((state) => ({
                categories: state.categories.map(cat =>
                    cat._id === categoryId ? toggled : cat
                ),
            }));
        } catch (error) {
            console.log("Error toggling category:", error);
        }
    },

    // Providers
    providers: [],
    providersLoading: false,

    loadProviders: async () => {
        set({ providersLoading: true });
        try {
            const data = await fetchProviders();
            set({ providers: data, providersLoading: false });
        } catch (error) {
            console.log("Error loading providers:", error);
            set({ providersLoading: false });
        }
    },

    approveProvider: async (providerId) => {
        try {
            await approveProviderApi(providerId);
            set((state) => ({
                providers: state.providers.map(p =>
                    p._id === providerId ? { ...p, approvalStatus: "APPROVED" } : p
                ),
            }));
        } catch (error) {
            console.log("Error approving provider:", error);
        }
    },

    rejectProvider: async (providerId) => {
        try {
            await rejectProviderApi(providerId);
            set((state) => ({
                providers: state.providers.map(p =>
                    p._id === providerId ? { ...p, approvalStatus: "REJECTED" } : p
                ),
            }));
        } catch (error) {
            console.log("Error rejecting provider:", error);
        }
    },

    // Bookings
    bookings: [],
    bookingsLoading: false,

    loadBookings: async () => {
        set({ bookingsLoading: true });
        try {
            const data = await fetchBookings();
            set({ bookings: data, bookingsLoading: false });
        } catch (error) {
            console.log("Error loading bookings:", error);
            set({ bookingsLoading: false });
        }
    },
}));