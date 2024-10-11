import { IPagination } from "./IPagination";

export interface ITitleListResponse extends IPagination{
  results: ITitles[];
}

export interface ITitles{
  id: number;
  name: string;
}