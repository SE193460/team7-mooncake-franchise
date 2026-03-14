'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import StatusCard from '../../components/StatusCard';
import OrdersTable from '../../components/OrdersTable';
import storeService from '../../services/storeService';

export default function StoreDashboard() {
    const router = useRouter();
    const [cards, setCards] = useState<{ pending?: number; processing?: number; fulfilled?: number } | null>(null);
    const [orders, setOrders] = useState<Awaited<ReturnType<typeof storeService.getOrders>>>([]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const dashboard = await storeService.getDashboard();

                setCards({
                    pending: dashboard.stats.pendingOrders,
                    processing: dashboard.stats.processingOrders,
                    fulfilled: dashboard.stats.fulfilledOrders,
                });
                setOrders(dashboard.recentOrders);
            } catch (error) {
                console.error('Failed to load store dashboard:', error);
            }
        };

        loadDashboard();
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
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', justifyContent: 'space-between', maxWidth: '1200px' }}>
                    <StatusCard icon="🛒" count={cards?.pending ?? 0} label="Chờ Xử Lý" />
                    <StatusCard icon="⚙️" count={cards?.processing ?? 0} label="Đang Chuẩn Bị" />
                    <StatusCard icon="✅" count={cards?.fulfilled ?? 0} label="Hoàn Thành" />
                </div>

                {/* Orders Table */}
                <OrdersTable orders={orders} />
            </main>
        </div>
    );
}