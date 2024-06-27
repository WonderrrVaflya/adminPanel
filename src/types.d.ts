export interface Store {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  URLs: string;
  active: boolean;
  itemCount: number;
  scrapedItemCount: number;
  tasks: string[]
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  image: string;
}