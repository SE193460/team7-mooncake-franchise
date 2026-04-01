'use client';

import { useState } from 'react';

export interface CreateStoreFormData {
    store_code: string;
    store_name: string;
    store_address: string;
}

interface CreateStoreModalProps {
    isOpen: boolean;
    formData: CreateStoreFormData;
    loading: boolean;
    onFormChange: (field: keyof CreateStoreFormData, value: string) => void;
    onSubmit: () => Promise<void>;
    onCancel: () => void;
}

export default function CreateStoreModal({
    isOpen,
    formData,
    loading,
    onFormChange,
    onSubmit,
    onCancel,
}: CreateStoreModalProps) {
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
                            Tạo Cửa Hàng Mới
                        </h2>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '8px 0 0 0' }}>
                            Nhập thông tin cửa hàng mới
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
                            Mã Cửa Hàng <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.store_code}
                            onChange={(e) => onFormChange('store_code', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập mã cửa hàng (VD: FS001)"
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
                            Tên Cửa Hàng <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.store_name}
                            onChange={(e) => onFormChange('store_name', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập tên cửa hàng"
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
                            Địa Chỉ <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <textarea
                            value={formData.store_address}
                            onChange={(e) => onFormChange('store_address', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập địa chỉ cửa hàng"
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
                                fontFamily: 'inherit',
                                minHeight: '80px',
                                resize: 'vertical',
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
                        disabled={loading}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: loading ? '#D1D5DB' : '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#059669')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#10B981')}
                    >
                        {loading ? '⟳ Đang tạo...' : 'Tạo Cửa Hàng'}
                    </button>
                </div>
            </div>
        </>
    );
}
