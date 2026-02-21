// src/services/authService.ts
import fetchClient from "./fetchClient";

// Interface definitions
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
        user: {
            user_id: string;
            username: string;
            email: string;
            role: string;
            status: string;
            franchise_store_id: string | null;
            central_kitchen_id: string | null;
        };
    };
    message?: string | null;
}

export interface User {
    user_id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    franchise_store_id: string | null;
    central_kitchen_id: string | null;
}

// Auth Service functions
const authService = {
    // Login
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const data = await fetchClient.post<LoginResponse>("/auth/login", credentials);
            return data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    },

    // Logout
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }
    },

    // Get current user from localStorage
    getCurrentUser: (): User | null => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    return JSON.parse(userStr);
                } catch {
                    return null;
                }
            }
        }
        return null;
    },

    // Get token
    getToken: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("token");
        }
        return null;
    },

    // Check if authenticated
    isAuthenticated: () => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem("token");
        }
        return false;
    },
};

export default authService;
