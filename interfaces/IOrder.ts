import { Product } from "./IProduct"
import { IPagination } from "./IPagination"
export interface IOrderProduct {
  id: number
  cantidad: number
  cantidad_pendiente: number
  status: OrderStatus
  exchange_reason: string
  subproduct_id: string
  subcode: string
  location: string
  usd_sale_price: string
  sale_price: string
  price: string
  b2b_price: string
  title: string
  size: string
  color: string
  img_front: string
  img_back: string
}

export interface IOrder {
    id?:number
    user: string
    user_type: string
    products: IOrderProduct[]
    status: OrderStatus
    total_cost: number
    delivery_address: string
    province: string
    city: string
    postal_code: string
    delivery_cost: number
    products_cost: number
    shipnow_order: number
    timestamp: string
    payment_date: string
    payment_type: string
    mp_metadata: string
    coupon: string
    coupon_value: number
    dollar_price: number
    client_type_name : string
    client_type_multiplier: number
}

export interface IOrderFilter extends IPagination{
  results: IOrder[];
}

export enum OrderStatus {
  PENDING = "Pendiente",
  READY = "Armado",
  DISPATCHED = "Enviado",
  RECEIVED = "Recibido",
  CLOSED = "Cerrado",
  CANCELED = "Cancelado"
}

export interface IOrderItem {
  id: number;
  timestamp: string;
  payment_date: string;
  products: Product[];
}

export interface IOrderFilterRequest {
  status: string;
  startDate: string;
  endDate: string;
}