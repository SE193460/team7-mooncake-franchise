'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import authService, { User } from '../services/authService';

interface SidebarProps {
    activePage?: string;
    type?: 'franchise' | 'kitchen' | 'manager' | 'admin';
}

export default function Sidebar({ activePage = 'dashboard', type = 'franchise' }: SidebarProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        
        // Nếu không có username từ localStorage, fetch từ API
        if (!user?.username) {
            authService.getUserProfile().then((profile) => {
                const updatedUser: User = {
                    user_id: profile.user_id,
                    username: profile.username,
                    email: profile.email,
                    role: profile.role,
                    status: profile.status,
                    franchise_store_id: profile.franchise?.franchise_store_id || null,
                    central_kitchen_id: profile.central_kitchen || null,
                };
                setCurrentUser(updatedUser);
                // Cập nhật localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }).catch((error) => {
                console.error('Failed to fetch user profile:', error);
            });
        }
    }, []);

    const franchiseMenuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊', href: '/store' },
        { id: 'order', label: 'Đặt Hàng', icon: '🛒', href: '/store/order' },
        { id: 'tracking', label: 'Theo Dõi Đơn', icon: '🚚', href: '/store/tracking' },
        { id: 'confirm', label: 'Xác Nhận Nhận Hàng', icon: '📦', href: '/store/confirm' },
        { id: 'storage', label: 'Kho Lưu Trữ', icon: '🏪', href: '/store/storage' },
    ];

    const kitchenMenuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊', href: '/kitchen' },
        { id: 'ingredients', label: 'Nguyên Liệu & HSD', icon: '📦', href: '/kitchen/ingredients' },
    ];

    const managerMenuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊', href: '/manager' },
        { id: 'inventory', label: 'Tồn Kho Tổng', icon: '📦', href: '/manager/inventory' },
    ];

    const adminMenuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/admin' },
        { id: 'users', label: 'Quản Lý Users', icon: '👥', href: '/admin/users' },
        { id: 'categories', label: 'Dữ Liệu Danh Mục', icon: '📋', href: '/admin/categories' },
        { id: 'settings', label: 'Cài Đặt Hệ Thống', icon: '⚙️', href: '/admin/settings' },
    ];

    const menuItems = type === 'kitchen' ? kitchenMenuItems : 
                      type === 'manager' ? managerMenuItems : 
                      type === 'admin' ? adminMenuItems : 
                      franchiseMenuItems;
    const homeHref = type === 'kitchen' ? '/kitchen' : 
                     type === 'manager' ? '/manager' : 
                     type === 'admin' ? '/admin' : 
                     '/store';
    const profileHref = '/profile'; // Profile chung cho tất cả roles
    const brandTitle = type === 'kitchen' ? 'Mooncake Kitchen' : 
                       type === 'manager' ? 'Mooncake Manager' : 
                       type === 'admin' ? 'Admin Panel' : 
                       'Mooncake Franchise';
    const brandSubtitle = type === 'kitchen' ? 'Bếp Trung Tâm' : 
                          type === 'manager' ? 'Quản Lý' : 
                          type === 'admin' ? 'Quản Trị Viên' : 
                          'Cửa hàng';

    return (
        <aside
            style={{
                width: '280px',
                height: '100vh',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--sidebar-bg)',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid var(--border-color)',
                overflowY: 'auto',
            }}
        >
            {/* Logo and Brand */}
            <div
                style={{
                    padding: '24px 20px',
                    borderBottom: '1px solid var(--border-color)',
                    background: 'linear-gradient(180deg, var(--sidebar-header-bg) 0%, var(--sidebar-bg) 100%)',
                }}
            >
                <Link href={homeHref} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{ flexShrink: 0, width: '44px', height: '44px', position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                        <Image
                            src="/logo.png"
                            alt={brandTitle}
                            fill
                            sizes="44px"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '18px', color: 'var(--text-white)' }}>
                            {brandTitle}
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>{brandSubtitle}</div>
                    </div>
                </Link>
            </div>

            {/* Navigation Menu */}
            <nav style={{ flex: 1, padding: '20px 0' }}>
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            padding: '14px 20px',
                            margin: '4px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: activePage === item.id ? 'var(--text-white)' : 'rgba(255, 255, 255, 0.9)',
                            backgroundColor: activePage === item.id ? 'var(--sidebar-active)' : 'transparent',
                            fontSize: '15px',
                            transition: 'all 0.2s ease',
                            fontWeight: activePage === item.id ? '500' : '400',
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            {/* User Info */}
            <div
                style={{
                    padding: '20px',
                    borderTop: '1px solid var(--border-color)',
                }}
            >
                <Link 
                    href={profileHref}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        marginBottom: '14px',
                        textDecoration: 'none',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-white)' }}>
                            {currentUser?.username || 'User'}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                            {currentUser?.email || ''}
                        </div>
                    </div>
                </Link>
                <button
                    onClick={() => authService.logout()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        border: 'none',
                        background: 'transparent',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '100%',
                        borderRadius: '6px',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <span>🚪</span>
                    <span>Đăng Xuất</span>
                </button>
            </div>
        </aside>
    );
}
