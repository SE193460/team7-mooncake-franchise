'use client';

import { useState } from 'react';

export interface CreateUserFormData {
    username: string;
    email: string;
    password: string;
}

interface CreateUserModalProps {
    isOpen: boolean;
    formData: CreateUserFormData;
    loading: boolean;
    onFormChange: (field: keyof CreateUserFormData, value: string) => void;
    onSubmit: () => Promise<void>;
    onCancel: () => void;
}

export default function CreateUserModal({
    isOpen,
    formData,
    loading,
    onFormChange,
    onSubmit,
    onCancel,
}: CreateUserModalProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }}
                onClick={onCancel}
            />

            {/* Modal */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '24px',
                        borderBottom: '1px solid #E5E7EB',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                            Tạo Người Dùng Mới
                        </h2>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '8px 0 0 0' }}>
                            Nhập thông tin người dùng mới
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        style={{
                            fontSize: '24px',
                            border: 'none',
                            background: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#9CA3AF',
                            padding: 0,
                            opacity: loading ? 0.5 : 1,
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <div style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                            Tên Người Dùng *
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => onFormChange('username', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập tên người dùng"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                backgroundColor: loading ? '#F3F4F6' : 'white',
                                opacity: loading ? 0.7 : 1,
                            }}
                            onFocus={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.borderColor = '#FF6B35';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                                }
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#E5E7EB';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => onFormChange('email', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập email"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                backgroundColor: loading ? '#F3F4F6' : 'white',
                                opacity: loading ? 0.7 : 1,
                            }}
                            onFocus={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.borderColor = '#FF6B35';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                                }
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#E5E7EB';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                            Mật Khẩu *
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => onFormChange('password', e.target.value)}
                                disabled={loading}
                                placeholder="Nhập mật khẩu"
                                style={{
                                    width: '100%',
                                    padding: '12px 40px 12px 12px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    backgroundColor: loading ? '#F3F4F6' : 'white',
                                    opacity: loading ? 0.7 : 1,
                                }}
                                onFocus={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.borderColor = '#FF6B35';
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                                    }
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#E5E7EB';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                disabled={loading}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '18px',
                                    color: '#6B7280',
                                    opacity: loading ? 0.5 : 1,
                                }}
                            >
                                {passwordVisible ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '16px 24px',
                        borderTop: '1px solid #E5E7EB',
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end',
                    }}
                >
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        style={{
                            padding: '10px 24px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            color: '#6B7280',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            opacity: loading ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.borderColor = '#9CA3AF')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.borderColor = '#D1D5DB')}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading || !formData.username || !formData.email || !formData.password}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: loading || !formData.username || !formData.email || !formData.password ? '#D1D5DB' : '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading || !formData.username || !formData.email || !formData.password ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => !loading && formData.username && formData.email && formData.password && (e.currentTarget.style.backgroundColor = '#059669')}
                        onMouseLeave={(e) => !loading && formData.username && formData.email && formData.password && (e.currentTarget.style.backgroundColor = '#10B981')}
                    >
                        {loading ? '⟳ Đang tạo...' : 'Tạo Người Dùng'}
                    </button>
                </div>
            </div>
        </>
    );
}
