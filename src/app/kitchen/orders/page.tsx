'use client';

import Sidebar from '../../../components/Sidebar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './orders.module.css';
import OrderCard from './OrderCard';
import OrderDetailModal from './OrderDetailModal';
import RejectOrderModal from './RejectOrderModal';

interface OrderItem {
    product_name: string;
    qty: number;
    uom: string;
}

interface Order {
    order_id: string;
    order_code: string;
    store_name: string;
    status: string;
    desired_date: string;
    created_at: string;
    items_preview: OrderItem[];
    note?: string;
}

interface OrderDetail {
    order: {
        order_id: string;
        order_code: string;
        status: string;
        desired_date: string;
        created_at: string;
        store_name: string;
        note?: string;
    };
    items: {
        order_item_id: string;
        product_name: string;
        qty: number;
        uom: string;
        unit_price: number;
        line_total: number;
    }[];
}

export default function NewOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [rejectOrderId, setRejectOrderId] = useState('');
    const limit = 10;

    useEffect(() => {
        fetchNewOrders();
    }, [page]);

    const fetchNewOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/new?page=${page}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setOrders(result.data.orders);
                    setTotal(result.data.total);
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to fetch orders:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData.message || errorData
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (orderId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${orderId}/approve`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                // Refresh the order list
                fetchNewOrders();
                toast.success(result.message || 'Đơn hàng đã được chấp nhận!');
            } else {
                const error = await response.json();
                toast.error(error.message || 'Có lỗi xảy ra khi chấp nhận đơn hàng');
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            toast.error('Có lỗi xảy ra khi chấp nhận đơn hàng');
        }
    };

    const openRejectModal = (orderId: string) => {
        setRejectOrderId(orderId);
        setRejectReason('');
        setShowRejectModal(true);
    };

    const handleReject = async () => {
        if (!rejectReason.trim()) {
            toast.error('Vui lòng nhập lý do từ chối');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${rejectOrderId}/reject`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    },
                    body: JSON.stringify({
                        reason: rejectReason
                    })
                }
            );

            if (response.ok) {
                setShowRejectModal(false);
                setRejectReason('');
                setRejectOrderId('');
                fetchNewOrders();
                toast.success('Đơn hàng đã bị từ chối!');
            } else {
                const error = await response.json();
                toast.error(error.message || 'Có lỗi xảy ra khi từ chối đơn hàng');
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
            toast.error('Có lỗi xảy ra khi từ chối đơn hàng');
        }
    };

    const handleViewDetails = async (orderId: string) => {
        try {
            setLoadingDetail(true);
            setShowModal(true);
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${orderId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setSelectedOrder(result.data);
                }
            } else {
                toast.error('Không thể tải chi tiết đơn hàng');
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            toast.error('Có lỗi xảy ra khi xem chi tiết đơn hàng');
            setShowModal(false);
        } finally {
            setLoadingDetail(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div suppressHydrationWarning className={styles.container}>
            <Sidebar activePage="new-orders" type="kitchen" />
            
            <main className={styles.main}>
                <div suppressHydrationWarning className={styles.content}>
                    <div suppressHydrationWarning className={styles.header}>
                        <h1 className={styles.title}>
                            Đơn Hàng Mới
                        </h1>
                        <p className={styles.subtitle}>
                            Xem và xử lý các đơn hàng từ các hàng franchise
                        </p>
                    </div>

                    {loading ? (
                        <div suppressHydrationWarning className={styles.loading}>
                            Đang tải đơn hàng...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📋</div>
                            <h3 className={styles.emptyTitle}>
                                Không có đơn hàng mới
                            </h3>
                            <p className={styles.emptyText}>
                                Tất cả đơn hàng đã được xử lý
                            </p>
                        </div>
                    ) : (
                        <div className={styles.ordersList}>
                            {orders.map((order) => (
                                <OrderCard
                                    key={order.order_id}
                                    order={order}
                                    onViewDetails={handleViewDetails}
                                    onAccept={handleAccept}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && orders.length > 0 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={styles.paginationBtn}
                            >
                                ← Trước
                            </button>
                            <span className={styles.paginationInfo}>
                                Trang {page} / {Math.ceil(total / limit)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(total / limit)}
                                className={styles.paginationBtn}
                            >
                                Sau →
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Chi Tiết Đơn Hàng */}
            <OrderDetailModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                order={selectedOrder}
                loading={loadingDetail}
                formatDate={formatDate}
            />

            {/* Modal Từ Chối Đơn Hàng */}
            <RejectOrderModal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                onConfirm={handleReject}
                reason={rejectReason}
                onReasonChange={setRejectReason}
            />
        </div>
    );
}
