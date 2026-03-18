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

export default function IngredientsPage() {
    const [inventoryItems, setInventoryItems] = useState<any[]>([]);
    const [expiringItems, setExpiringItems] = useState<any[]>([]);

    const formatDate = (date: string | null) => {
        if (!date) return '—';
        try {
            return new Date(date).toLocaleDateString('vi-VN');
        } catch {
            return date;
        }
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/central-kitchen/materials-inventory`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const result = await res.json();

                if (result.success) {
                    setInventoryItems(result.data.inventory_items);
                    setExpiringItems(result.data.expiring_materials);
                }
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <Sidebar activePage="ingredients" type="kitchen" />

            {/* Main Content */}
            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                        Quản Lý Nguyên Vật Liệu
                    </h1>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        Theo dõi tồn kho và hạn sử dụng
                    </p>
                </div>

                {/* Expiring Items Warning */}
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
                            Sắp Hết Hạn ({expiringItems.length})
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {expiringItems.map((item) => (
                            <div
                                key={item.material_id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 0',
                                }}
                            >
                                <span style={{ color: '#374151', fontSize: '14px' }}>{item.material_name}</span>
                                <span style={{ color: '#6b7280', fontSize: '14px' }}>{new Date(item.expiry_date).toLocaleDateString('vi-VN')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inventory Table */}
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
                        Danh Sách Tồn Kho
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
                                gridTemplateColumns: '2fr 1.4fr 1.4fr 1.4fr',
                                padding: '16px 24px',
                                borderBottom: '1px solid #e5e7eb',
                                backgroundColor: '#fafafa',
                            }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Sản Phẩm
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Tồn Kho
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Hạn Sử Dụng
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Cập Nhật Lần Cuối
                            </span>
                        </div>

                        {/* Table Body */}
                        {inventoryItems.map((item, index) => {
                            const daysColor = getDaysLeftColor(item.days_left);
                            return (
                                <div
                                    key={item.inventory_item_id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1.4fr 1.4fr 1.4fr',
                                        padding: '16px 24px',
                                        borderBottom: index < inventoryItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Product Name */}
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>
                                            {item.material_name}
                                        </div>
                                        <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                                            {item.on_hand_qty} {item.uom}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: '#dcfce7',
                                                color: '#16a34a',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                fontSize: '11px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Đủ
                                        </span>
                                    </div>

                                    {/* Expiry Date */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#1f2937', fontSize: '14px' }}>
                                            {new Date(item.expiry_date).toLocaleDateString('vi-VN')}
                                        </span>
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
                                    </div>

                                    {/* Minimum Stock */}
                                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                        {formatDate(item.last_updated_at)}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
