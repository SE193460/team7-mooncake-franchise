// src/services/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://franchisemooncake.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include auth token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
