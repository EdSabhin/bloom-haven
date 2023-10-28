export interface Product {
  id: number | null;
  title: string;
  price: number | string;
  description: string;
  category: string;
  image: string | null;
  rating: number;
}

export interface Rating {
  rate: number;
  count: number;
}
