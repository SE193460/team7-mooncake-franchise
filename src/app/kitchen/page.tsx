'use client';

import KitchenSidebar from '../../components/KitchenSidebar';
import KitchenStatusCard from '../../components/KitchenStatusCard';

// Icons as SVG components for better visual match
const ClipboardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
);

const PackageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

const AlertTriangleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
);

// Mock data for orders
const pendingOrders = [
    {
        id: 'ORD-001',
        branch: 'Chi nhánh Quận 1',
        quantity: 80,
        status: 'Chờ Xử Lý',
    },
];

// Mock data for inventory warnings
const inventoryWarnings = [
    {
        id: 1,
        name: 'Bánh Nướng Hạt Sen',
        warning: 'Sắp hết hạn',
        expiryDate: '25/1/2026',
    },
    {
        id: 2,
        name: 'Bánh Trung Thu Jambon',
        warning: 'Sắp hết hạn',
        expiryDate: '20/1/2026',
    },
    {
        id: 3,
        name: 'Bánh Nướng Vi Cá',
        warning: 'Sắp hết hạn',
        expiryDate: '18/1/2026',
    },
];

export default function KitchenDashboard() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <KitchenSidebar activePage="dashboard" />

            {/* Main Content */}
            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Bếp Trung Tâm
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Xử lý đơn hàng và quản lý nguyên vật liệu
                    </p>
                </div>

                {/* Status Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                    <KitchenStatusCard
                        icon={<ClipboardIcon />}
                        count={1}
                        label="Đơn Chờ Xử Lý"
                        subLabel="Cần xác nhận"
                    />
                    <KitchenStatusCard
                        icon={<PackageIcon />}
                        count={1}
                        label="Đang Chuẩn Bị"
                        subLabel="Đã chấp nhận"
                    />
                    <KitchenStatusCard
                        icon={<CheckCircleIcon />}
                        count={5}
                        label="Sẵn Sàng Giao"
                        subLabel="Chờ điều phối"
                        highlighted={true}
                    />
                    <KitchenStatusCard
                        icon={<AlertTriangleIcon />}
                        count={0}
                        label="Cảnh Báo Tồn Kho"
                        subLabel="Sắp hết hàng"
                    />
                </div>

                {/* Bottom Sections */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* Pending Orders Section */}
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            padding: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                Đơn Hàng Chờ Xử Lý
                            </h2>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                }}
                            >
                                Xem Tất Cả
                            </button>
                        </div>

                        {/* Order Items */}
                        {pendingOrders.map((order) => (
                            <div
                                key={order.id}
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        {order.id}
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        {order.branch}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        {order.quantity} sản phẩm
                                    </div>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '4px 12px',
                                            backgroundColor: '#fef3c7',
                                            color: '#b45309',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Inventory Warnings Section */}
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            padding: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                Cảnh Báo Tồn Kho
                            </h2>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                }}
                            >
                                Xem Chi Tiết
                            </button>
                        </div>

                        {/* Warning Items */}
                        {inventoryWarnings.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        {item.name}
                                    </div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        {item.warning}
                                    </div>
                                </div>
                                <div style={{ fontSize: '14px', color: '#dc2626', fontWeight: '500' }}>
                                    HSD: {item.expiryDate}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
