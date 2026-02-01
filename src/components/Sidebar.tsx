'use client';

import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
    activePage?: string;
}

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊', href: '/store' },
        { id: 'order', label: 'Đặt Hàng', icon: '🛒', href: '/store/order' },
        { id: 'tracking', label: 'Theo Dõi Đơn', icon: '🚚', href: '/store/tracking' },
        { id: 'confirm', label: 'Xác Nhận Nhận Hàng', icon: '📦', href: '/store/confirm' },
        { id: 'storage', label: 'Kho Lưu Trữ', icon: '🏪', href: '/store/storage' },
    ];

    return (
        <aside
            style={{
                width: '280px',
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
                    padding: '24px 20px',
                    borderBottom: '1px solid var(--border-color)',
                    background: 'linear-gradient(180deg, var(--sidebar-header-bg) 0%, var(--sidebar-bg) 100%)',
                }}
            >
                <Link href="/store" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div style={{ flexShrink: 0, width: '44px', height: '44px', position: 'relative', borderRadius: '6px', overflow: 'hidden' }}>
                        <Image
                            src="/logo.png"
                            alt="Mooncake Franchise"
                            fill
                            sizes="44px"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '18px', color: 'var(--text-white)' }}>
                            Mooncake Franchise
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>Cửa hàng</div>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
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
                        N
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-white)' }}>
                            Nguyễn Văn A
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                            store1@franchise.com
                        </div>
                    </div>
                </div>
                <button
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
                    <span>↩</span>
                    <span>Đăng Xuất</span>
                </button>
            </div>
        </aside>
    );
}
