'use client';

interface FinanceSectionProps {
    stats: {
        revenue: number;
        orders: number;
        expectedRevenue: number;
        profitMargin: number;
    };
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(value);
};

export default function FinanceSection({ stats }: FinanceSectionProps) {
    const financialCards = [
        {
            title: 'Đã Thu',
            value: formatCurrency(stats.revenue),
            icon: '💵',
            color: '#10B981',
        },
        {
            title: 'Chờ Thu',
            value: formatCurrency(stats.orders),
            icon: '📊',
            color: '#F59E0B',
        },
        {
            title: 'Tổng Giá Trị Đơn',
            value: formatCurrency(stats.expectedRevenue),
            icon: '💰',
            color: '#FF6B35',
        },
        {
            title: 'Tỷ Lệ Thu',
            value: `${stats.profitMargin}%`,
            icon: '📈',
            color: '#0EA5E9',
        },
    ];

    return (
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💳</span> Tài Chính
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {financialCards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            border: `2px solid ${card.color}22`,
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px', fontWeight: '500' }}>
                                    {card.title}
                                </p>
                                <p style={{ fontSize: '26px', fontWeight: '700', color: card.color }}>
                                    {card.value}
                                </p>
                            </div>
                            <span style={{ fontSize: '24px' }}>{card.icon}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
