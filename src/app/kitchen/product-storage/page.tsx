'use client';

import { useEffect, useState } from "react";
import Sidebar from '../../../components/Sidebar';

// Calendar icon for expiring items
const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// Function to get badge color based on days left
const getDaysLeftColor = (days: number) => {
    if (days <= 7) return { bg: '#fee2e2', text: '#dc2626' };
    if (days <= 14) return { bg: '#fef3c7', text: '#d97706' };
    return { bg: '#dcfce7', text: '#16a34a' };
};

export default function ProductStoragePage() {
    const [inventoryItems, setInventoryItems] = useState<any[]>([]);
    const [expiringItems, setExpiringItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                // Assuming the endpoint for products inventory exists
                const res = await fetch(
                    'https://franchisemooncake.onrender.com/api/centralKitchen/product-inventory',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await res.json();

                if (result.success) {
                    setInventoryItems(result.data || []);
                    setExpiringItems(result.data.expiring_products || []);
                }
            } catch (error) {
                console.error('Error fetching product inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <Sidebar activePage="product-storage" type="kitchen" />

            {/* Main Content */}
            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                        Kho Thành Phẩm
                    </h1>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        Quản lý tồn kho sản phẩm hoàn thiện
                    </p>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                        Đang tải dữ liệu...
                    </div>
                ) : (
                    <>
                        {/* Expiring Items Warning */}
                        {expiringItems.length > 0 && (
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '20px 24px',
                                    marginBottom: '32px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <CalendarIcon />
                                    <span style={{ color: '#d97706', fontWeight: '600', fontSize: '15px' }}>
                                        Sản Phẩm Sắp Hết Hạn ({expiringItems.length})
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {expiringItems.map((item: any) => (
                                        <div
                                            key={item.product_id || item.inventory_item_id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '8px 0',
                                            }}
                                        >
                                            <span style={{ color: '#374151', fontSize: '14px' }}>{item.product_name}</span>
                                            <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                                {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('vi-VN') : 'N/A'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inventory Table */}
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
                                Danh Sách Tồn Kho Thành Phẩm
                            </h2>

                            <div
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                }}
                            >
                                {/* Table Header */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
                                        padding: '16px 24px',
                                        borderBottom: '1px solid #e5e7eb',
                                        backgroundColor: '#fafafa',
                                    }}
                                >
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Sản Phẩm
                                    </span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Số Lượng
                                    </span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Đơn Vị
                                    </span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Hạn Sử Dụng
                                    </span>
                                </div>

                                {/* Table Body */}
                                {inventoryItems.length === 0 ? (
                                    <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                                        Không có dữ liệu tồn kho thành phẩm.
                                    </div>
                                ) : (
                                    inventoryItems.map((item, index) => {
                                        const daysColor = item.days_left ? getDaysLeftColor(item.days_left) : { bg: '#f3f4f6', text: '#6b7280' };
                                        return (
                                            <div
                                                key={item.inventory_item_id}
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
                                                    padding: '16px 24px',
                                                    borderBottom: index < inventoryItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {/* Product Name */}
                                                <div>
                                                    <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>
                                                        {item.product_name}
                                                    </div>
                                                    <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>
                                                        {item.category_name || item.category}
                                                    </div>
                                                </div>

                                                {/* Quantity */}
                                                <div>
                                                    <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                                                        {item.quantity || item.on_hand_qty}
                                                    </span>
                                                </div>

                                                {/* UOM */}
                                                <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                                    {item.uom}
                                                </div>

                                                {/* Expiry Date */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ color: '#1f2937', fontSize: '14px' }}>
                                                        {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('vi-VN') : '—'}
                                                    </span>
                                                    {item.days_left !== undefined && (
                                                        <span
                                                            style={{
                                                                backgroundColor: daysColor.bg,
                                                                color: daysColor.text,
                                                                padding: '2px 8px',
                                                                borderRadius: '10px',
                                                                fontSize: '11px',
                                                                fontWeight: '500',
                                                            }}
                                                        >
                                                            {item.days_left} ngày
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

