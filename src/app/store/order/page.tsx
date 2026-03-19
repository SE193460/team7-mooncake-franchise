'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import storeService, { Product } from '../../../services/storeService';
import ProductRowComponent from './ProductRowComponent';
import styles from './order.module.css';

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
    const [nextId, setNextId] = useState(2); // Counter cho ID tiếp theo
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

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

    // Calculate total price whenever products change
    useEffect(() => {
        const total = products.reduce((sum, product) => {
            if (product.productId && product.quantity > 0) {
                const availProduct = availableProducts.find(p => p.id === product.productId);
                if (availProduct) {
                    const price = parseFloat(availProduct.price) || 0;
                    return sum + (price * product.quantity);
                }
            }
            return sum;
        }, 0);
        setTotalPrice(total);
    }, [products, availableProducts]);

    const addProduct = () => {
        setProducts([
            ...products,
            { id: nextId, productId: '', product: '', quantity: 0, unit: '' },
        ]);
        setNextId(nextId + 1); // Tăng counter
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

    const updateProductMultipleFields = (id: number, updates: Partial<ProductRow>) => {
        setProducts(
            products.map((p) => (p.id === id ? { ...p, ...updates } : p))
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
            toast.success('Đơn hàng đã được tạo thành công!');
            router.push('/store/tracking');
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
        <div className={styles.container}>
            <Sidebar activePage="order" />

            <main className={styles.main}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Tạo Đơn Hàng Mới
                    </h1>
                    <p className={styles.subtitle}>
                        Đặt bánh Trung Thu từ kho trung tâm
                    </p>
                </div>

                {/* Product List Section */}
                <div className={styles.productListSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionIcon}>
                            🥮
                        </span>
                        <h2 className={styles.sectionTitle}>Danh Sách Bánh Trung Thu</h2>
                    </div>

                    {/* Loading or No Products Message */}
                    {!loadingProducts && availableProducts.length === 0 && (
                        <div className={styles.warningBox}>
                            <p className={styles.warningText}>
                                ⚠️ Không thể tải danh sách sản phẩm. Vui lòng kiểm tra kết nối API hoặc liên hệ quản trị viên.
                            </p>
                            <p className={styles.warningSubtext}>
                                API endpoint: <code>/GetProducts</code> (có thể cần cấu hình)
                            </p>
                        </div>
                    )}

                    {/* Product Rows */}
                    {products.map((product, index) => {
                        // Lọc ra những sản phẩm đã được chọn ở các rows khác
                        const selectedProductIds = products
                            .filter(p => p.id !== product.id && p.productId) // Loại trừ row hiện tại
                            .map(p => p.productId);
                        
                        // Chỉ hiển thị products chưa được chọn hoặc product hiện tại
                        const filteredProducts = availableProducts.filter(
                            p => !selectedProductIds.includes(p.id) || p.id === product.productId
                        );

                        return (
                            <ProductRowComponent
                                key={product.id}
                                product={product}
                                index={index}
                                availableProducts={filteredProducts}
                                loadingProducts={loadingProducts}
                                canRemove={products.length > 1}
                                onUpdate={updateProduct}
                                onUpdateMultiple={updateProductMultipleFields}
                                onRemove={removeProduct}
                            />
                        );
                    })}

                    {/* Add Product Button */}
                    <div className={styles.flexCenter}>
                        <button
                            onClick={addProduct}
                            className={styles.addProductBtn}
                        >
                            <span>+</span>
                            <span>Thêm Sản Phẩm</span>
                        </button>
                    </div>
                </div>

                {/* Price Summary Card */}
                {totalPrice > 0 && (
                    <div className={styles.priceCard}>
                        <div className={styles.priceCardHeader}>
                            <span className={styles.priceLabel}>💰 Tổng Giá Tiền</span>
                        </div>
                        <div className={styles.priceAmount}>
                            {totalPrice.toLocaleString('vi-VN')} ₫
                        </div>
                    </div>
                )}

                {/* Delivery Information Section */}
                <div className={styles.deliverySection}>
                    <h2 className={styles.sectionTitle}>Thông Tin Giao Hàng</h2>

                    <div className={styles.dateField}>
                        <label className={styles.fieldLabel}>
                            Ngày giao hàng mong muốn
                        </label>
                        <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className={styles.dateInput}
                        />
                    </div>

                    <div className={styles.notesField}>
                        <label className={styles.fieldLabel}>
                            Ghi chú thêm
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={styles.notesTextarea}
                            placeholder="Nhập ghi chú về đơn hàng (nếu có)..."
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={styles.errorBox}>
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button
                        onClick={handleCancel}
                        disabled={loading}
                        className={styles.btnCancel}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={styles.btnSubmit}
                    >
                        {loading ? (
                            <>
                                <span>⏳</span>
                                <span>Đang tạo...</span>
                            </>
                        ) : (
                            <>
                                <span>✔️</span>
                                <span>Tạo Đơn Hàng</span>
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}
