import styles from '../app/store/tracking/tracking.module.css';

interface Order {
  id: string;
  orderCode: string;
  storeName?: string;
  products: string;
  productNames?: string;
  createdDate: string;
  deliveryDate: string;
  status: 'pending' | 'processing' | 'fulfilled' | 'confirmed' | 'cancelled';
  statusLabel: string;
}

interface TrackingOrdersTableProps {
  orders: Order[];
  showActionMenu: string | null;
  onToggleActionMenu: (orderId: string) => void;
  onEditOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

export default function TrackingOrdersTable({
  orders,
  showActionMenu,
  onToggleActionMenu,
  onEditOrder,
  onCancelOrder,
}: TrackingOrdersTableProps) {
  const getStatusClass = (status: string) => {
    if (status === 'pending') return styles.statusPending;
    if (status === 'processing') return styles.statusProcessing;
    if (status === 'fulfilled') return styles.statusReady;
    if (status === 'confirmed') return styles.statusCompleted;
    if (status === 'cancelled') return styles.statusCancelled;
    return styles.statusCancelled;
  };

  const canEditOrCancel = (status: string) => {
    return status === 'pending';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Sản phẩm</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '24px' }}>
                Không tìm thấy đơn hàng nào
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className={styles.orderIdCell}>
                    <span className={styles.orderIcon}>📦</span>
                    <span className={styles.orderId}>{order.id}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.productCell}>
                    <div className={styles.productCount}>{order.products}</div>
                    {order.productNames && (
                      <div className={styles.productNames}>
                        {order.productNames.split(',').map((name, idx) => (
                          <div key={idx} className={styles.productName}>
                            {name.trim()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
                  >
                    {order.statusLabel}
                  </span>
                </td>
                <td className={styles.dateCell}>{order.createdDate}</td>
                <td>
                  {canEditOrCancel(order.status) ? (
                    <div className={styles.actionCell}>
                      <button
                        className={styles.actionButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleActionMenu(order.id);
                        }}
                      >
                        ⋮
                      </button>
                      {showActionMenu === order.id && (
                        <div
                          className={styles.actionMenu}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className={styles.actionMenuItem}
                            onClick={() => onEditOrder(order.id)}
                          >
                            ✏️ Chỉnh sửa
                          </button>
                          <button
                            className={styles.actionMenuItem}
                            onClick={() => onCancelOrder(order.id)}
                          >
                            ❌ Hủy đơn
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className={styles.noAction}>—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
