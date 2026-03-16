import styles from './orders.module.css';

interface OrderDetail {
    order: {
        order_id: string;
        order_code: string;
        status: string;
        desired_date: string;
        created_at: string;
        store_name: string;
    };
    items: {
        order_item_id: string;
        product_name: string;
        qty: number;
        uom: string;
        unit_price: number;
        line_total: number;
    }[];
}

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderDetail | null;
    loading: boolean;
    formatDate: (dateString: string) => string;
}

export default function OrderDetailModal({
    isOpen,
    onClose,
    order,
    loading,
    formatDate
}: OrderDetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <div className={styles.modalLoading}>
                        Đang tải...
                    </div>
                ) : order ? (
                    <>
                        {/* Header */}
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                Chi Tiết Đơn Hàng
                            </h2>
                            <button onClick={onClose} className={styles.modalClose}>
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className={styles.modalBody}>
                            {/* Order Info */}
                            <div className={styles.orderDetailInfo}>
                                <h3 className={styles.orderDetailTitle}>
                                    ORD-{order.order.order_id}
                                </h3>
                                <p className={styles.orderDetailStore}>
                                    {order.order.store_name}
                                </p>
                            </div>

                            {/* Products */}
                            <div className={styles.productsSection}>
                                <h4 className={styles.productsSectionTitle}>
                                    Sản phẩm:
                                </h4>
                                {order.items.map((item) => (
                                    <div key={item.order_item_id} className={styles.productItem}>
                                        <div className={styles.productInfo}>
                                            <div className={styles.productName}>
                                                {item.product_name}
                                            </div>
                                            <div className={styles.productDetails}>
                                                {item.qty} {item.uom} × {item.unit_price.toLocaleString('vi-VN')} VNĐ
                                            </div>
                                        </div>
                                        <div className={styles.productPrice}>
                                            {item.line_total.toLocaleString('vi-VN')} VNĐ
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Amount */}
                            <div className={styles.totalSection}>
                                <div className={styles.totalRow}>
                                    <span className={styles.totalLabel}>
                                        Tổng tiền:
                                    </span>
                                    <span className={styles.totalValue}>
                                        {order.items.reduce((sum, item) => sum + item.line_total, 0).toLocaleString('vi-VN')} VNĐ
                                    </span>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className={styles.footerInfo}>
                                <div className={styles.footerInfoItem}>
                                    <div className={styles.footerInfoLabel}>
                                        Ngày đặt
                                    </div>
                                    <div className={styles.footerInfoValue}>
                                        {formatDate(order.order.created_at)}
                                    </div>
                                </div>
                                <div className={`${styles.footerInfoItem} ${styles.textRight}`}>
                                    <div className={styles.footerInfoLabel}>
                                        Trạng thái
                                    </div>
                                    <span className={styles.footerStatusBadge}>
                                        Chờ Xử Lý
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
