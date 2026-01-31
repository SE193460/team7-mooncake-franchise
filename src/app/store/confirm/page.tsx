'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import styles from './confirm.module.css';

interface Order {
  id: string;
  storeName: string;
  products: string;
  createdDate: string;
  deliveryDate: string;
  status: string;
  isConfirmed: boolean;
}

export default function OrderConfirmationPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-003',
      storeName: 'Bánh Trung Thu Bánh Hương Xưa',
      products: '2 sản phẩm',
      createdDate: '06/01/2026',
      deliveryDate: '12/01/2026', 
      status: 'Đã giao',
      isConfirmed: false,
    },
    {
      id: 'ORD-006',
      storeName: 'Bánh Hương Lúa Vàng',
      products: '1 sản phẩm',
      createdDate: '03/01/2026',
      deliveryDate: '03/01/2026',
      status: 'Đã giao',
      isConfirmed: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const getStatusClass = (status: string) => {
    if (status === 'Đã giao') return styles.statusDelivered;
    if (status === 'Đã xác nhận') return styles.statusConfirmed;
    return '';
  };

  const handleConfirmClick = (order: Order) => {
    setSelectedOrder(order);
    setFeedback('');
    setRating(5);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (selectedOrder) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: 'Đã xác nhận', isConfirmed: true }
          : order
      ));
      
      // Here you would send the feedback to the server
      console.log('Feedback submitted:', {
        orderId: selectedOrder.id,
        rating,
        feedback
      });
      
      setShowFeedbackModal(false);
      setSelectedOrder(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'Tất cả' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.pageContainer}>
      <Sidebar activePage="confirm" />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Xác Nhận Nhận Hàng</h1>
          <p className={styles.subtitle}>Xác nhận đơn hàng đã nhận và viết đánh giá</p>
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
            <option>Đã giao</option>
            <option>Đã xác nhận</option>
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
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
                  <td>
                    {order.status === 'Đã giao' && !order.isConfirmed ? (
                      <button 
                        className={styles.confirmButton}
                        onClick={() => handleConfirmClick(order)}
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

          {filteredOrders.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📭</span>
              <p>Không có đơn hàng nào cần xác nhận</p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => setShowFeedbackModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Xác Nhận Nhận Hàng & Đánh Giá</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowFeedbackModal(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.orderInfo}>
                <p><strong>Mã đơn hàng:</strong> {selectedOrder.id}</p>
                <p><strong>Sản phẩm:</strong> {selectedOrder.products}</p>
                <p><strong>Ngày giao:</strong> {selectedOrder.deliveryDate}</p>
              </div>

              <div className={styles.ratingSection}>
                <label className={styles.label}>Đánh giá chất lượng</label>
                <div className={styles.starRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={styles.starButton}
                      onClick={() => setRating(star)}
                    >
                      <span className={star <= rating ? styles.starFilled : styles.starEmpty}>
                        ⭐
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.feedbackSection}>
                <label className={styles.label}>Nhận xét</label>
                <textarea
                  className={styles.feedbackInput}
                  placeholder="Chia sẻ trải nghiệm của bạn về đơn hàng này..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowFeedbackModal(false)}
              >
                Hủy
              </button>
              <button 
                className={styles.submitButton}
                onClick={handleSubmitFeedback}
              >
                Xác Nhận & Gửi Đánh Giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
