'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

interface ProductRow {
    id: number;
    product: string;
    quantity: number;
    unit: string;
}

export default function CreateOrderPage() {
    const [products, setProducts] = useState<ProductRow[]>([
        { id: 1, product: '', quantity: 0, unit: '' },
    ]);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');

    const addProduct = () => {
        setProducts([
            ...products,
            { id: products.length + 1, product: '', quantity: 0, unit: '' },
        ]);
    };

    const removeProduct = (id: number) => {
        if (products.length > 1) {
            setProducts(products.filter((p) => p.id !== id));
        }
    };

    const updateProduct = (id: number, field: keyof ProductRow, value: string | number) => {
        setProducts(
            products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="order" />

            <main style={{ flex: 1, padding: '24px 32px', backgroundColor: '#fff' }}>
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
                        Tạo Đơn Hàng Mới
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Đặt bánh Trung Thu từ kho trung tâm
                    </p>
                </div>

                {/* Product List Section */}
                <div
                    style={{
                        backgroundColor: '#fafafa',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '24px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '20px',
                        }}
                    >
                        <span
                            style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-orange)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                            }}
                        >
                            🥮
                        </span>
                        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Danh Sách Bánh Trung Thu</h2>
                    </div>

                    {/* Product Rows */}
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 120px 80px 40px',
                                gap: '16px',
                                marginBottom: '16px',
                                alignItems: 'end',
                            }}
                        >
                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '6px',
                                    }}
                                >
                                    Sản phẩm {index + 1}
                                </label>
                                <select
                                    value={product.product}
                                    onChange={(e) => updateProduct(product.id, 'product', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: 'white',
                                        color: product.product ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    }}
                                >
                                    <option value="">Chọn loại bánh</option>
                                    <option value="banh-deo">Bánh dẻo</option>
                                    <option value="banh-nuong">Bánh nướng</option>
                                    <option value="banh-thap-cam">Bánh thập cẩm</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '6px',
                                    }}
                                >
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    value={product.quantity || ''}
                                    onChange={(e) =>
                                        updateProduct(product.id, 'quantity', parseInt(e.target.value) || 0)
                                    }
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        fontSize: '13px',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '6px',
                                    }}
                                >
                                    Đơn vị
                                </label>
                                <input
                                    type="text"
                                    value={product.unit}
                                    onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                                    placeholder=""
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>

                            <button
                                onClick={() => removeProduct(product.id)}
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                            >
                                🗑
                            </button>
                        </div>
                    ))}

                    {/* Add Product Button */}
                    <button
                        onClick={addProduct}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '12px',
                            border: '1px dashed var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            color: 'var(--text-secondary)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            marginTop: '8px',
                        }}
                    >
                        <span>+</span>
                        <span>Thêm Sản Phẩm</span>
                    </button>
                </div>

                {/* Delivery Information Section */}
                <div
                    style={{
                        backgroundColor: '#fafafa',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '24px',
                    }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
                        Thông Tin Giao Hàng
                    </h2>

                    <div style={{ marginBottom: '16px' }}>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                marginBottom: '6px',
                            }}
                        >
                            Ngày giao hàng mong muốn
                        </label>
                        <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                fontSize: '14px',
                            }}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                marginBottom: '6px',
                            }}
                        >
                            Ghi chú thêm
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                resize: 'vertical',
                            }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        style={{
                            padding: '10px 24px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 24px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: 'var(--primary-orange)',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                        }}
                    >
                        <span>🛒</span>
                        <span>Gửi Đơn Hàng</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
