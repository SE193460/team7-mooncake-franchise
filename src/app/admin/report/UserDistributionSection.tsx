'use client';

interface RoleDistributionItem {
    role: string;
    total: number;
    active: number;
    inactive: number;
}

interface UserDistributionSectionProps {
    data: RoleDistributionItem[];
}

const ROLE_LABELS: Record<string, string> = {
    'franchise_staff': 'Nhân viên cửa hàng Franchise',
    'kitchen_staff': 'Nhân viên bếp trung tâm',
    'coordinator': 'Điều phối viên',
    'manager': 'Quản Lý',
    'admin': 'Quản Trị Viên',
};

export default function UserDistributionSection({ data }: UserDistributionSectionProps) {
    // Filter to only show: franchise_staff, kitchen_staff, admin, manager
    const allowedRoles = ['franchise_staff', 'kitchen_staff', 'admin', 'manager'];
    const filteredData = data.filter(item => allowedRoles.includes(item.role));
    return (
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>👥</span> Phân Bố Nhân Sự Theo Vai Trò
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
                                    VAI TRÒ
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    TỔNG SỐ
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    HOẠT ĐỘNG
                                </th>
                                <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase' }}>
                                    KHÔNG HĐ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        borderBottom: index !== filteredData.length - 1 ? '1px solid #F3F4F6' : 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '18px 24px', fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                                        {ROLE_LABELS[item.role] || item.role}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                                        {item.total}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', fontWeight: '600', color: '#10B981' }}>
                                        {item.active}
                                    </td>
                                    <td style={{ padding: '18px 24px', fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>
                                        {item.inactive}
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
