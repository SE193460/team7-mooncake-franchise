'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import StatusCard from '../../components/StatusCard';
import OrdersTable from '../../components/OrdersTable';
import storeService, { DashboardStats, Order } from '../../services/storeService';

export default function StoreDashboard() {
    const router = useRouter();
    const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
        pendingOrders: 0,
        approvedOrders: 0,
        processingOrders: 0,
        fulfilledOrders: 0,
        totalOrders: 0,
    });
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const dashboardData = await storeService.getDashboard();
                
                if (isMounted) {
                    console.log('Dashboard data received:', dashboardData);
                    setDashboardStats(dashboardData.stats);
                    setOrders(dashboardData.recentOrders);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching dashboard data:', err);
                    setError('Không thể tải dữ liệu. Vui lòng thử lại.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Only call dashboard API - it returns both stats and recent orders
            const dashboardData = await storeService.getDashboard();
            
            console.log('Dashboard data received:', dashboardData);
            
            // Set stats and recent orders (only 5 most recent)
            setDashboardStats(dashboardData.stats);
            setOrders(dashboardData.recentOrders);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Không thể tải dữ liệu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="dashboard" />

            <main style={{ flex: 1, padding: '32px 40px', backgroundColor: 'var(--main-bg)' }}>
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '24px',
                    }}
                >
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                            Tổng Quan Cửa Hàng
                        </h1>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Quản lý đơn hàng bánh Trung Thu và theo dõi giao hàng
                        </p>
                    </div>
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

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : error ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        backgroundColor: '#fee',
                        borderRadius: '8px',
                        color: '#c00',
                    }}>
                        <p>{error}</p>
                        <button 
                            onClick={fetchDashboardData}
                            style={{
                                marginTop: '16px',
                                padding: '8px 16px',
                                backgroundColor: 'var(--primary-orange)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Thử lại
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Status Cards */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '16px',
                                marginBottom: '32px',
                            }}
                        >
                            <StatusCard
                                icon="🛒"
                                count={dashboardStats.pendingOrders || 0}
                                label="Chờ Xử Lý"
                                subLabel="Đang chờ xác nhận"
                            />
                            <StatusCard
                                icon="✅"
                                count={dashboardStats.approvedOrders || 0}
                                label="Đã Chấp Nhận"
                                subLabel="Đã xác nhận đơn hàng"
                            />
                            <StatusCard
                                icon="📦"
                                count={dashboardStats.processingOrders || 0}
                                label="Đang Xử Lý"
                                subLabel="Đang chuẩn bị hàng"
                                highlighted={true}
                            />
                            <StatusCard
                                icon="🎉"
                                count={dashboardStats.fulfilledOrders || 0}
                                label="Hoàn Thành"
                                subLabel="Đã giao thành công"
                            />
                        </div>

                        {/* Orders Table */}
                        <OrdersTable orders={orders} />
                    </>
                )}
            </main>
        </div>
    );
}
