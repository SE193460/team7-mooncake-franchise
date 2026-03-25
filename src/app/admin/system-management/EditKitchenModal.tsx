'use client';

import { CentralKitchen } from '../../../services/adminService';

export interface EditKitchenFormData {
    kitchen_code: string;
    kitchen_name: string;
    kitchen_address: string;
    production_capacity: number;
}

interface EditKitchenModalProps {
    isOpen: boolean;
    selectedKitchen: CentralKitchen | null;
    formData: EditKitchenFormData;
    loading: boolean;
    onFormDataChange: (data: EditKitchenFormData) => void;
    onSubmit: () => void;
    onClose: () => void;
}

const numberInputStyles = {
    webkit: `
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    `,
    moz: `
        input[type="number"] {
            -moz-appearance: textfield;
        }
    `
};

export default function EditKitchenModal({
    isOpen,
    selectedKitchen,
    formData,
    loading,
    onFormDataChange,
    onSubmit,
    onClose,
}: EditKitchenModalProps) {
    if (!isOpen || !selectedKitchen) return null;

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
                    maxWidth: '600px',
                    width: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#1F2937' }}>
                    Chỉnh Sửa Thông Tin Bếp Trung Tâm
                </h2>

                {/* Kitchen Code */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Mã Bếp
                    </label>
                    <input
                        type="text"
                        value={formData.kitchen_code}
                        onChange={(e) => onFormDataChange({ ...formData, kitchen_code: e.target.value })}
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
                </div>

                {/* Kitchen Name */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Tên Bếp
                    </label>
                    <input
                        type="text"
                        value={formData.kitchen_name}
                        onChange={(e) => onFormDataChange({ ...formData, kitchen_name: e.target.value })}
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
                </div>

                {/* Kitchen Address */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Địa Chỉ
                    </label>
                    <textarea
                        value={formData.kitchen_address}
                        onChange={(e) => onFormDataChange({ ...formData, kitchen_address: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            minHeight: '80px',
                            resize: 'vertical',
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

                {/* Production Capacity */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Công Suất Sản Xuất (hộp/ngày)
                    </label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                            type="button"
                            onClick={() => {
                                const newValue = Math.max(1, (formData.production_capacity || 0) - 1);
                                onFormDataChange({ ...formData, production_capacity: newValue });
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
                                onFormDataChange({ ...formData, production_capacity: val });
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
                                boxSizing: 'border-box',
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
                                onFormDataChange({ ...formData, production_capacity: newValue });
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

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '32px' }}>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            border: '1px solid #E5E7EB',
                            backgroundColor: 'white',
                            color: '#1F2937',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F3F4F6';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                        }}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading ? '#9CA3AF' : '#FF6B35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.currentTarget.style.backgroundColor = '#E55A1F';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) e.currentTarget.style.backgroundColor = '#FF6B35';
                        }}
                    >
                        {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}
