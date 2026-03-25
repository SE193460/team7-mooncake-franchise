import React from 'react';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function SearchAndFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: SearchAndFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Tìm theo mã đơn, cửa hàng..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          flex: 1,
          minWidth: '280px',
          padding: '10px 16px',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontSize: '14px',
          backgroundColor: 'white',
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        style={{
          padding: '10px 16px',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          fontSize: '14px',
          backgroundColor: 'white',
          cursor: 'pointer',
          minWidth: '180px',
        }}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Chờ Xác Nhận</option>
        <option value="confirmed">Đã Xác Nhận</option>
        <option value="processing">Đang Chuẩn Bị</option>
        <option value="fulfilled">Hoàn Thành</option>
        <option value="cancelled">Đã Hủy</option>
      </select>
    </div>
  );
}
