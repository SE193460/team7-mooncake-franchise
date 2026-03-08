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

export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    franchise: {
        franchise_store_id: string;
        store_code: string;
        store_name: string;
        staff_code: string;
        staff_status: string;
    } | null;
    central_kitchen: any;
}

export interface UpdateProfileRequest {
    username: string;
}

export interface ChangePasswordRequest {
    current_password: string;
    new_password: string;
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

    // Get user profile from API (with full details)
    getUserProfile: async (): Promise<UserProfile> => {
        try {
            const response = await fetchClient.get<{
                success: boolean;
                data: UserProfile;
                message: string | null;
            }>("/auth/me");

            if (!response.success || !response.data) {
                throw new Error(response.message || "Failed to fetch user profile");
            }

            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
        try {
            // Đổi thành PUT nếu BE yêu cầu: fetchClient.put
            const response = await fetchClient.patch<{
                success: boolean;
                data: User;
                message: string | null;
            }>("/profile", data);

            if (!response.success || !response.data) {
                throw new Error(response.message || "Failed to update profile");
            }

            // Update localStorage with new username
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                const updatedUser = { ...currentUser, username: response.data.username };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                // Dispatch custom event để notify Sidebar
                window.dispatchEvent(new CustomEvent('userUpdated', { 
                    detail: updatedUser 
                }));
            }

            return response.data;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    },

    // Change password
    changePassword: async (data: ChangePasswordRequest): Promise<void> => {
        try {
            const response = await fetchClient.patch<{
                success: boolean;
                data: any;
                message: string | null;
            }>("/profile/change-password", data);

            if (!response.success) {
                throw new Error(response.message || "Failed to change password");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            throw error;
        }
    },
};

export default authService;
