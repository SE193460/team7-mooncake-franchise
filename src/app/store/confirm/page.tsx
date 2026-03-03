'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import storeService, { ConfirmOrder } from '../../../services/storeService';
import styles from './confirm.module.css';

interface Order {
  id: string;
  orderCode: string;
  products: string;
  createdDate: string;
  deliveryDate: string;
  confirmedDate: string;
  status: string;
  isConfirmed: boolean;
}

export default function OrderConfirmationPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivered' | 'confirmed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Convert API data to UI format
  const convertApiOrderToUI = (apiOrder: ConfirmOrder): Order => {
    return {
      id: apiOrder.order_id,
      orderCode: apiOrder.order_code,
      products: '', // API doesn't return product info in this endpoint
      createdDate: new Date(apiOrder.created_at).toLocaleDateString('vi-VN'),
      deliveryDate: apiOrder.delivered_at 
        ? new Date(apiOrder.delivered_at).toLocaleDateString('vi-VN') 
        : '',
      confirmedDate: apiOrder.received_confirmed_at
        ? new Date(apiOrder.received_confirmed_at).toLocaleDateString('vi-VN')
        : '',
      status: apiOrder.status === 'fulfilled' ? 'Đã giao' : 'Đã xác nhận',
      isConfirmed: apiOrder.status === 'confirmed',
    };
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiOrders = await storeService.getConfirmOrders(selectedFilter, searchQuery);
      const uiOrders = apiOrders.map(convertApiOrderToUI);
      setOrders(uiOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on mount and when filter/search changes
  useEffect(() => {
    fetchOrders();
  }, [selectedFilter, searchQuery]);

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

  const handleSubmitFeedback = async () => {
    if (!selectedOrder) return;

    try {
      setSubmitting(true);
      
      // Call API to confirm receipt
      await storeService.confirmReceipt(
        selectedOrder.id,
        rating,
        feedback
      );

      // Refresh orders list
      await fetchOrders();
      
      setShowFeedbackModal(false);
      setSelectedOrder(null);
      setFeedback('');
      setRating(5);
    } catch (err) {
      console.error('Error confirming receipt:', err);
      alert('Không thể xác nhận đơn hàng. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOrders = orders;

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
            onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'delivered' | 'confirmed')}
            className={styles.filterSelect}
          >
            <option value="all">Tất cả</option>
            <option value="delivered">Đã giao</option>
            <option value="confirmed">Đã xác nhận</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <p>Đang tải...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
            <button onClick={fetchOrders} className={styles.retryButton}>Thử lại</button>
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
                      <div className={styles.productCount}>{order.products || 'N/A'}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{order.createdDate}</td>
                  <td className={styles.dateCell}>{order.deliveryDate || order.confirmedDate}</td>
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
        )}
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
                disabled={submitting}
              >
                Hủy
              </button>
              <button 
                className={styles.submitButton}
                onClick={handleSubmitFeedback}
                disabled={submitting}
              >
                {submitting ? 'Đang xử lý...' : 'Xác Nhận & Gửi Đánh Giá'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
