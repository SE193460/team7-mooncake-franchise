'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import adminService from '../../../services/adminService';
import EditUserModal from './EditUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import DisableConfirmModal from './DisableConfirmModal';
import SearchAndFilters from './SearchAndFilters';
import UsersTable from './UsersTable';
import { EditUserFormData, ModalState, AdminUser } from './types';

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('Tất cả vai trò');
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [modals, setModals] = useState<ModalState>({
        editUser: false,
        resetPassword: false,
        disableConfirm: false,
    });
    const [editFormData, setEditFormData] = useState<EditUserFormData>({ username: '', email: '' });
    const [newPassword, setNewPassword] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch users from API
    const fetchUsers = async (keyword?: string, role?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminService.getUsers(keyword, role);
            setUsers(data);
        } catch (err) {
            setError('Không thể tải danh sách người dùng');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle search with debounce
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const timeout = setTimeout(() => {
            // Don't search if modal is open
            if (isModalOpen) return;
            const role = filterRole === 'Tất cả vai trò' ? undefined : filterRole;
            fetchUsers(value || undefined, role);
        }, 500);
        setSearchTimeout(timeout);
    };

    // Handle role filter
    const handleRoleFilter = (role: string) => {
        setFilterRole(role);
        // Don't filter if modal is open
        if (isModalOpen) {
            return;
        }
        const roleValue = role === 'Tất cả vai trò' ? undefined : role;
        const keyword = searchQuery || undefined;
        fetchUsers(keyword, roleValue);
    };

    // Status badge styling
    const getStatusBadgeStyle = (status: string) => {
        if (status === 'active') {
            return {
                backgroundColor: '#D1FAE5',
                color: '#059669',
            };
        }
        return {
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
        };
    };

    // Format date to vi-VN format
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Modal state management
    const openEditModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setEditFormData({ username: user.username, email: user.email });
        setModals(prev => ({ ...prev, editUser: true }));
    };

    const closeEditModal = () => {
        setModals(prev => ({ ...prev, editUser: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
        setEditFormData({ username: '', email: '' });
    };

    const openResetPasswordModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setNewPassword('');
        setModals(prev => ({ ...prev, resetPassword: true }));
    };

    const closeResetPasswordModal = () => {
        setModals(prev => ({ ...prev, resetPassword: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
        setNewPassword('');
    };

    const openDisableConfirmModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setModals(prev => ({ ...prev, disableConfirm: true }));
    };

    const closeDisableConfirmModal = () => {
        setModals(prev => ({ ...prev, disableConfirm: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Action handlers
    const handleEditUser = async () => {
        if (!selectedUser) return;
        
        try {
            setActionLoading(true);
            await adminService.updateUser(selectedUser.user_id, {
                username: editFormData.username,
                email: editFormData.email,
            });
            
            // Refresh user list
            await fetchUsers();
            closeEditModal();
            alert('Cập nhật thông tin người dùng thành công');
        } catch (err) {
            alert('Lỗi khi cập nhật thông tin người dùng');
            console.error('Error updating user:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!selectedUser || !newPassword.trim()) {
            alert('Vui lòng nhập mật khẩu mới');
            return;
        }

        try {
            setActionLoading(true);
            await adminService.resetPassword(selectedUser.user_id, newPassword);
            
            // Refresh user list
            await fetchUsers();
            closeResetPasswordModal();
            alert('Đặt lại mật khẩu thành công');
        } catch (err) {
            alert('Lỗi khi đặt lại mật khẩu');
            console.error('Error resetting password:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDisableAccount = async () => {
        if (!selectedUser) return;

        try {
            setActionLoading(true);
            const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
            await adminService.updateUserStatus(selectedUser.user_id, newStatus);
            
            // Refresh user list
            await fetchUsers();
            closeDisableConfirmModal();
            alert(`${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} tài khoản thành công`);
        } catch (err) {
            alert('Lỗi khi cập nhật trạng thái tài khoản');
            console.error('Error updating account status:', err);
        } finally {
            setActionLoading(false);
        }
    };

    // Filter users by search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Convert role to display text
        const userRoleLabel = user.role_label || user.role;
        const matchesRole = filterRole === 'Tất cả vai trò' || 
            user.role === filterRole ||
            userRoleLabel === filterRole;
        
        return matchesSearch && matchesRole;
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="users" type="admin" />

            <main style={{ flex: 1, padding: '32px 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Quản Lý Người Dùng
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Quản lý tài khoản và phân quyền người dùng
                    </p>
                </div>

                {/* Filter Bar */}
                <SearchAndFilters
                    searchQuery={searchQuery}
                    filterRole={filterRole}
                    onSearchChange={handleSearch}
                    onRoleFilterChange={handleRoleFilter}
                />

                {/* Users Table */}
                <UsersTable
                    users={filteredUsers}
                    loading={loading}
                    error={error}
                    openMenuId={openMenuId}
                    onMenuToggle={(userId) =>
                        setOpenMenuId(openMenuId === userId ? null : userId)
                    }
                    onEditClick={openEditModal}
                    onResetPasswordClick={openResetPasswordModal}
                    onDisableClick={openDisableConfirmModal}
                />
            </main>

            {/* Modal Components */}
            <EditUserModal
                isOpen={modals.editUser}
                selectedUser={selectedUser}
                formData={editFormData}
                loading={actionLoading}
                onFormDataChange={setEditFormData}
                onSubmit={handleEditUser}
                onClose={closeEditModal}
            />

            <ResetPasswordModal
                isOpen={modals.resetPassword}
                selectedUser={selectedUser}
                newPassword={newPassword}
                loading={actionLoading}
                onPasswordChange={setNewPassword}
                onSubmit={handleResetPassword}
                onClose={closeResetPasswordModal}
            />

            <DisableConfirmModal
                isOpen={modals.disableConfirm}
                selectedUser={selectedUser}
                loading={actionLoading}
                onSubmit={handleDisableAccount}
                onClose={closeDisableConfirmModal}
            />
        </div>
    );
}
