'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import ConfirmOrdersTable from '../../../components/ConfirmOrdersTable';
import storeService, { ConfirmOrder } from '../../../services/storeService';
import styles from './confirm.module.css';

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

export default function OrderConfirmationPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Convert API data to UI format
  const convertApiOrderToUI = (apiOrder: ConfirmOrder): Order => {
    // Tự tạo product label nếu không có
    const productLabel = apiOrder.product_labels || 
                         (apiOrder.total_products ? `${apiOrder.total_products} sản phẩm` : '');

    return {
      id: String(apiOrder.order_id),
      orderCode: apiOrder.order_code,
      products: apiOrder.product_names || 'Không có sản phẩm',
      productLabels: productLabel,
      productNames: apiOrder.product_names || '',
      productDetails: apiOrder.product_details || [],
      createdDate: apiOrder.created_at 
        ? new Date(apiOrder.created_at).toLocaleDateString('vi-VN')
        : '',
      deliveryDate: apiOrder.fulfilled_at 
        ? new Date(apiOrder.fulfilled_at).toLocaleDateString('vi-VN') 
        : '',
      confirmedDate: apiOrder.received_confirmed_at 
        ? new Date(apiOrder.received_confirmed_at).toLocaleDateString('vi-VN')
        : '',
      status: 'Đã giao',
      isConfirmed: !!apiOrder.received_confirmed_at,
    };
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiOrders = await storeService.getConfirmOrders();
      const uiOrders = apiOrders.map(convertApiOrderToUI);
      setOrders(uiOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

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
      const response = await storeService.confirmReceipt(
        selectedOrder.id,
        rating,
        feedback
      );

      // Show success message from API
      if (response.success) {
        toast.success(response.message || 'Đã xác nhận nhận hàng và cộng vào kho thành công!');
      }

      // Refresh orders list
      await fetchOrders();
      
      setShowFeedbackModal(false);
      setSelectedOrder(null);
      setFeedback('');
      setRating(5);
    } catch (err) {
      console.error('Error confirming receipt:', err);
      toast.error('Không thể xác nhận đơn hàng. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar activePage="confirm" />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Xác Nhận Nhận Hàng</h1>
          <p className={styles.subtitle}>Xác nhận đơn hàng đã nhận và viết đánh giá</p>
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
          <ConfirmOrdersTable orders={orders} onConfirmClick={handleConfirmClick} />
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
