// src/services/inventoryService.ts
import fetchClient from "./fetchClient";

export interface ManagerInventoryItem {
  inventory_item_id: string;
  franchise_store_id: string;
  store_name: string;
  product_id: string;
  product_code: string;
  product_name: string;
  category_name: string;
  quantity: number;
  on_hand_qty: string;
  reserved_qty: string;
  last_updated_at: string;
  expiry_date: string | null;
  min_qty?: string;
}

export interface ProductMaterial {
  product_material_id: string;
  material_id: string;
  material_code: string;
  material_name: string;
  qty_required: string;
  uom: string;
  note: string;
}

export interface ProductDetail {
  product_id: string;
  product_type_id: string;
  product_type_name: string;
  name: string;
  uom: string;
  sku: string;
  price: string;
  description: string;
  is_active: boolean;
  materials: ProductMaterial[];
}

export interface DashboardCards {
  total_products: number;
  low_stock: number;
  baked_mooncake: number;
  sticky_mooncake: number;
}

export interface Material {
  material_id: number;
  material_name: string;
  material_code: string;
  uom: string;
}

export interface ProductType {
  product_type_id: number;
  product_type_name: string;
}

export interface CreateProductRequest {
  product_type_id: number;
  name: string;
  uom: string;
  price: number;
  description: string;
  materials: {
    material_id: number;
    qty_required: number;
    uom: string;
    note: string;
  }[];
}

export interface UpdateProductRequest extends CreateProductRequest {
  sku: string;
  is_active: boolean;
}

export interface InventoryResponse {
  success: boolean;
  data: {
    cards: DashboardCards;
    inventory: any[];
  };
  message: string | null;
}

export interface ProductDetailResponse {
  success: boolean;
  data: ProductDetail;
  message: string | null;
}

export interface ManagerInventoryData {
  cards: DashboardCards;
  items: ManagerInventoryItem[];
}

const inventoryService = {
  getManagerInventory: async (): Promise<ManagerInventoryData> => {
    try {
      const response = await fetchClient.get<InventoryResponse>("/manager/product_inventory");

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load inventory");
      }

      const items = response.data.inventory.map((item: any) => ({
        inventory_item_id: item.inventory_item_id,
        franchise_store_id: item.central_kitchen_id,
        store_name: item.central_kitchen_name,
        product_id: item.product_id,
        product_code: item.uom || "N/A",
        product_name: item.product_name,
        category_name: item.description?.substring(0, 15) || "N/A",
        quantity: parseFloat(item.on_hand_qty) || 0,
        on_hand_qty: String(item.on_hand_qty),
        min_qty: String(item.min_qty),
        reserved_qty: "0",
        last_updated_at: new Date().toISOString(),
        expiry_date: item.expiry_date
      }));

      return {
        cards: response.data.cards,
        items
      };
    } catch (error) {
      console.error("Error fetching manager inventory:", error);
      throw error;
    }
  },

  deleteInventoryItem: async (id: string): Promise<boolean> => {
    try {
      const response = await fetchClient.delete<any>(`/Manager_delete_products/${id}`);
      return response.success;
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  },

  getProductDetail: async (productId: string): Promise<ProductDetail> => {
    try {
      const response = await fetchClient.get<ProductDetailResponse>(`/Manager_view_detail_products/${productId}`);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load product detail");
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching product detail for ID ${productId}:`, error);
      throw error;
    }
  },

  getProductTypes: async (): Promise<ProductType[]> => {
    try {
      const response = await fetchClient.get<{ success: boolean; data: ProductType[] }>("/Manager_get_product_types");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching product types:", error);
      return [];
    }
  },

  getAllMaterials: async (): Promise<Material[]> => {
    try {
      const response = await fetchClient.get<{ success: boolean; data: Material[] }>("/Manager_get_materials");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching materials:", error);
      return [];
    }
  },

  createProduct: async (data: CreateProductRequest): Promise<any> => {
    try {
      const response = await fetchClient.post<any>("/Manager_create_products", data);
      return response;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (id: string, data: UpdateProductRequest): Promise<any> => {
    try {
      const response = await fetchClient.put<any>(`/Manager_update_products/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }
};

export default inventoryService;
