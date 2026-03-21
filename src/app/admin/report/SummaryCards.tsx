'use client';

interface SummaryCardsProps {
    stats: {
        totalUsers: number;
        activeStores: number;
        totalOrders: number;
        totalInventory: number;
    };
}

export default function SummaryCards({ stats }: SummaryCardsProps) {
    const cards = [
        {
            label: 'Người Dùng',
            value: stats.totalUsers,
            icon: '👥',
            color: '#F3F4F6',
            borderColor: '#10B981',
        },
        {
            label: 'Cửa Hàng Franchise',
            value: stats.activeStores,
            icon: '🏪',
            color: '#F3F4F6',
            borderColor: '#F59E0B',
        },
        {
            label: 'Tổng Đơn Hàng',
            value: stats.totalOrders,
            icon: '🛒',
            color: '#F3F4F6',
            borderColor: '#FF6B35',
        },
        {
            label: 'Tổng Tồn Kho',
            value: stats.totalInventory,
            icon: '📦',
            color: '#F3F4F6',
            borderColor: '#0EA5E9',
        },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {cards.map((card, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        border: `3px solid ${card.borderColor}`,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
                                {card.label}
                            </p>
                            <p style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937' }}>
                                {card.value}
                            </p>
                        </div>
                        <span style={{ fontSize: '28px' }}>{card.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
