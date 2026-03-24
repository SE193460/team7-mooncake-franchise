"use client";

import React from "react";
import styles from "./inventory.module.css";
import { ProductDetail } from "../../../services/inventoryService";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail | null;
  loading: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Chi tiết sản phẩm</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
              Đang tải chi tiết sản phẩm...
            </div>
          ) : product ? (
            <>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Tên sản phẩm</span>
                  <span className={styles.detailValue}>{product.name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Mã SKU</span>
                  <span className={styles.detailValue}>{product.sku}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Loại sản phẩm</span>
                  <span className={styles.detailValue}>{product.product_type_name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Đơn vị tính</span>
                  <span className={styles.detailValue}>{product.uom}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Giá bán</span>
                  <span className={styles.detailValue}>
                    {Number(product.price).toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Trạng thái</span>
                  <span
                    className={styles.detailValue}
                    style={{ color: product.is_active ? "#22c55e" : "#ef4444" }}
                  >
                    {product.is_active ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </span>
                </div>
              </div>

              <div className={styles.detailItem} style={{ marginBottom: "24px" }}>
                <span className={styles.detailLabel}>Mô tả</span>
                <span className={styles.detailValue} style={{ fontWeight: "normal", lineHeight: "1.6" }}>
                  {product.description || "Không có mô tả."}
                </span>
              </div>

              <div className={styles.sectionDivider} />

              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#3d3530", marginBottom: "16px" }}>
                Thành phần nguyên liệu
              </h3>

              {product.materials && product.materials.length > 0 ? (
                <table className={styles.materialsTable}>
                  <thead>
                    <tr>
                      <th>Nguyên liệu</th>
                      <th>Mã</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.materials.map((m) => (
                      <tr key={m.product_material_id}>
                        <td>{m.material_name}</td>
                        <td>{m.material_code}</td>
                        <td>{m.qty_required}</td>
                        <td>{m.uom}</td>
                        <td style={{ fontSize: "12px", color: "#666" }}>{m.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "#999", fontSize: "14px", fontStyle: "italic" }}>
                  Chưa có thông tin nguyên liệu cho sản phẩm này.
                </p>
              )}
            </>
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
              Không tìm thấy thông tin sản phẩm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
