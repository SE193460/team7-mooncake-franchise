'use client';

import { AdminUser } from './types';

interface ResetPasswordModalProps {
    isOpen: boolean;
    selectedUser: AdminUser | null;
    newPassword: string;
    loading: boolean;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}

export default function ResetPasswordModal({
    isOpen,
    selectedUser,
    newPassword,
    loading,
    onPasswordChange,
    onSubmit,
    onClose,
}: ResetPasswordModalProps) {
    if (!isOpen || !selectedUser) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '32px',
                    maxWidth: '500px',
                    width: '90%',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1F2937' }}>
                    Đặt Lại Mật Khẩu
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                    Người dùng: {selectedUser.username}
                </p>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box',
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
                    {newPassword && (
                        <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
                            Độ dài: {newPassword.length} ký tự
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#F3F4F6',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#6B7280',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#E5E7EB';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F3F4F6';
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading || !newPassword.trim()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading || !newPassword.trim() ? '#D1D5DB' : '#FF6B35',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading || !newPassword.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading && newPassword.trim()) e.currentTarget.style.backgroundColor = '#E55100';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading && newPassword.trim()) e.currentTarget.style.backgroundColor = '#FF6B35';
                        }}
                    >
                        {loading ? 'Đang đặt lại...' : 'Đặt Lại Mật Khẩu'}
                    </button>
                </div>
            </div>
        </div>
    );
}
