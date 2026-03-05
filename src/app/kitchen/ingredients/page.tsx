'use client';

import Sidebar from '../../../components/Sidebar';

// Calendar icon for expiring items
const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

// Plus icon for import button
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

// Mock data for expiring items
const expiringItems = [
    { id: 1, name: 'Bánh Nướng Hạt Sen', expiryDate: '25/1/2026' },
    { id: 2, name: 'Bánh Trung Thu Jambon', expiryDate: '20/1/2026' },
    { id: 3, name: 'Bánh Nướng Vi Cá', expiryDate: '18/1/2026' },
];

// Mock data for inventory list
const inventoryItems = [
    {
        id: 1,
        name: 'Bánh Trung Thu Thập Cẩm',
        category: 'Bánh Nướng',
        stock: 500,
        unit: 'hộp',
        minStock: 200,
        expiryDate: '15/2/2026',
        daysLeft: 28,
    },
    {
        id: 2,
        name: 'Bánh Dẻo Đậu Xanh',
        category: 'Bánh Dẻo',
        stock: 150,
        unit: 'hộp',
        minStock: 100,
        expiryDate: '10/2/2026',
        daysLeft: 23,
    },
    {
        id: 3,
        name: 'Bánh Nướng Trà Xanh',
        category: 'Bánh Nướng',
        stock: 80,
        unit: 'hộp',
        minStock: 50,
        expiryDate: '20/2/2026',
        daysLeft: 33,
    },
    {
        id: 4,
        name: 'Bánh Dẻo Sữa Dừa',
        category: 'Bánh Dẻo',
        stock: 200,
        unit: 'hộp',
        minStock: 100,
        expiryDate: '8/2/2026',
        daysLeft: 21,
    },
    {
        id: 5,
        name: 'Bánh Nướng Hạt Sen',
        category: 'Bánh Nướng',
        stock: 45,
        unit: 'hộp',
        minStock: 40,
        expiryDate: '25/1/2026',
        daysLeft: 7,
    },
    {
        id: 6,
        name: 'Bánh Trung Thu Jambon',
        category: 'Bánh Mặn',
        stock: 30,
        unit: 'hộp',
        minStock: 25,
        expiryDate: '20/1/2026',
        daysLeft: 2,
    },
    {
        id: 7,
        name: 'Bánh Dẻo Khoai Môn',
        category: 'Bánh Dẻo',
        stock: 120,
        unit: 'hộp',
        minStock: 80,
        expiryDate: '12/2/2026',
        daysLeft: 25,
    },
    {
        id: 8,
        name: 'Bánh Nướng Vi Cá',
        category: 'Bánh Cao Cấp',
        stock: 20,
        unit: 'hộp',
        minStock: 15,
        expiryDate: '18/1/2026',
        daysLeft: 0,
    },
];

// Function to get badge color based on days left
const getDaysLeftColor = (days: number) => {
    if (days <= 7) return { bg: '#fee2e2', text: '#dc2626' };
    if (days <= 14) return { bg: '#fef3c7', text: '#d97706' };
    return { bg: '#dcfce7', text: '#16a34a' };
};

export default function IngredientsPage() {
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
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 0',
                                }}
                            >
                                <span style={{ color: '#374151', fontSize: '14px' }}>{item.name}</span>
                                <span style={{ color: '#6b7280', fontSize: '14px' }}>{item.expiryDate}</span>
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
                                gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr',
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
                                Mức Tối Thiểu
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Hạn Sử Dụng
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
                                Thao Tác
                            </span>
                        </div>

                        {/* Table Body */}
                        {inventoryItems.map((item, index) => {
                            const daysColor = getDaysLeftColor(item.daysLeft);
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1fr',
                                        padding: '16px 24px',
                                        borderBottom: index < inventoryItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Product Name */}
                                    <div>
                                        <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '14px' }}>
                                            {item.name}
                                        </div>
                                        <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '2px' }}>
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#1f2937', fontSize: '14px', fontWeight: '500' }}>
                                            {item.stock} {item.unit}
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

                                    {/* Minimum Stock */}
                                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                        {item.minStock} {item.unit}
                                    </div>

                                    {/* Expiry Date */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#1f2937', fontSize: '14px' }}>
                                            {item.expiryDate}
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
                                            {item.daysLeft} ngày
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ textAlign: 'right' }}>
                                        <button
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '8px 16px',
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                color: '#374151',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'white';
                                                e.currentTarget.style.borderColor = '#e5e7eb';
                                            }}
                                        >
                                            <PlusIcon />
                                            Nhập Kho
                                        </button>
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
