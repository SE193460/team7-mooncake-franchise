"use client";

import Sidebar from "../../components/Sidebar";
import styles from "./manager.module.css";

export default function ManagerDashboard() {
  // Sample inventory data
  const inventoryData = [
    {
      name: "Bánh Trung Thu Thập Cẩm",
      type: "Bánh Nướng",
      stock: 500,
      minStock: 200,
    },
    {
      name: "Bánh Dẻo Đậu Xanh",
      type: "Bánh Dẻo",
      stock: 150,
      minStock: 100,
    },
    {
      name: "Bánh Nướng Trà Xanh",
      type: "Bánh Nướng",
      stock: 80,
      minStock: 50,
    },
    {
      name: "Bánh Dẻo Sữa Dừa",
      type: "Bánh Dẻo",
      stock: 200,
      minStock: 100,
    },
    {
      name: "Bánh Nướng Hạt Sen",
      type: "Bánh Nướng",
      stock: 45,
      minStock: 40,
    },
    {
      name: "Bánh Trung Thu Jambon",
      type: "Bánh Mặn",
      stock: 30,
      minStock: 25,
    },
    {
      name: "Bánh Dẻo Khoai Môn",
      type: "Bánh Dẻo",
      stock: 120,
      minStock: 80,
    },
    {
      name: "Bánh Nướng Vị Cá",
      type: "Bánh Cao Cấp",
      stock: 20,
      minStock: 15,
    },
  ];

  // Calculate total stock
  const totalStock = inventoryData.reduce((sum, item) => sum + item.stock, 0);

  // Count low stock warnings (items where stock is below or near minimum)
  const lowStockCount = inventoryData.filter(
    (item) => item.stock <= item.minStock * 1.2
  ).length;

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

        {/* Status Cards */}
        <div className={styles.statusCards}>
          {/* Total Orders Card */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div>
                <p className={styles.cardLabel}>
                  Tổng Đơn Hàng
                </p>
                <p className={styles.cardValue}>
                  8
                </p>
                <p className={styles.cardSubtext}>
                  Tháng này
                </p>
              </div>
              <div className={styles.cardIcon}>
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
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div>
                <p className={styles.cardLabel}>
                  Cảnh Báo Tồn Kho
                </p>
                <p className={styles.cardValue}>
                  0
                </p>
                <p className={styles.cardSubtext}>
                  Cần chú ý
                </p>
              </div>
              <div className={styles.cardIcon}>
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
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div>
                <p className={styles.cardLabel}>
                  Tổng Tồn Kho
                </p>
                <p className={styles.cardValue}>
                  {totalStock} hộp
                </p>
                <p className={styles.cardSubtext}>
                  Tất cả sản phẩm
                </p>
              </div>
              <div className={styles.cardIcon}>
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
        </div>

        {/* Inventory Status Table */}
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Tình Trạng Tồn Kho
            </h2>
            <button className={styles.viewDetailsBtn}>
              Xem chi tiết
            </button>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>
                    Sản phẩm
                  </th>
                  <th className={styles.tableHeader}>
                    Loại
                  </th>
                  <th className={styles.tableHeader}>
                    Tồn kho
                  </th>
                  <th className={styles.tableHeader}>
                    Tối thiểu
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCellName}>
                      {item.name}
                    </td>
                    <td className={styles.tableCellText}>
                      {item.type}
                    </td>
                    <td className={styles.tableCellValue}>
                      {item.stock} hộp
                    </td>
                    <td className={styles.tableCellText}>
                      {item.minStock} hộp
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
