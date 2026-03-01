// src/services/storeService.ts
import fetchClient from "./fetchClient";

// Interface definitions
export interface DashboardCards {
    pending: number;
    approved: number;
    processing: number;
    fulfilled: number;
}

export interface DashboardResponse {
    cards: DashboardCards;
    recent_orders: ApiOrder[];
}

export interface DashboardStats {
    pendingOrders: number;
    approvedOrders: number;
    processingOrders: number;
    fulfilledOrders: number;
    totalOrders: number;
}

export interface DashboardDataWithOrders {
    stats: DashboardStats;
    recentOrders: Order[];
}

// API Response wrapper
interface ApiResponse<T> {
    success?: boolean;
    data?: T;
    message?: string | null;
}

// API Order format
export interface ApiOrder {
    order_id: string;
    order_code: string;
    status: string;
    created_at: string;
    desired_date: string;
    note: string | null;
    delivered_at: string | null;
    total_items: string;
    product_names: string;
}

export interface Order {
    id: string;
    orderCode: string;
    products: string;
    status: 'pending' | 'ready' | 'preparing' | 'delivered' | 'completed';
    statusLabel: string;
    createdDate: string;
    desiredDate: string;
    deliveryDate: string;
    note: string;
}

export interface Product {
    id: string;
    name: string;
    uom: string;
    sku: string;
    price: string;
    description: string;
}

export interface InventoryItem {
    inventory_item_id: string;
    product_id: string;
    product_code: string;
    product_name: string;
    category_name: string;
    quantity: string;
    expiry_date: string | null;
}

export interface CreateOrderRequest {
    products: Array<{
        productId: string;
        productName: string;
        quantity: number;
        unit: string;
    }>;
    deliveryDate: string;
    notes?: string;
}

export interface CreateOrderResponse {
    success: boolean;
    orderId?: string;
    message?: string;
}

export interface UserProfile {
    user_id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    franchise_store_id: string | null;
    central_kitchen_id: string | null;
}

// Helper function to convert API order to UI order
const convertApiOrderToOrder = (apiOrder: ApiOrder): Order => {
    const statusMap: Record<string, { status: Order['status']; label: string }> = {
        'pending': { status: 'pending', label: 'Chờ Xử Lý' },
        'approved': { status: 'ready', label: 'Đã Chấp Nhận' },
        'processing': { status: 'preparing', label: 'Đang Chuẩn Bị' },
        'ready': { status: 'ready', label: 'Sẵn Sàng Giao' },
        'delivered': { status: 'delivered', label: 'Đã Giao' },
        'fulfilled': { status: 'completed', label: 'Hoàn Thành' },
    };

    const mappedStatus = statusMap[apiOrder.status] || { status: 'pending', label: apiOrder.status };

    return {
        id: apiOrder.order_id,
        orderCode: apiOrder.order_code,
        products: apiOrder.product_names || `${apiOrder.total_items} sản phẩm`,
        status: mappedStatus.status,
        statusLabel: mappedStatus.label,
        createdDate: new Date(apiOrder.created_at).toLocaleDateString('vi-VN'),
        desiredDate: new Date(apiOrder.desired_date).toLocaleDateString('vi-VN'),
        deliveryDate: apiOrder.delivered_at
            ? new Date(apiOrder.delivered_at).toLocaleDateString('vi-VN')
            : '',
        note: apiOrder.note || '',
    };
};

// API Service functions
const storeService = {
    // Get franchise staff dashboard data
    getDashboard: async (): Promise<DashboardDataWithOrders> => {
        try {
            const response = await fetchClient.get<ApiResponse<DashboardResponse>>("/franchiseStaff_dashboard");
            console.log('Raw dashboard response:', response);

            const dashboardData = (response as ApiResponse<DashboardResponse>).data;

            if (!dashboardData || !dashboardData.cards) {
                throw new Error('Invalid dashboard response structure');
            }

            const cards = dashboardData.cards;

            // Parse cards object to get stats
            const stats: DashboardStats = {
                pendingOrders: cards.pending || 0,
                approvedOrders: cards.approved || 0,
                processingOrders: cards.processing || 0,
                fulfilledOrders: cards.fulfilled || 0,
                totalOrders: (cards.pending || 0) + (cards.approved || 0) + (cards.processing || 0) + (cards.fulfilled || 0),
            };

            // Convert recent_orders
            const recentOrders = (dashboardData.recent_orders || []).map(convertApiOrderToOrder);

            console.log('Parsed dashboard stats:', stats);
            console.log('Recent orders:', recentOrders);

            return {
                stats,
                recentOrders,
            };
        } catch (error) {
            console.error("Error fetching dashboard:", error);
            throw error;
        }
    },

    // Get user profile
    getUserProfile: async (): Promise<UserProfile> => {
        try {
            const data = await fetchClient.get<UserProfile>("/auth/me");
            return data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    },

    // Create new order
    createOrder: async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
        try {
            // Transform data to match API format
            const apiRequestData = {
                desired_date: orderData.deliveryDate,
                note: orderData.notes || '',
                items: orderData.products.map(p => ({
                    product_id: parseInt(p.productId) || 0, // Convert to integer
                    qty: parseInt(String(p.quantity)) || 0, // Ensure integer
                })),
            };

            console.log('Sending order request:', JSON.stringify(apiRequestData, null, 2));
            const data = await fetchClient.post<CreateOrderResponse>("/CreateOrders", apiRequestData);
            return data;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    // View all orders
    getOrders: async (): Promise<Order[]> => {
        try {
            const response = await fetchClient.get<ApiResponse<ApiOrder[]>>("/ViewOrders");
            console.log('Raw orders response:', response);

            const apiOrders = (response as ApiResponse<ApiOrder[]>).data;

            if (!apiOrders || !Array.isArray(apiOrders)) {
                console.warn('Invalid orders response, returning empty array');
                return [];
            }

            // Convert API orders to UI orders
            const orders = apiOrders.map(convertApiOrderToOrder);
            console.log('Converted orders:', orders);

            return orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    // Get available products for ordering
    getProducts: async (): Promise<Product[]> => {
        try {
            const response = await fetchClient.get<ApiResponse<Product[]>>("/products");
            console.log('Raw products response:', response);

            const products = (response as ApiResponse<Product[]>).data;

            if (!products || !Array.isArray(products)) {
                console.warn('Invalid products response, returning empty array');
                return [];
            }

            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            // Return empty array instead of throwing to allow page to render
            return [];
        }
    },

    // Get inventory storage for franchise store
    getInventoryStorage: async (): Promise<InventoryItem[]> => {
        try {
            const res = await fetch(
                "https://franchisemooncake.onrender.com/api/franchise/inventory/storage",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();
console.log('apine:', data);
            if (!data.success) {
                throw new Error(data.message || "Failed to load inventory");
            }

            return data.data; // 🔥 chỉ trả array
        } catch (error) {
            console.error("Error fetching inventory storage:", error);
            return [];
        }
    },
};

export default storeService;
