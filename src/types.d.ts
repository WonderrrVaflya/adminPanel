export interface Store {
  ID: string;
  Name: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  URLs: string;
  active?: boolean;
  itemCount?: number;
  scrapedItemCount?: number;
  tasks: Task[];
}

export interface Task {
  id: number;
  site_id: number;
  status: string;
  start_time: string;
  end_time: string;
  products_count: number;
  urls: string;
  created_at: string;
  updated_at: string;
}