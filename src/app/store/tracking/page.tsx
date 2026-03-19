'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import TrackingOrdersTable from '../../../components/TrackingOrdersTable';
import Pagination from '../../../components/Pagination';
import styles from './tracking.module.css';
import storeService, { Order } from '../../../services/storeService';

export default function OrderTrackingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedFilter, searchQuery]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showActionMenu) {
        setShowActionMenu(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showActionMenu]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await storeService.getOrders(currentPage, pageSize);
      
      // Nếu page hiện tại trả về items trống → đã hết dữ liệu
      if (data.length === 0 && currentPage > 1) {
        setOrders([]);
        setTotalPages(currentPage - 1);
        toast.info('Không còn đơn hàng nào');
      } else {
        setOrders(data);
        // Nếu số item < pageSize → đây là trang cuối
        const isLastPage = data.length < pageSize;
        setTotalPages(isLastPage ? currentPage : currentPage + 1);
      }
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
        if (selectedFilter === 'Đã hoàn thành') return order.status === 'fulfilled' || order.status === 'confirmed';
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

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setShowCancelConfirm(true);
    setShowActionMenu(null);
  };

  const handleToggleActionMenu = (orderId: string) => {
    setShowActionMenu(showActionMenu === orderId ? null : orderId);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      const result = await storeService.cancelOrder(orderToCancel);
      
      if (result.success) {
        toast.success('Đơn hàng đã được hủy thành công!');
        fetchOrders(); // Refresh list
      } else {
        toast.error(result.message || 'Không thể hủy đơn hàng. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error('Không thể hủy đơn hàng. Vui lòng thử lại.');
    } finally {
      setShowCancelConfirm(false);
      setOrderToCancel(null);
    }
  };

  const handleEditOrder = (orderId: string) => {
    setShowActionMenu(null);
    toast.info('Để chỉnh sửa đơn hàng, vui lòng hủy đơn hàng này và tạo đơn hàng mới với thông tin cập nhật.');
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
          <>
            <TrackingOrdersTable
              orders={filteredOrders}
              showActionMenu={showActionMenu}
              onToggleActionMenu={handleToggleActionMenu}
              onEditOrder={handleEditOrder}
              onCancelOrder={handleCancelOrder}
            />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Custom Confirm Modal */}
      {showCancelConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowCancelConfirm(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>⚠️</div>
              <h3 className={styles.modalTitle}>Xác nhận hủy đơn hàng</h3>
            </div>
            <p className={styles.modalMessage}>
              Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowCancelConfirm(false)}
              >
                Không, giữ lại
              </button>
              <button
                className={styles.confirmButton}
                onClick={confirmCancelOrder}
              >
                Có, hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
