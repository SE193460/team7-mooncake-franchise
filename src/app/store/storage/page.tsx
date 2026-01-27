'use client';

import Sidebar from '../../../components/Sidebar';

interface StorageItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    expiryDate: string;
}

export default function StoragePage() {
    const storageItems: StorageItem[] = [
        {
            id: 'SP-001',
            name: 'Bánh Nướng Trà Xanh',
            category: '',
            quantity: 100,
            expiryDate: '05/01/2026',
        },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="storage" />

            <main style={{ flex: 1, padding: '24px 32px', backgroundColor: '#fff' }}>
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                        Kho Lưu Trữ
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Các bánh tồn kho ở cửa hàng
                    </p>
                </div>

                {/* Storage Table */}
                <div
                    style={{
                        backgroundColor: '#fafafa',
                        borderRadius: '12px',
                        padding: '24px',
                    }}
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Sản Phẩm
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Danh Mục
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Số Lượng
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Hạn Sử Dụng
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Chỉnh Sửa
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {storageItems.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '16px 0', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--primary-orange)', marginRight: '8px' }}>🔗</span>
                                        {item.id}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {item.name}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {item.quantity}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {item.expiryDate}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--text-secondary)',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                        >
                                            ···
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
