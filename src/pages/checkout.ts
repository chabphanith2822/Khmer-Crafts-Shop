import { cartDetails } from "../store/cart";

// Demo checkout: collects no card or bank details.
export function checkoutPage(done: boolean): string {
  if (done) {
    return `
    <section class="animate-fade-in mx-auto max-w-xl px-4 py-20 text-center">
      <h1 class="mb-4 text-3xl font-bold">Thank you for your order!</h1>
      <p class="mb-6 text-gray-500 dark:text-gray-400">This is a demo checkout. No payment was collected.</p>
      <a href="#/products" class="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white">Continue shopping</a>
    </section>`;
  }

  const { lines, subtotal, shipping, total } = cartDetails();
  if (lines.length === 0) {
    return `<section class="p-10 text-center"><p class="mb-4">Your cart is empty.</p>
      <a class="text-brand underline" href="#/products">Shop products</a></section>`;
  }

  const inputClass = "w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-800";

  return `
  <div class="animate-fade-in mx-auto max-w-screen-xl px-4 py-12">
    <h1 class="mb-8 text-3xl font-bold">Checkout</h1>
    <div class="grid gap-10 lg:grid-cols-3">
      <form id="checkout-form" class="space-y-8 lg:col-span-2">
        <!-- Section 1: Shipping details -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">1. Shipping details</h2>
          <input name="name" required placeholder="Full name" class="${inputClass}" />
          <input name="phone" type="tel" required placeholder="Phone number" class="${inputClass}" />
          <textarea name="address" required rows="3" placeholder="Delivery address" class="${inputClass}"></textarea>
        </section>

        <!-- Section 2: Payment method -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">2. Payment method</h2>
          <label class="flex items-center gap-2">
            <input type="radio" name="payment" value="cod" checked /> Cash on delivery
          </label>
          <button type="submit" class="w-full rounded-lg bg-brand py-3 font-semibold text-white sm:w-auto sm:px-8">
            Place order (demo)
          </button>
        </section>
      </form>

      <!-- Section 3: Order summary -->
      <section class="h-fit space-y-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h2 class="text-xl font-semibold">3. Order summary</h2>
        <ul class="space-y-2 text-sm">
          ${lines
            .map(
              (l) => `<li class="flex justify-between gap-2">
                <span>${l.product.name} × ${l.qty}</span>
                <span>$${(l.product.price * l.qty).toFixed(2)}</span>
              </li>`
            )
            .join("")}
        </ul>
        <div class="flex justify-between border-t border-gray-200 pt-3 text-sm dark:border-gray-700">
          <span>Subtotal</span><span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Delivery</span><span>${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div class="flex justify-between text-lg font-bold">
          <span>Total</span><span>$${total.toFixed(2)}</span>
        </div>
      </section>
    </div>
  </div>`;
}
