'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

interface DashboardStats {
    activeUsers: number;
    pendingOrders: number;
    systemStatus: string;
    alerts: number;
}

interface RecentUser {
    id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        activeUsers: 5,
        pendingOrders: 13,
        systemStatus: 'Hoạt động',
        alerts: 0,
    });

    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([
        {
            id: '1',
            username: 'Nguyễn Văn A',
            email: 'store1@franchise.com',
            role: 'Cửa Hàng',
            status: 'Hoạt Động',
            lastLogin: '08/01 16:30',
        },
        {
            id: '2',
            username: 'Trần Thị B',
            email: 'coordinator@franchise.com',
            role: 'Điều Phối',
            status: 'Hoạt Động',
            lastLogin: '08/01 15:15',
        },
        {
            id: '3',
            username: 'Lê Văn C',
            email: 'kitchen@franchise.com',
            role: 'Kitchen',
            status: 'Hoạt Động',
            lastLogin: '08/01 14:00',
        },
        {
            id: '4',
            username: 'Phạm Thị D',
            email: 'manager@franchise.com',
            role: 'Quản Lý',
            status: 'Hoạt Động',
            lastLogin: '08/01 17:00',
        },
    ]);

    const getStatusBadgeStyle = (status: string) => {
        if (status === 'Hoạt Động' || status === 'Hoạt động') {
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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="dashboard" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Quản Trị Hệ Thống
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Quản lý người dùng và các đặt hệ thống bánh Trung  Thu
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                    {/* Active Users Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Người Dùng Hoạt Động</span>
                            <span style={{ fontSize: '24px' }}>👥</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.activeUsers}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            trong tổng 6 người
                        </div>
                    </div>

                    {/* Pending Orders Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Dữ Liệu Chủ</span>
                            <span style={{ fontSize: '24px' }}>📊</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.pendingOrders}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Sản phẩm, cửa hàng...
                        </div>
                    </div>

                    {/* System Status Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Trạng Thái Hệ Thống</span>
                            <span style={{ fontSize: '24px' }}>⚙️</span>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669', marginBottom: '4px' }}>
                            {stats.systemStatus}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Tất cả dịch vụ bình thường
                        </div>
                    </div>

                    {/* Alerts Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Báo Mật</span>
                            <span style={{ fontSize: '24px' }}>🔒</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.alerts}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Không có vấn đề
                        </div>
                    </div>
                </div>

                {/* Recent Users Table */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '24px',
                        borderBottom: '1px solid #E5E7EB',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: 0 }}>
                            Người Dùng Hệ Thống
                        </h2>
                        <button
                            onClick={() => window.location.href = '/admin/users'}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'transparent',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: '#1F2937',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#F9FAFB';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            Quản lý người dùng →
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#F9FAFB' }}>
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
                                        ĐĂNG NHẬP CUỐI
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        style={{
                                            borderBottom: index !== recentUsers.length - 1 ? '1px solid #F3F4F6' : 'none',
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
                                            {user.lastLogin}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
