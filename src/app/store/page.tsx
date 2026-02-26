'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import StatusCard from '../../components/StatusCard';
import OrdersTable from '../../components/OrdersTable';

export default function StoreDashboard() {
    const router = useRouter();
    const [cards, setCards] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch('https://franchisemooncake.onrender.com/api/franchiseStaff_dashboard', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log("DASHBOARD:", result);

                const dashboard = result.data;

                setCards(dashboard.cards);
               
                setOrders(dashboard.recent_orders);
                console.log("ORDERS:", dashboard.recent_orders);
            })
            .catch(console.error);
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="dashboard" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                <h1>Tổng Quan Cửa Hàng</h1>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '24px',
                    }}
                >
                    <button
                        onClick={() => router.push('/store/order')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            backgroundColor: 'var(--primary-orange)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(255, 107, 53, 0.3)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-orange-hover)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 107, 53, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(255, 107, 53, 0.3)';
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>+</span>
                        <span>Đặt Hàng Mới</span>
                    </button>
                </div>

                {/* Status Cards */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                    <StatusCard icon="🛒" count={cards?.pending ?? 0} label="Chờ Xử Lý" />
                    <StatusCard icon="📦" count={cards?.approved ?? 0} label="Đã Chấp Nhận" />
                    <StatusCard icon="⚙️" count={cards?.processing ?? 0} label="Đang Xử Lý" />
                    <StatusCard icon="✅" count={cards?.fulfilled ?? 0} label="Hoàn Thành" />
                </div>

                {/* Orders Table */}
                <OrdersTable
                    orders={orders?.map((o) => ({
                        id: o.order_code,
                        products: `${o.product_count} sản phẩm`,
                        status: o.status,
                        statusLabel: o.status,
                        createdDate: new Date(o.created_at).toLocaleDateString(),
                        deliveryDate: o.delivered_at
                            ? new Date(o.delivered_at).toLocaleDateString()
                            : '',
                    }))}
                />
            </main>
        </div>
    );
}