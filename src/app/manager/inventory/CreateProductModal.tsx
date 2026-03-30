"use client";

import React, { useState, useEffect } from "react";
import styles from "./inventory.module.css";
import inventoryService, { Material, ProductType, CreateProductRequest } from "../../../services/inventoryService";


interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    product_type_id: "",
    uom: "cái",
    price: "",
    description: "",
  });

  const [materials, setMaterials] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();

    }
  }, [isOpen]);

  const fetchInitialData = async () => {
    try {
      const [types, mats] = await Promise.all([
        inventoryService.getProductTypes(),
        inventoryService.getAllMaterials(),
      ]);
      setProductTypes(types);
      setAllMaterials(mats);
    } catch (err) {
      console.error("Error fetching initial data:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (index: number, field: string, value: any) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = value;

    // Auto-fill UOM if material is selected
    if (field === "material_id") {
      const selectedMat = allMaterials.find(m => m.material_id === parseInt(value));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Bạn chưa đăng nhập");
      return;
    }

    if (!formData.name || !formData.product_type_id || !formData.price) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const validMaterials = materials
      .filter(m => m.material_id && m.qty_required)
      .map(m => ({
        material_id: Number(m.material_id),
        qty_required: Number(m.qty_required),
        uom: m.uom,
        note: m.note || ""
      }));

    if (validMaterials.length === 0) {
      alert("Phải có ít nhất 1 nguyên liệu");
      return;
    }

    const requestData = {
      name: formData.name,
      product_type_id: Number(formData.product_type_id),
      uom: formData.uom,
      price: Number(formData.price),
      description: formData.description,
      materials: validMaterials
    };

    console.log("🚀 REQUEST:", requestData); // DEBUG

    try {
      setLoading(true);

      const res = await fetch(
        `https://franchisemooncake.onrender.com/api/Manager_create_products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 QUAN TRỌNG
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await res.json();
      console.log("🔥 RESPONSE:", data); // DEBUG

      if (!res.ok) {
        alert(data.message || "Tạo thất bại");
        return;
      }

      alert("Tạo sản phẩm thành công!");
      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Tạo mới sản phẩm</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

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
                  placeholder="Ví dụ: Bánh Trung Thu Đậu Xanh"
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
                  placeholder="Ví dụ: cái"
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
                  placeholder="Ví dụ: 50000"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Nhập mô tả sản phẩm..."
              />
            </div>

            <div className={styles.sectionDivider} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#3d3530", margin: 0 }}>
                Công thức chế biến (Nguyên liệu)
              </h3>
            </div>

            {materials.length > 0 && (
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
                      className={styles.input}
                      onChange={(e) => handleMaterialChange(index, "uom", e.target.value)}
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
            <button type="submit" className={`${styles.saveBtn} ${loading ? styles.disabledBtn : ""}`}>
              {loading ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
