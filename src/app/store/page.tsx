'use client';

import Sidebar from '../../components/Sidebar';
import StatusCard from '../../components/StatusCard';
import OrdersTable from '../../components/OrdersTable';

export default function StoreDashboard() {
    const sampleOrders = [
        {
            id: 'ORD-001',
            products: '2 sản phẩm',
            status: 'pending' as const,
            statusLabel: 'Chờ Xử Lý',
            createdDate: '08/01/2026',
            deliveryDate: '',
        },
        {
            id: 'ORD-003',
            products: '2 sản phẩm',
            status: 'ready' as const,
            statusLabel: 'Sẵn Sàng Giao',
            createdDate: '06/01/2026',
            deliveryDate: '12/01/2026',
        },
        {
            id: 'ORD-006',
            products: '1 sản phẩm',
            status: 'ready' as const,
            statusLabel: 'Sẵn Sàng Giao',
            createdDate: '03/01/2026',
            deliveryDate: '05/01/2026',
        },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="dashboard" />

            <main style={{ flex: 1, padding: '24px 32px', backgroundColor: '#fff' }}>
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
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Quản lý đơn hàng bánh Trung Thu và theo dõi giao hàng
                        </p>
                    </div>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            backgroundColor: 'var(--primary-orange)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                        }}
                    >
                        <span>+</span>
                        <span>Đặt Hàng Mới</span>
                    </button>
                </div>

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
                        count={1}
                        label="Chờ Xử Lý"
                        subLabel="Đang chờ xác nhận"
                    />
                    <StatusCard
                        icon="📦"
                        count={0}
                        label="Đã Chấp Nhận"
                        subLabel="Đang chuẩn bị"
                    />
                    <StatusCard
                        icon="🚚"
                        count={2}
                        label="Sẵn Sàng Giao"
                        subLabel="Chờ đến giao"
                        highlighted={true}
                    />
                    <StatusCard
                        icon="✅"
                        count={1}
                        label="Đã Giao"
                        subLabel="Chờ xác nhận nhận hàng"
                    />
                </div>

                {/* Orders Table */}
                <OrdersTable orders={sampleOrders} />
            </main>
        </div>
    );
}
