'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

import OrdersTable from '../../components/OrdersTable';
import storeService, { DashboardStats, Order } from '../../services/storeService';
type OrderStatus = "pending" | "confirmed" | "processing" | "fulfilled" | "cancelled";

export default function StoreDashboard() {
    const router = useRouter();
    const [cards, setCards] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>(null);

    const statusLabelMap: Record<OrderStatus, string> = {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        processing: "Đang xử lý",
        fulfilled: "Đã giao",
        cancelled: "Đã hủy",
    };

    const statusColorMap: Record<OrderStatus, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-blue-100 text-blue-800",
        processing: "bg-purple-100 text-purple-800",
        fulfilled: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/franchiseStaff_dashboard?page=1&limit=50`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log("DASHBOARD:", result);

                const dashboard = result.data;

                if (!dashboard) {
                    console.error("Dashboard data is null");
                    return;
                }

                setCards(dashboard.cards || {});
                setOrders(dashboard.recent_orders || []);
                setSummary(dashboard.summary);

                console.log("ORDERS:", dashboard.recent_orders);
                console.log("First order delivery_date:", dashboard.recent_orders?.[0]?.delivery_date);
            })
            .catch(console.error);
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="dashboard" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Tổng Quan Cửa Hàng</h1>
                        <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>Quản lý đơn hàng và thanh toán bánh Trung Thu</p>
                    </div>
                    <button
                        onClick={() => router.push('/store/order')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            backgroundColor: 'var(--primary-orange)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(255, 107, 53, 0.3)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-orange-hover)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 107, 53, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(255, 107, 53, 0.3)';
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>+</span>
                        <span>Đặt Hàng Mới</span>
                    </button>
                </div>

                {/* Top Row: Payment Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', maxWidth: '1200px' }}>
                    {/* Card 1: Đã Thanh Toán */}
                    <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ color: '#10B981', fontWeight: 'bold' }}>↗</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Đã Thanh Toán</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: '#10B981' }}>
                            {formatVND(summary?.paid_amount || 0)}
                        </div>
                    </div>

                    {/* Card 2: Chờ Thanh Toán */}
                    <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-orange)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--primary-orange)' }}>💳</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Chờ Thanh Toán ({(cards?.pending || 0)} đơn)</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-orange)', marginBottom: '8px' }}>
                            {formatVND(summary?.unpaid_amount || 0)}
                        </div>
                        <a href="#" style={{ fontSize: '14px', color: 'var(--primary-orange)', textDecoration: 'none', fontWeight: '500' }}>
                            Thanh toán ngay →
                        </a>
                    </div>

                    {/* Card 3: Tổng Đơn Hàng */}
                    <div style={{ flex: 1, padding: '24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>$</span>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>Tổng Đơn Hàng</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {summary?.total_orders || 0}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Status Cards */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', maxWidth: '1200px' }}>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-orange)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Chờ Xử Lý</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{cards?.pending ?? 0}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Đang chờ xác nhận</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-orange)' }}>🛒</div>
                    </div>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Đã Chấp Nhận</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{cards?.approved ?? 0}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Đang chuẩn bị</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-orange)' }}>📦</div>
                    </div>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Sẵn Sàng Giao</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{cards?.processing ?? 0}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Chờ điều phối</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-orange)' }}>🚚</div>
                    </div>
                    <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', borderLeft: '4px solid #10B981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Đã Giao</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{cards?.fulfilled ?? 0}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Hoàn tất giao hàng</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'var(--primary-orange)' }}>✅</div>
                    </div>
                </div>

                {/* Orders Table */}
                <OrdersTable
                    orders={orders?.map((o) => {
                        const status = o.status as OrderStatus;

                        let paymentStatus: 'paid' | 'unpaid' | undefined;
                        let paymentStatusLabel: string | undefined;

                        if (o.payment_status === 'paid') {
                            paymentStatus = 'paid';
                            paymentStatusLabel = 'Đã Thanh Toán';
                        } else if (o.payment_status === 'unpaid') {
                            paymentStatus = 'unpaid';
                            paymentStatusLabel = 'Chưa Thanh Toán';
                        }

                        return {
                            id: o.order_id,
                            orderCode: o.order_code,
                            products: `${o.total_product_qty} sản phẩm`,
                            totalAmount: o.total_amount,
                            status,
                            statusLabel: statusLabelMap[status],
                            statusColor: statusColorMap[status],
                            paymentStatus,
                            paymentStatusLabel,
                            createdDate: new Date(o.created_at).toLocaleDateString(),
                            desiredDate: o.desired_date
                                ? new Date(o.desired_date).toLocaleDateString()
                                : "",
                            deliveryDate: o.fulfilled_at
                                ? new Date(o.fulfilled_at).toLocaleDateString()
                                : "",
                            note: o.note ?? "",
                        };
                    })}
                />
            </main>
        </div>
    );
}