import { Product } from '../../../services/storeService';
import styles from './order.module.css';

interface ProductRow {
    id: number;
    productId: string;
    product: string;
    quantity: number;
    unit: string;
}

interface ProductRowComponentProps {
    product: ProductRow;
    index: number;
    availableProducts: Product[];
    loadingProducts: boolean;
    canRemove: boolean;
    onUpdate: (id: number, field: keyof ProductRow, value: string | number) => void;
    onUpdateMultiple: (id: number, updates: Partial<ProductRow>) => void;
    onRemove: (id: number) => void;
}

export default function ProductRowComponent({
    product,
    index,
    availableProducts,
    loadingProducts,
    canRemove,
    onUpdate,
    onUpdateMultiple,
    onRemove
}: ProductRowComponentProps) {
    return (
        <div className={styles.productRow}>
            <div className={styles.productField}>
                <label className={styles.productLabel}>
                    Sản phẩm {index + 1}
                </label>
                <select
                    value={product.product}
                    onChange={(e) => {
                        const selectedOption = e.target.selectedOptions[0];
                        const productId = selectedOption.getAttribute('data-id') || '';
                        const productUnit = selectedOption.getAttribute('data-unit') || 'hộp';
                        onUpdateMultiple(product.id, {
                            product: e.target.value,
                            productId: productId,
                            unit: productUnit,
                        });
                    }}
                    disabled={loadingProducts}
                    className={styles.productSelect}
                >
                    <option value="">
                        {loadingProducts ? 'Đang tải...' : '-- Chọn loại bánh --'}
                    </option>
                    {availableProducts.map((p) => (
                        <option 
                            key={p.id} 
                            value={p.name}
                            data-id={p.id}
                            data-unit={p.uom || 'hộp'}
                        >
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.productField}>
                <label className={styles.productLabel}>Số lượng</label>
                <input
                    type="number"
                    min="0"
                    value={product.quantity || ''}
                    onChange={(e) => onUpdate(product.id, 'quantity', parseInt(e.target.value) || 0)}
                    className={styles.productInput}
                    placeholder="0"
                />
            </div>

            <div className={styles.productField}>
                <label className={styles.productLabel}>Đơn vị</label>
                <input
                    type="text"
                    value={product.unit}
                    readOnly
                    className={styles.productInput}
                    style={{ backgroundColor: '#f9fafb' }}
                    placeholder="-"
                />
            </div>

            <div className={styles.productField}>
                <label className={styles.productLabel}>Giá/1 {product.unit || 'sản phẩm'}</label>
                <div className={styles.priceDisplay}>
                    {product.productId ? (
                        <>
                            {(() => {
                                const selectedProduct = availableProducts.find(p => p.id === product.productId);
                                const price = selectedProduct ? parseFloat(selectedProduct.price) || 0 : 0;
                                return price.toLocaleString('vi-VN') + ' ₫';
                            })()}
                        </>
                    ) : (
                        '-'
                    )}
                </div>
            </div>

            <button
                onClick={() => onRemove(product.id)}
                disabled={!canRemove}
                className={styles.removeBtn}
                title="Xóa sản phẩm"
            >
                ×
            </button>
        </div>
    );
}
