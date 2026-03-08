'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import styles from './tracking.module.css';
import storeService from '../../../services/storeService';

interface Order {
  id: string;
  orderCode: string;
  storeName?: string;
  products: string;
  createdDate: string;
  deliveryDate: string;
  status: 'pending' | 'ready' | 'preparing' | 'delivered' | 'completed';
  statusLabel: string;
}

export default function OrderTrackingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedFilter, searchQuery]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await storeService.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (selectedFilter !== 'Tất cả') {
      filtered = filtered.filter(order => {
        if (selectedFilter === 'Chờ xử lý') return order.status === 'pending';
        if (selectedFilter === 'Đã hoàn thành') return order.status === 'completed' || order.status === 'delivered';
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const getStatusClass = (status: string) => {
    if (status === 'pending' || status === 'Chờ xử lý') return styles.statusPending;
    if (status === 'ready' || status === 'approved' || status === 'Đã chấp nhận') return styles.statusReady;
    if (status === 'preparing' || status === 'processing' || status === 'Đang chuẩn bị') return styles.statusPreparing;
    if (status === 'delivered' || status === 'Đã Giao') return styles.statusDelivered;
    if (status === 'completed' || status === 'fulfilled' || status === 'Đã hoàn thành') return styles.statusCompleted;
    if (status === 'cancelled' || status === 'rejected' || status === 'Đã hủy') return styles.statusCancelled;
    return styles.statusCancelled;
  };

  const getStatusDisplay = (order: Order) => {
    return order.statusLabel || order.status;
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Đang tải danh sách đơn hàng...</p>
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              backgroundColor: '#fee',
              borderRadius: '8px',
              color: '#c00',
            }}
          >
            <p>{error}</p>
            <button
              onClick={fetchOrders}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                backgroundColor: 'var(--primary-orange)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Thử lại
            </button>
          </div>
        ) : (
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
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '24px' }}>
                      Không tìm thấy đơn hàng nào
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
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
                          {order.storeName && (
                            <div className={styles.storeName}>{order.storeName}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                          {getStatusDisplay(order)}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{order.createdDate}</td>
                      <td className={styles.dateCell}>{order.deliveryDate || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
