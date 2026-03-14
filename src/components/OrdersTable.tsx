import Link from 'next/link';

interface Order {
    id: string;
    orderCode: string;
    products: string;
    status: 'pending' | 'processing' | 'fulfilled' | 'confirmed' | 'cancelled';
    statusLabel: string;
    paymentStatus: 'paid' | 'unpaid' | 'unknown';
    paymentStatusLabel: string;
    totalAmount: string;
    createdDate: string;
    desiredDate: string;
    deliveryDate: string;
    note: string;
}

interface OrdersTableProps {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    backgroundColor: 'var(--status-yellow)',
                    color: 'var(--status-yellow-text)',
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
            case 'confirmed':
                return {
                    backgroundColor: 'var(--status-green)',
                    color: 'var(--status-green-text)',
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

    const getPaymentStatusStyle = (status: string) => {
        switch (status) {
            case 'paid':
                return {
                    backgroundColor: 'var(--status-green)',
                    color: 'var(--status-green-text)',
                };
            case 'unpaid':
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
                <Link
                    href="/store/tracking"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-orange)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        textDecoration: 'none',
                    }}
                >
                    Xem tất cả
                </Link>
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
                                    width: '160px',
                                }}
                            >
                                Thanh Toán
                            </th>
                            <th
                                style={{
                                    textAlign: 'right',
                                    padding: '14px 16px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '160px',
                                }}
                            >
                                Tổng Giá Trị
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
                                                ...getPaymentStatusStyle(order.paymentStatus),
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                                whiteSpace: 'nowrap',
                                                minWidth: '120px',
                                            }}
                                        >
                                            {order.paymentStatusLabel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-primary)', textAlign: 'right', fontWeight: '600' }}>
                                        {order.totalAmount}đ
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        {order.createdDate}
                                    </td>
                                    <td style={{ padding: '18px 16px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        {order.desiredDate || order.deliveryDate}
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
