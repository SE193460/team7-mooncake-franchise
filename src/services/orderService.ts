import fetchClient from "./fetchClient";

// Define the Order interface
export interface Order {
  id: number;
  status: string;
  // Add more fields as needed based on your API
}

export const getOrders = async (): Promise<Order[]> => {
  return fetchClient.get<Order[]>("/orders");
};
