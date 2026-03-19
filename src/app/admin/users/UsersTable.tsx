'use client';

import { AdminUser } from './types';

interface UsersTableProps {
    users: AdminUser[];
    loading: boolean;
    error: string | null;
    openMenuId: string | null;
    onMenuToggle: (userId: string) => void;
    onEditClick: (user: AdminUser) => void;
    onResetPasswordClick: (user: AdminUser) => void;
    onDisableClick: (user: AdminUser) => void;
}

export default function UsersTable({
    users,
    loading,
    error,
    openMenuId,
    onMenuToggle,
    onEditClick,
    onResetPasswordClick,
    onDisableClick,
}: UsersTableProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadgeStyle = (status: string) => {
        if (status === 'active') {
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
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                HỌ TÊN
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                EMAIL
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                VAI TRÒ
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                TRẠNG THÁI
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                NGÀY TẠO
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                ĐĂNG NHẬP CUỐI
                            </th>
                            <th style={{ padding: '14px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                THAO TÁC
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#DC2626', fontSize: '14px' }}>
                                    {error}
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
                                    Không tìm thấy người dùng nào
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr
                                    key={user.user_id}
                                    style={{
                                        borderBottom: index !== users.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '500' }}>
                                        {user.username}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        {user.email}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        {user.role_label || user.role}
                                    </td>
                                    <td style={{ padding: '18px 24px' }}>
                                        <span
                                            style={{
                                                ...getStatusBadgeStyle(user.status),
                                                padding: '6px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {user.status === 'active' ? 'Hoạt Động' : 'Ngưng Hoạt Động'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        {formatDate(user.created_at)}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                        {formatDate(user.last_login_at)}
                                    </td>
                                    <td style={{ padding: '18px 24px' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onMenuToggle(user.user_id);
                                                }}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '18px',
                                                    transition: 'background-color 0.2s',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Thao tác"
                                            >
                                                ⋯
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openMenuId === user.user_id && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        right: 0,
                                                        backgroundColor: 'white',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                        zIndex: 10,
                                                        minWidth: '180px',
                                                        marginTop: '4px',
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onEditClick(user);
                                                            onMenuToggle(user.user_id);
                                                        }}
                                                        style={{
                                                            display: 'block',
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: '#1F2937',
                                                            borderBottom: '1px solid #F3F4F6',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        Chỉnh sửa
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onResetPasswordClick(user);
                                                            onMenuToggle(user.user_id);
                                                        }}
                                                        style={{
                                                            display: 'block',
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: '#1F2937',
                                                            borderBottom: '1px solid #F3F4F6',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        Đặt lại mật khẩu
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDisableClick(user);
                                                            onMenuToggle(user.user_id);
                                                        }}
                                                        style={{
                                                            display: 'block',
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            color: '#DC2626',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        Vô hiệu hóa
                                                    </button>
                                                </div>
                                            )}
                                        </div>
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
