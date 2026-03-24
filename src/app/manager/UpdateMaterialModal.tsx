"use client";

import React, { useState, useEffect } from "react";
import styles from "./inventory/inventory.module.css";
import materialService, { MaterialType, CentralKitchen } from "../../services/materialService";

interface UpdateMaterialModalProps {
  isOpen: boolean;
  materialId: number | string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateMaterialModal: React.FC<UpdateMaterialModalProps> = ({
  isOpen,
  materialId,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
  const [centralKitchens, setCentralKitchens] = useState<CentralKitchen[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    material_code: "",
    uom: "",
    materials_type_id: "",
    on_hand_qty: "",
    expiry_date: "",
    central_kitchen_id: "",
    cost_price: "",
    min_stock: "",
    is_active: true,
  });

  useEffect(() => {
    if (isOpen && materialId) {
      fetchInitialData();
      fetchMaterialTypes();
      fetchCentralKitchens();
    }
  }, [isOpen, materialId]);

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);
      const [typesRes, materialRes, kitchensRes] = await Promise.all([
        materialService.getMaterialTypes(),
        materialService.getMaterialById(materialId!.toString()),
        materialService.getCentralKitchens(),
      ]);

      if (typesRes.success) {
        setMaterialTypes(typesRes.data);
      }

      if (kitchensRes.success) {
        setCentralKitchens(kitchensRes.data);
      }

      if (materialRes.success) {
        const mat = materialRes.data;
        setFormData({
          name: mat.name || "",
          material_code: mat.material_code || "",
          uom: mat.uom || "",
          materials_type_id: mat.materials_type_id?.toString() || "",
          on_hand_qty: mat.on_hand_qty?.toString() || "",
          expiry_date: mat.expiry_date ? mat.expiry_date.split("T")[0] : "",
          central_kitchen_id: mat.central_kitchen_id?.toString() || "",
          cost_price: mat.cost_price?.toString() || "",
          min_stock: mat.min_stock?.toString() || "",
          is_active: mat.is_active ?? true,
        });
      }
    } catch (err) {
      console.error("Error fetching material data:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchMaterialTypes = async () => {
    try {
      const response = await materialService.getMaterialTypes();
      if (response.success) {
        setMaterialTypes(response.data);
      }
    } catch (err) {
      console.error("Error fetching material types:", err);
    }
  };

  const fetchCentralKitchens = async () => {
    try {
      const response = await materialService.getCentralKitchens();
      if (response.success) {
        setCentralKitchens(response.data);
      }
    } catch (err) {
      console.error("Error fetching central kitchens:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.materials_type_id || !formData.uom || !formData.material_code) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return;
    }

    try {
      setLoading(true);
      const requestData = {
        name: formData.name,
        material_code: formData.material_code,
        uom: formData.uom,
        materials_type_id: parseInt(formData.materials_type_id),
        on_hand_qty: parseFloat(formData.on_hand_qty) || 0,
        expiry_date: formData.expiry_date || null,
        central_kitchen_id: parseInt(formData.central_kitchen_id),
        cost_price: parseFloat(formData.cost_price) || 0,
        min_stock: parseInt(formData.min_stock) || 0,
        is_active: formData.is_active,
      };

      const response = await materialService.updateMaterial(materialId!.toString(), requestData);
      if (response.success) {
        alert("Cập nhật nguyên liệu thành công!");
        onSuccess();
        onClose();
      } else {
        alert(response.message || "Có lỗi xảy ra khi cập nhật nguyên liệu.");
      }
    } catch (err: any) {
      alert(err.message || "Có lỗi xảy ra khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Chỉnh sửa nguyên liệu</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        {initialLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>Đang tải dữ liệu...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              <div className={styles.detailGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tên nguyên liệu *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Mã nguyên liệu *</label>
                  <input
                    type="text"
                    name="material_code"
                    value={formData.material_code}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Loại nguyên liệu *</label>
                  <select
                    name="materials_type_id"
                    value={formData.materials_type_id}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Chọn loại</option>
                    {materialTypes.map(type => (
                      <option key={type.materials_type_id} value={type.materials_type_id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Đơn vị tính *</label>
                  <input
                    type="text"
                    name="uom"
                    value={formData.uom}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số lượng tồn kho</label>
                  <input
                    type="number"
                    step="0.01"
                    name="on_hand_qty"
                    value={formData.on_hand_qty}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Hạn sử dụng</label>
                  <input
                    type="date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Giá Bán</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost_price"
                    value={formData.cost_price}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="0.00"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số lượng tồn kho tối thiểu</label>
                  <input
                    type="number"
                    step="0.01"
                    name="min_stock"
                    value={formData.min_stock}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="0.00"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Bếp Trung Tâm *</label>
                  <select
                    name="central_kitchen_id"
                    value={formData.central_kitchen_id}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Chọn bếp</option>
                    {centralKitchens.map(type => (
                      <option key={type.central_kitchen_id} value={type.central_kitchen_id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup} style={{ gridColumn: "span 2", display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <label htmlFor="is_active" className={styles.label} style={{ marginBottom: 0 }}>Hoạt động</label>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" onClick={onClose} className={styles.cancelBtn}>
                Hủy
              </button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateMaterialModal;
