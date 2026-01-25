"use client";

import { useEffect } from "react";
import { getOrders } from "../../services/orderService";

export default function OrdersPage() {
  useEffect(() => {
    getOrders().then(res => {
      console.log(res.data);
    });
  }, []);

  return <div>Orders Page</div>;
}
