'use client';

import Sidebar from '../../../components/Sidebar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface OrderItem {
    productName: string;
    quantity: number;
}

interface Order {
    id: string;
    branchName: string;
    items: OrderItem[];
    acceptedDate: string;
    status: 'preparing' | 'ready';
}

type TabType = 'preparing' | 'ready';

export default function UpdateStatusPage() {
    const [activeTab, setActiveTab] = useState<TabType>('preparing');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch orders from API
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                // Replace with actual API endpoint
                const response = await fetch('/api/kitchen/orders/status', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    // Mock data for development
                    setOrders([
                        {
                            id: 'ORD-002',
                            branchName: 'Chi nhánh Quận 3',
                            items: [
                                { productName: 'Bánh Nướng Trà Xanh', quantity: 40 },
                            ],
                            acceptedDate: '8/1/2026',
                            status: 'preparing',
                        },
                        {
                            id: 'ORD-003',
                            branchName: 'Chi nhánh Quận 1',
                            items: [
                                { productName: 'Bánh Dẻo Sữa Dừa', quantity: 25 },
                                { productName: 'Bánh Nướng Hạt Sen', quantity: 15 },
                            ],
                            acceptedDate: '6/1/2026',
                            status: 'ready',
                        },
                        {
                            id: 'ORD-004',
                            branchName: 'Chi nhánh Quận 7',
                            items: [
                                { productName: 'Bánh Trung Thu Thập Cẩm', quantity: 20 },
                            ],
                            acceptedDate: '5/1/2026',
                            status: 'ready',
                        },
                        {
                            id: 'ORD-005',
                            branchName: 'Chi nhánh Quận 3',
                            items: [
                                { productName: 'Bánh Dẻo Đậu Xanh', quantity: 35 },
                                { productName: 'Bánh Trung Thu Jambon', quantity: 10 },
                            ],
                            acceptedDate: '4/1/2026',
                            status: 'ready',
                        },
                        {
                            id: 'ORD-006',
                            branchName: 'Chi nhánh Quận 1',
                            items: [
                                { productName: 'Bánh Nướng Trà Xanh', quantity: 20 },
                            ],
                            acceptedDate: '3/1/2026',
                            status: 'ready',
                        },
                        {
                            id: 'ORD-007',
                            branchName: 'Chi nhánh Quận 7',
                            items: [
                                { productName: 'Bánh Nướng Hạt Sen', quantity: 30 },
                                { productName: 'Bánh Dẻo Sữa Dừa', quantity: 25 },
                            ],
                            acceptedDate: '7/1/2026',
                            status: 'ready',
                        },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Mock data for development
                setOrders([
                    {
                        id: 'ORD-002',
                        branchName: 'Chi nhánh Quận 3',
                        items: [
                            { productName: 'Bánh Nướng Trà Xanh', quantity: 40 },
                        ],
                        acceptedDate: '8/1/2026',
                        status: 'preparing',
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleMarkAsReady = async (orderId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/kitchen/orders/${orderId}/ready`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update the order status
                setOrders(orders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: 'ready' as const }
                        : order
                ));
                toast.success('Đơn hàng đã được đánh dấu là Sẵn Sàng Giao!');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            // Update locally for demo
            setOrders(orders.map(order => 
                order.id === orderId 
                    ? { ...order, status: 'ready' as const }
                    : order
            ));
            toast.success('Đơn hàng đã được đánh dấu là Sẵn Sàng Giao!');
        }
    };

    const filteredOrders = orders.filter(order => order.status === activeTab);
    const preparingCount = orders.filter(o => o.status === 'preparing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;

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
                    ) : filteredOrders.length === 0 ? (
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
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
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
                                                {order.id}
                                            </h3>
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                {order.branchName}
                                            </p>
                                        </div>
                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: order.status === 'preparing' ? 'var(--status-blue)' : 'var(--status-green)',
                                                color: order.status === 'preparing' ? 'var(--status-blue-text)' : 'var(--status-green-text)',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {order.status === 'preparing' ? 'Đã Chấp Nhận' : 'Sẵn Sàng Giao'}
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: '16px', flex: 1 }}>
                                        <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase' }}>
                                            Sản phẩm
                                        </p>
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '8px 0',
                                                    borderBottom: index < order.items.length - 1 ? '1px solid var(--table-border)' : 'none',
                                                }}
                                            >
                                                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                                    {item.productName}
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                    {item.quantity} hộp
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: 'auto' }}>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                            Chấp nhận: {order.acceptedDate}
                                        </p>
                                        {order.status === 'preparing' && (
                                            <button
                                                onClick={() => handleMarkAsReady(order.id)}
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
