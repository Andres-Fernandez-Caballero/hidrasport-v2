export interface IPagination{
  count: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
}
