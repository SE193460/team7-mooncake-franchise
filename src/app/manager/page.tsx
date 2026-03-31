"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./manager.module.css";
import {
  getManagerDashboard,
  ManagerDashboardCards,
  MaterialInventory,
} from "../../services/dashboardService";
import materialService from "../../services/materialService";
import CreateMaterialModal from "./CreateMaterialModal";
import MaterialDetailModal from "./MaterialDetailModal";
import UpdateMaterialModal from "./UpdateMaterialModal";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<ManagerDashboardCards | null>(null);
  const [materials, setMaterials] = useState<MaterialInventory[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Helper to find material_id from inventory_item_id
  const getMaterialIdByInventoryId = (inventoryId: string | null) => {
    if (!inventoryId) return null;
    const item = materials.find((m) => m.inventory_item_id === inventoryId);
    return item ? item.material_id : null;
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập");
        setLoading(false);
        return;
      }
      const res = await getManagerDashboard(token);
      if (res.success) {
        setCards(res.data.cards);
        setMaterials(res.data.materials_inventory);
        console.log("materials_inventory", res.data.materials_inventory);
      } else {
        toast.error(res.message || "Lỗi khi tải dữ liệu");
      }
    } catch (err) {
      toast.error("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (!id) {
      toast.error("Lỗi: Không tìm thấy ID nguyên liệu để xóa");
      return;
    }
    setItemToDelete({ id, name });
    setIsConfirmModalOpen(true);
    setOpenDropdownId(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await materialService.deleteMaterial(itemToDelete.id);
      if (res.success) {
        toast.success("Xóa thành công!");
        fetchDashboard();
      } else {
        toast.error(res.message || "Xóa thất bại");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi xóa");
    } finally {
      setItemToDelete(null);
    }
  };

  const handleViewDetail = async (id: string) => {
    try {
      if (!id) {
        toast.error("Lỗi: Không tìm thấy ID nguyên liệu");
        return;
      }
      setOpenDropdownId(null);
      setIsDetailModalOpen(true);
      setModalLoading(true);
      const res = await materialService.getMaterialById(id);
      if (res.success) {
        setSelectedMaterial(res.data);
      }
    } catch (err) {
      toast.error("Lỗi khi tải chi tiết");
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    if (!id) {
      toast.error("Lỗi: Không tìm thấy ID nguyên liệu để chỉnh sửa");
      return;
    }
    setOpenDropdownId(null);
    setSelectedMaterialId(id);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatQuantity = (qty: string) => {
    const num = parseFloat(qty);
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
  };

  return (
    <div className={styles.container}>
      <Sidebar type="manager" activePage="dashboard" />

      <div className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Bảng Quản Lý</h1>
          <p className={styles.pageSubtitle}>Tổng quan tồn kho và báo cáo</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#666" }}>Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#e74c3c" }}>{error}</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {/* Total Orders Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>Tổng Đơn Hàng</p>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: "#3d3530", margin: 0 }}>
                      {cards?.total_orders_month || 0}
                    </p>
                  </div>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#fff5eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "24px" }}>🛒</span>
                  </div>
                </div>
              </div>

              {/* Stock Warning Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>Cảnh Báo Tồn Kho</p>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: cards?.low_stock_alerts ? "#e74c3c" : "#3d3530", margin: 0 }}>
                      {cards?.low_stock_alerts || 0}
                    </p>
                  </div>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#fff5eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "24px" }}>⚠️</span>
                  </div>
                </div>
              </div>

              {/* Total Product Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "14px", color: "#666", margin: "0 0 8px 0" }}>Tổng SP Tồn Kho</p>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: "#3d3530", margin: 0 }}>
                      {cards?.total_product_stock || 0}
                    </p>
                  </div>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "#fff5eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "24px" }}>📦</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#3d3530", margin: 0 }}>Tồn Kho Nguyên Liệu</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#e67e22",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 4px rgba(230, 126, 34, 0.2)",
                }}
              >
                <span>+</span> Tạo mới
              </button>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "visible", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #eee" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fafafa" }}>
                    <th style={{ textAlign: "left", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#666", textTransform: "uppercase" }}>Nguyên liệu</th>
                    <th style={{ textAlign: "left", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#666", textTransform: "uppercase" }}>Loại</th>
                    <th style={{ textAlign: "left", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#666", textTransform: "uppercase" }}>Số lượng</th>
                    <th style={{ textAlign: "left", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#666", textTransform: "uppercase" }}>Hạn dùng</th>
                    <th style={{ textAlign: "center", padding: "16px 24px", fontSize: "12px", fontWeight: "600", color: "#666", textTransform: "uppercase", width: "100px" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((item) => (
                    <tr key={item.inventory_item_id} style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: "500", color: "#3d3530" }}>{item.material_name}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#666" }}>{item.material_type}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#3d3530" }}>{item.on_hand_qty} {item.uom}</td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#666" }}>{formatDate(item.expiry_date)}</td>
                      <td style={{ padding: "16px 24px", textAlign: "center", position: "relative" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const material_id = getMaterialIdByInventoryId(item.inventory_item_id);
                            setOpenDropdownId(openDropdownId === item.inventory_item_id ? null : item.inventory_item_id);
                          }}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#999" }}
                        >
                          ⋮
                        </button>

                        {openDropdownId === item.inventory_item_id && (
                          <div
                            style={{
                              position: "absolute",
                              right: "24px",
                              top: "40px",
                              backgroundColor: "white",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              zIndex: 100,
                              minWidth: "160px",
                              padding: "8px 0",
                              border: "1px solid #eee",
                            }}
                          >


                            <button
                              onClick={(e) => {
                                handleViewDetail(item.inventory_item_id);
                              }}
                              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 16px", border: "none", background: "none", cursor: "pointer", fontSize: "14px", color: "#333", textAlign: "left" }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                              <span>👁️</span> Xem chi tiết
                            </button>
                            <button
                              onClick={(e) => {
                                handleEdit(String(item.inventory_item_id));
                              }}
                              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 16px", border: "none", background: "none", cursor: "pointer", fontSize: "14px", color: "#333", textAlign: "left" }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                              <span>✏️</span> Chỉnh sửa
                            </button>
                            <button
                              onClick={(e) => {
                                handleDelete(item.inventory_item_id, item.material_name);
                              }}
                              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 16px", border: "none", background: "none", cursor: "pointer", fontSize: "14px", color: "#e74c3c", textAlign: "left", borderTop: "1px solid #eee" }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff5f5"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                              <span>🗑️</span> Xóa
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <CreateMaterialModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchDashboard}
      />

      <MaterialDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        material={selectedMaterial}
        loading={modalLoading}
      />

      <UpdateMaterialModal
        isOpen={isUpdateModalOpen}
        materialId={selectedMaterialId}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={fetchDashboard}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa nguyên liệu "${itemToDelete?.name}"?`}
        confirmText="Xóa"
        isDanger={true}
      />
    </div>
  );
}
