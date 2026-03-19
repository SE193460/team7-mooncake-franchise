// src/services/adminService.ts
import fetchClient from "./fetchClient";

export interface AdminUser {
  user_id: string;
  username: string;
  email: string;
  role: string;
  role_label: string;
  status: string;
  status_label: string;
  franchise_store_id: string | null;
  franchise_store_name: string | null;
  central_kitchen_id: string | null;
  central_kitchen_name: string | null;
  manager_code: string | null;
  franchise_staff_code: string | null;
  kitchen_staff_code: string | null;
  created_at: string;
  last_login_at: string | null;
}

export interface GetUsersResponse {
  success: boolean;
  data: AdminUser[];
  message?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  data: {
    user_id: string;
    username: string;
    email: string;
    status: string;
    created_at: string;
    last_login_at: string | null;
  };
  message: string;
}

export interface ResetPasswordRequest {
  new_password: string;
}

export interface UpdateUserStatusRequest {
  status: 'active' | 'inactive';
}

const adminService = {
  // Lấy danh sách user với search và filter
  async getUsers(keyword?: string, role?: string): Promise<AdminUser[]> {
    try {
      const params: Record<string, string> = {};
      if (keyword) params.keyword = keyword;
      if (role) params.role = role;

      const response = await fetchClient.get<GetUsersResponse>('/admin/users', { params });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Cập nhật thông tin user
  async updateUser(userId: string, data: UpdateUserRequest): Promise<UpdateUserResponse> {
    try {
      return await fetchClient.patch<UpdateUserResponse>(`/admin/users/${userId}`, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Đặt lại mật khẩu
  async resetPassword(userId: string, newPassword: string): Promise<UpdateUserResponse> {
    try {
      return await fetchClient.patch<UpdateUserResponse>(`/admin/users/${userId}/reset-password`, {
        new_password: newPassword,
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái user (active/inactive)
  async updateUserStatus(userId: string, status: 'active' | 'inactive'): Promise<UpdateUserResponse> {
    try {
      return await fetchClient.patch<UpdateUserResponse>(`/admin/users/${userId}/status`, {
        status,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  },
};

export default adminService;
