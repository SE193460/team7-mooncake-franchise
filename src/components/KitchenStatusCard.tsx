interface KitchenStatusCardProps {
    icon: React.ReactNode;
    count: number;
    label: string;
    subLabel: string;
    highlighted?: boolean;
    iconColor?: string;
}

export default function KitchenStatusCard({
    icon,
    count,
    label,
    subLabel,
    highlighted = false,
    iconColor = '#6b7280',
}: KitchenStatusCardProps) {
    return (
        <div
            style={{
                flex: 1,
                padding: '20px',
                backgroundColor: highlighted ? '#fffbeb' : 'white',
                border: highlighted
                    ? '2px solid #fbbf24'
                    : '1px solid var(--border-color)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                minWidth: '200px',
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                    }}
                >
                    {count}
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                    }}
                >
                    {subLabel}
                </div>
            </div>
            <div
                style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: iconColor,
                    fontSize: '20px',
                }}
            >
                {icon}
            </div>
        </div>
    );
}
