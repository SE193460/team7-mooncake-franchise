import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

interface Order {
    id: string;
    orderCode: string;
    products: string;
    status: 'pending' | 'confirmed' | 'processing' | 'fulfilled' | 'cancelled';
    statusLabel: string;
    statusColor: string;
    createdDate: string;
    desiredDate: string;
    deliveryDate: string;
    note: string;
}

interface OrdersTableProps {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const [showAll, setShowAll] = useState(false);
    const [page, setPage] = useState(1);

    const limit = 5;

    const displayedOrders = orders.slice((page - 1) * limit, page * limit);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    backgroundColor: 'var(--status-yellow)',
                    color: 'var(--status-yellow-text)',
                };
            case 'confirmed':
                return {
                    backgroundColor: 'var(--status-blue)',
                    color: 'var(--status-blue-text)',
                };
            case 'processing':
                return {
                    backgroundColor: 'var(--status-orange)',
                    color: 'var(--status-orange-text)',
                };
            case 'fulfilled':
                return {
                    backgroundColor: 'var(--status-blue)',
                    color: 'var(--status-blue-text)',
                };
            case 'cancelled':
                return {
                    backgroundColor: 'var(--status-red)',
                    color: 'var(--status-red-text)',
                };
            default:
                return {
                    backgroundColor: 'var(--status-gray)',
                    color: 'var(--status-gray-text)',
                };
        }
    };

    const totalPages = Math.ceil(orders.length / limit);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Đơn Hàng Gần Đây
                </h2>
                {!showAll && (
                    <button
                        onClick={() => {
                            setShowAll(true);
                            setPage(1);
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-orange)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-orange-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                    >
                        Xem tất cả
                    </button>
                )}

                {showAll && (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: page === 1 ? '#f3f4f6' : 'white',
                                border: '1px solid var(--table-border)',
                                borderRadius: '6px',
                                color: page === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: page === 1 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                if (page !== 1) {
                                    e.currentTarget.style.borderColor = 'var(--primary-orange)';
                                    e.currentTarget.style.color = 'var(--primary-orange)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (page !== 1) {
                                    e.currentTarget.style.borderColor = 'var(--table-border)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                        >
                            <span>←</span> Trước
                        </button>

                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '6px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: page === p ? 'var(--primary-orange)' : 'transparent',
                                        color: page === p ? 'white' : 'var(--text-secondary)',
                                        border: page === p ? '1px solid var(--primary-orange)' : '1px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (page !== p) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
                                            e.currentTarget.style.color = 'var(--primary-orange)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (page !== p) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-secondary)';
                                        }
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: page >= totalPages ? '#f3f4f6' : 'white',
                                border: '1px solid var(--table-border)',
                                borderRadius: '6px',
                                color: page >= totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                if (page < totalPages) {
                                    e.currentTarget.style.borderColor = 'var(--primary-orange)';
                                    e.currentTarget.style.color = 'var(--primary-orange)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (page < totalPages) {
                                    e.currentTarget.style.borderColor = 'var(--table-border)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                        >
                            Sau <span>→</span>
                        </button>
                    </div>
                )}
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--table-border)' }}>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '120px',
                                }}
                            >
                                Mã Đơn
                            </th>
                            <th
                                style={{
                                    textAlign: 'center',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '140px',
                                }}
                            >
                                Số Lượng
                            </th>
                            <th
                                style={{
                                    textAlign: 'center',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '160px',
                                }}
                            >
                                Trạng Thái
                            </th>
                            <th
                                style={{
                                    textAlign: 'center',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '120px',
                                }}
                            >
                                Ngày Tạo
                            </th>
                            <th
                                style={{
                                    textAlign: 'center',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '120px',
                                }}
                            >
                                Ngày Giao
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{
                                    padding: '40px',
                                    textAlign: 'center',
                                    color: 'var(--text-secondary)',
                                    fontSize: '14px'
                                }}>
                                    Chưa có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            displayedOrders.map((order, index) => (
                                <tr
                                    key={order.id || `order-${index}`}
                                    style={{
                                        borderBottom: index !== displayedOrders.length - 1 ? '1px solid var(--table-border)' : 'none',
                                        transition: 'background-color 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📦</span>
                                            <span style={{ fontWeight: '600' }}>{order.id}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-primary)', textAlign: 'center', fontWeight: '500' }}>
                                        {order.products}
                                    </td>
                                    <td style={{ padding: '18px 16px', textAlign: 'center' }}>
                                        <span
                                            style={{
                                                ...getStatusStyle(order.status),
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                                whiteSpace: 'nowrap',
                                                minWidth: '110px',
                                            }}
                                            className={`px-2 py-1 text-xs font-medium rounded ${order.statusColor}`}
                                        >
                                            {order.statusLabel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        {order.createdDate}
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        {order.deliveryDate}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
