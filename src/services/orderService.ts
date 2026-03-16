import fetchClient from "./fetchClient";

// Define the Order interface
export interface Order {
  id: string;
  orderCode: string;
  products: string;
  status: 'pending' | 'confirmed' | 'processing' | 'fulfilled' | 'cancelled';
  statusLabel: string;
  statusColor: string;
  createdDate: string;
  desiredDate: string;
  deliveryDate: string;
  note: string;
  // Add more fields as needed based on your API
}

export interface OrdersResponse {
  success: boolean;
  data: {
    cards: {
      pending: number;
      approved: number;
      processing: number;
      fulfilled: number;
    };
    pending_orders: Order[];
    recent_orders: Order[];
  };
}

export const getOrders = async (
  page: number = 1,
  limit: number = 5
): Promise<OrdersResponse> => {
  return fetchClient.get<OrdersResponse>(`/franchiseStaff_dashboard?page=${page}&limit=${limit}`);
};
