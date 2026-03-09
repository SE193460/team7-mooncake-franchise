import styles from './orders.module.css';

interface OrderItem {
    product_name: string;
    qty: number;
    uom: string;
}

interface Order {
    order_id: string;
    order_code: string;
    store_name: string;
    status: string;
    desired_date: string;
    created_at: string;
    items_preview: OrderItem[];
}

interface OrderCardProps {
    order: Order;
    onViewDetails: (orderId: string) => void;
    onReject: (orderId: string) => void;
    onAccept: (orderId: string) => void;
    formatDate: (dateString: string) => string;
}

export default function OrderCard({ 
    order, 
    onViewDetails, 
    onReject, 
    onAccept,
    formatDate 
}: OrderCardProps) {
    return (
        <div className={styles.orderCard}>
            <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                    <h3>ORD-{order.order_id}</h3>
                    <p>{order.store_name}</p>
                </div>
                <span className={styles.statusBadge}>
                    Chờ Xử Lý
                </span>
            </div>

            <div className={styles.itemsSection}>
                <p className={styles.itemsTitle}>
                    Sản phẩm đặt hàng:
                </p>
                {order.items_preview.map((item, index) => (
                    <div key={index} className={styles.itemRow}>
                        <span className={styles.itemName}>
                            {item.product_name}
                        </span>
                        <span className={styles.itemQty}>
                            {item.qty} {item.uom}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.orderMeta}>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>
                        Ngày đặt: {formatDate(order.created_at)}
                    </span>
                    <span className={styles.metaLabel}>
                        Ngày mong muốn: {formatDate(order.desired_date)}
                    </span>
                </div>
                <div className={styles.actions}>
                    <button
                        onClick={() => onViewDetails(order.order_id)}
                        className={styles.btnDetail}
                    >
                        👁️ Chi Tiết
                    </button>
                    <button
                        onClick={() => onReject(order.order_id)}
                        className={styles.btnReject}
                    >
                        ✕ Từ Chối
                    </button>
                    <button
                        onClick={() => onAccept(order.order_id)}
                        className={styles.btnAccept}
                    >
                        ✓ Chấp Nhận
                    </button>
                </div>
            </div>
        </div>
    );
}
