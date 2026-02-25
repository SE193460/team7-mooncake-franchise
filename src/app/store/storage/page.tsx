'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import storeService, { InventoryItem } from '../../../services/storeService';

export default function StoragePage() {
    const [storageItems, setStorageItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStorageData();
    }, []);

    const fetchStorageData = async () => {
        try {
            setLoading(true);
            setError(null);
            const items = await storeService.getInventoryStorage();
            console.log('Loaded inventory items:', items);
            setStorageItems(items);
        } catch (err) {
            console.error('Failed to load storage items:', err);
            setError('Không thể tải dữ liệu kho. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const formatQuantity = (quantity: string) => {
        const num = parseFloat(quantity);
        // Remove unnecessary decimal zeros
        if (num % 1 === 0) {
            return num.toFixed(0); // No decimals if it's a whole number
        }
        return num.toFixed(1); // One decimal if needed
    };

    const formatExpiryDate = (expiryDate: string | null) => {
        if (!expiryDate) return '—';
        try {
            return new Date(expiryDate).toLocaleDateString('vi-VN');
        } catch {
            return expiryDate;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="storage" />

            <main style={{ flex: 1, padding: '24px 32px', backgroundColor: 'var(--main-bg)' }}>
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                        Kho Lưu Trữ
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Các sản phẩm tồn kho tại cửa hàng
                    </p>
                </div>

                {loading ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        backgroundColor: '#fafafa',
                        borderRadius: '12px',
                    }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Đang tải dữ liệu...</p>
                    </div>
                ) : error ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        backgroundColor: '#fee',
                        borderRadius: '12px',
                        color: '#c00',
                    }}>
                        <p>{error}</p>
                        <button 
                            onClick={fetchStorageData}
                            style={{
                                marginTop: '16px',
                                padding: '8px 16px',
                                backgroundColor: 'var(--primary-orange)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Thử lại
                        </button>
                    </div>
                ) : (
                    /* Storage Table */
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
                                        padding: '12px 8px 12px 0',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        width: '80px',
                                    }}
                                >
                                    ID
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 8px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Tên Sản Phẩm
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 8px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Danh Mục
                                </th>
                                <th
                                    style={{
                                        textAlign: 'right',
                                        padding: '12px 8px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Số Lượng
                                </th>
                                <th
                                    style={{
                                        textAlign: 'left',
                                        padding: '12px 8px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Hạn Sử Dụng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {storageItems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ 
                                        padding: '24px', 
                                        textAlign: 'center', 
                                        color: 'var(--text-secondary)',
                                        fontSize: '14px'
                                    }}>
                                        Chưa có sản phẩm trong kho
                                    </td>
                                </tr>
                            ) : (
                                storageItems.map((item) => (
                                    <tr key={item.inventory_item_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '16px 8px 16px 0', fontSize: '14px', color: 'var(--text-primary)' }}>
                                            <span style={{ marginRight: '8px' }}>📦</span>
                                            <span style={{ fontWeight: '500' }}>{item.inventory_item_id}</span>
                                        </td>
                                        <td style={{ padding: '16px 8px', fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
                                            {item.product_name}
                                        </td>
                                        <td style={{ padding: '16px 8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {item.category_name}
                                        </td>
                                        <td style={{ padding: '16px 8px', fontSize: '14px', textAlign: 'right' }}>
                                            <span style={{ 
                                                fontWeight: '600',
                                                color: parseFloat(item.quantity) > 50 ? 'var(--status-green-text)' : 
                                                       parseFloat(item.quantity) > 20 ? 'var(--primary-orange)' : 
                                                       '#dc2626'
                                            }}>
                                                {formatQuantity(item.quantity)}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {formatExpiryDate(item.expiry_date)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                )}
            </main>
        </div>
    );
}
