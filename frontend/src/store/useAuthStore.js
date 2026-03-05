
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ user: res.data.user, isLoading: false });
        } catch (error) {
            set({ user: null, isLoading: false });
        }
    },

    setUser: (user) => set({ user }),

    logout: () => set({ user: null }),
}));

export default useAuthStore;