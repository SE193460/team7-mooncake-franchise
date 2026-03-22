'use client';

interface OrderStatusSectionProps {
    data: {
        pending: number;
        approved: number;
        processing: number;
        fulfilled: number;
        confirmed: number;
        cancelled: number;
    };
}

export default function OrderStatusSection({ data }: OrderStatusSectionProps) {
    const orderStatuses = [
        { label: 'Chờ xử lý', count: data.pending, color: '#F59E0B' },
        { label: 'Đã chấp nhận', count: data.approved, color: '#10B981' },
        { label: 'Sắn sàng giao', count: data.processing, color: '#0EA5E9' },
        { label: 'Đã giao', count: data.fulfilled, color: '#8B5CF6' },
        { label: 'Xác nhận', count: data.confirmed, color: '#088FF7' },
        { label: 'Từ chối', count: data.cancelled, color: '#EF4444' },
    ];

    return (
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📦</span> Trạng Thái Đơn Hàng
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {orderStatuses.map((status, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px',
                            border: `2px solid ${status.color}`,
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '28px', fontWeight: '700', color: status.color, marginBottom: '8px' }}>
                                {status.count}
                            </p>
                            <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>
                                {status.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
