'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../../components/Sidebar';
import SummaryCards from './SummaryCards';
import FinanceSection from './FinanceSection';
import OrderStatusSection from './OrderStatusSection';
import OrderByStoreSection from './OrderByStoreSection';
import UserDistributionSection from './UserDistributionSection';
import adminService, { SystemReportData } from '../../../services/adminService';

export default function ReportPage() {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<SystemReportData | null>(null);

    const fetchReport = async (showNotification: boolean = false) => {
        const toastId = showNotification ? toast.loading('Đang tải báo cáo...') : null;
        try {
            setLoading(true);
            const data = await adminService.getSystemReport();
            setReportData(data);
            
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.success('✓ Tải báo cáo thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (err) {
            if (showNotification && toastId) {
                toast.dismiss(toastId);
                toast.error('❌ Lỗi khi tải báo cáo. Vui lòng thử lại!', {
                    position: 'top-right',
                    autoClose: 4000,
                });
            }
            console.error('Error fetching report:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport(false);
    }, []);

    const refreshReport = async () => {
        await fetchReport(true);
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

                    {reportData && (
                        <>
                            {/* Summary Cards */}
                            <SummaryCards data={reportData.summary_cards} />

                            {/* Finance Section */}
                            <FinanceSection data={reportData.financial} />

                            {/* Order Status Section */}
                            <OrderStatusSection data={reportData.order_status} />

                            {/* Order by Store Section */}
                            <OrderByStoreSection data={reportData.store_report} />

                            {/* User Distribution Section */}
                            <UserDistributionSection data={reportData.role_distribution} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
