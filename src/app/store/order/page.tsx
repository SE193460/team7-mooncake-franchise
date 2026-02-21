'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import storeService, { Product } from '../../../services/storeService';

interface ProductRow {
    id: number;
    productId: string;
    product: string;
    quantity: number;
    unit: string;
}

export default function CreateOrderPage() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductRow[]>([
        { id: 1, productId: '', product: '', quantity: 0, unit: '' },
    ]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(true);

    // Fetch available products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const productList = await storeService.getProducts();
                console.log('Loaded products:', productList);
                setAvailableProducts(productList);
            } catch (err) {
                console.error('Failed to load products:', err);
                // Don't show error to user, just log it
                // Will fall back to showing "No products available"
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = () => {
        setProducts([
            ...products,
            { id: products.length + 1, productId: '', product: '', quantity: 0, unit: '' },
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

    const handleSubmit = async () => {
        // Validation
        if (!deliveryDate) {
            setError('Vui lòng chọn ngày giao hàng');
            return;
        }

        const invalidProducts = products.filter(p => !p.product || !p.quantity || !p.unit || !p.productId);
        if (invalidProducts.length > 0) {
            setError('Vui lòng điền đầy đủ thông tin cho tất cả sản phẩm (phải chọn loại bánh từ dropdown)');
            return;
        }

        // Validate quantities
        const zeroQuantity = products.filter(p => p.quantity <= 0);
        if (zeroQuantity.length > 0) {
            setError('Số lượng phải lớn hơn 0');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const orderData = {
                products: products.map(p => ({
                    productId: p.productId,
                    productName: p.product,
                    quantity: p.quantity,
                    unit: p.unit,
                })),
                deliveryDate,
                notes,
            };

            console.log('Order data before sending:', JSON.stringify(orderData, null, 2));
            const response = await storeService.createOrder(orderData);
            console.log('Order creation response:', response);
            
            // Success - redirect to confirm page or dashboard
            alert('Đơn hàng đã được tạo thành công!');
            router.push('/store/confirm');
        } catch (err: any) {
            console.error('Error creating order:', err);
            
            // Extract error message from different possible structures
            let errorMessage = 'Không thể tạo đơn hàng. Vui lòng thử lại.';
            
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.error_code) {
                errorMessage = `Lỗi: ${err.response.data.error_code}`;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            console.log('Setting error message:', errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/store');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="order" />

            <main style={{ flex: 1, padding: '24px 32px', backgroundColor: 'var(--main-bg)' }}>
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

                    {/* Loading or No Products Message */}
                    {!loadingProducts && availableProducts.length === 0 && (
                        <div
                            style={{
                                padding: '20px',
                                backgroundColor: '#fff7ed',
                                border: '1px solid #fed7aa',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                textAlign: 'center',
                                color: '#c2410c',
                            }}
                        >
                            <p style={{ margin: 0, fontSize: '14px' }}>
                                ⚠️ Không thể tải danh sách sản phẩm. Vui lòng kiểm tra kết nối API hoặc liên hệ quản trị viên.
                            </p>
                            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#92400e' }}>
                                API endpoint: <code>/GetProducts</code> (có thể cần cấu hình)
                            </p>
                        </div>
                    )}

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
                                    onChange={(e) => {
                                        const selectedOption = e.target.selectedOptions[0];
                                        const productId = selectedOption.getAttribute('data-id') || '';
                                        const productUnit = selectedOption.getAttribute('data-unit') || 'hộp';
                                        updateProduct(product.id, 'product', e.target.value);
                                        updateProduct(product.id, 'productId', productId);
                                        updateProduct(product.id, 'unit', productUnit);
                                    }}
                                    disabled={loadingProducts}
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: loadingProducts ? '#f3f4f6' : 'white',
                                        color: product.product ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        cursor: loadingProducts ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    <option value="">
                                        {loadingProducts ? 'Đang tải...' : availableProducts.length > 0 ? 'Chọn loại bánh' : 'Không có sản phẩm'}
                                    </option>
                                    {availableProducts.map((prod) => (
                                        <option 
                                            key={prod.product_id} 
                                            value={prod.product_name}
                                            data-id={prod.product_id}
                                            data-unit={prod.unit || 'hộp'}
                                        >
                                            {prod.product_name}
                                        </option>
                                    ))}
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
                                    min="1"
                                    placeholder="0"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
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
                                    placeholder="vd: hộp, kg"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        backgroundColor: product.unit ? '#f9fafb' : 'white',
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
                {error && (
                    <div
                        style={{
                            padding: '12px 16px',
                            backgroundColor: '#fee',
                            color: '#c00',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            fontSize: '14px',
                        }}
                    >
                        {error}
                    </div>
                )}
                
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        style={{
                            padding: '10px 24px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
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
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        <span>🛒</span>
                        <span>{loading ? 'Đang gửi...' : 'Gửi Đơn Hàng'}</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
