import { IPagination } from "./IPagination";

export interface ClientType {
  name: string;
  price_multiplier: number
}

export interface ClientTypeResponse extends IPagination {
results: ClientType[];
}

export interface AssignClientTypeRequest {
  user_ids: number[];
  new_client_type: string;
}