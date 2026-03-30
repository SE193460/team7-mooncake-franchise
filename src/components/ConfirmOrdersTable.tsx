import styles from '../app/store/confirm/confirm.module.css';

interface Order {
  id: string;
  orderCode: string;
  products: string;
  productLabels: string;
  productNames: string;
  productDetails?: Array<{
    product_name: string;
    qty: number;
    uom?: string;
  }>;
  createdDate: string;
  deliveryDate: string;
  confirmedDate: string;
  status: string;
  isConfirmed: boolean;
}

interface ConfirmOrdersTableProps {
  orders: Order[];
  onConfirmClick: (order: Order) => void;
}

export default function ConfirmOrdersTable({
  orders,
  onConfirmClick,
}: ConfirmOrdersTableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Sản phẩm</th>
            <th>Trạng thái</th>
            <th>Ngày giao</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <div className={styles.orderIdCell}>
                  <span className={styles.orderIcon}>📦</span>
                  <span className={styles.orderId}>{order.id}</span>
                </div>
              </td>
              <td>
                <div className={styles.productCell}>
                  <div className={styles.productCount}>{order.productLabels}</div>
                  {order.productDetails && order.productDetails.length > 0 ? (
                    <div className={styles.productList}>
                      {order.productDetails.map((product, idx) => (
                        <div key={idx} className={styles.productItem}>
                          {product.product_name} : {product.qty}{product.uom ? ` ${product.uom}` : ''}
                        </div>
                      ))}
                    </div>
                  ) : (
                    order.productNames.split(',').map((name, idx) => (
                      <div key={idx} className={styles.productName}>
                        {name.trim()}
                      </div>
                    ))
                  )}
                </div>
              </td>
              <td>
                <span className={styles.statusBadge}>{order.status}</span>
              </td>
              <td className={styles.dateCell}>{order.deliveryDate}</td>
              <td>
                {order.status === 'Đã giao' && !order.isConfirmed ? (
                  <button
                    className={styles.confirmButton}
                    onClick={() => onConfirmClick(order)}
                  >
                    Xác Nhận Nhận Hàng
                  </button>
                ) : (
                  <span className={styles.confirmedText}>✓ Đã xác nhận</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📭</span>
          <p>Không có đơn hàng nào cần xác nhận</p>
        </div>
      )}
    </div>
  );
}
