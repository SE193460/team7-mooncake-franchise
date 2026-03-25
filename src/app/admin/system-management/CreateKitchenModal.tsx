'use client';

import { useState } from 'react';

export interface CreateKitchenFormData {
    kitchen_code: string;
    kitchen_name: string;
    kitchen_address: string;
    production_capacity: number;
}

interface CreateKitchenModalProps {
    isOpen: boolean;
    formData: CreateKitchenFormData;
    loading: boolean;
    onFormChange: (field: keyof CreateKitchenFormData, value: string | number) => void;
    onSubmit: () => Promise<void>;
    onCancel: () => void;
}

export default function CreateKitchenModal({
    isOpen,
    formData,
    loading,
    onFormChange,
    onSubmit,
    onCancel,
}: CreateKitchenModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <style>{`
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type="number"] {
                    -moz-appearance: textfield;
                }
            `}</style>

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
                            Tạo Bếp Trung Tâm Mới
                        </h2>
                        <p style={{ fontSize: '13px', color: '#6B7280', margin: '8px 0 0 0' }}>
                            Nhập thông tin bếp trung tâm mới
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
                            Mã Bếp <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.kitchen_code}
                            onChange={(e) => onFormChange('kitchen_code', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập mã bếp (VD: CK-001)"
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
                            Tên Bếp <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.kitchen_name}
                            onChange={(e) => onFormChange('kitchen_name', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập tên bếp"
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
                            Địa Chỉ <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <textarea
                            value={formData.kitchen_address}
                            onChange={(e) => onFormChange('kitchen_address', e.target.value)}
                            disabled={loading}
                            placeholder="Nhập địa chỉ bếp"
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

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                            Công Suất Sản Xuất (hộp/ngày) <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    const newValue = Math.max(1, (formData.production_capacity || 0) - 1);
                                    onFormChange('production_capacity', newValue);
                                }}
                                disabled={loading || (formData.production_capacity || 0) <= 1}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: '0',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    backgroundColor: (formData.production_capacity || 0) <= 1 ? '#F3F4F6' : 'white',
                                    cursor: (formData.production_capacity || 0) <= 1 ? 'not-allowed' : 'pointer',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: (formData.production_capacity || 0) <= 1 ? '#D1D5DB' : '#FF6B35',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading && (formData.production_capacity || 0) > 1) {
                                        e.currentTarget.style.borderColor = '#FF6B35';
                                        e.currentTarget.style.backgroundColor = '#FFF5F0';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#E5E7EB';
                                    e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={formData.production_capacity || ''}
                                onChange={(e) => {
                                    const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                    onFormChange('production_capacity', val);
                                }}
                                disabled={loading}
                                placeholder="Nhập số"
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s',
                                    backgroundColor: loading ? '#F3F4F6' : 'white',
                                    opacity: loading ? 0.7 : 1,
                                    textAlign: 'center',
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
                                onClick={() => {
                                    const newValue = (formData.production_capacity || 0) + 1;
                                    onFormChange('production_capacity', newValue);
                                }}
                                disabled={loading}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: '0',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    backgroundColor: loading ? '#F3F4F6' : 'white',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: loading ? '#D1D5DB' : '#FF6B35',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: loading ? 0.7 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.borderColor = '#FF6B35';
                                        e.currentTarget.style.backgroundColor = '#FFF5F0';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#E5E7EB';
                                    e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                +
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
                        {loading ? '⟳ Đang tạo...' : 'Tạo Bếp'}
                    </button>
                </div>
            </div>
        </>
    );
}
