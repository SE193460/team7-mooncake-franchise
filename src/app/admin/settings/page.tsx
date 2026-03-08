'use client';

import Sidebar from '../../../components/Sidebar';

export default function AdminSettingsPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="settings" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Cài Đặt Hệ Thống
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Quản lý cấu hình và thiết lập hệ thống
                    </p>
                </div>

                {/* Coming Soon Message */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    padding: '60px',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚙️</div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>
                        Trang Đang Phát Triển
                    </h2>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Các tính năng cài đặt hệ thống sẽ được cập nhật trong phiên bản tiếp theo
                    </p>
                </div>
            </main>
        </div>
    );
}
