"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./manager.module.css";
import {
  getManagerDashboard,
  ManagerDashboardCards,
  MaterialInventory,
} from "../../services/dashboardService";

export default function ManagerDashboard() {
  const [cards, setCards] = useState<ManagerDashboardCards | null>(null);
  const [materials, setMaterials] = useState<MaterialInventory[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nguyên liệu này?")) {
      console.log("Deleting material:", id);
      // Implement delete logic here
    }
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vui lòng đăng nhập");
          setLoading(false);
          return;
        }
        const res = await getManagerDashboard(token);
        if (res.success) {
          setCards(res.data.cards);
          setMaterials(res.data.materials_inventory);
        } else {
          setError(res.message || "Lỗi khi tải dữ liệu");
        }
      } catch (err) {
        setError("Không thể kết nối đến máy chủ");
      } finally {
        setLoading(false);
      }
    };
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

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Bảng Quản Lý
          </h1>
          <p className={styles.pageSubtitle}>
            Tổng quan tồn kho và báo cáo
          </p>
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
            {/* Status Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      Tổng Đơn Hàng
                    </p>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#3d3530",
                        margin: 0,
                      }}
                    >
                      {cards?.total_orders_month || 0}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        margin: 0,
                        marginTop: "4px",
                      }}
                    >
                      Tháng này
                    </p>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#fff5eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e67e22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      Cảnh Báo Tồn Kho
                    </p>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: cards?.low_stock_alerts ? "#e74c3c" : "#3d3530",
                        margin: 0,
                      }}
                    >
                      {cards?.low_stock_alerts || 0}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        margin: 0,
                        marginTop: "4px",
                      }}
                    >
                      Cần chú ý
                    </p>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#fff5eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e67e22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Inventory Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      Tổng SP Tồn Kho
                    </p>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#3d3530",
                        margin: 0,
                      }}
                    >
                      {cards?.total_product_stock || 0}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        margin: 0,
                        marginTop: "4px",
                      }}
                    >
                      Tất cả sản phẩm
                    </p>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#fff5eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e67e22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Material Stock Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      Tồn Kho Nguyên Liệu
                    </p>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#3d3530",
                        margin: 0,
                      }}
                    >
                      {cards?.total_material_stock || 0}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        margin: 0,
                        marginTop: "4px",
                      }}
                    >
                      Tất cả nguyên liệu
                    </p>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#fff5eb",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e67e22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Status Table */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#3d3530",
                    margin: 0,
                  }}
                >
                  Tồn Kho Nguyên Liệu
                </h2>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
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
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d35400")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e67e22")}
                  >
                    <span>+</span> Tạo mới
                  </button>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "visible",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  border: "1px solid #eee",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#fafafa" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "16px 24px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Nguyên liệu
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "16px 24px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Loại
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "16px 24px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Số lượng
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "16px 24px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Hạn dùng
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "16px 24px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#666",
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
                    {materials.map((item) => (
                      <tr
                        key={item.inventory_item_id}
                        style={{
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#3d3530",
                            fontWeight: "500",
                          }}
                        >
                          {item.material_name}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          {item.material_type}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#3d3530",
                          }}
                        >
                          {formatQuantity(item.on_hand_qty)} {item.uom}
                        </td>
                        <td
                          style={{
                            padding: "16px 24px",
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          {formatDate(item.expiry_date)}
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
                              >
                                Chỉnh sửa
                              </button>
                              <button
                                onClick={() => handleDelete(item.inventory_item_id)}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
