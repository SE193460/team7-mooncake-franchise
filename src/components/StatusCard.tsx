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
                backgroundColor: 'var(--card-bg)',
                border: highlighted
                    ? '2px solid var(--card-highlight-border)'
                    : '1px solid var(--table-border)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '6px',
                        fontWeight: '500',
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '6px',
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
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: highlighted ? 'var(--primary-orange)' : '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                }}
            >
                {icon}
            </div>
        </div>
    );
}
