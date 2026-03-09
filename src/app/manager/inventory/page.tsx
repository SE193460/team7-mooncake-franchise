"use client";

import Sidebar from "../../../components/Sidebar";
import styles from "./inventory.module.css";

export default function InventoryManagement() {
  // Sample inventory data with expiry dates and status
  const inventoryData = [
    {
      name: "Bánh Trung Thu Thập Cẩm",
      type: "Bánh Nướng",
      stock: 500,
      minStock: 200,
      status: "sufficient",
      expiryDate: "15/02/2026",
    },
    {
      name: "Bánh Dẻo Đậu Xanh",
      type: "Bánh Dẻo",
      stock: 150,
      minStock: 100,
      status: "medium",
      expiryDate: "10/02/2026",
    },
    {
      name: "Bánh Nướng Trà Xanh",
      type: "Bánh Nướng",
      stock: 80,
      minStock: 50,
      status: "sufficient",
      expiryDate: "20/02/2026",
    },
    {
      name: "Bánh Dẻo Sữa Dừa",
      type: "Bánh Dẻo",
      stock: 200,
      minStock: 100,
      status: "sufficient",
      expiryDate: "08/02/2026",
    },
    {
      name: "Bánh Nướng Hạt Sen",
      type: "Bánh Nướng",
      stock: 45,
      minStock: 40,
      status: "medium",
      expiryDate: "25/01/2026",
    },
    {
      name: "Bánh Trung Thu Jambon",
      type: "Bánh Mặn",
      stock: 30,
      minStock: 25,
      status: "medium",
      expiryDate: "20/01/2026",
    },
    {
      name: "Bánh Dẻo Khoai Môn",
      type: "Bánh Dẻo",
      stock: 120,
      minStock: 80,
      status: "medium",
      expiryDate: "12/02/2026",
    },
    {
      name: "Bánh Nướng Vị Cá",
      type: "Bánh Cao Cấp",
      stock: 20,
      minStock: 15,
      status: "medium",
      expiryDate: "18/01/2026",
    },
  ];

  // Calculate statistics
  const totalProducts = inventoryData.length;
  const lowStockCount = inventoryData.filter(
    (item) => item.stock < item.minStock
  ).length;
  const banhNuongCount = inventoryData.filter(
    (item) => item.type === "Bánh Nướng"
  ).length;
  const banhDeoCount = inventoryData.filter(
    (item) => item.type === "Bánh Dẻo"
  ).length;

  const getStatusStyle = (status: string) => {
    if (status === "sufficient") {
      return {
        color: "#22c55e",
        icon: "↗",
        text: "Đủ",
      };
    }
    return {
      color: "#f97316",
      icon: "⚡",
      text: "Trung Bình",
    };
  };

  return (
    <div className={styles.container}>
      <Sidebar type="manager" activePage="inventory" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Quản Lý Kho
          </h1>
          <p className={styles.pageSubtitle}>
            Tổng quan tồn kho và cảnh báo
          </p>
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
          <div className={styles.card}>
            <p className={styles.cardLabel}>
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
        <div style={{ marginBottom: "24px" }}>
          <h2 className={styles.sectionTitle}>
            Chi Tiết Tồn Kho
          </h2>
        </div>

        {/* Inventory Table */}
        <div className={styles.tableContainer}>
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
                  Loại
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
                  Tối Thiểu
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
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => {
                const statusStyle = getStatusStyle(item.status);
                return (
                  <tr
                    key={index}
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
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.type}
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#3d3530",
                      }}
                    >
                      {item.stock} hộp
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.minStock} hộp
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
                      {item.expiryDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
