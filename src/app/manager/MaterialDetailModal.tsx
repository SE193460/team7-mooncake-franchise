"use client";

import React from "react";
import styles from "./inventory/inventory.module.css";
import { Material } from "../../services/materialService";

interface MaterialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: Material | null;
  loading: boolean;
}

const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  isOpen,
  onClose,
  material,
  loading,
}) => {
  if (!isOpen) return null;
  console.log("material", material);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Chi tiết nguyên liệu</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Đang tải...</div>
          ) : material ? (
            <div className={styles.detailGrid} style={{ gridTemplateColumns: "1fr" }}>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Tên nguyên liệu</label>
                <div className={styles.detailValue}>{material.name || "N/A"}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Mã nguyên liệu</label>
                <div className={styles.detailValue}>{material.material_code || "N/A"}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Loại nguyên liệu</label>
                <div className={styles.detailValue}>{material.material_type || "N/A"}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Giá bán</label>
                <div className={styles.detailValue}>{material.cost_price || "N/A"}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Mức tối thiểu</label>
                <div className={styles.detailValue}>{material.min_stock || "N/A"}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Tồn kho</label>
                <div className={styles.detailValue}>
                  {material.on_hand_qty} {material.uom}
                </div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Hạn sử dụng</label>
                <div className={styles.detailValue}>{formatDate(material.expiry_date)}</div>
              </div>
              <div className={styles.detailItem}>
                <label className={styles.detailLabel}>Trạng thái</label>
                <div className={styles.detailValue}>
                  <span
                    style={{
                      color: material.is_active ? "#22c55e" : "#e74c3c",
                      fontWeight: "600",
                    }}
                  >
                    {material.is_active ? "Hoạt động" : "Ngừng hoạt động"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>Không tìm thấy dữ liệu</div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
