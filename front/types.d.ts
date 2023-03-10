
export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string[];
  category: string;
  price: number;
  details: string;
}

export type CartItem = {
  product: Product,
  quantity: number
}
