"use client";

import { useEffect } from "react";
import { getOrders, Order } from "../../services/orderService";

export default function OrdersPage() {
  useEffect(() => {
    getOrders().then((orders: Order[]) => {
      console.log(orders);
    });
  }, []);

  return <div>Orders Page</div>;
}
