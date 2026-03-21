'use client';

import { FranchiseStore } from '../../../services/adminService';

interface StoresTableProps {
    stores?: FranchiseStore[];
    loading?: boolean;
    error?: string | null;
    onEditClick?: (store: FranchiseStore) => void;
    onDeleteClick?: (store: FranchiseStore) => void;
}

export default function StoresTable({ 
    stores = [], 
    loading = false, 
    error = null,
    onEditClick,
    onDeleteClick,
}: StoresTableProps) {
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
                                CỬA HÀNG
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                ĐỊA CHỈ
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                LIÊN HỆ
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                NGƯỜI PHỤ TRÁCH
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                TRẠNG THÁI
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                THAO TÁC
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '32px 24px', textAlign: 'center', color: '#6B7280' }}>
                                    ⟳ Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '32px 24px', textAlign: 'center', color: '#DC2626' }}>
                                    ❌ {error}
                                </td>
                            </tr>
                        ) : stores.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '32px 24px', textAlign: 'center', color: '#6B7280' }}>
                                    Không có dữ liệu cửa hàng
                                </td>
                            </tr>
                        ) : (
                            stores.map((store, index) => (
                                <tr
                                    key={store.franchise_store_id}
                                    style={{
                                        borderBottom: index !== stores.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px' }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                                📦 {store.store_name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                                {store.store_code}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📍</span>
                                            {store.store_address}
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        <div style={{ marginBottom: '4px' }}>📞 {store.store_phone}</div>
                                        <div>📧 {store.store_email}</div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937' }}>
                                        {store.manager_name}
                                    </td>
                                    <td style={{ padding: '18px 24px', minWidth: '140px' }}>
                                        <span
                                            style={{
                                                ...getStatusBadgeStyle(store.store_status),
                                                padding: '6px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {store.store_status === 'active' ? 'Hoạt Động' : 'Ngưng Hoạt Động'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px 24px', textAlign: 'center', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => onEditClick?.(store)}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: '#F0F9FF',
                                                color: '#0369A1',
                                                border: '1.5px solid #E0F2FE',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                whiteSpace: 'nowrap',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#E0F2FE';
                                                e.currentTarget.style.borderColor = '#0EA5E9';
                                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(3, 105, 161, 0.15)';
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#F0F9FF';
                                                e.currentTarget.style.borderColor = '#E0F2FE';
                                                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            onClick={() => onDeleteClick?.(store)}
                                            disabled={store.store_status !== 'active'}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: store.store_status === 'active' ? '#FEF2F2' : '#F3F4F6',
                                                color: store.store_status === 'active' ? '#DC2626' : '#9CA3AF',
                                                border: store.store_status === 'active' ? '1.5px solid #FECDD3' : '1.5px solid #E5E7EB',
                                                borderRadius: '8px',
                                                cursor: store.store_status === 'active' ? 'pointer' : 'not-allowed',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: store.store_status === 'active' ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                whiteSpace: 'nowrap',
                                                opacity: store.store_status === 'active' ? 1 : 0.6,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (store.store_status === 'active') {
                                                    e.currentTarget.style.backgroundColor = '#FEE2E2';
                                                    e.currentTarget.style.borderColor = '#F87171';
                                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(220, 38, 38, 0.15)';
                                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (store.store_status === 'active') {
                                                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                                                    e.currentTarget.style.borderColor = '#FECDD3';
                                                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }
                                            }}
                                        >
                                            🗑️ Xóa
                                        </button>
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
