// src/services/storeService.ts
import fetchClient from "./fetchClient";

// Interface definitions
export interface DashboardCards {
    pending: number;
    approved: number;
    processing: number;
    fulfilled: number;
    confirmed?: number;
    cancelled?: number;
}

export interface DashboardResponse {
    summary?: {
        paid_amount: number;
        unpaid_amount: number;
        total_orders: number;
    };
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

export interface DashboardSummary {
    paid_amount: number;
    unpaid_amount: number;
    total_orders: number;
}

export interface DashboardDataWithOrders {
    stats: DashboardStats;
    recentOrders: Order[];
    summary: DashboardSummary;
}

export interface OrdersResponse {
    success: boolean;
    data: {
        summary?: DashboardSummary;
        cards?: DashboardCards;
        recent_orders: ApiOrder[];
    };
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
    payment_status?: string;
    created_at: string;
    desired_date: string;
    note: string | null;
    delivered_at?: string | null;
    fulfilled_at?: string | null;
    total_items?: string | number;
    product_count?: number;
    total_amount?: number;
    total_product_qty?: number;
    product_names?: string;
    product_details?: Array<{
        product_id: number;
        product_name: string;
        qty: string | number;
        unit_price?: number;
        line_total?: number;
        uom?: string;
    }>;
}

export interface Order {
    id: string;
    orderCode: string;
    products: string;
    productNames?: string;
    totalProductQty: number;
    productDetails?: Array<{
        product_name: string;
        qty: string | number;
        uom?: string;
    }>;
    status: 'pending' | 'processing' | 'fulfilled' | 'confirmed' | 'cancelled';
    statusLabel: string;
    paymentStatus: 'paid' | 'unpaid' | 'unknown';
    paymentStatusLabel: string;
    totalAmount: string;
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

// API Inventory Item format
export interface ApiInventoryItem {
    product_id: string;
    product_name: string;
    product_type_name: string;
    quantity: string;
    expiry_date: string | null;
}

// UI Inventory Item format
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

// Confirm Receipt API Interfaces
export interface ConfirmOrder {
    order_id: number;
    order_code: string;
    status: string;
    delivered_at: string;
    fulfilled_at: string | null;
    created_at: string;
    delivery_date: string;
    received_confirmed_at: string | null;
    total_products: number;
    product_names: string;
    product_labels: string;
    product_details?: Array<{
        product_name: string;
        qty: number;
        uom?: string;
    }>;
}

export interface ConfirmOrdersResponse {
    success: boolean;
    data: ConfirmOrder[];
}

export interface ConfirmReceiptRequest {
    rating: number;
    comment: string;
}

export interface ConfirmReceiptResponse {
    success: boolean;
    message?: string;
    data?: {
        order_id: string;
        order_code: string;
        status: string;
        received_confirmed_at: string;
        inventory_updated_count: number;
    };
}

// Helper function to convert API order to UI order
const convertApiOrderToOrder = (apiOrder: ApiOrder): Order => {
    const statusMap: Record<string, { status: Order['status']; label: string }> = {
        'pending': { status: 'pending', label: 'Chờ Xử Lý' },
        'processing': { status: 'processing', label: 'Đang Chuẩn Bị' },
        'fulfilled': { status: 'fulfilled', label: 'Đã Hoàn Thành' },
        'confirmed': { status: 'confirmed', label: 'Đã Xác Nhận' },
        'cancelled': { status: 'cancelled', label: 'Đã Hủy' },
    };
    const paymentStatusMap: Record<string, { status: Order['paymentStatus']; label: string }> = {
        paid: { status: 'paid', label: 'Đã thanh toán' },
        unpaid: { status: 'unpaid', label: 'Chưa thanh toán' },
    };

    const mappedStatus = statusMap[apiOrder.status] || { status: 'pending', label: apiOrder.status };
    const mappedPaymentStatus = paymentStatusMap[apiOrder.payment_status || ''] || {
        status: 'unknown',
        label: apiOrder.payment_status || 'Không rõ',
    };
    const totalItems = Number(apiOrder.total_items ?? 0);
    const deliverySource = apiOrder.desired_date || apiOrder.delivered_at || apiOrder.fulfilled_at || '';

    return {
        id: apiOrder.order_id,
        orderCode: apiOrder.order_code,
        products: `${Number.isNaN(totalItems) ? 0 : totalItems} sản phẩm`,
        productNames: apiOrder.product_names,
        totalProductQty: apiOrder.total_product_qty || 0,
        productDetails: apiOrder.product_details?.map(p => ({
            product_name: p.product_name,
            qty: p.qty,
            uom: p.uom,
        })),
        status: mappedStatus.status,
        statusLabel: mappedStatus.label,
        paymentStatus: mappedPaymentStatus.status,
        paymentStatusLabel: mappedPaymentStatus.label,
        totalAmount: new Intl.NumberFormat('vi-VN').format(apiOrder.total_amount || 0),
        createdDate: new Date(apiOrder.created_at).toLocaleDateString('vi-VN'),
        desiredDate: new Date(apiOrder.desired_date).toLocaleDateString('vi-VN'),
        deliveryDate: deliverySource
            ? new Date(deliverySource).toLocaleDateString('vi-VN')
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
                totalOrders: dashboardData.summary?.total_orders || 0,
            };

            // Convert recent_orders
            const recentOrders = (dashboardData.recent_orders || []).map(convertApiOrderToOrder);

            // Extract summary
            const summary: DashboardSummary = {
                paid_amount: dashboardData.summary?.paid_amount || 0,
                unpaid_amount: dashboardData.summary?.unpaid_amount || 0,
                total_orders: dashboardData.summary?.total_orders || 0,
            };

            console.log('Parsed dashboard stats:', stats);
            console.log('Recent orders:', recentOrders);
            console.log('Summary:', summary);

            return {
                stats,
                recentOrders,
                summary,
            };
        } catch (error) {
            console.error("Error fetching dashboard:", error);
            throw error;
        }
    },

    // Get paginated orders for tracking page
    getOrders: async (page: number = 1, limit: number = 10): Promise<Order[]> => {
        try {
            const response = await fetchClient.get<ApiResponse<ApiOrder[]>>(
                `/Franchise_ViewOrders?page=${page}&limit=${limit}`
            );
            const ordersData = (response as ApiResponse<ApiOrder[]>).data || [];
            
            if (!Array.isArray(ordersData)) {
                console.warn('Invalid orders response, returning empty array');
                return [];
            }

            const orders = ordersData.map(convertApiOrderToOrder);
            return orders;
        } catch (error) {
            console.error("Error fetching orders:", error);
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
            const data = await fetchClient.post<CreateOrderResponse>("/orders", apiRequestData);
            return data;
        } catch (error) {
            console.error("Error creating order:", error);
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
            console.log('API inventory response:', data);
            
            if (!data.success) {
                throw new Error(data.message || "Failed to load inventory");
            }

            const apiItems: ApiInventoryItem[] = data.data || [];
            
            // Map API fields to UI fields
            const inventoryItems: InventoryItem[] = apiItems.map((item, index) => ({
                inventory_item_id: item.product_id || String(index + 1),
                product_id: item.product_id,
                product_code: item.product_id, // Using product_id as code if not provided
                product_name: item.product_name,
                category_name: item.product_type_name, // Map product_type_name to category_name
                quantity: item.quantity,
                expiry_date: item.expiry_date,
            }));

            console.log('Mapped inventory items:', inventoryItems);
            return inventoryItems;
        } catch (error) {
            console.error("Error fetching inventory storage:", error);
            return [];
        }
    },

    // Get orders for receive confirmation page
    getConfirmOrders: async (
        filter: 'all' | 'delivered' | 'confirmed' = 'all',
        keyword?: string,
        page: number = 1,
        limit: number = 20
    ): Promise<ConfirmOrder[]> => {
        try {
            const response = await fetchClient.get<ConfirmOrdersResponse>(
                `/orders/delivered`
            );

            console.log('Confirm orders response:', response);

            if (!response.success || !response.data) {
                console.warn('Invalid confirm orders response');
                return [];
            }

            return response.data;
        } catch (error) {
            console.error("Error fetching confirm orders:", error);
            return [];
        }
    },

    // Confirm receipt of order
    confirmReceipt: async (
        orderId: string,
        rating: number,
        comment: string
    ): Promise<ConfirmReceiptResponse> => {
        try {
            const requestBody: ConfirmReceiptRequest = {
                rating,
                comment,
            };

            console.log(`Confirming receipt for order ${orderId}:`, requestBody);

            const response = await fetchClient.post<ConfirmReceiptResponse>(
                `/orders/${orderId}/confirm-receipt`,
                requestBody
            );

            console.log('Confirm receipt response:', response);

            return response;
        } catch (error) {
            console.error("Error confirming receipt:", error);
            throw error;
        }
    },

    // Cancel order (only for pending status)
    cancelOrder: async (orderId: string): Promise<{ success: boolean; message?: string }> => {
        try {
            console.log(`Cancelling order ${orderId}`);

            const response = await fetchClient.patch<{ success: boolean; message?: string }>(
                `/orders/${orderId}`
            );

            console.log('Cancel order response:', response);

            return response;
        } catch (error) {
            console.error("Error cancelling order:", error);
            throw error;
        }
    },

    // Get payment orders data
    getPaymentOrders: async (): Promise<any> => {
        try {
            const response = await fetchClient.get<any>("/franchise/payment-orders");
            console.log('Raw payment orders response:', response);
            return response;
        } catch (error) {
            console.error("Error fetching payment orders:", error);
            throw error;
        }
    },
};

export default storeService;
