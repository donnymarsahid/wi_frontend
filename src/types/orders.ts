import { CartProps } from "./cart";

export interface OrdersProps {
  data: OrdersDaum[];
  meta: Meta;
}

export interface OrdersDaum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  id: number;
  customerName: string;
  orderDate: string;
  totalAmount: string;
  grandTotal?: string;
  orderStatus: string;
  paymentMethod: any;
  paymentStatus: string;
  orderNumber: string;
  shippingAddress: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  midtransUrl?: string;
  midtransToken?: string;
  bukti_transfer: any;
  ongkir: any;
  orderItems: CartProps[];
  users_permissions_users: any;
  paymentMethodJSON: any;
  expiry_time: string;
  va_number: string;
  transaction_id: string;
  bank_name: string;
  bill_key: string;
  biller_code: string;
  permata_va_number: string;
  isPayment: boolean;
}

export interface OrderItem {
  id: number;
  qty: number;
  amount: string;
  detailsItems: any;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
