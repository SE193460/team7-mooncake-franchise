'use client';

import Sidebar from '../../../components/Sidebar';
import { useEffect, useState } from 'react';

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
}

interface OrderDetail {
    order: {
        order_id: string;
        order_code: string;
        status: string;
        desired_date: string;
        created_at: string;
        store_name: string;
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
                console.error('Failed to fetch orders:', response.statusText);
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
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${orderId}/accept`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                // Refresh the order list
                fetchNewOrders();
                alert('Đơn hàng đã được chấp nhận!');
            } else {
                const error = await response.json();
                alert(error.message || 'Có lỗi xảy ra khi chấp nhận đơn hàng');
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            alert('Có lỗi xảy ra khi chấp nhận đơn hàng');
        }
    };

    const handleReject = async (orderId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://franchisemooncake.onrender.com/api/centralKitchen/orders/${orderId}/reject`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                }
            );

            if (response.ok) {
                // Refresh the order list
                fetchNewOrders();
                alert('Đơn hàng đã bị từ chối!');
            } else {
                const error = await response.json();
                alert(error.message || 'Có lỗi xảy ra khi từ chối đơn hàng');
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
            alert('Có lỗi xảy ra khi từ chối đơn hàng');
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
                alert('Không thể tải chi tiết đơn hàng');
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            alert('Có lỗi xảy ra khi xem chi tiết đơn hàng');
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
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="new-orders" type="kitchen" />
            
            <main style={{ flex: 1, padding: '32px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            Đơn Hàng Mới
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Xem và xử lý các đơn hàng từ các hàng franchise
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Đang tải đơn hàng...
                        </div>
                    ) : orders.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '60px 20px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                Không có đơn hàng mới
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                Tất cả đơn hàng đã được xử lý
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {orders.map((order) => (
                                <div
                                    key={order.order_id}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid var(--table-border)',
                                        padding: '24px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                                                ORD-{order.order_id}
                                            </h3>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                                {order.store_name}
                                            </p>
                                        </div>
                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: 'var(--status-yellow)',
                                                color: 'var(--status-yellow-text)',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Chờ Xử Lý
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                            Sản phẩm đặt hàng:
                                        </p>
                                        {order.items_preview.map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '10px 0',
                                                    borderBottom: index < order.items_preview.length - 1 ? '1px solid var(--table-border)' : 'none',
                                                }}
                                            >
                                                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                                    {item.product_name}
                                                </span>
                                                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                    {item.qty} {item.uom}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                Ngày đặt: {formatDate(order.created_at)}
                                            </p>
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                Ngày mong muốn: {formatDate(order.desired_date)}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button
                                                onClick={() => handleViewDetails(order.order_id)}
                                                style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid var(--table-border)',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: 'var(--text-primary)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--text-secondary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--table-border)';
                                                }}
                                            >
                                                👁️ Chi Tiết
                                            </button>
                                            <button
                                                onClick={() => handleReject(order.order_id)}
                                                style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #ef4444',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#fef2f2';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'white';
                                                }}
                                            >
                                                ✕ Từ Chối
                                            </button>
                                            <button
                                                onClick={() => handleAccept(order.order_id)}
                                                style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: 'var(--primary-orange)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--primary-orange-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                                                }}
                                            >
                                                ✓ Chấp Nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && orders.length > 0 && (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            gap: '12px',
                            marginTop: '32px',
                            padding: '20px'
                        }}>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: page === 1 ? '#f3f4f6' : 'white',
                                    border: '1px solid var(--table-border)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: page === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                                }}
                            >
                                ← Trước
                            </button>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                Trang {page} / {Math.ceil(total / limit)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(total / limit)}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: page >= Math.ceil(total / limit) ? '#f3f4f6' : 'white',
                                    border: '1px solid var(--table-border)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: page >= Math.ceil(total / limit) ? 'var(--text-secondary)' : 'var(--text-primary)',
                                    cursor: page >= Math.ceil(total / limit) ? 'not-allowed' : 'pointer',
                                }}
                            >
                                Sau →
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Chi Tiết Đơn Hàng */}
            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '0',
                            maxWidth: '500px',
                            width: '90%',
                            maxHeight: '80vh',
                            overflow: 'auto',
                            position: 'relative',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {loadingDetail ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                Đang tải...
                            </div>
                        ) : selectedOrder ? (
                            <>
                                {/* Header */}
                                <div
                                    style={{
                                        padding: '20px 24px',
                                        borderBottom: '1px solid var(--table-border)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                                        Chi Tiết Đơn Hàng
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '1px solid var(--table-border)',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '18px',
                                            color: 'var(--text-secondary)',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'white';
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '24px' }}>
                                    {/* Order Info */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            ORD-{selectedOrder.order.order_id}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {selectedOrder.order.store_name}
                                        </p>
                                    </div>

                                    {/* Products */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                            Sản phẩm:
                                        </h4>
                                        {selectedOrder.items.map((item, index) => (
                                            <div
                                                key={item.order_item_id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    padding: '12px 0',
                                                    borderBottom: index < selectedOrder.items.length - 1 ? '1px solid var(--table-border)' : 'none',
                                                }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                                        {item.product_name}
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                        {item.qty} {item.uom} × {item.unit_price.toLocaleString('vi-VN')} VNĐ
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>
                                                    {item.line_total.toLocaleString('vi-VN')} VNĐ
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer Info */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '16px 0',
                                            borderTop: '1px solid var(--table-border)',
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                Ngày đặt
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                                {formatDate(selectedOrder.order.created_at)}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                Trạng thái
                                            </div>
                                            <span
                                                style={{
                                                    padding: '4px 12px',
                                                    backgroundColor: 'var(--status-yellow)',
                                                    color: 'var(--status-yellow-text)',
                                                    borderRadius: '6px',
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    display: 'inline-block',
                                                }}
                                            >
                                                Chờ Xử Lý
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
