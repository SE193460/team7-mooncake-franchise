'use client';

import { CentralKitchen } from '../../../services/adminService';

interface KitchensTableProps {
    kitchens?: CentralKitchen[];
    loading?: boolean;
    error?: string | null;
}

export default function KitchensTable({ 
    kitchens = [], 
    loading = false, 
    error = null,
}: KitchensTableProps) {
    const getStatusBadgeStyle = (status: string) => ({
        backgroundColor: status === 'active' ? '#D1FAE5' : '#FEE2E2',
        color: status === 'active' ? '#059669' : '#DC2626',
    });

    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
            }}
        >
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                        <tr>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                BẾP
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                ĐỊA CHỈ
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                CÔNG SUẤT
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                TRẠNG THÁI
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '32px 24px', textAlign: 'center', color: '#6B7280' }}>
                                    ⟳ Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '32px 24px', textAlign: 'center', color: '#DC2626' }}>
                                    ❌ {error}
                                </td>
                            </tr>
                        ) : kitchens.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '32px 24px', textAlign: 'center', color: '#6B7280' }}>
                                    Không có dữ liệu bếp trung tâm
                                </td>
                            </tr>
                        ) : (
                            kitchens.map((kitchen, index) => (
                                <tr
                                    key={kitchen.central_kitchen_id}
                                    style={{
                                        borderBottom: index !== kitchens.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px' }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                                🍳 {kitchen.kitchen_name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                                {kitchen.kitchen_code}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📍</span>
                                            {kitchen.kitchen_address}
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937' }}>
                                        {kitchen.capacity} hộp/ngày
                                    </td>
                                    <td style={{ padding: '18px 24px', minWidth: '140px' }}>
                                        <span
                                            style={{
                                                ...getStatusBadgeStyle(kitchen.kitchen_status),
                                                padding: '6px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {kitchen.kitchen_status === 'active' ? 'Hoạt Động' : 'Ngưng Hoạt Động'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
