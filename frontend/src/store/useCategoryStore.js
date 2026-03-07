// frontend/store/useCategoryStore.js
import { create } from "zustand";
import { fetchAllCategories, fetchCategoryById } from "../api/categoryApi";

export const useCategoryStore = create((set, get) => ({
    categories: [],
    categoriesLoading: false,

    
    loadCategories: async () => {
        set({ categoriesLoading: true });
        try {
            const data = await fetchAllCategories();
            set({ categories: data, categoriesLoading: false });
        } catch (error) {
            console.error("Error loading categories:", error);
            set({ categoriesLoading: false });
        }
    },

    
    getCategoryById: async (categoryId) => {
        try {
            const data = await fetchCategoryById(categoryId);
            return data;
        } catch (error) {
            console.error("Error fetching category detail:", error);
            return null;
        }
    }
}));