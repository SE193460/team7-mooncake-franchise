'use client';

import { AdminUser } from './types';

interface DisableConfirmModalProps {
    isOpen: boolean;
    selectedUser: AdminUser | null;
    loading: boolean;
    onSubmit: () => void;
    onClose: () => void;
}

export default function DisableConfirmModal({
    isOpen,
    selectedUser,
    loading,
    onSubmit,
    onClose,
}: DisableConfirmModalProps) {
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
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1F2937' }}>
                    {selectedUser.status === 'active' ? 'Vô Hiệu Hóa Tài Khoản' : 'Kích Hoạt Tài Khoản'}
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                    {selectedUser.status === 'active'
                        ? `Bạn có chắc chắn muốn vô hiệu hóa tài khoản của ${selectedUser.username}? Người dùng không thể đăng nhập sau này.`
                        : `Bạn có chắc chắn muốn kích hoạt lại tài khoản của ${selectedUser.username}?`
                    }
                </p>

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
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading ? '#D1D5DB' : '#FF6B35',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.currentTarget.style.backgroundColor = '#E55100';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) e.currentTarget.style.backgroundColor = '#FF6B35';
                        }}
                    >
                        {loading
                            ? 'Đang xử lý...'
                            : selectedUser.status === 'active'
                                ? 'Vô Hiệu Hóa'
                                : 'Kích Hoạt'}
                    </button>
                </div>
            </div>
        </div>
    );
}
