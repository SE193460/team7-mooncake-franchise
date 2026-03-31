"use client";

import Sidebar from "../../../components/Sidebar";
import styles from "./inventory.module.css";
import { useState, useEffect } from "react";
import inventoryService, { ManagerInventoryItem, ProductDetail } from "../../../services/inventoryService";
import ProductDetailModal from "./ProductDetailModal";
import CreateProductModal from "./CreateProductModal";
import UpdateProductModal from "./UpdateProductModal";
import { toast } from "react-toastify";

export default function InventoryManagement() {
  const [inventoryData, setInventoryData] = useState<ManagerInventoryItem[]>([]);
  const [cardsData, setCardsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Detail Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Update Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateProductId, setUpdateProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getManagerInventory();
      setInventoryData(data.items || []);
      setCardsData(data.cards);
      setError(null);
    } catch (err) {
      toast.error("Không thể tải dữ liệu tồn kho. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from backend real data
  const totalProducts = cardsData?.total_products || 0;
  const lowStockCount = cardsData?.low_stock || 0;
  const banhNuongCount = cardsData?.baked_mooncake || 0;
  const banhDeoCount = cardsData?.sticky_mooncake || 0;

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${name}" khỏi kho?`)) {
      try {
        await inventoryService.deleteInventoryItem(id);
        // Refresh data or filter out the deleted item
        setInventoryData(prev => prev.filter(item => item.inventory_item_id !== id));
        toast.success("Xóa sản phẩm thành công!");
      } catch (err) {
        toast.error("Có lỗi xảy ra khi xóa sản phẩm.");
      }
    }
    setOpenDropdownId(null);
  };

  const handleViewDetail = async (productId: string) => {
    try {
      setOpenDropdownId(null);
      setIsModalOpen(true);
      setModalLoading(true);
      const detail = await inventoryService.getProductDetail(productId);
      setSelectedProduct(detail);
    } catch (err) {
      toast.error("Không thể tải chi tiết sản phẩm.");
      setIsModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = (productId: string) => {
    setUpdateProductId(productId);
    setIsUpdateModalOpen(true);
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const getStatusStyle = (on_hand_qty: number, min_qty: number) => {
    if (on_hand_qty >= min_qty) {
      return {
        color: "#22c55e",
        icon: "↗",
        text: "Đủ",
      };
    }
    return {
      color: "#f97316",
      icon: "⚡",
      text: "Thấp",
    };
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar type="manager" activePage="inventory" />
        <div style={{ flex: 1, marginLeft: "240px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "18px", color: "#666" }}>Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar type="manager" activePage="inventory" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Page Header */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#3d3530",
                margin: 0,
              }}
            >
              Quản Lý Kho
            </h1>
            <p style={{ color: "#666", marginTop: "8px", fontSize: "14px" }}>
              Tổng quan tồn kho toàn hệ thống
            </p>
          </div>
          {error && (
            <div style={{
              padding: "10px 20px",
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
              fontSize: "14px",
              border: "1px solid #fecaca"
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Status Cards */}
        <div className={styles.statusCards}>
          {/* Total Products Card */}
          <div className={styles.card}>
            <p className={styles.cardLabel}>
              Tổng Sản Phẩm
            </p>
            <p className={styles.cardValue}>
              {totalProducts}
            </p>
          </div>

          {/* Low Stock Card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#666",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              Tồn Kho Thấp
            </p>
            <p className={styles.cardValue} style={{ color: "#f97316" }}>
              {lowStockCount}
            </p>
          </div>

          {/* Bánh Nướng Count Card */}
          <div className={styles.card}>
            <p className={styles.cardLabel}>
              Bánh Nướng
            </p>
            <p className={styles.cardValue}>
              {banhNuongCount}
            </p>
          </div>

          {/* Bánh Dẻo Count Card */}
          <div className={styles.card}>
            <p className={styles.cardLabel}>
              Bánh Dẻo
            </p>
            <p className={styles.cardValue}>
              {banhDeoCount}
            </p>
          </div>
        </div>

        {/* Inventory Details Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#3d3530",
              margin: 0,
            }}
          >
            Chi Tiết Tồn Kho Hệ Thống
          </h2>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#e67e22",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 4px rgba(230, 126, 34, 0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d35400")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e67e22")}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <span>+</span> Tạo mới sản phẩm
          </button>
        </div>

        {/* Inventory Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
            overflow: "visible",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Sản Phẩm
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Cửa Hàng
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Mô Tả
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Tồn Kho
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Tình Trạng
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Hạn Sử Dụng
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    width: "100px",
                  }}
                >
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody>
              {inventoryData.map((item, index) => {
                const statusStyle = getStatusStyle(item.on_hand_qty, item.min_qty);
                return (
                  <tr
                    key={item.inventory_item_id}
                    style={{
                      borderBottom:
                        index < inventoryData.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#3d3530",
                      }}
                    >
                      <div style={{ fontWeight: "600" }}>{item.product_name}</div>
                      <div style={{ fontSize: "12px", color: "#999" }}>{item.product_code}</div>
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.store_name}
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.description}
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#3d3530",
                      }}
                    >
                      {item.quantity} cái
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: statusStyle.color,
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>
                          {statusStyle.icon}
                        </span>
                        <span style={{ fontWeight: "500" }}>
                          {statusStyle.text}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#3d3530",
                      }}
                    >
                      {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('vi-VN') : "N/A"}
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        textAlign: "center",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(
                            openDropdownId === item.inventory_item_id
                              ? null
                              : item.inventory_item_id
                          );
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#999",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        ⋮
                      </button>

                      {openDropdownId === item.inventory_item_id && (
                        <div
                          style={{
                            position: "absolute",
                            right: "24px",
                            top: "50px",
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
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "10px 16px",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              fontSize: "14px",
                              color: "#333",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            onClick={() => handleViewDetail(item.product_id)}
                          >
                            Xem chi tiết
                          </button>
                          <button
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "10px 16px",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              fontSize: "14px",
                              color: "#333",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            onClick={() => handleEdit(item.product_id)}
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => handleDelete(item.inventory_item_id, item.product_name)}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "10px 16px",
                              textAlign: "left",
                              background: "none",
                              border: "none",
                              fontSize: "14px",
                              color: "#e74c3c",
                              cursor: "pointer",
                              borderTop: "1px solid #eee",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff5f5")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {inventoryData.length === 0 && !loading && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              Không có dữ liệu tồn kho nào.
            </div>
          )}
        </div>
      </div>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        loading={modalLoading}
      />

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchInventory}
      />

      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        productId={updateProductId}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={fetchInventory}
      />
    </div>
  );
}
