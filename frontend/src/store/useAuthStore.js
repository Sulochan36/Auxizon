
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ user: res.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ user: null, isCheckingAuth: false });
        }
    },

    setUser: (user) => set({ user }),

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed");
        }
    },

    refreshToken: async () => {
        try {
            const res = await axiosInstance.post("/auth/refresh-token");
            const user = res.data?.user;

            if (user) {
                set({ user });
            }

            return true;
        } catch (err) {
            set({ user: null });
            return false;
        }
    },
}));



export default useAuthStore;