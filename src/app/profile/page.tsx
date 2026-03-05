'use client';

import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import Sidebar from '../../components/Sidebar';
import authService, { User, UserProfile } from '../../services/authService';

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        storeId: '',
        storeName: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);

    // Detect sidebar type based on user role
    const getSidebarType = (): 'franchise' | 'kitchen' | 'manager' | 'admin' => {
        if (!currentUser) return 'franchise';
        const role = currentUser.role?.toLowerCase();
        if (role?.includes('admin')) {
            return 'admin';
        }
        if (role?.includes('kitchen') || role?.includes('central')) {
            return 'kitchen';
        }
        if (role?.includes('manager')) {
            return 'manager';
        }
        return 'franchise';
    };

    // Get role display name
    const getRoleDisplayName = (role: string): string => {
        const roleMap: { [key: string]: string } = {
            'franchise_staff': 'Nhân Viên Cửa Hàng',
            'central_kitchen_staff': 'Nhân Viên Bếp Trung Tâm',
            'kitchen_staff': 'Nhân Viên Bếp',
            'manager': 'Quản Lý',
            'admin': 'Quản Trị Viên',
        };
        return roleMap[role] || role;
    };

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        
        // Fetch full profile from API
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoadingProfile(true);
            const profile = await authService.getUserProfile();
            setProfileData(profile);
            
            setFormData({
                username: profile.username,
                email: profile.email,
                role: getRoleDisplayName(profile.role),
                storeId: profile.franchise?.franchise_store_id || 'N/A',
                storeName: profile.franchise?.store_name || 'N/A',
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Fallback to local storage data
            const user = authService.getCurrentUser();
            if (user) {
                setFormData({
                    username: user.username,
                    email: user.email,
                    role: getRoleDisplayName(user.role),
                    storeId: user.franchise_store_id || 'N/A',
                    storeName: 'N/A',
                });
            }
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage('');
        setLoading(true);

        try {
            await authService.updateProfile({
                username: formData.username,
            });
            
            setMessage('Thông tin đã được lưu thành công!');
            
            // Update current user in state
            const updatedUser = authService.getCurrentUser();
            if (updatedUser) {
                setCurrentUser(updatedUser);
            }
            
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            console.error('Error saving profile:', error);
            setErrorMessage(error?.response?.data?.message || 'Có lỗi xảy ra khi lưu thông tin');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setMessage('');
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrorMessage('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setErrorMessage('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }

        setLoading(true);

        try {
            await authService.changePassword({
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
            });
            
            setMessage('Mật khẩu đã được thay đổi thành công! Đang đăng xuất...');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            
            // Tự động đăng xuất sau 2 giây
            setTimeout(() => {
                authService.logout();
            }, 2000);
        } catch (error: any) {
            console.error('Error changing password:', error);
            setErrorMessage(error?.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar activePage="profile" type={getSidebarType()} />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <button 
                            className={styles.backButton}
                            onClick={() => window.history.back()}
                        >
                            ←
                        </button>
                        <div>
                            <h1 className={styles.title}>Hồ Sơ Cá Nhân</h1>
                            <p className={styles.subtitle}>Quản lý thông tin tài khoản của bạn</p>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    {loadingProfile && (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Đang tải thông tin...
                        </div>
                    )}

                    {!loadingProfile && (
                        <>
                            {/* User Card */}
                            <div className={styles.userCard}>
                                <div className={styles.avatar}>
                                    {formData.username?.charAt(0).toUpperCase() || currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className={styles.userInfo}>
                                    <h3 className={styles.userName}>{formData.username || currentUser?.username || 'User'}</h3>
                                    <p className={styles.userRole}>{formData.role}</p>
                                    {formData.storeName !== 'N/A' && (
                                        <p className={styles.userStore}>{formData.storeName}</p>
                                    )}
                                </div>
                            </div>

                            {message && (
                                <div className={styles.successMessage}>
                                    {message}
                                </div>
                            )}

                            {errorMessage && (
                                <div className={styles.errorMessage}>
                                    {errorMessage}
                                </div>
                            )}

                            {/* Account Information */}
                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <span className={styles.sectionIcon}>👤</span>
                                    <h2 className={styles.sectionTitle}>Thông Tin Tài Khoản</h2>
                                </div>
                                <p className={styles.sectionSubtitle}>Cập nhật thông tin cá nhân của bạn</p>

                                <form onSubmit={handleSaveInfo} className={styles.form}>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Họ và tên</label>
                                            <div className={styles.inputWrapper}>
                                                <span className={styles.inputIcon}>👤</span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInfoChange}
                                                    className={styles.input}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Email</label>
                                            <div className={styles.inputWrapper}>
                                                <span className={styles.inputIcon}>✉️</span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInfoChange}
                                                    className={styles.input}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Vai trò</label>
                                        <div className={styles.inputWrapper}>
                                            <span className={styles.inputIcon}>⭕</span>
                                            <input
                                                type="text"
                                                value={formData.role}
                                                className={styles.input}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {formData.storeName !== 'N/A' && (
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Cửa hàng</label>
                                            <div className={styles.inputWrapper}>
                                                <span className={styles.inputIcon}>🏪</span>
                                                <input
                                                    type="text"
                                                    value={formData.storeName}
                                                    className={styles.input}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.formActions}>
                                        <button 
                                            type="submit" 
                                            className={styles.saveButton}
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Change Password */}
                            <div className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <span className={styles.sectionIcon}>🔒</span>
                                    <h2 className={styles.sectionTitle}>Đổi Mật Khẩu</h2>
                                </div>
                                <p className={styles.sectionSubtitle}>Cập nhật mật khẩu để bảo mật tài khoản</p>

                                <form onSubmit={handleChangePassword} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Mật khẩu hiện tại</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Nhập mật khẩu hiện tại"
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Mật khẩu mới</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Nhập mật khẩu mới"
                                                className={styles.input}
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Xác nhận mật khẩu</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Nhập lại mật khẩu mới"
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <button 
                                            type="submit" 
                                            className={styles.changePasswordButton}
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
