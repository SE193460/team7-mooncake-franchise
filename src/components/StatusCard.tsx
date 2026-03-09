interface StatusCardProps {
    icon: string | React.ReactNode;
    count: number;
    label: string;
    subLabel?: string;
    highlighted?: boolean;
    iconColor?: string;
    variant?: 'default' | 'kitchen'; // Thêm variant để hỗ trợ style kitchen
}

export default function StatusCard({
    icon,
    count,
    label,
    subLabel,
    highlighted = false,
    iconColor,
    variant = 'default',
}: StatusCardProps) {
    const isKitchenVariant = variant === 'kitchen';
    
    return (
        <div
            style={{
                flex: 1,
                padding: '20px',
                backgroundColor: isKitchenVariant 
                    ? (highlighted ? '#fffbeb' : 'white')
                    : 'var(--card-bg)',
                border: highlighted
                    ? (isKitchenVariant ? '2px solid #fbbf24' : '2px solid var(--card-highlight-border)')
                    : (isKitchenVariant ? '1px solid var(--border-color)' : '1px solid var(--table-border)'),
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                boxShadow: isKitchenVariant ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                minWidth: isKitchenVariant ? '200px' : undefined,
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: isKitchenVariant ? '13px' : '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: isKitchenVariant ? '8px' : '6px',
                        fontWeight: isKitchenVariant ? 'normal' : '500',
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: isKitchenVariant ? '600' : '700',
                        color: 'var(--text-primary)',
                        marginBottom: isKitchenVariant ? '4px' : '6px',
                    }}
                >
                    {count}
                </div>
                {subLabel && (
                    <div
                        style={{
                            fontSize: isKitchenVariant ? '12px' : '11px',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {subLabel}
                    </div>
                )}
            </div>
            <div
                style={{
                    width: isKitchenVariant ? '44px' : '48px',
                    height: isKitchenVariant ? '44px' : '48px',
                    borderRadius: isKitchenVariant ? '10px' : '50%',
                    backgroundColor: isKitchenVariant 
                        ? '#f9fafb'
                        : (highlighted ? 'var(--primary-orange)' : '#F3F4F6'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: iconColor,
                }}
            >
                {icon}
            </div>
        </div>
    );
}
