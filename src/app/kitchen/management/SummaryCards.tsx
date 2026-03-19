import React from 'react';

interface SummaryCardsProps {
  totalOrders: number;
  filteredOrdersCount: number;
  totalAmount: string;
  formatVND: (amount: string | number) => string;
}

export default function SummaryCards({
  totalOrders,
  filteredOrdersCount,
  totalAmount,
  formatVND,
}: SummaryCardsProps) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <div
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Tổng Đơn Hàng</p>
        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-orange)' }}>
          {totalOrders}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Đơn Hàng Hiển Thị</p>
        <p style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>
          {filteredOrdersCount}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Tổng Giá Trị</p>
        <p style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-orange)' }}>
          {totalAmount}
        </p>
      </div>
    </div>
  );
}
