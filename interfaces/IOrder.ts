import { Product } from "./IProduct"

export interface IOrder {
    id?:number
    product: Product[]
    user: string
    status: string
  
}