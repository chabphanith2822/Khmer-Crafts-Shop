import { products } from "../data/products";
import { productCard } from "../components/product-card";
import { escapeHtml } from "../utils";
import type { Category } from "../types";

interface Filter {
  q: string;
  category: Category | "";
}

export function productsPage(filter: Filter): string {
  const q = filter.q.toLowerCase();
  const list = products.filter(
    (p) =>
      (!filter.category || p.category === filter.category) &&
      (!q || p.name.toLowerCase().includes(q))
  );
  const pills: (Category | "")[] = ["", "Food", "Fashion", "Home", "Beauty"];

  return `
  <!-- Section 1: Search and category filter -->
  <section class="mx-auto max-w-screen-xl px-4 pt-10">
    <h1 class="mb-4 text-3xl font-bold">${filter.category || "All products"}</h1>
    <form id="search-form" class="flex flex-col gap-3 sm:flex-row">
      <input name="q" value="${escapeHtml(filter.q)}" placeholder="Search products..."
        class="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-800" />
      <button type="submit" class="rounded-lg bg-brand px-5 py-3 font-semibold text-white">Search</button>
    </form>
    <div class="mt-4 flex flex-wrap gap-2">
      ${pills
        .map((c) => {
          const active = c === filter.category;
          const style = active
            ? "border-brand bg-brand text-white"
            : "border-gray-300 dark:border-gray-600";
          return `<a href="#/products?category=${c}" class="rounded-full border px-3 py-1 text-sm ${style}">${c || "All"}</a>`;
        })
        .join("")}
    </div>
  </section>

  <!-- Section 2: Product grid -->
  <section class="mx-auto max-w-screen-xl px-4 py-8">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${list.map(productCard).join("") || `<p class="col-span-full text-center text-gray-500">No products found.</p>`}
    </div>
  </section>

  <!-- Section 3: Shipping banner -->
  <section class="mx-auto max-w-screen-xl px-4 pb-16">
    <div class="rounded-lg bg-gray-100 p-6 text-center font-semibold dark:bg-gray-800">
      Free delivery on orders over $30
    </div>
  </section>`;
}
