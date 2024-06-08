export interface Store {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  itemCount: number;
  scrapedItemCount: number;
  active: boolean;
}

export interface Material {
  id: string;
  name: string;
  storeId: string;
  links: string[];
}

