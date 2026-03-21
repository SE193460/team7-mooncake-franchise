'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import adminService, { AdminUser, DashboardResponse } from '../../services/adminService';

interface DashboardStats {
    activeUsers: number;
    totalUsers: number;
    products: number;
    stores: number;
    centralKitchens: number;
    systemStatus: string;
    alerts: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        activeUsers: 0,
        totalUsers: 0,
        products: 0,
        stores: 0,
        centralKitchens: 0,
        systemStatus: 'Hoạt động',
        alerts: 0,
    });

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch dashboard data từ API
    const fetchDashboard = async () => {
        const toastId = toast.loading('Đang tải dữ liệu dashboard...');
        try {
            setLoading(true);
            const data = await adminService.getDashboard();
            
            // Update stats
            setStats({
                activeUsers: data.users.active,
                totalUsers: data.users.total,
                products: data.contents.products,
                stores: data.contents.stores,
                centralKitchens: data.contents.central_kitchens,
                systemStatus: 'Hoạt động',
                alerts: 0,
            });

            // Update users list
            setUsers(data.users.list);
            
            // Show success notification
            toast.dismiss(toastId);
            toast.success(`✓ Tải dữ liệu thành công! Tổng ${data.users.total} người dùng`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            toast.dismiss(toastId);
            toast.error('❌ Lỗi khi tải dữ liệu dashboard. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Load data khi component mount
    useEffect(() => {
        fetchDashboard();
    }, []);

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

    const getRoleLabel = (role: string) => {
        const roleMap: Record<string, string> = {
            admin: 'Admin',
            franchise_staff: 'Cửa Hàng',
            kitchen_staff: 'Nhân Viên Bếp',
            kitchen_manager: 'Quản Lý Bếp',
            user: 'Quản Lý',
        };
        return roleMap[role] || role;
    };

    const getStatusLabel = (status: string) => {
        return status === 'active' ? 'Hoạt Động' : 'Ngưng Hoạt Động';
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'Chưa đăng nhập';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        } catch {
            return dateStr;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="dashboard" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                            Quản Trị Hệ Thống
                        </h1>
                        <p style={{ fontSize: '15px', color: '#6B7280' }}>
                            Quản lý người dùng và các đặt hệ thống bánh Trung  Thu
                        </p>
                    </div>
                    <button
                        onClick={fetchDashboard}
                        disabled={loading}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: loading ? '#D1D5DB' : '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563EB')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#3B82F6')}
                    >
                        {loading ? '⟳ Đang tải...' : '↻ Tải lại'}
                    </button>
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
                            trong tổng {stats.totalUsers} người
                        </div>
                    </div>

                    {/* Products Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Sản Phẩm</span>
                            <span style={{ fontSize: '24px' }}>🍰</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.products}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Tổng số loại sản phẩm
                        </div>
                    </div>

                    {/* Stores Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Cửa Hàng</span>
                            <span style={{ fontSize: '24px' }}>🏪</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.stores}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Cửa hàng Franchise
                        </div>
                    </div>

                    {/* Kitchen Card */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Bếp Trung Tâm</span>
                            <span style={{ fontSize: '24px' }}>🍳</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>
                            {stats.centralKitchens}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            Bếp trong hệ thống
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
                        gap: '16px',
                        flexWrap: 'wrap',
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

                    {/* Search and Filter */}
                    <div style={{
                        padding: '16px 24px',
                        borderBottom: '1px solid #E5E7EB',
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                    }}>
                        <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                            Hiển thị {users.length} người dùng hoạt động
                        </p>
                    </div>

                    {loading ? (
                        <div style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: '#6B7280',
                        }}>
                            Đang tải...
                        </div>
                    ) : users.length === 0 ? (
                        <div style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: '#6B7280',
                        }}>
                            Không tìm thấy người dùng nào
                        </div>
                    ) : (
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
                                    {users.map((user, index) => (
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
                                                {getRoleLabel(user.role)}
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
                                                    {getStatusLabel(user.status)}
                                                </span>
                                            </td>
                                            <td style={{ padding: '18px 24px', fontSize: '14px', color: '#6B7280' }}>
                                                {formatDate(user.last_login_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
