'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import styles from './tracking.module.css';

interface Order {
  id: string;
  storeName: string;
  products: string;
  createdDate: string;
  deliveryDate: string;
  status: string;
}

export default function OrderTrackingPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      storeName: 'Bánh Trung Thu "Phố Cổ Bánh Ốc"',
      products: '2 sản phẩm',
      createdDate: '06/01/2026',
      deliveryDate: '—',
      status: 'Chờ xử lý',
    },
    {
      id: 'ORD-003',
      storeName: 'Bánh Trung Thu Bánh Hương Xưa',
      products: '2 sản phẩm',
      createdDate: '06/01/2026',
      deliveryDate: '12/01/2026',
      status: 'Đã hoàn thành',
    },
    {
      id: 'ORD-006',
      storeName: 'Bánh Hương Lúa Vàng',
      products: '1 sản phẩm',
      createdDate: '03/01/2026',
      deliveryDate: '03/01/2026',
      status: 'Đã hoàn thành',
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusClass = (status: string) => {
    if (status === 'Chờ xử lý') return styles.statusPending;
    if (status === 'Đã hoàn thành') return styles.statusCompleted;
    return '';
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar activePage="tracking" />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Theo Dõi Đơn Hàng</h1>
          <p className={styles.subtitle}>Quản lý và theo dõi trạng thái của các đơn hàng</p>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hàng..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option>Tất cả</option>
            <option>Chờ xử lý</option>
            <option>Đã hoàn thành</option>
          </select>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Sản phẩm</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày giao</th>
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
                      <div className={styles.productCount}>{order.products}</div>
                      <div className={styles.storeName}>{order.storeName}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{order.createdDate}</td>
                  <td className={styles.dateCell}>{order.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
