interface Order {
    id: string;
    products: string;
    status: 'pending' | 'ready' | 'preparing' | 'delivered' | 'completed';
    statusLabel: string;
    createdDate: string;
    deliveryDate: string;
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
            case 'ready':
                return {
                    backgroundColor: 'var(--status-blue)',
                    color: 'var(--status-blue-text)',
                };
            case 'preparing':
                return {
                    backgroundColor: 'var(--status-orange)',
                    color: 'var(--status-orange-text)',
                };
            case 'delivered':
                return {
                    backgroundColor: 'var(--status-purple)',
                    color: 'var(--status-purple-text)',
                };
            case 'completed':
                return {
                    backgroundColor: 'var(--status-green)',
                    color: 'var(--status-green-text)',
                };
            default:
                return {
                    backgroundColor: '#f3f4f6',
                    color: 'var(--text-secondary)',
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
                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-orange)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '500',
                    }}
                >
                    Xem tất cả
                </button>
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--table-border)' }}>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Mã Đơn
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Sản Phẩm
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Trạng Thái
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Ngày Tạo
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '12px 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                Ngày Giao
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ 
                                    padding: '24px', 
                                    textAlign: 'center', 
                                    color: 'var(--text-secondary)',
                                    fontSize: '14px'
                                }}>
                                    Chưa có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={order.id || `order-${index}`} style={{ borderBottom: '1px solid var(--table-border)' }}>
                                    <td style={{ padding: '16px 0', fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                        <span style={{ color: 'var(--primary-orange)', marginRight: '8px' }}>📎</span>
                                        {order.id}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {order.products}
                                    </td>
                                    <td style={{ padding: '16px 0' }}>
                                        <span
                                            style={{
                                                ...getStatusStyle(order.status),
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {order.statusLabel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {order.createdDate}
                                    </td>
                                    <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {order.deliveryDate || '—'}
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
