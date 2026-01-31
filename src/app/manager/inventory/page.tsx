"use client";

import ManagerSidebar from "../../../components/ManagerSidebar";

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
            Quản Lý Kho
          </h1>
          <p style={{ color: "#666", marginTop: "8px", fontSize: "14px" }}>
            Tổng quan tồn kho và cảnh báo
          </p>
        </div>

        {/* Status Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Total Products Card */}
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
              Tổng Sản Phẩm
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#3d3530",
                margin: 0,
              }}
            >
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
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#f97316",
                margin: 0,
              }}
            >
              {lowStockCount}
            </p>
          </div>

          {/* Bánh Nướng Count Card */}
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
              Bánh Nướng
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#3d3530",
                margin: 0,
              }}
            >
              {banhNuongCount}
            </p>
          </div>

          {/* Bánh Dẻo Count Card */}
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
              Bánh Dẻo
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#3d3530",
                margin: 0,
              }}
            >
              {banhDeoCount}
            </p>
          </div>
        </div>

        {/* Inventory Details Section */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#3d3530",
              margin: 0,
            }}
          >
            Chi Tiết Tồn Kho
          </h2>
        </div>

        {/* Inventory Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid #eee",
            overflow: "hidden",
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
