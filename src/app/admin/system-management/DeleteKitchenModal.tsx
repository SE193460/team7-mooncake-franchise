'use client';

import { CentralKitchen } from '../../../services/adminService';

interface DeleteKitchenModalProps {
    isOpen: boolean;
    selectedKitchen: CentralKitchen | null;
    loading: boolean;
    onSubmit: () => void;
    onClose: () => void;
}

export default function DeleteKitchenModal({
    isOpen,
    selectedKitchen,
    loading,
    onSubmit,
    onClose,
}: DeleteKitchenModalProps) {
    if (!isOpen || !selectedKitchen) return null;

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
                    maxWidth: '400px',
                    width: '90%',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                        ⚠️
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                        Vô Hiệu Hóa Bếp Trung Tâm
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
                        {selectedKitchen.kitchen_name}
                    </p>
                </div>

                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>
                    Bạn có chắc chắn muốn vô hiệu hóa bếp này? Bếp sẽ không thể tiếp nhận đơn hàng mới.
                </p>

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
                            backgroundColor: loading ? '#9CA3AF' : '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#B91C1C';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.backgroundColor = '#DC2626';
                            }
                        }}
                    >
                        {loading ? 'Đang xử lý...' : 'Vô Hiệu Hóa'}
                    </button>
                </div>
            </div>
        </div>
    );
}
