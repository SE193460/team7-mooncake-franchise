'use client';

// Role mapping from Vietnamese labels to API codes
const ROLE_MAPPING: Record<string, string> = {
    'Tất cả vai trò': 'all',
    'Cửa Hàng': 'franchise_staff',
    'Kitchen': 'kitchen_staff',
    'Quản Lý': 'manager',
    'Quản Trị Viên': 'admin',
};

interface SearchAndFiltersProps {
    searchQuery: string;
    filterRole: string;
    onSearchChange: (value: string) => void;
    onRoleFilterChange: (role: string) => void;
}

export default function SearchAndFilters({
    searchQuery,
    filterRole,
    onSearchChange,
    onRoleFilterChange,
}: SearchAndFiltersProps) {
    return (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
                <span
                    style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        opacity: 0.4,
                    }}
                >
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    autoComplete="off"
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 16px 12px 48px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: 'white',
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#FF6B35';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E7EB';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                />
            </div>

            {/* Role Filter */}
            <select
                value={filterRole}
                onChange={(e) => onRoleFilterChange(e.target.value)}
                style={{
                    padding: '12px 20px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: '180px',
                    fontWeight: '500',
                }}
            >
                <option value="Tất cả vai trò">Tất cả vai trò</option>
                <option value="Cửa Hàng">Cửa Hàng</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Quản Lý">Quản Lý</option>
                <option value="Quản Trị Viên">Quản Trị Viên</option>
            </select>
        </div>
    );
}
