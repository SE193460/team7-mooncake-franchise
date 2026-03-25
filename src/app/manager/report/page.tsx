'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";

export default function ManagerReportPage() {

    const router = useRouter();
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);
    const [stats, setStats] = useState({
        waiting: 0,
        paid: 0,
    });

    const formatVND = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
    };

    const formatDate = (date: string | null) => {
        if (!date) return '—';
        try {
            return new Date(date).toLocaleDateString('vi-VN');
        } catch {
            return date;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        fetch(`http://localhost:8000/api/franchise/payment-orders?page=1&limit=50`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (res.status === 401) {
                    router.push("/login");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (!data?.data) return;

                const d = data.data;

                setPendingOrders(d.waiting_payment_orders || []);
                setHistory(d.payment_history || []);
                setStats({
                    waiting: d.waiting_payment_count,
                    paid: d.paid_count,
                });
            })
            .catch(console.error);
    }, []);

    const handlePayment = async (orderId: number) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8000/api/Manager_confirmPaymentOrder/orders/${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Lỗi xác nhận thanh toán");
                return;
            }

            alert("Xác nhận thanh toán thành công!");

            // 👉 cập nhật UI (cách 1: reload lại data)
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar type="manager" activePage="report" />
            <main className="flex-1 p-8 bg-[#FAF9F6]">
                {/* Title */}
                <h1 className="text-3xl font-bold text-[#3D2B1F] mb-1">Báo Cáo Doanh Thu</h1>
                <p className="text-gray-400 mb-10 text-sm">
                    Quản lý báo cáo doanh thu
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 flex justify-between items-center group transition-all hover:shadow-md">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-3">Chờ Thanh Toán</p>
                            <p className="text-4xl font-bold text-[#E65C00]">
                                {stats.waiting}
                            </p>
                        </div>
                        <div className="text-[#E65C00]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="3" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                        </div>
                    </div>

                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8 flex justify-between items-center group transition-all hover:shadow-md">
                        <div>
                            <p className="text-gray-400 text-sm font-medium mb-3">Đã Thanh Toán</p>
                            <p className="text-4xl font-bold text-[#10B981]">
                                {stats.paid}
                            </p>
                        </div>
                        <div className="text-[#10B981]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="4" y2="20" /><path d="M17 8H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                    </div>
                </div>

                {/* Pending Orders */}
                <h2 className="text-xl font-bold text-[#3D2B1F] mb-6">Đơn Hàng Chờ Thanh Toán</h2>
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm mb-12 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Mã Đơn Hàng</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Sản Phẩm</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Số Tiền</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Ngày Nhận Hàng</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {pendingOrders.map((order) => (
                                <tr key={order.order_id} className="hover:bg-gray-50/40 transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <svg className="text-[#E65C00]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                            <span className="font-bold text-gray-700">{order.order_code}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1">
                                            {order.product_summary}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-2 font-bold text-[#E65C00]">
                                            <span>{formatVND(order?.amount || 0)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-[14px] text-gray-500">
                                        {formatDate(order?.received_date)}
                                    </td>
                                    <td className="px-8 py-7">
                                        <button
                                            onClick={() => handlePayment(order.order_id)}
                                            className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                            Xác Nhận Thanh Toán
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment History */}
                <h2 className="text-xl font-bold text-[#3D2B1F] mb-6">Lịch Sử Thanh Toán</h2>
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-12">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Mã Đơn Hàng</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Số Tiền</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Ngày Thanh Toán</th>
                                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {history.map((item) => (
                                <tr key={item.order_id} className="hover:bg-gray-50/40 transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <svg className="text-[#DAA06D]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                                            <span className="font-bold text-gray-700">{item.order_code}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-2 font-bold text-gray-800">
                                            <span>{formatVND(item.amount || 0)}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-[14px] text-gray-500">
                                        {formatDate(item.paid_at)}
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className="bg-[#D1FAE5] text-[#059669] px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider">
                                            {item.status_label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

