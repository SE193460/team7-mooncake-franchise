'use client';

import Sidebar from '../../../components/Sidebar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Order {
    order_id: string;
    order_code: string;
    franchise_store_id: string;
    store_name?: string;
    central_kitchen_id: string;
    status: string;
    created_at?: string;
    desired_date?: string;
    fulfilled_at?: string;
    note?: string;
    // For processing orders
    total_items?: string;
    product_names?: string;
    // For fulfilled orders
    product_id?: string;
    product_name?: string;
    qty?: string;
    uom?: string;
    unit_price?: string;
}

type TabType = 'preparing' | 'ready';

export default function UpdateStatusPage() {
    const [activeTab, setActiveTab] = useState<TabType>('preparing');
    const [preparingOrders, setPreparingOrders] = useState<Order[]>([]);
    const [readyOrders, setReadyOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            // Fetch processing orders
            const processingResponse = await fetch(
                'https://franchisemooncake.onrender.com/api/centralKitchen/orders/processing',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json',
                    },
                }
            );

            if (processingResponse.ok) {
                const result = await processingResponse.json();
                if (result.success) {
                    setPreparingOrders(result.data);
                }
            }

            // Try to fetch ready-to-deliver orders (if endpoint exists)
            try {
                const readyResponse = await fetch(
                    'https://franchisemooncake.onrender.com/api/centralKitchen/orders/fulfilled',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'accept': 'application/json',
                        },
                    }
                );

                if (readyResponse.ok) {
                    const result = await readyResponse.json();
                    if (result.success) {
                        setReadyOrders(result.data);
                    }
                }
            } catch (error) {
                console.log('Ready orders endpoint not available yet');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Có lỗi xảy ra khi tải đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsReady = async (orderId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${orderId}/ready-to-deliver`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    toast.success('Đơn hàng đã được đánh dấu là Sẵn Sàng Giao!');
                    // Refresh the order lists
                    fetchAllOrders();
                }
            } else {
                const error = await response.json();
                toast.error(error.message || 'Có lỗi xảy ra khi cập nhật đơn hàng');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const orders = activeTab === 'preparing' ? preparingOrders : readyOrders;
    const preparingCount = preparingOrders.length;
    const readyCount = readyOrders.length;

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="update-status" type="kitchen" />
            
            <main style={{ flex: 1, padding: '32px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            Cập Nhật Trạng Thái Đơn Hàng
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Quản lý và cập nhật trạng thái các đơn hàng đang xử lý
                        </p>
                    </div>

                    {/* Tabs */}
                    <div style={{ 
                        display: 'flex', 
                        gap: '24px', 
                        marginBottom: '32px',
                        borderBottom: '2px solid var(--table-border)',
                    }}>
                        <button
                            onClick={() => setActiveTab('preparing')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'preparing' ? '3px solid var(--primary-orange)' : '3px solid transparent',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: activeTab === 'preparing' ? 'var(--primary-orange)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '-2px',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span>🔄</span> Đang Chuẩn Bị ({preparingCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('ready')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'ready' ? '3px solid var(--primary-orange)' : '3px solid transparent',
                                fontSize: '15px',
                                fontWeight: '500',
                                color: activeTab === 'ready' ? 'var(--primary-orange)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '-2px',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span>✓</span> Sẵn Sàng Giao ({readyCount})
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Đang tải đơn hàng...
                        </div>
                    ) : orders.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '60px 20px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                                {activeTab === 'preparing' ? '🔄' : '✓'}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                Không có đơn hàng
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                {activeTab === 'preparing' 
                                    ? 'Không có đơn hàng đang chuẩn bị'
                                    : 'Không có đơn hàng sẵn sàng giao'
                                }
                            </p>
                        </div>
                    ) : (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
                            gap: '20px' 
                        }}>
                            {orders.map((order, index) => (
                                <div
                                    key={`${order.order_id}-${order.product_id || 'all'}-${index}`}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid var(--table-border)',
                                        padding: '24px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                                                ORD-{order.order_id}
                                            </h3>
                                            {order.store_name && (
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                    {order.store_name}
                                                </p>
                                            )}
                                        </div>
                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: activeTab === 'preparing' ? 'var(--status-blue)' : 'var(--status-green)',
                                                color: activeTab === 'preparing' ? 'var(--status-blue-text)' : 'var(--status-green-text)',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {activeTab === 'preparing' ? 'Đang Chuẩn Bị' : 'Sẵn Sàng Giao'}
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: '16px', flex: 1 }}>
                                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase' }}>
                                            Sản phẩm
                                        </p>
                                        {order.product_name ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '8px 0',
                                                }}
                                            >
                                                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                                    {order.product_name}
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                    {order.qty && parseFloat(order.qty).toLocaleString('vi-VN')} {order.uom}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ padding: '8px 0' }}>
                                                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                                    {order.product_names}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {order.note && (
                                        <div style={{ 
                                            padding: '12px', 
                                            backgroundColor: '#f5f5f5', 
                                            borderRadius: '6px', 
                                            marginBottom: '16px',
                                            borderLeft: '3px solid var(--primary-orange)',
                                        }}>
                                            <p style={{ margin: '0', fontSize: '13px', color: '#555' }}>
                                                <strong>Ghi Chú:</strong> {order.note}
                                            </p>
                                        </div>
                                    )}

                                    <div style={{ marginTop: 'auto' }}>
                                        {order.created_at && (
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                Ngày đặt: {formatDate(order.created_at)}
                                            </p>
                                        )}
                                        {order.desired_date && (
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                                Ngày mong muốn: {formatDate(order.desired_date)}
                                            </p>
                                        )}
                                        {order.fulfilled_at && (
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                                Hoàn thành: {formatDate(order.fulfilled_at)}
                                            </p>
                                        )}
                                        {activeTab === 'preparing' && (
                                            <button
                                                onClick={() => handleMarkAsReady(order.order_id)}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    backgroundColor: 'var(--primary-orange)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--primary-orange-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                                                }}
                                            >
                                                <span>📦</span> Sẵn Sàng Giao
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
