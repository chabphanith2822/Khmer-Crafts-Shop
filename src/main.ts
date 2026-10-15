import "./style.css";
import { navbar, initTheme } from "./components/navbar";
import { homePage } from "./pages/home";
import { productsPage } from "./pages/products";
import { productDetailPage } from "./pages/product-detail";
import { cartPage } from "./pages/cart";
import { checkoutPage } from "./pages/checkout";
import { getProduct } from "./data/products";
import { addToCart, changeQty, removeFromCart, clearCart, cartCount } from "./store/cart";
import type { Category } from "./types";

const CATEGORIES: string[] = ["Food", "Fashion", "Home", "Beauty"];
const app = document.getElementById("app")!;

function setSeo(title: string, description: string): void {
  document.title = `${title} · Khmer Crafts Shop`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

// Hash router: #/, #/products, #/products?category=Food, #/products/:slug, #/cart, #/checkout
function render(keepScroll = false): void {
  const y = window.scrollY;
  const [path, query = ""] = window.location.hash.replace(/^#/, "").split("?");
  const route = path || "/";
  const params = new URLSearchParams(query);
  let page: string;

  if (route === "/") {
    setSeo("Home", "Shop authentic Khmer food, fashion and handicrafts online.");
    page = homePage();
  } else if (route === "/products") {
    const cat = params.get("category") ?? "";
    const category = CATEGORIES.includes(cat) ? (cat as Category) : "";
    setSeo("Products", "Browse Khmer food, fashion, home and beauty products.");
    page = productsPage({ q: params.get("q") ?? "", category });
  } else if (route.startsWith("/products/")) {
    const product = getProduct(route.slice("/products/".length));
    setSeo(product?.name ?? "Not found", product?.description ?? "Product not found.");
    page = productDetailPage(product);
  } else if (route === "/cart") {
    setSeo("Cart", "Review the items in your cart.");
    page = cartPage();
  } else if (route === "/checkout") {
    setSeo("Checkout", "Complete your order.");
    page = checkoutPage(params.get("done") === "1");
  } else {
    setSeo("Not found", "Page not found.");
    page = `<section class="p-10 text-center"><p class="mb-4">Page not found.</p>
      <a class="text-brand underline" href="#/">Go home</a></section>`;
  }

  app.innerHTML = navbar(cartCount()) + page;
  initTheme();
  window.scrollTo(0, keepScroll ? y : 0);
}

// Buttons use data-action / data-slug. Listening on #app covers every re-render.
app.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("[data-action]");
  if (!el || el.hasAttribute("disabled")) return;
  const slug = el.dataset.slug ?? "";

  switch (el.dataset.action) {
    case "add":
      addToCart(slug);
      break;
    case "inc":
      changeQty(slug, 1);
      break;
    case "dec":
      changeQty(slug, -1);
      break;
    case "remove":
      removeFromCart(slug);
      break;
    default:
      return;
  }
  render(true);
});

app.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  if (form.id === "search-form") {
    const q = String(new FormData(form).get("q") ?? "").trim();
    const next = `#/products?q=${encodeURIComponent(q)}`;
    if (window.location.hash === next) render();
    else window.location.hash = next;
  } else if (form.id === "checkout-form") {
    clearCart();
    window.location.hash = "#/checkout?done=1";
  }
});

window.addEventListener("hashchange", () => render());
render();
