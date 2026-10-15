const links = [
  { href: "#/", label: "Home" },
  { href: "#/products", label: "Products" },
];

export function navbar(cartItems: number): string {
  return `
  <nav class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3 p-4">
      <a href="#/" class="text-xl font-bold text-brand dark:text-red-400">Khmer Crafts</a>
      <div class="flex items-center gap-4 text-sm font-medium">
        ${links.map((l) => `<a href="${l.href}" class="hover:text-brand dark:hover:text-red-400">${l.label}</a>`).join("")}
        <a href="#/cart" class="rounded-lg border border-gray-300 px-3 py-1.5 dark:border-gray-600">
          Cart <span class="ml-1 rounded-full bg-brand px-2 text-white">${cartItems}</span>
        </a>
        <button id="theme-toggle" type="button" aria-label="Toggle dark mode"
          class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Dark</button>
      </div>
    </div>
  </nav>`;
}

// Applies the saved theme and wires the toggle button. Call after every render.
export function initTheme(): void {
  const root = document.documentElement;
  try {
    if (localStorage.getItem("theme") === "dark") root.classList.add("dark");
  } catch {
    /* storage unavailable: keep default theme */
  }

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    root.classList.toggle("dark");
    try {
      localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  });
}
