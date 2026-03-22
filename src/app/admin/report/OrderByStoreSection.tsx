'use client';

interface StoreReportItem {
    franchise_store_id: number;
    store_name: string;
    total_orders: number;
    total_value: number;
    paid_amount: number;
    unpaid_amount: number;
}

interface OrderByStoreSectionProps {
    data: StoreReportItem[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(value);
};

export default function OrderByStoreSection({ data }: OrderByStoreSectionProps) {
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((store, index) => (
                                <tr
                                    key={store.franchise_store_id}
                                    style={{
                                        borderBottom: index !== data.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                            {store.store_name}
                                        </div>
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                                        {store.total_orders}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#1F2937', fontWeight: '600' }}>
                                        {formatCurrency(store.total_value)}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#10B981', fontWeight: '600' }}>
                                        {formatCurrency(store.paid_amount)}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', color: '#F59E0B', fontWeight: '600' }}>
                                        {store.unpaid_amount === 0 ? '—' : formatCurrency(store.unpaid_amount)}
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
