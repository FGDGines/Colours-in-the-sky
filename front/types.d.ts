export interface ProductType {
  id: number;
  name: string;
  slug: string;
  image: string[];
  alt: string;
  category: string;
  price: number;
  details: string;
  quantity?: number;
}

export interface CartType {
  id: number;
  name: string;
  slug: string;
  image: string[];
  category: string;
  price: number;
  details: string;
  quantity: number;
}
