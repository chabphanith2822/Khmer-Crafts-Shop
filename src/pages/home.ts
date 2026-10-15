import { products } from "../data/products";
import { productCard } from "../components/product-card";
import type { Category } from "../types";

const categories: Category[] = ["Food", "Fashion", "Home", "Beauty"];

export function homePage(): string {
  const featured = products.slice(0, 4);

  return `
  <!-- Section 1: Hero with Background Image -->
  <section class="relative animate-fade-in px-4 py-20 text-center text-white overflow-hidden">
    <!-- Background Image -->
    <img
      src="/images/hero-bg.jpg"
      alt="Hero Background"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <!-- Dark Overlay so text is easy to read -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-3xl py-12">
      <h1 class="mb-4 text-4xl font-extrabold md:text-5xl">Authentic Khmer Products</h1>
      <p class="mx-auto max-w-xl text-lg opacity-90">Food, fashion and handicrafts from Cambodian farmers and artisans.</p>
      <a href="#/products" class="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 font-semibold text-brand transition hover:bg-gray-100">Shop now</a>
    </div>
  </section>

  <!-- Section 2: Featured products -->
  <section class="mx-auto max-w-screen-xl px-4 py-12">
    <h2 class="mb-6 text-2xl font-bold">Featured products</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${featured.map(productCard).join("")}
    </div>
  </section>

  <!-- Section 3: Categories -->
  <section class="mx-auto max-w-screen-xl px-4 pb-16">
    <h2 class="mb-6 text-2xl font-bold">Shop by category</h2>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${categories
        .map(
          (c) => `<a href="#/products?category=${c}"
            class="rounded-lg border border-gray-200 p-6 text-center font-semibold hover:border-brand hover:text-brand dark:border-gray-700">${c}</a>`
        )
        .join("")}
    </div>
  </section>`;
}