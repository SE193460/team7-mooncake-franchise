'use client';

import Link from 'next/link';

interface KitchenSidebarProps {
    activePage?: string;
}

export default function KitchenSidebar({ activePage = 'dashboard' }: KitchenSidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/kitchen' },
        { id: 'new-orders', label: 'Đơn Hàng Mới', icon: '📋', href: '/kitchen/orders' },
        { id: 'update-status', label: 'Cập Nhật Trạng Thái', icon: '🔄', href: '/kitchen/status' },
        { id: 'ingredients', label: 'Nguyên Liệu & Hạn SD', icon: '📦', href: '/kitchen/ingredients' },
    ];

    return (
        <aside
            style={{
                width: '220px',
                minHeight: '100vh',
                backgroundColor: '#3d3d3d',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Logo and Brand */}
            <div
                style={{
                    padding: '20px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px',
                        }}
                    >
                        🔄
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: 'white' }}>
                            Central Kitchen
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                            Bếp Trung Tâm
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav style={{ flex: 1, padding: '16px 0' }}>
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            margin: '4px 8px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: activePage === item.id ? 'white' : 'rgba(255,255,255,0.7)',
                            backgroundColor: activePage === item.id ? 'var(--primary-orange)' : 'transparent',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Info */}
            <div
                style={{
                    padding: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        L
                    </div>
                    <div>
                        <div style={{ fontWeight: '500', fontSize: '14px', color: 'white' }}>
                            Lê Văn C
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                            kitchen@franchise.com
                        </div>
                    </div>
                </div>
                <Link
                    href="/auth/login"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <span>↪</span>
                    <span>Đăng Xuất</span>
                </Link>
            </div>
        </aside>
    );
}
