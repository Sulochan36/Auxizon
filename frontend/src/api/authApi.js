import { axiosInstance } from "../utils/axios";



export const signupCustomer = async (formData) => {
    const res = await axiosInstance.post("/auth/signup/register-customer", formData);
    return res.data;
};

export const signupProvider = async (formData) => {
    const res = await axiosInstance.post("/auth/signup/register-provider", formData);
    return res.data;
};

export const loginUser = async (formData) => {
    const res = await axiosInstance.post("/auth/login", formData);
    return res.data;
};

export const logoutUser = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};

export const refreshAccessToken = async () => {
    const res = await axiosInstance.post("/auth/refresh-token");
    return res.data;
};