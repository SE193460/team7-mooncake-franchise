'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import styles from './management.module.css';
import SearchAndFilters from './SearchAndFilters';
import OrdersTable from './OrdersTable';
import type { Order } from './types';

export default function KitchenOrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const formatVND = (amount: string | number) => {
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN').format(parsedAmount) + ' VNĐ';
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('vi-VN');
    } catch {
      return dateStr;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.statusPending;
      case 'confirmed':
        return styles.statusConfirmed;
      case 'processing':
        return styles.statusProcessing;
      case 'fulfilled':
        return styles.statusFulfilled;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusCancelled;
    }
  };

  const getPaymentStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return styles.paymentPaid;
      case 'unpaid':
        return styles.paymentUnpaid;
      default:
        return styles.paymentUnpaid;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Chờ Xác Nhận';
      case 'confirmed':
        return 'Đã Xác Nhận';
      case 'processing':
        return 'Đang Chuẩn Bị';
      case 'fulfilled':
        return 'Hoàn Thành';
      case 'cancelled':
        return 'Đã Hủy';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'Đã Thanh Toán';
      case 'unpaid':
        return 'Chưa Thanh Toán';
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await fetch(
          'https://franchisemooncake.onrender.com/api/centralKitchen/View_orders',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          console.error('Invalid response format:', data);
          toast.error('Không thể tải danh sách đơn hàng');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Lỗi khi tải danh sách đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.franchise_store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_names.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Sidebar activePage="management" type="kitchen" />

      <main style={{ flex: 1, padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Quản Lý Đơn Hàng
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Xem và quản lý toàn bộ đơn hàng trong hệ thống
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Table */}
        {loading ? (
          <div style={{ paddingTop: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Đang tải danh sách đơn hàng...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            Không tìm thấy đơn hàng nào
          </div>
        ) : (
          <OrdersTable
            orders={filteredOrders}
            expandedOrder={expandedOrder}
            onExpandOrder={setExpandedOrder}
            getStatusClass={getStatusClass}
            getPaymentStatusClass={getPaymentStatusClass}
            getStatusText={getStatusText}
            getPaymentStatusText={getPaymentStatusText}
            formatVND={formatVND}
            formatDate={formatDate}
          />
        )}
      </main>
    </div>
  );
}
