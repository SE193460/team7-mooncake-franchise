import fetchClient from "./fetchClient";

export interface MaterialType {
    materials_type_id: number;
    name: string;
}

export interface CentralKitchen {
    central_kitchen_id: number;
    name: string;
}

export interface CentralKitchenResponse {
    success: boolean;
    data: CentralKitchen[];
    message?: string;
}

export interface Material {
    material_id: string;
    name: string;
    material_code: string;
    uom: string;
    materials_type_id: number;
    material_type?: string;
    cost_price?: number;
    min_stock?: number;
    on_hand_qty: number | string;
    expiry_date: string | null;
    central_kitchen_id: number;
    is_active: boolean;
}

export interface MaterialResponse {
    success: boolean;
    data: Material;
    message?: string;
}

export interface MaterialListResponse {
    success: boolean;
    data: Material[];
    message?: string;
}

export interface MaterialTypeResponse {
    success: boolean;
    data: MaterialType[];
    message?: string;
}

const materialService = {
    getMaterialById: async (id: string): Promise<MaterialResponse> => {
        return fetchClient.get<MaterialResponse>(`/manager/materials/${id}`);
    },

    getMaterialTypes: async (): Promise<MaterialTypeResponse> => {
        return fetchClient.get<MaterialTypeResponse>("/manager/material-types");
    },

    getCentralKitchens: async (): Promise<CentralKitchenResponse> => {
        return fetchClient.get<CentralKitchenResponse>("/manager/central-kitchens");
    },

    createMaterial: async (data: Partial<Material>): Promise<MaterialResponse> => {
        return fetchClient.post<MaterialResponse>("/manager/materials", data);
    },

    updateMaterial: async (id: string, data: Partial<Material>): Promise<MaterialResponse> => {
        return fetchClient.put<MaterialResponse>(`/manager/materials/${id}`, data);
    },

    deleteMaterial: async (id: string): Promise<{ success: boolean; message: string }> => {
        return fetchClient.delete<{ success: boolean; message: string }>(`/manager/materials/${id}`);
    }
};

export default materialService;
