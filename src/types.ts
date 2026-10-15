export type Category = "Food" | "Fashion" | "Home" | "Beauty";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  price: number; // USD
  image: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}

// What is saved in localStorage
export interface CartItem {
  slug: string;
  qty: number;
}

// What the cart page and checkout page display
export interface CartLine {
  product: Product;
  qty: number;
}
