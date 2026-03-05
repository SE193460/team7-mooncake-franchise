'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    createdDate: string;
    lastLogin: string;
}

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('Tất cả vai trò');

    const [users] = useState<User[]>([
        {
            id: '1',
            username: 'Nguyễn Văn A',
            email: 'store1@franchise.com',
            role: 'Cửa Hàng',
            status: 'Hoạt Động',
            createdDate: '15/06/2025',
            lastLogin: '08/01 16:30',
        },
        {
            id: '2',
            username: 'Trần Thị B',
            email: 'coordinator@franchise.com',
            role: 'Điều Phối',
            status: 'Hoạt Động',
            createdDate: '01/07/2025',
            lastLogin: '08/01 15:15',
        },
        {
            id: '3',
            username: 'Lê Văn C',
            email: 'kitchen@franchise.com',
            role: 'Kitchen',
            status: 'Hoạt Động',
            createdDate: '10/07/2025',
            lastLogin: '08/01 14:00',
        },
        {
            id: '4',
            username: 'Phạm Thị D',
            email: 'manager@franchise.com',
            role: 'Quản Lý',
            status: 'Hoạt Động',
            createdDate: '20/05/2025',
            lastLogin: '08/01 17:00',
        },
        {
            id: '5',
            username: 'Admin User',
            email: 'admin@franchise.com',
            role: 'Quản Trị Viên',
            status: 'Hoạt Động',
            createdDate: '01/01/2025',
            lastLogin: '08/01 15:00',
        },
        {
            id: '6',
            username: 'Hoàng Văn E',
            email: 'store2@franchise.com',
            role: 'Cửa Hàng',
            status: 'Ngưng Hoạt Động',
            createdDate: '01/08/2025',
            lastLogin: '15/12 21:00',
        },
    ]);

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

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'Tất cả vai trò' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="users" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Quản Lý Người Dùng
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Quản lý tài khoản và phân quyền người dùng
                    </p>
                </div>

                {/* Filter Bar */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                    {/* Search */}
                    <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
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
                            placeholder="Tìm kiếm người dùng..."
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

                    {/* Role Filter */}
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        style={{
                            padding: '12px 20px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '10px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            outline: 'none',
                            minWidth: '180px',
                            fontWeight: '500',
                        }}
                    >
                        <option>Tất cả vai trò</option>
                        <option>Cửa Hàng</option>
                        <option>Kitchen</option>
                        <option>Quản Lý</option>
                        <option>Điều Phối</option>
                        <option>Quản Trị Viên</option>
                    </select>
                </div>

                {/* Users Table */}
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
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
                                            Không tìm thấy người dùng nào
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            style={{
                                                borderBottom: index !== filteredUsers.length - 1 ? '1px solid #F3F4F6' : 'none',
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
                                                {user.role}
                                            </td>
                                            <td style={{ padding: '18px 24px' }}>
                                                <span style={{
                                                    ...getStatusBadgeStyle(user.status),
                                                    padding: '6px 12px',
                                                    borderRadius: '16px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    display: 'inline-block',
                                                }}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                                {user.createdDate}
                                            </td>
                                            <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                                {user.lastLogin}
                                            </td>
                                            <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                                                <button
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
