"use client";

import ManagerSidebar from "../../components/ManagerSidebar";

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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManagerSidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "32px 40px",
          backgroundColor: "#fafafa",
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#3d3530",
              margin: 0,
            }}
          >
            Bảng Quản Lý
          </h1>
          <p style={{ color: "#666", marginTop: "8px", fontSize: "14px" }}>
            Tổng quan tồn kho và báo cáo
          </p>
        </div>

        {/* Status Cards */}
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
                  8
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
                    color: "#3d3530",
                    margin: 0,
                  }}
                >
                  0
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
                  Tổng Tồn Kho
                </p>
                <p
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#3d3530",
                    margin: 0,
                  }}
                >
                  {totalStock} hộp
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
              Tình Trạng Tồn Kho
            </h2>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#e67e22",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Xem chi tiết
            </button>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
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
                    Sản phẩm
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
                    Tồn kho
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
                    Tối thiểu
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr
                    key={index}
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
                      {item.name}
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {item.type}
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontSize: "14px",
                        color: "#3d3530",
                      }}
                    >
                      {item.stock} hộp
                    </td>
                    <td
                      style={{
                        padding: "16px 24px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
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
