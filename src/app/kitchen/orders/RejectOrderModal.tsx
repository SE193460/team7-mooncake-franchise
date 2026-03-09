import styles from './orders.module.css';

interface RejectOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    reason: string;
    onReasonChange: (reason: string) => void;
}

export default function RejectOrderModal({
    isOpen,
    onClose,
    onConfirm,
    reason,
    onReasonChange
}: RejectOrderModalProps) {
    if (!isOpen) return null;

    return (
        <div className={`${styles.modalOverlay} ${styles.zIndex1001}`} onClick={onClose}>
            <div className={`${styles.modalContainer} ${styles.modalContainerSmall}`} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        Từ Chối Đơn Hàng
                    </h2>
                    <button onClick={onClose} className={styles.modalClose}>
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className={styles.modalBody}>
                    <p className={styles.rejectText}>
                        Vui lòng nhập lý do từ chối đơn hàng này:
                    </p>
                    <textarea
                        value={reason}
                        onChange={(e) => onReasonChange(e.target.value)}
                        placeholder="Ví dụ: Không đủ nguyên liệu, Hết nguyên liệu, v.v."
                        className={styles.rejectTextarea}
                    />
                </div>

                {/* Footer */}
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.btnCancel}>
                        Hủy Bỏ
                    </button>
                    <button onClick={onConfirm} className={styles.btnConfirmReject}>
                        Xác Nhận Từ Chối
                    </button>
                </div>
            </div>
        </div>
    );
}
