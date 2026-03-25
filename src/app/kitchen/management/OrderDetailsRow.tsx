import React from 'react';
import styles from './management.module.css';
import type { Order } from './types';

interface OrderDetailsRowProps {
  order: Order;
  formatVND: (amount: string | number) => string;
  formatDate: (dateStr: string) => string;
}

export default function OrderDetailsRow({
  order,
  formatVND,
  formatDate,
}: OrderDetailsRowProps) {
  return (
    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color)' }}>
      <td colSpan={7} style={{ padding: '20px 16px' }}>
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Chi Tiết Sản Phẩm
          </h4>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th
                  style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Tên Sản Phẩm
                </th>
                <th
                  style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    width: '80px',
                  }}
                >
                  Số Lượng
                </th>
                <th
                  style={{
                    padding: '10px 12px',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    width: '120px',
                  }}
                >
                  Giá/1
                </th>
                <th
                  style={{
                    padding: '10px 12px',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    width: '140px',
                  }}
                >
                  Thành Tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {order.product_details.map((product, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx !== order.product_details.length - 1 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--text-primary)' }}>
                    {product.product_name}
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      textAlign: 'center',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--primary-orange)',
                    }}
                  >
                    {product.qty}
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      textAlign: 'right',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {formatVND(product.unit_price)}
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      textAlign: 'right',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--primary-orange)',
                    }}
                  >
                    {formatVND(product.line_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
          }}
        >
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Ngày Giao Dự Kiến</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {formatDate(order.desired_date)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Ngày Hoàn Thành</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {order.fulfilled_at ? formatDate(order.fulfilled_at) : '—'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Tổng Tiền Đơn Hàng</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-orange)' }}>
              {formatVND(order.total_amount)}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}
