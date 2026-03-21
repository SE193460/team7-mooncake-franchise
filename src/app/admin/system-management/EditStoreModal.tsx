'use client';

import { FranchiseStore } from '../../../services/adminService';

export interface EditStoreFormData {
    store_code: string;
    store_name: string;
    store_address: string;
    store_phone: string;
    store_email: string;
    manager_name: string;
}

interface EditStoreModalProps {
    isOpen: boolean;
    selectedStore: FranchiseStore | null;
    formData: EditStoreFormData;
    loading: boolean;
    onFormDataChange: (data: EditStoreFormData) => void;
    onSubmit: () => void;
    onClose: () => void;
}

export default function EditStoreModal({
    isOpen,
    selectedStore,
    formData,
    loading,
    onFormDataChange,
    onSubmit,
    onClose,
}: EditStoreModalProps) {
    if (!isOpen || !selectedStore) return null;

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
                    maxWidth: '600px',
                    width: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#1F2937' }}>
                    Chỉnh Sửa Thông Tin Cửa Hàng
                </h2>

                {/* Store Code */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Mã Cửa Hàng
                    </label>
                    <input
                        type="text"
                        value={formData.store_code}
                        onChange={(e) => onFormDataChange({ ...formData, store_code: e.target.value })}
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

                {/* Store Name */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Tên Cửa Hàng
                    </label>
                    <input
                        type="text"
                        value={formData.store_name}
                        onChange={(e) => onFormDataChange({ ...formData, store_name: e.target.value })}
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

                {/* Store Address */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Địa Chỉ
                    </label>
                    <textarea
                        value={formData.store_address}
                        onChange={(e) => onFormDataChange({ ...formData, store_address: e.target.value })}
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

                {/* Store Phone */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Số Điện Thoại
                    </label>
                    <input
                        type="tel"
                        value={formData.store_phone}
                        onChange={(e) => onFormDataChange({ ...formData, store_phone: e.target.value })}
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

                {/* Store Email */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.store_email}
                        onChange={(e) => onFormDataChange({ ...formData, store_email: e.target.value })}
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

                {/* Manager Name */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Người Quản Lý
                    </label>
                    <input
                        type="text"
                        value={formData.manager_name}
                        onChange={(e) => onFormDataChange({ ...formData, manager_name: e.target.value })}
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

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
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
    );
}
