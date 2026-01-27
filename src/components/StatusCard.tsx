interface StatusCardProps {
    icon: string;
    count: number;
    label: string;
    subLabel: string;
    highlighted?: boolean;
}

export default function StatusCard({
    icon,
    count,
    label,
    subLabel,
    highlighted = false,
}: StatusCardProps) {
    return (
        <div
            style={{
                flex: 1,
                padding: '20px',
                backgroundColor: highlighted ? 'var(--card-highlight-bg)' : 'white',
                border: highlighted
                    ? '2px solid var(--card-highlight-border)'
                    : '1px solid var(--border-color)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '4px',
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
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                    }}
                >
                    {subLabel}
                </div>
            </div>
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: highlighted ? 'var(--primary-orange)' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                }}
            >
                {icon}
            </div>
        </div>
    );
}
