interface Order {
    id: string;
    products: string;
    status: 'pending' | 'ready' | 'delivered';
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
                    marginBottom: '16px',
                }}
            >
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Đơn Hàng Gần Đây
                </h2>
                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        cursor: 'pointer',
                    }}
                >
                    Xem tất cả
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '12px 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                            }}
                        >
                            Mã Đơn
                        </th>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '12px 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                            }}
                        >
                            Sản Phẩm
                        </th>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '12px 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                            }}
                        >
                            Trạng Thái
                        </th>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '12px 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                            }}
                        >
                            Ngày Tạo
                        </th>
                        <th
                            style={{
                                textAlign: 'left',
                                padding: '12px 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                            }}
                        >
                            Ngày Giao
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '16px 0', fontSize: '14px' }}>
                                <span style={{ color: 'var(--primary-orange)', marginRight: '8px' }}>🔗</span>
                                {order.id}
                            </td>
                            <td style={{ padding: '16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                {order.products}
                            </td>
                            <td style={{ padding: '16px 0' }}>
                                <span
                                    style={{
                                        ...getStatusStyle(order.status),
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
