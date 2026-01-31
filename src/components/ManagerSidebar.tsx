"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ManagerSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Bảng điều khiển", href: "/manager", icon: "dashboard" },
    { name: "Tồn Kho Tổng", href: "/manager/inventory", icon: "inventory" },
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case "dashboard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      case "inventory":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#3d3530",
        color: "white",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#e67e22",
            borderRadius: "50%",
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
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            Central Kitchen
          </div>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>Quản Lý</div>
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, padding: "10px 0" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                color: "white",
                textDecoration: "none",
                backgroundColor: isActive ? "#e67e22" : "transparent",
                borderRadius: isActive ? "0 25px 25px 0" : "0",
                marginRight: isActive ? "20px" : "0",
                transition: "all 0.2s",
              }}
            >
              {getIcon(item.icon)}
              <span style={{ fontSize: "14px" }}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#9b59b6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            P
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "500" }}>Phạm Thị D</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              manager@franchise.com
            </div>
          </div>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "0",
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Đăng Xuất
        </button>
      </div>
    </div>
  );
}
