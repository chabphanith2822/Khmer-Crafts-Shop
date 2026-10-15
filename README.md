# Khmer Crafts Shop (E-Commerce Mini Project)

Stack: HTML, Tailwind CSS v4, TypeScript, Flowbite, Vite.

## Requirements checklist

| Requirement | Where |
|---|---|
| 5 pages | Home, Products, Product Detail, Cart, Checkout (`src/pages/`) |
| 3 sections per page | Each page file has `<!-- Section 1/2/3 -->` comments |
| Real static data | `src/data/products.ts` |
| SEO | `index.html` meta and Open Graph tags; `setSeo()` in `src/main.ts` sets title and description per page |
| Dark mode | `src/components/navbar.ts` (saved in localStorage) |
| Responsive | Tailwind breakpoints (`sm:`, `md:`, `lg:`) |
| TypeScript | `src/types.ts` and all `.ts` files |
| Tailwind CSS v4 | `src/style.css` |

## Folder structure

```
ecommerce-shop/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.ts              # Router, click and form handlers
    ├── style.css            # Tailwind v4, Flowbite, dark variant, brand color
    ├── types.ts             # Product, CartItem, CartLine, Category
    ├── utils.ts             # escapeHtml for user input
    ├── data/products.ts     # 8 static products
    ├── store/cart.ts        # Cart logic with localStorage (safe if storage is blocked)
    ├── components/
    │   ├── navbar.ts        # Navbar, cart badge, dark mode toggle
    │   └── product-card.ts  # Reusable product card
    └── pages/
        ├── home.ts
        ├── products.ts
        ├── product-detail.ts
        ├── cart.ts
        └── checkout.ts
```

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # type check and production build
```

## Before submitting

- Replace the placeholder images in `src/data/products.ts` with real product photos.
- Replace the sample prices, ratings and descriptions with your own information.
- Replace the sample review in `src/pages/product-detail.ts` with real data, or remove it.
- Use git for version control, then record the video demonstration.
