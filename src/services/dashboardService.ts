const BASE_URL = "https://franchisemooncake.onrender.com/api";

export async function getFranchiseDashboard(token: string) {
  const res = await fetch(`${BASE_URL}/franchiseStaff_dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}

export interface ManagerDashboardCards {
  total_orders_month: number;
  low_stock_alerts: number;
  total_product_stock: number;
  total_material_stock: number;
}

export interface MaterialInventory {
  inventory_item_id: string;
  material_id: string;
  material_name: string;
  cost_price: number;
  min_stock: number;
  on_hand_qty: string;
  expiry_date: string;
  uom: string;
  material_type: string;
  status: string;
}

export interface ManagerDashboardResponse {
  success: boolean;
  data: {
    cards: ManagerDashboardCards;
    materials_inventory: MaterialInventory[];
    low_stock_alerts: MaterialInventory[];
    threshold: number;
  };
  message: string | null;
}

export async function getManagerDashboard(token: string): Promise<ManagerDashboardResponse> {
  const res = await fetch(`${BASE_URL}/manager/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch manager dashboard");
  }

  return res.json();
}