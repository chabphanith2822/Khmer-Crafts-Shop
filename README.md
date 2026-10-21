# Khmer Crafts Shop 🛒

An online shop for authentic Khmer food, fashion, home goods and beauty products.
Built as a **Frontend Mini Project** (ISTAD – Institute of Science and Technology Advanced Development).

---

## Features

- **5 pages** – Home, Products, Product Detail, Cart, Checkout
- **3 sections per page** – every page is split into clear, commented sections
- **Search and category filter** on the Products page
- **Shopping cart** – add, increase/decrease quantity, remove, and see subtotal
- **Free delivery** rule (orders over $30), otherwise $2.00 delivery fee
- **Dark mode** toggle – the choice is remembered in the browser
- **Responsive design** – works on phones, tablets and desktops
- **SEO** – per-page `<title>` and meta description, Open Graph tags
- **TypeScript** throughout, with typed data models
- **Real static data** – 8 products stored in `src/data/products.ts`

## Pages

| # | Page | Sections |
|---|------|----------|
| 1 | **Home** | Hero banner · Featured products · Shop by category |
| 2 | **Products** | Search & filter · Product grid · Free-delivery banner |
| 3 | **Product Detail** | Product info & add to cart · Description · You may also like |
| 4 | **Cart** | Cart items (qty, remove) · Order summary · Continue shopping |
| 5 | **Checkout** | Shipping details · Payment method · Order summary |

The site uses a small hash-based router (`#/`, `#/products`, `#/products/:slug`, `#/cart`, `#/checkout`), so it works without a server-side setup.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [TypeScript](https://www.typescriptlang.org/) | Type-safe code |
| [Vite](https://vitejs.dev/) | Development server and build tool |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling, responsive layout, dark mode |
| [Flowbite](https://flowbite.com/) | Tailwind plugin included in the setup (components can be added later) |

## Project Structure

```
ecommerce-shop/
├── index.html                 # Entry page with SEO meta tags
├── package.json               # Scripts and dependencies
├── tsconfig.json              # TypeScript settings
├── vite.config.ts             # Vite + Tailwind setup
├── public/
│   └── images/                # Product photos go here (see README.txt inside)
└── src/
    ├── main.ts                # Router, click and form handlers
    ├── style.css              # Tailwind v4, dark variant, brand colour, animation
    ├── types.ts               # Product, CartItem, CartLine, Category types
    ├── utils.ts               # escapeHtml helper (protects against unsafe input)
    ├── data/
    │   └── products.ts        # Static product list
    ├── store/
    │   └── cart.ts            # Cart logic saved in localStorage
    ├── components/
    │   ├── navbar.ts          # Navbar, cart badge, dark mode toggle
    │   └── product-card.ts    # Reusable product card
    └── pages/
        ├── home.ts
        ├── products.ts
        ├── product-detail.ts
        ├── cart.ts
        └── checkout.ts
```

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

### Install and run

```bash
# 1. Clone the repository
git clone https://github.com/chabphanith2822/Khmer-Crafts-Shop.git
cd Khmer-Crafts-Shop

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build     # type-checks with tsc, then builds with Vite
npm run preview   # preview the production build locally
```

## How It Works

- **Cart:** saved in the browser's `localStorage` under the key `khmer-shop-cart`. Every storage call is wrapped in `try/catch`, so the shop still works if storage is blocked (for example in private mode).
- **Stock limit:** a product cannot be added beyond its `stock` value.
- **Delivery fee:** free when the subtotal is $30 or more, otherwise $2.00.
- **Checkout:** this is a **demo**. It collects shipping details and a payment choice (cash on delivery) only. No card or bank details are requested, and no real payment is processed.
- **Dark mode:** toggled from the navbar button and saved in `localStorage` under `theme`.

## Customising the Shop

| What to change | Where |
|----------------|-------|
| Product names, prices, descriptions, stock | `src/data/products.ts` |
| Product photos | Put files in `public/images/` (file names are listed in `public/images/README.txt`) |
| Brand colour | `--color-brand` in `src/style.css` |
| Shop name | `src/components/navbar.ts` and `index.html` |
| Free-delivery rule and fee | `src/store/cart.ts` (`FREE_SHIPPING_MIN`, `SHIPPING_FEE`) |

## Notes and Limitations

- Product ratings, review counts and the sample review data are **examples**. Replace them with real information before publishing.
- If a product photo is missing, a grey **"Image coming soon"** placeholder is shown automatically.
- The contact details and social links in this version are placeholders.
- There is no backend or database. All products are static, and the cart lives only in the current browser.

## Possible Next Steps

- Real product photos and a proper logo
- Using Flowbite components (for example pagination) for long product lists
- A real backend for orders and payments

## Author

**Chabphanith** – ISTAD Frontend Mini Project

---

*Made with HTML, Tailwind CSS, TypeScript and Vite.*