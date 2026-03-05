'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

interface Category {
    id: string;
    code: string;
    name: string;
    type: string;
    status: string;
}

export default function AdminCategoriesPage() {
    const [activeTab, setActiveTab] = useState('mooncakes');
    const [searchQuery, setSearchQuery] = useState('');

    const mooncakes = [
        { id: '1', code: 'MC-001', name: 'Bánh Trung Thu Thập Cẩm', type: 'Bánh Trung Thu', status: 'Hoạt Động' },
        { id: '2', code: 'MC-002', name: 'Bánh Dẻo Đậu Xanh', type: 'Bánh Trung Thu', status: 'Hoạt Động' },
        { id: '3', code: 'MC-003', name: 'Bánh Nướng Trà Xanh', type: 'Bánh Trung Thu', status: 'Hoạt Động' },
        { id: '4', code: 'MC-004', name: 'Bánh Dẻo Sữa Dừa', type: 'Bánh Trung Thu', status: 'Hoạt Động' },
        { id: '5', code: 'MC-005', name: 'Bánh Nướng Hạt Sen', type: 'Bánh Trung Thu', status: 'Hoạt Động' },
    ];

    const categories = [
        { id: '1', code: 'CAT-001', name: 'Bánh Nướng', type: 'Danh Mục', status: 'Hoạt Động' },
        { id: '2', code: 'CAT-002', name: 'Bánh Dẻo', type: 'Danh Mục', status: 'Hoạt Động' },
        { id: '3', code: 'CAT-003', name: 'Bánh Cao Cấp', type: 'Danh Mục', status: 'Hoạt Động' },
    ];

    const stores = [
        { id: '1', code: 'STR-001', name: 'Chi nhánh Quận 1', type: 'Cửa Hàng', status: 'Hoạt Động' },
        { id: '2', code: 'STR-002', name: 'Chi nhánh Quận 3', type: 'Cửa Hàng', status: 'Hoạt Động' },
        { id: '3', code: 'STR-003', name: 'Chi nhánh Quận 7', type: 'Cửa Hàng', status: 'Hoạt Động' },
    ];

    const orders = [
        { id: '1', code: 'ORD-001', name: 'Đơn Vị', type: 'Đơn Vị', status: 'Hoạt Động' },
    ];

    const getCurrentData = () => {
        switch (activeTab) {
            case 'mooncakes': return mooncakes;
            case 'categories': return categories;
            case 'stores': return stores;
            case 'orders': return orders;
            default: return mooncakes;
        }
    };

    const getStatusBadgeStyle = (status: string) => {
        if (status === 'Hoạt Động') {
            return {
                backgroundColor: '#D1FAE5',
                color: '#059669',
            };
        }
        return {
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
        };
    };

    const tabs = [
        { id: 'mooncakes', label: 'Bánh Trung Thu', icon: '🥮' },
        { id: 'categories', label: 'Danh Mục', icon: '📂' },
        { id: 'stores', label: 'Cửa Hàng', icon: '🏪' },
        { id: 'orders', label: 'Đơn Vị', icon: '📦' },
    ];

    const filteredData = getCurrentData().filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="categories" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Dữ Liệu Chủ
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Quản lý bánh Trung Thu, danh mục, cửa hàng và đơn vị
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #E5E7EB' }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid #FF6B35' : '2px solid transparent',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: activeTab === tab.id ? '600' : '500',
                                color: activeTab === tab.id ? '#FF6B35' : '#6B7280',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '-2px',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = '#1F2937';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = '#6B7280';
                                }
                            }}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div style={{ marginBottom: '24px', position: 'relative', maxWidth: '400px' }}>
                    <span style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        opacity: 0.4,
                    }}>🔍</span>
                    <input
                        type="text"
                        placeholder={`Tìm kiếm ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 48px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'all 0.2s',
                            backgroundColor: 'white',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#FF6B35';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#E5E7EB';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Data Table */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                                <tr>
                                    <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        MÃ
                                    </th>
                                    <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        TÊN
                                    </th>
                                    <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        TRẠNG THÁI
                                    </th>
                                    <th style={{ padding: '14px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        THAO TÁC
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
                                            Không tìm thấy dữ liệu
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            style={{
                                                borderBottom: index !== filteredData.length - 1 ? '1px solid #F3F4F6' : 'none',
                                                transition: 'background-color 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '500' }}>
                                                {item.code}
                                            </td>
                                            <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937' }}>
                                                {item.name}
                                            </td>
                                            <td style={{ padding: '18px 24px' }}>
                                                <span style={{
                                                    ...getStatusBadgeStyle(item.status),
                                                    padding: '6px 12px',
                                                    borderRadius: '16px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    display: 'inline-block',
                                                }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                                <button
                                                    style={{
                                                        padding: '6px 16px',
                                                        backgroundColor: 'transparent',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        fontWeight: '500',
                                                        color: '#1F2937',
                                                        transition: 'all 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#F3F4F6';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    Chỉnh sửa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
