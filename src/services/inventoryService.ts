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

export interface DashboardCards {
  total_products: number;
  low_stock: number;
  baked_mooncake: number;
  sticky_mooncake: number;
}

export interface InventoryResponse {
  success: boolean;
  data: {
    cards: DashboardCards;
    inventory: any[];
  };
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
      // Endpoint for delete if it exists, otherwise logs it
      // const response = await fetchClient.delete(`/manager/inventory/${id}`);
      // return response.success;
      console.log("Delete inventory item request (not yet implemented in backend):", id);
      return true;
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  }
};

export default inventoryService;
