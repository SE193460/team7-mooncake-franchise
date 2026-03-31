"use client";

import React, { useState, useEffect } from "react";
import styles from "./inventory.module.css";
import inventoryService, {
  Material,
  ProductType,
  UpdateProductRequest,
  ProductDetail
} from "../../../services/inventoryService";
import { toast } from "react-toastify";

interface UpdateProductModalProps {
  isOpen: boolean;
  productId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  productId,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    product_type_id: "",
    uom: "",
    sku: "",
    price: "",
    description: "",
    is_active: true,
    expiry_date: "",
    on_hand_qty: 0,
    min_qty: 0,
  });

  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && productId) {
      fetchInitialAndProductData();
    }
  }, [isOpen, productId]);

  const fetchInitialAndProductData = async () => {
    try {
      setFetchingData(true);
      const [types, mats, detail] = await Promise.all([
        inventoryService.getProductTypes(),
        inventoryService.getAllMaterials(),
        inventoryService.getProductDetail(productId!)
      ]);

      setProductTypes(types);
      setAllMaterials(mats);

      // Populate form with existing data
      setFormData({
        name: detail.name,
        product_type_id: String(detail.product_type_id),
        uom: detail.uom,
        sku: detail.sku,
        price: String(detail.price),
        description: detail.description,
        is_active: detail.is_active,
        expiry_date: detail.expiry_date,
        on_hand_qty: detail.on_hand_qty,
        min_qty: detail.min_qty,
      });

      // Map materials
      setMaterials(detail.materials.map(m => ({
        material_id: String(m.material_id),
        qty_required: String(m.qty_required),
        uom: m.uom,
        note: m.note || ""
      })));

    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Không thể tải thông tin sản phẩm.");
      onClose();
    } finally {
      setFetchingData(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleMaterialChange = (index: number, field: string, value: any) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = value;

    if (field === "material_id") {
      const selectedMat = allMaterials.find(m => String(m.material_id) === value);
      if (selectedMat) {
        newMaterials[index].uom = selectedMat.uom;
      }
    }

    setMaterials(newMaterials);
  };

  const addMaterialRow = () => {
    setMaterials([...materials, { material_id: "", qty_required: "", uom: "", note: "" }]);
  };

  const removeMaterialRow = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên sản phẩm.");
      return;
    }
    if (!formData.product_type_id) {
      toast.error("Vui lòng chọn loại sản phẩm.");
      return;
    }
    if (!formData.price) {
      toast.error("Vui lòng nhập giá.");
      return;
    }
    if (!formData.sku) {
      toast.error("Vui lòng nhập mã SKU.");
      return;
    }

    try {
      setLoading(true);
      const requestData: UpdateProductRequest = {
        name: formData.name,
        product_type_id: parseInt(formData.product_type_id),
        uom: formData.uom,
        sku: formData.sku,
        price: parseFloat(formData.price),
        description: formData.description,
        is_active: formData.is_active,
        expiry_date: formData.expiry_date,
        on_hand_qty: formData.on_hand_qty,
        min_qty: formData.min_qty,
        materials: materials
          .filter(m => m.material_id && m.qty_required)
          .map(m => ({
            material_id: parseInt(m.material_id),
            qty_required: parseFloat(m.qty_required),
            uom: m.uom,
            note: m.note || ""
          }))
      };

      const response = await inventoryService.updateProduct(productId!, requestData);
      if (response.success) {
        toast.success("Cập nhật sản phẩm thành công!");
        onSuccess();
        onClose();
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật sản phẩm.");
      }
    } catch (err: any) {
      toast.error(err.message || "Có lỗi xảy ra khi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Chỉnh sửa sản phẩm</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        {fetchingData ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#666" }}>
            Đang tải thông tin sản phẩm...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tên sản phẩm *</label>
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
                  <label className={styles.label}>Mã SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Loại sản phẩm *</label>
                  <select
                    name="product_type_id"
                    value={formData.product_type_id}
                    onChange={handleInputChange}
                    className={styles.select}
                    required
                  >
                    <option value="">Chọn loại sản phẩm</option>
                    {productTypes.map(type => (
                      <option key={type.product_type_id} value={type.product_type_id}>
                        {type.product_type_name}
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
                  <label className={styles.label}>Giá bán *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ngày hết hạn *</label>
                  <input
                    type="date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số lượng tồn kho *</label>
                  <input
                    type="number"
                    name="on_hand_qty"
                    value={formData.on_hand_qty}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Số lượng tối thiểu *</label>
                  <input
                    type="number"
                    name="min_qty"
                    value={formData.min_qty}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer", marginTop: "32px" }}>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      style={{ width: "18px", height: "18px" }}
                    />
                    <span>Đang hoạt động</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.sectionDivider} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#3d3530", margin: 0 }}>
                  Công thức chế biến (Nguyên liệu)
                </h3>
              </div>

              {materials.length > 0 ? (
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr 40px", gap: "12px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}>Nguyên liệu</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}>Số lượng</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}>ĐVT</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}>Ghi chú</span>
                    <span></span>
                  </div>
                  {materials.map((m, index) => (
                    <div key={index} className={styles.recipeRow}>
                      <select
                        value={m.material_id}
                        onChange={(e) => handleMaterialChange(index, "material_id", e.target.value)}
                        className={styles.select}
                      >
                        <option value="">Chọn nguyên liệu</option>
                        {allMaterials.map(mat => (
                          <option key={mat.material_id} value={mat.material_id}>
                            {mat.material_name} ({mat.material_code})
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        value={m.qty_required}
                        onChange={(e) => handleMaterialChange(index, "qty_required", e.target.value)}
                        className={styles.input}
                        placeholder="0.0"
                      />
                      <input
                        type="text"
                        value={m.uom}
                        readOnly
                        className={styles.input}
                        style={{ backgroundColor: "#f9f9f9", color: "#666" }}
                      />
                      <input
                        type="text"
                        value={m.note}
                        onChange={(e) => handleMaterialChange(index, "note", e.target.value)}
                        className={styles.input}
                        placeholder="Ghi chú..."
                      />
                      <button
                        type="button"
                        onClick={() => removeMaterialRow(index)}
                        className={styles.removeBtn}
                        title="Xóa nguyên liệu"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#999", fontSize: "14px", fontStyle: "italic", marginBottom: "16px" }}>Chưa có nguyên liệu nào được thêm.</p>
              )}

              <button
                type="button"
                onClick={addMaterialRow}
                className={styles.addBtn}
              >
                + Thêm nguyên liệu vào công thức
              </button>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" onClick={onClose} className={styles.cancelBtn}>
                Hủy
              </button>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                {loading ? "Đang lưu..." : "Cập nhật sản phẩm"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProductModal;
