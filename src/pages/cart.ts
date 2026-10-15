import { cartDetails } from "../store/cart";

export function cartPage(): string {
  const { lines, subtotal, shipping, total } = cartDetails();

  if (lines.length === 0) {
    return `
    <section class="animate-fade-in mx-auto max-w-screen-xl px-4 py-20 text-center">
      <h1 class="mb-4 text-3xl font-bold">Your cart is empty</h1>
      <a href="#/products" class="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white">Start shopping</a>
    </section>`;
  }

  return `
  <!-- Section 1: Cart items -->
  <section class="animate-fade-in mx-auto max-w-screen-xl px-4 pt-12">
    <h1 class="mb-6 text-3xl font-bold">Shopping cart</h1>
    <div class="space-y-4">
      ${lines
        .map(
          (l) => `
        <div class="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center dark:border-gray-700">
          <img src="${l.product.image}" alt="${l.product.name}" class="h-24 w-24 rounded-lg object-cover"
            onerror="this.onerror=null;this.src='/images/placeholder.svg'" />
          <div class="flex-1">
            <a href="#/products/${l.product.slug}" class="font-semibold hover:underline">${l.product.name}</a>
            <p class="text-sm text-gray-500 dark:text-gray-400">$${l.product.price.toFixed(2)} each</p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-action="dec" data-slug="${l.product.slug}"
              class="h-8 w-8 rounded border border-gray-300 dark:border-gray-600">−</button>
            <span class="w-8 text-center">${l.qty}</span>
            <button type="button" data-action="inc" data-slug="${l.product.slug}"
              class="h-8 w-8 rounded border border-gray-300 dark:border-gray-600">+</button>
          </div>
          <p class="w-24 text-right font-bold">$${(l.product.price * l.qty).toFixed(2)}</p>
          <button type="button" data-action="remove" data-slug="${l.product.slug}"
            class="text-sm text-red-600 hover:underline">Remove</button>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <!-- Section 2: Order summary -->
  <section class="mx-auto max-w-screen-xl px-4 py-10">
    <div class="ml-auto max-w-sm space-y-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <div class="flex justify-between"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="flex justify-between"><span>Delivery</span><span>${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
      <div class="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold dark:border-gray-700">
        <span>Total</span><span>$${total.toFixed(2)}</span>
      </div>
      <a href="#/checkout" class="block rounded-lg bg-brand py-3 text-center font-semibold text-white">Proceed to checkout</a>
    </div>
  </section>

  <!-- Section 3: Continue shopping -->
  <section class="mx-auto max-w-screen-xl px-4 pb-16 text-center">
    <a href="#/products" class="text-brand underline dark:text-red-400">Continue shopping</a>
  </section>`;
}
