import { getProduct } from "../data/products";
import type { CartItem, CartLine, Product } from "../types";

const KEY = "khmer-shop-cart";
const FREE_SHIPPING_MIN = 30;
const SHIPPING_FEE = 2;

// Every storage call is wrapped: private mode or blocked storage must not break the page.
function readItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeItems(items: CartItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable: cart works for this page view only */
  }
}

export function addToCart(slug: string): void {
  const max = getProduct(slug)?.stock ?? 0;
  const items = readItems();
  const found = items.find((i) => i.slug === slug);
  if (found) found.qty = Math.min(found.qty + 1, max);
  else if (max > 0) items.push({ slug, qty: 1 });
  writeItems(items);
}

export function changeQty(slug: string, delta: number): void {
  const max = getProduct(slug)?.stock ?? 0;
  const items = readItems()
    .map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + delta, max) } : i))
    .filter((i) => i.qty > 0);
  writeItems(items);
}

export function removeFromCart(slug: string): void {
  writeItems(readItems().filter((i) => i.slug !== slug));
}

export function clearCart(): void {
  writeItems([]);
}

export function cartCount(): number {
  return readItems().reduce((sum, i) => sum + i.qty, 0);
}

export function cartDetails(): {
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
} {
  const lines = readItems()
    .map((i) => ({ product: getProduct(i.slug), qty: i.qty }))
    .filter((l): l is { product: Product; qty: number } => l.product !== undefined);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  return { lines, subtotal, shipping, total: subtotal + shipping };
}
