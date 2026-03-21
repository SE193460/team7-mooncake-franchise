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

export interface FranchiseStore {
  franchise_store_id: string;
  store_code: string;
  store_name: string;
  store_status: 'active' | 'inactive';
  store_address: string;
  store_phone: string;
  store_email: string;
  manager_name: string;
}

export interface GetStoresResponse {
  success: boolean;
  data: FranchiseStore[];
  message?: string;
}

export interface UpdateStoreRequest {
  store_code: string;
  store_name: string;
  store_address: string;
  store_phone: string;
  store_email: string;
  manager_name: string;
}

export interface UpdateStoreStatusRequest {
  status: 'active' | 'inactive';
}

export interface UpdateStoreResponse {
  success: boolean;
  data: {
    franchise_store_id: string;
    store_code: string;
    name: string;
    status: 'active' | 'inactive';
    address: string;
    phone: string;
    email: string;
    manager_name: string;
  };
  message: string;
}

export interface CentralKitchen {
  central_kitchen_id: string;
  kitchen_code: string;
  kitchen_name: string;
  kitchen_status: 'active' | 'inactive';
  kitchen_address: string;
  kitchen_phone: string;
  kitchen_email: string;
  capacity: number;
  staff_count: number;
}

export interface GetKitchensResponse {
  success: boolean;
  data: CentralKitchen[];
  message?: string;
}

export interface UpdateKitchenRequest {
  kitchen_code: string;
  kitchen_name: string;
  kitchen_address: string;
  kitchen_phone: string;
  kitchen_email: string;
  production_capacity: number;
}

export interface UpdateKitchenResponse {
  success: boolean;
  data: {
    central_kitchen_id: string;
    kitchen_code: string;
    kitchen_name: string;
    kitchen_status: 'active' | 'inactive';
    kitchen_address: string;
    kitchen_phone: string;
    kitchen_email: string;
    production_capacity: number;
    staff_count: number;
  };
  message: string;
}

export interface DashboardResponse {
  success: boolean;
  data: {
    users: {
      active: number;
      total: number;
      list: AdminUser[];
    };
    contents: {
      products: number;
      stores: number;
      central_kitchens: number;
    };
  };
  message?: string;
}

const adminService = {
  // Lấy dữ liệu dashboard tổng hợp
  async getDashboard(): Promise<DashboardResponse['data']> {
    try {
      const response = await fetchClient.get<DashboardResponse>('/dashboard-admin');
      return response.data || { users: { active: 0, total: 0, list: [] }, contents: { products: 0, stores: 0, central_kitchens: 0 } };
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  },

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

  // Lấy danh sách tất cả cửa hàng franchise
  async getStores(): Promise<FranchiseStore[]> {
    try {
      const response = await fetchClient.get<GetStoresResponse>('/admin/franchise_stores');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Cập nhật thông tin cửa hàng
  async updateStore(storeId: string, data: UpdateStoreRequest): Promise<UpdateStoreResponse> {
    try {
      return await fetchClient.put<UpdateStoreResponse>(`/admin/franchise_stores/${storeId}`, data);
    } catch (error) {
      console.error('Error updating store:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái cửa hàng (active/inactive)
  async updateStoreStatus(storeId: string, status: 'active' | 'inactive'): Promise<UpdateStoreResponse> {
    try {
      return await fetchClient.patch<UpdateStoreResponse>(`/admin/franchise_stores/${storeId}/status`, {
        status,
      });
    } catch (error) {
      console.error('Error updating store status:', error);
      throw error;
    }
  },

  // Lấy danh sách tất cả bếp trung tâm
  async getKitchens(): Promise<CentralKitchen[]> {
    try {
      const response = await fetchClient.get<GetKitchensResponse>('/admin/central_kitchens');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching kitchens:', error);
      throw error;
    }
  },

  // Cập nhật thông tin bếp trung tâm
  async updateKitchen(kitchenId: string, data: UpdateKitchenRequest): Promise<UpdateKitchenResponse> {
    try {
      return await fetchClient.put<UpdateKitchenResponse>(`/admin/central_kitchens/${kitchenId}`, data);
    } catch (error) {
      console.error('Error updating kitchen:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái bếp trung tâm (active/inactive)
  async updateKitchenStatus(kitchenId: string, status: 'active' | 'inactive'): Promise<UpdateKitchenResponse> {
    try {
      return await fetchClient.patch<UpdateKitchenResponse>(`/admin/central_kitchens/${kitchenId}/status`, {
        status,
      });
    } catch (error) {
      console.error('Error updating kitchen status:', error);
      throw error;
    }
  },
};

export default adminService;
