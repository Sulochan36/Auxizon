// lib/axios.js
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh-token')
        ) {
            originalRequest._retry = true;

            try {
                const refreshed = await useAuthStore.getState().refreshToken();

                if (refreshed) {
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.log('refresh error: ', refreshError);
                
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);