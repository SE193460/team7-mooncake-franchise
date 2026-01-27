'use client';

import Link from 'next/link';

interface SidebarProps {
    activePage?: string;
}

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊', href: '/store' },
        { id: 'order', label: 'Đặt Hàng', icon: '🛒', href: '/store/order' },
        { id: 'tracking', label: 'Theo Dõi Đơn', icon: '📍', href: '/store/tracking' },
        { id: 'confirm', label: 'Xác Nhận Nhận Hàng', icon: '✅', href: '/store/confirm' },
    ];

    return (
        <aside
            style={{
                width: '220px',
                minHeight: '100vh',
                backgroundColor: 'var(--sidebar-bg)',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid var(--border-color)',
            }}
        >
            {/* Logo and Brand */}
            <div
                style={{
                    padding: '20px 16px',
                    borderBottom: '1px solid var(--border-color)',
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
                        🥮
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-primary)' }}>
                            Central Kitchen
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cửa hàng</div>
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
                            color: activePage === item.id ? 'white' : 'var(--text-secondary)',
                            backgroundColor: activePage === item.id ? 'var(--sidebar-active)' : 'transparent',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}

                {/* Kho Lưu Trữ Section */}
                <Link
                    href="/store/storage"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        margin: '4px 8px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: activePage === 'storage' ? 'white' : 'var(--text-secondary)',
                        backgroundColor: activePage === 'storage' ? 'var(--sidebar-active)' : 'transparent',
                        fontSize: '14px',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <span>📦</span>
                    <span>Kho Lưu Trữ</span>
                </Link>
            </nav>

            {/* User Info */}
            <div
                style={{
                    padding: '16px',
                    borderTop: '1px solid var(--border-color)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        N
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
                            Nguyễn Văn A
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            store1@franchise.com
                        </div>
                    </div>
                </div>
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    <span>↩</span>
                    <span>Đăng Xuất</span>
                </button>
            </div>
        </aside>
    );
}
