'use client';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(value);
};

export default function OrderByStoreSection() {
    const storeOrders = [
        {
            storeName: 'Chi nhánh Quận 1',
            storeId: 'STR-001',
            totalOrders: 6,
            totalValue: 78700000,
            receivedPayment: 4000000,
            pendingPayment: 39600000,
            status: 'Hoạt Động',
        },
        {
            storeName: 'Chi nhánh Quận 3',
            storeId: 'STR-002',
            totalOrders: 3,
            totalValue: 22250000,
            receivedPayment: 9000000,
            pendingPayment: 0,
            status: 'Hoạt Động',
        },
        {
            storeName: 'Chi nhánh Quận 7',
            storeId: 'STR-003',
            totalOrders: 2,
            totalValue: 25400000,
            receivedPayment: 0,
            pendingPayment: 0,
            status: 'Hoạt Động',
        },
        {
            storeName: 'Chi nhánh Bình Thạnh',
            storeId: 'STR-004',
            totalOrders: 0,
            totalValue: 0,
            receivedPayment: 0,
            pendingPayment: 0,
            status: 'Ngưng Hoạt Động',
        },
    ];

    return (
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🏪</span> Doanh Thu Theo Cửa Hàng
            </h2>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                            <tr>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    CỬA HÀNG
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    TỔNG ĐƠN
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    TỔNG GIÁ TRỊ
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    ĐÃ THU
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    CHỜ THU
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    TRẠNG THÁI
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {storeOrders.map((store, index) => (
                                <tr
                                    key={store.storeId}
                                    style={{
                                        borderBottom: index !== storeOrders.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px' }}>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                                {store.storeName}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                                {store.storeId}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                                        {store.totalOrders}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                                        {formatCurrency(store.totalValue)}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#10B981', fontWeight: '600' }}>
                                        {formatCurrency(store.receivedPayment)}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#F59E0B', fontWeight: '600' }}>
                                        {store.pendingPayment === 0 ? '—' : formatCurrency(store.pendingPayment)}
                                    </td>
                                    <td style={{ padding: '18px 24px' }}>
                                        <span
                                            style={{
                                                backgroundColor: store.status === 'Hoạt Động' ? '#D1FAE5' : '#FEE2E2',
                                                color: store.status === 'Hoạt Động' ? '#059669' : '#DC2626',
                                                padding: '6px 12px',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {store.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
