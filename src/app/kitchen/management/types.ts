export interface Product {
  product_id: number;
  product_name: string;
  qty: number;
  unit_price: number;
  line_total: number;
}

export interface Order {
  order_id: string;
  order_code: string;
  status: string;
  payment_status: string;
  created_at: string;
  desired_date: string;
  fulfilled_at: string;
  franchise_store_id: string;
  franchise_store_name: string;
  total_amount: string;
  total_items: number;
  total_product_qty: number;
  product_names: string;
  product_details: Product[];
}
