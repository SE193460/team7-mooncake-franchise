interface Order {
    id: string;
    orderCode: string;
    products: string;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'processing' | 'fulfilled' | 'cancelled';
    statusLabel: string;
    statusColor: string;
    paymentStatus?: 'paid' | 'unpaid';
    paymentStatusLabel?: string;
    createdDate: string;
    desiredDate: string;
    deliveryDate: string;
    note: string;
}

interface DashboardOrdersTableProps {
    orders: Order[];
    totalItems?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

export default function DashboardOrdersTable({ orders, totalItems, currentPage = 1, onPageChange }: DashboardOrdersTableProps) {
    const limit = 5;
    const totalPages = totalItems ? Math.ceil(totalItems / limit) : 0;

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

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
    };

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
                {totalPages > 1 && (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => {
                                const newPage = currentPage - 1;
                                onPageChange?.(newPage);
                            }}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: currentPage === 1 ? '#f3f4f6' : 'white',
                                border: '1px solid var(--table-border)',
                                borderRadius: '6px',
                                color: currentPage === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage !== 1) {
                                    e.currentTarget.style.borderColor = 'var(--primary-orange)';
                                    e.currentTarget.style.color = 'var(--primary-orange)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage !== 1) {
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
                                    onClick={() => {
                                        onPageChange?.(p);
                                    }}
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
                                    backgroundColor: currentPage === p ? 'var(--primary-orange)' : 'transparent',
                                    color: currentPage === p ? 'white' : 'var(--text-secondary)',
                                    border: currentPage === p ? '1px solid var(--primary-orange)' : '1px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentPage !== p) {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
                                            e.currentTarget.style.color = 'var(--primary-orange)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentPage !== p) {
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
                            disabled={currentPage >= totalPages}
                            onClick={() => {
                                const newPage = currentPage + 1;
                                onPageChange?.(newPage);
                            }}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: currentPage >= totalPages ? '#f3f4f6' : 'white',
                                border: '1px solid var(--table-border)',
                                borderRadius: '6px',
                                color: currentPage >= totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage < totalPages) {
                                    e.currentTarget.style.borderColor = 'var(--primary-orange)';
                                    e.currentTarget.style.color = 'var(--primary-orange)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage < totalPages) {
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
                                Tổng Tiền
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
                                Thanh Toán
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
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{
                                    padding: '40px',
                                    textAlign: 'center',
                                    color: 'var(--text-secondary)',
                                    fontSize: '14px'
                                }}>
                                    Chưa có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr
                                    key={order.id || `order-${index}`}
                                    style={{
                                        borderBottom: index !== orders.length - 1 ? '1px solid var(--table-border)' : 'none',
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
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--primary-orange)', textAlign: 'center', fontWeight: '500' }}>
                                        {formatVND(order.totalAmount || 0)}
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
                                        >
                                            {order.statusLabel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px 16px', textAlign: 'center' }}>
                                        <span
                                            style={{
                                                backgroundColor: order.paymentStatus === 'paid' ? '#DCFCE7' : order.paymentStatus === 'unpaid' ? '#FFF7ED' : 'transparent',
                                                color: order.paymentStatus === 'paid' ? '#166534' : order.paymentStatus === 'unpaid' ? '#9A3412' : 'var(--text-secondary)',
                                                padding: order.paymentStatus ? '8px 16px' : '0',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: order.paymentStatus ? '600' : 'normal',
                                                display: 'inline-block',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {order.paymentStatusLabel || '—'}
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
