import type { Product } from "../types";

export function productCard(p: Product): string {
  return `
  <article class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <a href="#/products/${p.slug}">
      <img src="${p.image}" alt="${p.name}" loading="lazy" class="h-56 w-full object-cover"
        onerror="this.onerror=null;this.src='/images/placeholder.svg'" />
    </a>
    <div class="flex flex-1 flex-col p-4">
      <span class="text-xs font-semibold uppercase text-brand dark:text-red-400">${p.category}</span>
      <h3 class="mt-1 text-lg font-semibold">
        <a href="#/products/${p.slug}" class="hover:underline">${p.name}</a>
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">★ ${p.rating} (${p.reviews} reviews)</p>
      <div class="mt-auto flex items-center justify-between pt-4">
        <span class="text-lg font-bold">$${p.price.toFixed(2)}</span>
        <button type="button" data-action="add" data-slug="${p.slug}"
          class="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:opacity-90">Add to cart</button>
      </div>
    </div>
  </article>`;
}
