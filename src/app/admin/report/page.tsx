'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import SummaryCards from './SummaryCards';
import FinanceSection from './FinanceSection';
import OrderStatusSection from './OrderStatusSection';
import OrderByStoreSection from './OrderByStoreSection';
import UserDistributionSection from './UserDistributionSection';

export default function ReportPage() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 6,
        activeStores: 3,
        totalOrders: 11,
        totalInventory: 1145,
        revenue: 126350000,
        orders: 39600000,
        expectedRevenue: 126350000,
        profitMargin: 10,
    });

    const refreshReport = async () => {
        const toastId = toast.loading('Đang tải báo cáo...');
        try {
            setLoading(true);
            // Add actual API call here
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.dismiss(toastId);
            toast.success('✓ Tải báo cáo thành công!', {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err) {
            toast.dismiss(toastId);
            toast.error('❌ Lỗi khi tải báo cáo. Vui lòng thử lại!', {
                position: 'top-right',
                autoClose: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
            <Sidebar activePage="report" type="admin" />
            
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                                Báo Cáo Tổng Hợp Hệ Thống
                            </h1>
                            <p style={{ fontSize: '14px', color: '#6B7280' }}>
                                Tổng quan toàn bộ hoạt động kinh doanh, nhân sự và tồn kho
                            </p>
                        </div>
                        <button
                            onClick={refreshReport}
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: loading ? '#D1D5DB' : '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                opacity: loading ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2563EB')}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#3B82F6')}
                        >
                            {loading ? '⟳ Đang tải...' : '↻ Tải lại'}
                        </button>
                    </div>

                    {/* Summary Cards */}
                    <SummaryCards stats={stats} />

                    {/* Finance Section */}
                    <FinanceSection stats={stats} />

                    {/* Order Status Section */}
                    <OrderStatusSection />

                    {/* Order by Store Section */}
                    <OrderByStoreSection />

                    {/* User Distribution Section */}
                    <UserDistributionSection />
                </div>
            </div>
        </div>
    );
}
