import { products } from "../data/products";
import { productCard } from "../components/product-card";
import type { Product } from "../types";

export function productDetailPage(p: Product | undefined): string {
  if (!p) {
    return `<section class="p-10 text-center"><p class="mb-4">Product not found.</p>
      <a class="text-brand underline" href="#/products">Back to products</a></section>`;
  }

  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const inStock = p.stock > 0;

  return `
  <!-- Section 1: Product info -->
  <section class="animate-fade-in mx-auto grid max-w-screen-xl gap-10 px-4 py-12 md:grid-cols-2">
    <img src="${p.image}" alt="${p.name}" class="w-full rounded-lg object-cover"
      onerror="this.onerror=null;this.src='/images/placeholder.svg'" />
    <div>
      <span class="text-sm font-semibold uppercase text-brand dark:text-red-400">${p.category}</span>
      <h1 class="mt-2 text-3xl font-extrabold">${p.name}</h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">★ ${p.rating} · ${p.reviews} reviews</p>
      <p class="mt-4 text-3xl font-bold">$${p.price.toFixed(2)}</p>
      <p class="mt-2 text-sm ${inStock ? "text-green-600" : "text-red-600"}">
        ${inStock ? `In stock (${p.stock})` : "Out of stock"}
      </p>
      <button type="button" data-action="add" data-slug="${p.slug}" ${inStock ? "" : "disabled"}
        class="mt-6 rounded-lg bg-brand px-6 py-3 font-semibold text-white disabled:opacity-50">Add to cart</button>
    </div>
  </section>

  <!-- Section 2: Description and reviews -->
  <section class="mx-auto max-w-3xl px-4 pb-10">
    <h2 class="mb-3 text-2xl font-bold">Description</h2>
    <p class="mb-8 leading-relaxed">${p.description}</p>
  </section>

  <!-- Section 3: Related products -->
  <section class="mx-auto max-w-screen-xl px-4 pb-16">
    <h2 class="mb-6 text-2xl font-bold">You may also like</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${related.map(productCard).join("") || "<p>No related products.</p>"}
    </div>
  </section>`;
}
