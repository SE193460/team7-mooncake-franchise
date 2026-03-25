import React from 'react';
import styles from './management.module.css';
import OrderDetailsRow from './OrderDetailsRow';
import type { Order } from './types';

interface OrdersTableProps {
  orders: Order[];
  expandedOrder: string | null;
  onExpandOrder: (orderId: string) => void;
  getStatusClass: (status: string) => string;
  getPaymentStatusClass: (status: string) => string;
  getStatusText: (status: string) => string;
  getPaymentStatusText: (status: string) => string;
  formatVND: (amount: string | number) => string;
  formatDate: (dateStr: string) => string;
}

export default function OrdersTable({
  orders,
  expandedOrder,
  onExpandOrder,
  getStatusClass,
  getPaymentStatusClass,
  getStatusText,
  getPaymentStatusText,
  formatVND,
  formatDate,
}: OrdersTableProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: '#f9fafb' }}>
            <th
              style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Mã Đơn Hàng
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Cửa Hàng
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Sản Phẩm
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Tổng Tiền
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Trạng Thái
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Thanh Toán
            </th>
            <th
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Ngày Tạo
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr
                onClick={() => onExpandOrder(expandedOrder === order.order_id ? '' : order.order_id)}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: expandedOrder === order.order_id ? '#f9fafb' : 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (expandedOrder !== order.order_id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = expandedOrder === order.order_id ? '#f9fafb' : 'white';
                }}
              >
                <td
                  style={{
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: 'var(--primary-orange)', fontSize: '16px' }}>📦</span>
                  {order.order_id}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  {order.franchise_store_name}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>{order.total_items} sản phẩm</div>
                  {order.product_details && order.product_details.length > 0 ? (
                    <div style={{ fontSize: '12px' }}>
                      {order.product_details.map((product, idx) => (
                        <div key={idx} style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          {product.product_name} : {product.qty}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {order.product_names}
                    </div>
                  )}
                </td>
                <td
                  style={{
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--primary-orange)',
                    textAlign: 'center',
                  }}
                >
                  {formatVND(order.total_amount)}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span className={`${styles.paymentBadge} ${getPaymentStatusClass(order.payment_status)}`}>
                    {getPaymentStatusText(order.payment_status)}
                  </span>
                </td>
                <td
                  style={{
                    padding: '16px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  {formatDate(order.created_at)}
                </td>
              </tr>

              {expandedOrder === order.order_id && (
                <OrderDetailsRow
                  order={order}
                  formatVND={formatVND}
                  formatDate={formatDate}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
