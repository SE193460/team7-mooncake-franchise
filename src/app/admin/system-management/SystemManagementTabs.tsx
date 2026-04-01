"use client";

import StoresTable from "./StoresTable";
import KitchensTable from "./KitchensTable";
import UsersTable from "./UsersTable";
import { FranchiseStore, CentralKitchen } from "../../../services/adminService";
import { AdminUser } from "./types";

interface SystemManagementTabsProps {
  activeTab: "stores" | "kitchens" | "users";
  onTabChange: (tab: "stores" | "kitchens" | "users") => void;
  stores?: FranchiseStore[];
  kitchens?: CentralKitchen[];
  users?: AdminUser[];
  loading?: boolean;
  error?: string | null;
  onEditStore?: (store: FranchiseStore) => void;
  onDeleteStore?: (store: FranchiseStore) => void;
  openMenuId?: string | null;
  onMenuToggle?: (userId: string | null) => void;
  onEditUser?: (user: AdminUser) => void;
  onResetPasswordUser?: (user: AdminUser) => void;
  onDisableUser?: (user: AdminUser) => void;
}

export default function SystemManagementTabs({
  activeTab,
  onTabChange,
  stores = [],
  kitchens = [],
  users = [],
  loading = false,
  error = null,
  onEditStore,
  onDeleteStore,
  openMenuId,
  onMenuToggle,
  onEditUser,
  onResetPasswordUser,
  onDisableUser,
}: SystemManagementTabsProps) {
  const storeCount = stores.length || 0;
  const kitchenCount = kitchens.length || 0;
  const userCount = users.length || 0;

  return (
    <div>
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          borderBottom: "2px solid #E5E7EB",
        }}
      >
        <button
          onClick={() => onTabChange("users")}
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: activeTab === "users" ? "3px solid #FF6B35" : "none",
            color: activeTab === "users" ? "#FF6B35" : "#6B7280",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeTab === "users" ? "600" : "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "users") {
              e.currentTarget.style.color = "#1F2937";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "users") {
              e.currentTarget.style.color = "#6B7280";
            }
          }}
        >
          👥 Người Dùng ({userCount})
        </button>
        <button
          onClick={() => onTabChange("stores")}
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: activeTab === "stores" ? "3px solid #FF6B35" : "none",
            color: activeTab === "stores" ? "#FF6B35" : "#6B7280",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeTab === "stores" ? "600" : "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "stores") {
              e.currentTarget.style.color = "#1F2937";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "stores") {
              e.currentTarget.style.color = "#6B7280";
            }
          }}
        >
          🏪 Cửa Hàng Franchise ({storeCount})
        </button>
        <button
          onClick={() => onTabChange("kitchens")}
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            border: "none",
            borderBottom:
              activeTab === "kitchens" ? "3px solid #FF6B35" : "none",
            color: activeTab === "kitchens" ? "#FF6B35" : "#6B7280",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: activeTab === "kitchens" ? "600" : "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (activeTab !== "kitchens") {
              e.currentTarget.style.color = "#1F2937";
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== "kitchens") {
              e.currentTarget.style.color = "#6B7280";
            }
          }}
        >
          🍳 Bếp Trung Tâm ({kitchenCount})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "stores" && (
        <StoresTable
          stores={stores}
          loading={loading}
          error={error}
          onEditClick={onEditStore}
          onDeleteClick={onDeleteStore}
        />
      )}
      {activeTab === "kitchens" && (
        <KitchensTable
          kitchens={kitchens}
          loading={loading}
          error={error}
        />
      )}
      {activeTab === "users" && (
        <UsersTable
          users={users}
          loading={loading}
          error={error}
          openMenuId={openMenuId || null}
          onMenuToggle={onMenuToggle || (() => {})}
          onEditClick={onEditUser || (() => {})}
          onResetPasswordClick={onResetPasswordUser || (() => {})}
          onDisableClick={onDisableUser || (() => {})}
        />
      )}
    </div>
  );
}
