'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import storeService from "../../../services/storeService";

export default function PaymentPage() {

    const router = useRouter();
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [paidOrders, setPaidOrders] = useState<any[]>([]);
    const [stats, setStats] = useState({
        waiting: 0,
        paid: 0,
    });

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
    };

    const formatDate = (date: string | null) => {
        if (!date) return '—';
        try {
            return new Date(date).toLocaleDateString('vi-VN');
        } catch {
            return date;
        }
    };

    useEffect(() => {
        const loadPaymentData = async () => {
            try {
                const data = await storeService.getPaymentOrders();
                
                if (!data?.data) return;

                const d = data.data;

                setPendingOrders(d.waiting_payment_orders || []);
                setPaidOrders(d.payment_history || []);
                setStats({
                    waiting: d.waiting_payment_count,
                    paid: d.paid_count,
                });
            } catch (error) {
                console.error('Failed to load payment orders:', error);
            }
        };

        loadPaymentData();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="payment" />
            <main style={{ flex: 1, padding: '32px 40px', backgroundColor: '#FAF9F6' }}>
                {/* Title */}
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Thanh Toán Đơn Hàng</h1>
                    <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>Quản lý thanh toán cho các đơn hàng đã nhận</p>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', marginTop: '24px', maxWidth: '1200px' }}>
                    <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-orange)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--primary-orange)' }}>💳</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Chờ Thanh Toán</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-orange)' }}>
                            {stats.waiting}
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ color: '#10B981' }}>✅</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Đã Thanh Toán</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: '#10B981' }}>
                            {stats.paid}
                        </div>
                    </div>
                </div>

                {/* Pending Orders */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Đơn Hàng Chờ Thanh Toán</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mã Đơn</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sản Phẩm</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Số Tiền</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ngày Nhận</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Không có đơn hàng chờ thanh toán</td>
                                    </tr>
                                ) : (
                                    pendingOrders.map((order) => (
                                        <tr key={order.order_id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F8F5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ color: 'var(--primary-orange)', fontSize: '16px' }}>📦</span>
                                                {order.order_id}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--text-primary)' }}>
                                                {order.product_summary || 'N/A'}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--primary-orange)' }}>
                                                {formatVND(order.amount || 0)}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                                {formatDate(order.received_date)}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px' }}>
                                                <span style={{ display: 'inline-block', backgroundColor: '#FEF3E2', color: 'var(--primary-orange)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                                                    {order.status_label}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment History */}
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Lịch Sử Thanh Toán</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mã Đơn</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sản Phẩm</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Số Tiền</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ngày Thanh Toán</th>
                                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paidOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Chưa có lịch sử thanh toán</td>
                                    </tr>
                                ) : (
                                    paidOrders.map((order) => (
                                        <tr key={order.order_id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F8F5'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ color: '#10B981', fontSize: '16px' }}>✓</span>
                                                {order.order_id}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--text-primary)' }}>
                                                {order.product_summary || 'N/A'}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                                {formatVND(order.amount || 0)}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                                {formatDate(order.paid_at)}
                                            </td>
                                            <td style={{ padding: '16px 20px', fontSize: '14px' }}>
                                                <span style={{ display: 'inline-block', backgroundColor: '#D1FAE5', color: '#059669', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                                                    {order.status_label}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

