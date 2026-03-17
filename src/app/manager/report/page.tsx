'use client'

import Sidebar from "../../../components/Sidebar";

interface StoreRevenue {
    name: string;
    totalOrders: number;
    paid: string;
    pending: string;
    status: "active" | "inactive";
}

interface RecentPayment {
    orderId: string;
    store: string;
    amount: string;
    status: "paid";
}

const storeRevenue: StoreRevenue[] = [
    {
        name: "Chi nhánh Quận 1",
        totalOrders: 6,
        paid: "4.000.000 VNĐ",
        pending: "39.600.000 VNĐ",
        status: "active",
    },
    {
        name: "Chi nhánh Quận 3",
        totalOrders: 3,
        paid: "9.000.000 VNĐ",
        pending: "—",
        status: "active",
    },
    {
        name: "Chi nhánh Quận 7",
        totalOrders: 2,
        paid: "—",
        pending: "—",
        status: "active",
    },
    {
        name: "Chi nhánh Bình Thạnh",
        totalOrders: 0,
        paid: "—",
        pending: "—",
        status: "inactive",
    },
];

const recentPayments: RecentPayment[] = [
    {
        orderId: "ORD-005",
        store: "Chi nhánh Quận 3",
        amount: "9.000.000 VNĐ",
        status: "paid",
    },
    {
        orderId: "ORD-006",
        store: "Chi nhánh Quận 1",
        amount: "4.000.000 VNĐ",
        status: "paid",
    },
];

export default function ManagerReportPage() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar activePage="report" />

            <main className="flex-1 p-8 bg-gray-50">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Báo Cáo & Thống Kê</h1>
                    <p className="text-gray-500 text-sm">
                        Tổng hợp doanh thu và hiệu suất kinh doanh
                    </p>
                </div>

                {/* Top Revenue Cards */}
                <div className="grid grid-cols-4 gap-6 mb-6">

                    <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow">
                        <p className="text-sm text-gray-500 mb-2">Đã Thu</p>
                        <p className="text-xl font-bold text-green-600">13.000.000 VNĐ</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow">
                        <p className="text-sm text-gray-500 mb-2">Chờ Thu</p>
                        <p className="text-xl font-bold text-orange-600">39.600.000 VNĐ</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500 mb-2">Tổng Giá Trị</p>
                        <p className="text-xl font-bold">126.350.000 VNĐ</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500 mb-2">Tỷ Lệ Thu Tiền</p>
                        <p className="text-xl font-bold">10%</p>
                    </div>

                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500">Tổng Đơn Hàng</p>
                        <p className="text-xl font-bold">11</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500">Đã Hoàn Thành</p>
                        <p className="text-xl font-bold text-green-600">8</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500">Tổng Tồn Kho</p>
                        <p className="text-xl font-bold">1145 hộp</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-sm text-gray-500">Tỷ Lệ Hoàn Thành</p>
                        <p className="text-xl font-bold">73%</p>
                    </div>

                </div>

                {/* Revenue by Store */}
                <div className="bg-white rounded-xl shadow mb-8">

                    <div className="p-6 border-b font-semibold">
                        Doanh Thu Theo Cửa Hàng
                    </div>

                    <table className="w-full text-left">

                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="p-4">Cửa Hàng</th>
                                <th className="p-4">Tổng Đơn</th>
                                <th className="p-4">Đã Thanh Toán</th>
                                <th className="p-4">Chờ Thanh Toán</th>
                                <th className="p-4">Trạng Thái</th>
                            </tr>
                        </thead>

                        <tbody>
                            {storeRevenue.map((store, index) => (
                                <tr key={index} className="border-t">

                                    <td className="p-4">{store.name}</td>

                                    <td className="p-4">{store.totalOrders}</td>

                                    <td className="p-4 text-green-600 font-semibold">
                                        {store.paid}
                                    </td>

                                    <td className="p-4 text-orange-600 font-semibold">
                                        {store.pending}
                                    </td>

                                    <td className="p-4">
                                        {store.status === "active" ? (
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                                Hoạt Động
                                            </span>
                                        ) : (
                                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                Ngừng Hoạt Động
                                            </span>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                {/* Recent Payments */}
                <div className="bg-white rounded-xl shadow">

                    <div className="p-6 border-b font-semibold">
                        Thanh Toán Gần Đây
                    </div>

                    <table className="w-full text-left">

                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="p-4">Mã Đơn</th>
                                <th className="p-4">Cửa Hàng</th>
                                <th className="p-4">Số Tiền</th>
                                <th className="p-4">Thanh Toán</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentPayments.map((p) => (
                                <tr key={p.orderId} className="border-t">

                                    <td className="p-4">{p.orderId}</td>

                                    <td className="p-4">{p.store}</td>

                                    <td className="p-4 text-green-600 font-semibold">
                                        {p.amount}
                                    </td>

                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                            Đã Thanh Toán
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
}