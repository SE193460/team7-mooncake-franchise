'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import SystemManagementTabs from './SystemManagementTabs';
import EditStoreModal, { EditStoreFormData } from './EditStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import CreateStoreModal, { CreateStoreFormData } from './CreateStoreModal';
import EditKitchenModal, { EditKitchenFormData } from './EditKitchenModal';
import DeleteKitchenModal from './DeleteKitchenModal';
import CreateKitchenModal, { CreateKitchenFormData } from './CreateKitchenModal';
import EditUserModal from './EditUserModal';
import CreateUserModal, { CreateUserFormData } from './CreateUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import DisableConfirmModal from './DisableConfirmModal';
import SearchAndFilters from './SearchAndFilters';
import adminService, { FranchiseStore, CentralKitchen } from '../../../services/adminService';
import { EditUserFormData, ModalState, AdminUser } from './types';

export default function SystemManagementPage() {
    // ============ COMMON STATE ============
    const [activeTab, setActiveTab] = useState<'stores' | 'kitchens' | 'users'>('users');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // ============ STORE STATE ============
    const [stores, setStores] = useState<FranchiseStore[]>([]);
    const [selectedStore, setSelectedStore] = useState<FranchiseStore | null>(null);
    const [editStoreModalOpen, setEditStoreModalOpen] = useState(false);
    const [deleteStoreModalOpen, setDeleteStoreModalOpen] = useState(false);
    const [createStoreModalOpen, setCreateStoreModalOpen] = useState(false);
    const [createStoreLoading, setCreateStoreLoading] = useState(false);
    const [editStoreFormData, setEditStoreFormData] = useState<EditStoreFormData>({
        store_code: '',
        store_name: '',
        store_address: '',
    });
    const [createStoreFormData, setCreateStoreFormData] = useState<CreateStoreFormData>({
        store_code: '',
        store_name: '',
        store_address: '',
    });

    // ============ KITCHEN STATE ============
    const [kitchens, setKitchens] = useState<CentralKitchen[]>([]);
    const [selectedKitchen, setSelectedKitchen] = useState<CentralKitchen | null>(null);
    const [editKitchenModalOpen, setEditKitchenModalOpen] = useState(false);
    const [deleteKitchenModalOpen, setDeleteKitchenModalOpen] = useState(false);
    const [createKitchenModalOpen, setCreateKitchenModalOpen] = useState(false);
    const [createKitchenLoading, setCreateKitchenLoading] = useState(false);
    const [editKitchenFormData, setEditKitchenFormData] = useState<EditKitchenFormData>({
        kitchen_code: '',
        kitchen_name: '',
        kitchen_address: '',
        production_capacity: 0,
    });
    const [createKitchenFormData, setCreateKitchenFormData] = useState<CreateKitchenFormData>({
        kitchen_code: '',
        kitchen_name: '',
        kitchen_address: '',
        production_capacity: 0,
    });

    // ============ USER STATE ============
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('Tất cả vai trò');
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [modals, setModals] = useState<ModalState>({
        editUser: false,
        resetPassword: false,
        disableConfirm: false,
    });
    const [editFormData, setEditFormData] = useState<EditUserFormData>({ username: '', email: '' });
    const [newPassword, setNewPassword] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
    const [createUserLoading, setCreateUserLoading] = useState(false);
    const [createUserFormData, setCreateUserFormData] = useState<CreateUserFormData>({
        role: '',
        username: '',
        email: '',
        password: '',
        franchise_store_id: '',
        central_kitchen_id: '',
    });

    // ============ FETCH FUNCTIONS ============

    // Fetch stores from API
    const fetchStores = async (showNotification: boolean = true) => {
        const toastId = showNotification ? toast.loading('Đang tải danh sách cửa hàng...') : null;
        try {
            setLoading(true);
            setError(null);
            const data = await adminService.getStores();
            
            // Deduplicate stores by franchise_store_id
            const seenIds = new Set<string>();
            const uniqueStores = data.filter(store => {
                if (seenIds.has(store.franchise_store_id)) {
                    return false;
                }
                seenIds.add(store.franchise_store_id);
                return true;
            });
            
            setStores(uniqueStores);
            
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.success(`✓ Tải dữ liệu thành công! Tổng ${uniqueStores.length} cửa hàng`, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (err) {
            setError('Không thể tải danh sách cửa hàng');
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.error('❌ Lỗi khi tải dữ liệu cửa hàng. Vui lòng thử lại!', {
                    position: 'top-right',
                    autoClose: 4000,
                });
            }
            console.error('Error fetching stores:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch kitchens from API
    const fetchKitchens = async (showNotification: boolean = true) => {
        const toastId = showNotification ? toast.loading('Đang tải danh sách bếp...') : null;
        try {
            setLoading(true);
            setError(null);
            const data = await adminService.getKitchens();
            
            // Deduplicate kitchens by central_kitchen_id
            const seenIds = new Set<string>();
            const uniqueKitchens = data.filter(kitchen => {
                if (seenIds.has(kitchen.central_kitchen_id)) {
                    return false;
                }
                seenIds.add(kitchen.central_kitchen_id);
                return true;
            });
            
            setKitchens(uniqueKitchens);
            
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.success(`✓ Tải dữ liệu thành công! Tổng ${uniqueKitchens.length} bếp`, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (err) {
            setError('Không thể tải danh sách bếp');
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.error('❌ Lỗi khi tải dữ liệu bếp. Vui lòng thử lại!', {
                    position: 'top-right',
                    autoClose: 4000,
                });
            }
            console.error('Error fetching kitchens:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch users from API
    const fetchUsers = async (keyword?: string, role?: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await adminService.getUsers(keyword, role);
            
            // Deduplicate users by user_id
            const seenIds = new Set<string>();
            const uniqueUsers = data.filter(user => {
                if (seenIds.has(user.user_id)) {
                    return false;
                }
                seenIds.add(user.user_id);
                return true;
            });
            
            setUsers(uniqueUsers);
        } catch (err) {
            setError('Không thể tải danh sách người dùng');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (activeTab === 'stores') {
            fetchStores(false);
        } else if (activeTab === 'kitchens') {
            fetchKitchens(false);
        } else if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab]);

    // ============ STORE HANDLERS ============
    const handleEditStore = (store: FranchiseStore) => {
        setSelectedStore(store);
        setEditStoreFormData({
            store_code: store.store_code,
            store_name: store.store_name,
            store_address: store.store_address,
        });
        setEditStoreModalOpen(true);
    };

    const closeEditStoreModal = () => {
        setEditStoreModalOpen(false);
        setSelectedStore(null);
        setEditStoreFormData({
            store_code: '',
            store_name: '',
            store_address: '',
        });
    };

    const submitEditStore = async () => {
        if (!selectedStore) return;

        try {
            setActionLoading(true);
            await adminService.updateStore(selectedStore.franchise_store_id, editStoreFormData);
            
            await fetchStores(false);
            closeEditStoreModal();
            
            toast.success('✓ Cập nhật cửa hàng thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật cửa hàng. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating store:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteStore = (store: FranchiseStore) => {
        setSelectedStore(store);
        setDeleteStoreModalOpen(true);
    };

    const closeDeleteStoreModal = () => {
        setDeleteStoreModalOpen(false);
        setSelectedStore(null);
    };

    const submitDeleteStore = async () => {
        if (!selectedStore || selectedStore.store_status !== 'active') return;

        try {
            setActionLoading(true);
            const newStatus = 'inactive';
            await adminService.updateStoreStatus(selectedStore.franchise_store_id, newStatus);
            
            await fetchStores(false);
            closeDeleteStoreModal();
            
            toast.success(`✓ Vô hiệu hóa cửa hàng thành công!`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật trạng thái. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating store status:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const openCreateStoreModal = () => {
        setCreateStoreFormData({
            store_code: '',
            store_name: '',
            store_address: '',
        });
        setCreateStoreModalOpen(true);
    };

    const closeCreateStoreModal = () => {
        setCreateStoreModalOpen(false);
        setCreateStoreFormData({
            store_code: '',
            store_name: '',
            store_address: '',
        });
    };

    const submitCreateStore = async () => {
        if (!createStoreFormData.store_code || !createStoreFormData.store_name || !createStoreFormData.store_address) return;

        try {
            setCreateStoreLoading(true);
            await adminService.createStore(createStoreFormData);
            
            await fetchStores(false);
            closeCreateStoreModal();
            
            toast.success('✓ Tạo cửa hàng thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi tạo cửa hàng. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error creating store:', err);
        } finally {
            setCreateStoreLoading(false);
        }
    };

    // ============ KITCHEN HANDLERS ============
    const handleEditKitchen = (kitchen: CentralKitchen) => {
        setSelectedKitchen(kitchen);
        setEditKitchenFormData({
            kitchen_code: kitchen.kitchen_code,
            kitchen_name: kitchen.kitchen_name,
            kitchen_address: kitchen.kitchen_address,
            production_capacity: kitchen.capacity,
        });
        setEditKitchenModalOpen(true);
    };

    const closeEditKitchenModal = () => {
        setEditKitchenModalOpen(false);
        setSelectedKitchen(null);
        setEditKitchenFormData({
            kitchen_code: '',
            kitchen_name: '',
            kitchen_address: '',
            production_capacity: 0,
        });
    };

    const submitEditKitchen = async () => {
        if (!selectedKitchen) return;

        try {
            setActionLoading(true);
            await adminService.updateKitchen(selectedKitchen.central_kitchen_id, editKitchenFormData);
            
            await fetchKitchens(false);
            closeEditKitchenModal();
            
            toast.success('✓ Cập nhật bếp trung tâm thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật bếp. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating kitchen:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteKitchen = (kitchen: CentralKitchen) => {
        setSelectedKitchen(kitchen);
        setDeleteKitchenModalOpen(true);
    };

    const closeDeleteKitchenModal = () => {
        setDeleteKitchenModalOpen(false);
        setSelectedKitchen(null);
    };

    const submitDeleteKitchen = async () => {
        if (!selectedKitchen || selectedKitchen.kitchen_status !== 'active') return;

        try {
            setActionLoading(true);
            const newStatus = 'inactive';
            await adminService.updateKitchenStatus(selectedKitchen.central_kitchen_id, newStatus);
            
            await fetchKitchens(false);
            closeDeleteKitchenModal();
            
            toast.success(`✓ Vô hiệu hóa bếp trung tâm thành công!`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật trạng thái. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating kitchen status:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const openCreateKitchenModal = () => {
        setCreateKitchenFormData({
            kitchen_code: '',
            kitchen_name: '',
            kitchen_address: '',
            production_capacity: 0,
        });
        setCreateKitchenModalOpen(true);
    };

    const closeCreateKitchenModal = () => {
        setCreateKitchenModalOpen(false);
        setCreateKitchenFormData({
            kitchen_code: '',
            kitchen_name: '',
            kitchen_address: '',
            production_capacity: 0,
        });
    };

    const submitCreateKitchen = async () => {
        if (!createKitchenFormData.kitchen_code || !createKitchenFormData.kitchen_name || !createKitchenFormData.kitchen_address || !createKitchenFormData.production_capacity) return;

        try {
            setCreateKitchenLoading(true);
            await adminService.createKitchen(createKitchenFormData);
            
            await fetchKitchens(false);
            closeCreateKitchenModal();
            
            toast.success('✓ Tạo bếp trung tâm thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi tạo bếp trung tâm. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error creating kitchen:', err);
        } finally {
            setCreateKitchenLoading(false);
        }
    };

    // ============ USER HANDLERS ============
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        if (searchTimeout) clearTimeout(searchTimeout);
        const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
            if (isModalOpen) return;
            // Map Vietnamese labels to role codes
            const roleCodeMap: Record<string, string> = {
                'Tất cả vai trò': 'all',
                'Cửa Hàng': 'franchise_staff',
                'Kitchen': 'kitchen_staff',
                'Quản Lý': 'manager',
                'Quản Trị Viên': 'admin',
            };
            const roleCode = roleCodeMap[filterRole] === 'all' ? undefined : roleCodeMap[filterRole];
            fetchUsers(value || undefined, roleCode);
        }, 500);
        setSearchTimeout(timeout);
    };

    const handleRoleFilter = (role: string) => {
        setFilterRole(role);
        if (isModalOpen) {
            return;
        }
        // Map Vietnamese labels to role codes
        const roleCodeMap: Record<string, string> = {
            'Tất cả vai trò': 'all',
            'Cửa Hàng': 'franchise_staff',
            'Kitchen': 'kitchen_staff',
            'Quản Lý': 'manager',
            'Quản Trị Viên': 'admin',
        };
        const roleCode = roleCodeMap[role] === 'all' ? undefined : roleCodeMap[role];
        const keyword = searchQuery || undefined;
        fetchUsers(keyword, roleCode);
    };

    const openEditModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setEditFormData({ username: user.username, email: user.email });
        setModals((prev: ModalState) => ({ ...prev, editUser: true }));
    };

    const closeEditModal = () => {
        setModals((prev: ModalState) => ({ ...prev, editUser: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
        setEditFormData({ username: '', email: '' });
    };

    const openResetPasswordModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setNewPassword('');
        setModals((prev: ModalState) => ({ ...prev, resetPassword: true }));
    };

    const closeResetPasswordModal = () => {
        setModals((prev: ModalState) => ({ ...prev, resetPassword: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
        setNewPassword('');
    };

    const openDisableConfirmModal = (user: AdminUser) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setSelectedUser(user);
        setModals((prev: ModalState) => ({ ...prev, disableConfirm: true }));
    };

    const closeDisableConfirmModal = () => {
        setModals((prev: ModalState) => ({ ...prev, disableConfirm: false }));
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleEditUser = async () => {
        if (!selectedUser) return;
        
        try {
            setActionLoading(true);
            await adminService.updateUser(selectedUser.user_id, {
                username: editFormData.username,
                email: editFormData.email,
            });
            
            // Search to refresh
            const role = filterRole === 'Tất cả vai trò' ? undefined : filterRole;
            await fetchUsers(searchQuery || undefined, role);
            closeEditModal();
            toast.success('✓ Cập nhật thông tin người dùng thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật thông tin người dùng!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating user:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!selectedUser || !newPassword.trim()) {
            toast.error('Vui lòng nhập mật khẩu mới', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            setActionLoading(true);
            await adminService.resetPassword(selectedUser.user_id, newPassword);
            
            const role = filterRole === 'Tất cả vai trò' ? undefined : filterRole;
            await fetchUsers(searchQuery || undefined, role);
            closeResetPasswordModal();
            toast.success('✓ Đặt lại mật khẩu thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi đặt lại mật khẩu!', {
                position: 'top-right',
                autoClose: 4000,
            });
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
            
            const role = filterRole === 'Tất cả vai trò' ? undefined : filterRole;
            await fetchUsers(searchQuery || undefined, role);
            closeDisableConfirmModal();
            toast.success(`✓ ${newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'} tài khoản thành công!`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi cập nhật trạng thái tài khoản!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error updating account status:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const openCreateUserModal = () => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setIsModalOpen(true);
        setCreateUserModalOpen(true);
        setCreateUserFormData({ role: '', username: '', email: '', password: '', franchise_store_id: '', central_kitchen_id: '' });
    };

    const closeCreateUserModal = () => {
        setCreateUserModalOpen(false);
        setIsModalOpen(false);
        setCreateUserFormData({ role: '', username: '', email: '', password: '', franchise_store_id: '', central_kitchen_id: '' });
    };

    const handleCreateUserFormChange = (field: string, value: string) => {
        setCreateUserFormData((prev) => ({ ...prev, [field]: value }));
    };

    const submitCreateUser = async () => {
        if (!createUserFormData.role || !createUserFormData.username || !createUserFormData.email || !createUserFormData.password) {
            toast.error('Vui lòng điền đầy đủ thông tin', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            setCreateUserLoading(true);
            const requestData: any = {
                role: createUserFormData.role,
                username: createUserFormData.username,
                email: createUserFormData.email,
                password: createUserFormData.password,
            };

            if (createUserFormData.role === 'franchise_staff' && createUserFormData.franchise_store_id) {
                requestData.franchise_store_id = createUserFormData.franchise_store_id;
            } else if ((createUserFormData.role === 'kitchen_staff' || createUserFormData.role === 'manager') && createUserFormData.central_kitchen_id) {
                requestData.central_kitchen_id = createUserFormData.central_kitchen_id;
            }

            await adminService.createUser(requestData);
            
            // Reset form
            setCreateUserFormData({
                role: '',
                username: '',
                email: '',
                password: '',
                franchise_store_id: '',
                central_kitchen_id: '',
            });

            // Refresh users list
            const role = filterRole === 'Tất cả vai trò' ? undefined : filterRole;
            await fetchUsers(searchQuery || undefined, role);
            closeCreateUserModal();
            toast.success('✓ Tạo người dùng mới thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.error('❌ Lỗi khi tạo người dùng mới!', {
                position: 'top-right',
                autoClose: 4000,
            });
            console.error('Error creating user:', err);
        } finally {
            setCreateUserLoading(false);
        }
    };

    // Filter users by search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        const userRoleLabel = user.role_label || user.role;
        const matchesRole = filterRole === 'Tất cả vai trò' || 
            user.role === filterRole ||
            userRoleLabel === filterRole;
        
        return matchesSearch && matchesRole;
    });

    // ============ RENDER ============
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="system-management" type="admin" />
            
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                                Quản Lý Hệ Thống
                            </h1>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                Quản lý cửa hàng, bếp trung tâm và người dùng
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (activeTab === 'stores') {
                                    openCreateStoreModal();
                                } else if (activeTab === 'kitchens') {
                                    openCreateKitchenModal();
                                } else {
                                    openCreateUserModal();
                                }
                            }}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#10B981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                        >
                            + Thêm {activeTab === 'stores' ? 'Cửa Hàng' : activeTab === 'kitchens' ? 'Bếp Trung Tâm' : 'Người Dùng'}
                        </button>
                    </div>

                    {/* Tab Navigation and Content */}
                    {activeTab === 'users' && (
                        <SearchAndFilters
                            searchQuery={searchQuery}
                            filterRole={filterRole}
                            onSearchChange={handleSearch}
                            onRoleFilterChange={handleRoleFilter}
                        />
                    )}

                    <SystemManagementTabs 
                        activeTab={activeTab} 
                        onTabChange={setActiveTab} 
                        stores={stores} 
                        kitchens={kitchens}
                        users={filteredUsers}
                        loading={loading} 
                        error={error}
                        onEditStore={handleEditStore}
                        onDeleteStore={handleDeleteStore}
                        onEditKitchen={handleEditKitchen}
                        onDeleteKitchen={handleDeleteKitchen}
                        openMenuId={openMenuId}
                        onMenuToggle={setOpenMenuId}
                        onEditUser={openEditModal}
                        onResetPasswordUser={openResetPasswordModal}
                        onDisableUser={openDisableConfirmModal}
                    />
                </div>
            </div>

            {/* STORE MODALS */}
            <EditStoreModal
                isOpen={editStoreModalOpen}
                selectedStore={selectedStore}
                formData={editStoreFormData}
                loading={actionLoading}
                onFormDataChange={setEditStoreFormData}
                onSubmit={submitEditStore}
                onClose={closeEditStoreModal}
            />

            <DeleteStoreModal
                isOpen={deleteStoreModalOpen}
                selectedStore={selectedStore}
                loading={actionLoading}
                onSubmit={submitDeleteStore}
                onClose={closeDeleteStoreModal}
            />

            <CreateStoreModal
                isOpen={createStoreModalOpen}
                formData={createStoreFormData}
                loading={createStoreLoading}
                onFormChange={(field, value) => setCreateStoreFormData({ ...createStoreFormData, [field]: value })}
                onSubmit={submitCreateStore}
                onCancel={closeCreateStoreModal}
            />

            {/* KITCHEN MODALS */}
            <EditKitchenModal
                isOpen={editKitchenModalOpen}
                selectedKitchen={selectedKitchen}
                formData={editKitchenFormData}
                loading={actionLoading}
                onFormDataChange={setEditKitchenFormData}
                onSubmit={submitEditKitchen}
                onClose={closeEditKitchenModal}
            />

            <DeleteKitchenModal
                isOpen={deleteKitchenModalOpen}
                selectedKitchen={selectedKitchen}
                loading={actionLoading}
                onSubmit={submitDeleteKitchen}
                onClose={closeDeleteKitchenModal}
            />

            <CreateKitchenModal
                isOpen={createKitchenModalOpen}
                formData={createKitchenFormData}
                loading={createKitchenLoading}
                onFormChange={(field, value) => setCreateKitchenFormData({ ...createKitchenFormData, [field]: value })}
                onSubmit={submitCreateKitchen}
                onCancel={closeCreateKitchenModal}
            />

            {/* USER MODALS */}
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

            <CreateUserModal
                isOpen={createUserModalOpen}
                formData={createUserFormData}
                loading={createUserLoading}
                onFormChange={handleCreateUserFormChange}
                onSubmit={submitCreateUser}
                onCancel={closeCreateUserModal}
                stores={stores}
                kitchens={kitchens}
            />
        </div>
    );
}
