# OneStopMerch — Project Context

## 1. High-level product summary

OneStopMerch is a **multi-tenant internal merch portal generator** for companies.

Goal of the product:

- A company uploads its **logo** and **name**
- The system creates a **branded merch portal** for that company, under a unique path or subdomain, e.g.:
  - `/demo/capgemini` (MVP)
  - later: `https://capgemini.onestopmerch.com`
- The portal shows a **curated catalog (~20 products)** of **office merch**, not generic “goodies”:
  - notebooks, mugs, bottles, lanyards, badge holders, desk items, tech accessories,
  - plus 1–2 clothing items (hoodie, softshell jacket)
- Each product is displayed with an **overlay of the company logo** (visual illusion, no real print integration in V0).
- Users can **simulate a full checkout** (add to cart → checkout form → order confirmation).
- When they “place order”, we **do not** take payment:
  - We create a **fake order**,
  - We send an **email** with the order details to the operator (founder),
  - Optionally we prepare data to be exported as an **Excel** row for manual supplier handling.

For V0, fulfillment is handled **manually** with suppliers using email + Excel.  
The focus is on **demo-ability**, **clean UX**, and **fast iteration**, not on full automation.

---

## 2. Non-goals (for V0 / MVP)

For now, we explicitly **do NOT** want Copilot to:

- Implement real payment (no Stripe, no Shopify checkout yet).
- Implement real multi-tenant DB with logins, roles, auth, etc.
- Implement supplier APIs or automated stock / shipping.
- Implement full Shopify integration.
- Implement complex state management libraries (no Redux, no Zustand unless absolutely needed).
- Implement a design system from scratch beyond Tailwind + simple reusable components.

The priority is:

**V0 = static-ish, demo-ready, “feels real” portal + fake checkout → order email.**

---

## 3. Tech stack & global constraints

- **Framework**: Next.js (App Router) with TypeScript.
- **Styling**: Tailwind CSS.  
- **UI components**: Simple custom components; shadcn-style allowed but keep it light.
- **Runtime**: Node / Vercel.
- **Data for V0**: 
  - Hardcoded product catalog as a TypeScript array.
  - Tenant/portal configs stored as JSON + logo files in `public/portals/[slug]/`.

Constraints for Copilot:

- Prefer **simple, readable code** over abstractions.
- Keep **file structure consistent** with the architecture below.
- Use **Next.js conventions** (App Router, `app/` folder, `route.ts` API handlers).
- When needing data access for V0, **read from filesystem** and hardcoded arrays, not from a database.

---

## 4. Repository architecture (expected)

Copilot should respect this structure as much as possible:

```txt
onestopmerch/
├─ package.json
├─ tsconfig.json
├─ next.config.mjs
├─ .env.local              # SMTP credentials etc. (never committed)
├─ .gitignore
│
├─ public/
│  ├─ portals/             # Portals "snapshots" for each company (V0, no DB)
│  │  ├─ capgemini/
│  │  │  ├─ logo.png
│  │  │  └─ config.json    # { name, slug, logoUrl, primaryColor, ... }
│  │  └─ edf/
│  │     ├─ logo.png
│  │     └─ config.json
│  │
│  └─ images/              # Generic static assets (fallback product images, etc.)
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        # Global layout
│  │  ├─ page.tsx          # Marketing landing page
│  │  │
│  │  ├─ demo/
│  │  │  ├─ [tenant]/
│  │  │  │  ├─ page.tsx         # Portal view: header + catalog with logo overlay
│  │  │  │  └─ checkout/
│  │  │  │     └─ page.tsx      # Fake checkout: recap + form → POST /api/order
│  │  │  └─ page.tsx            # Generic /demo page (explains the concept)
│  │  │
│  │  ├─ onboarding/
│  │  │  └─ page.tsx       # Simple onboarding page (for demo) to "create" a portal
│  │  │
│  │  ├─ api/
│  │  │  ├─ order/
│  │  │  │  └─ route.ts    # Receives fake checkout, sends order email, logs order
│  │  │  └─ onboarding/
│  │  │     └─ route.ts    # (Optional V0) To save config.json + logo file
│  │  │
│  │  └─ (marketing)/
│  │     ├─ features/
│  │     │  └─ page.tsx    # Optional features page
│  │     ├─ pricing/
│  │     │  └─ page.tsx    # Optional pricing page
│  │     └─ contact/
│  │        └─ page.tsx    # Contact form if needed
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Shell.tsx          # Shell layout (header/footer/container)
│  │  │  └─ Section.tsx        # Reusable section wrapper for marketing
│  │  ├─ ui/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ Card.tsx
│  │  │  └─ Badge.tsx
│  │  ├─ products/
│  │  │  ├─ ProductCard.tsx    # Product tile: image + overlay logo + price
│  │  │  └─ ProductGrid.tsx    # Grid of ProductCard
│  │  ├─ tenant/
│  │  │  ├─ TenantHeader.tsx   # Logo + company name + small description
│  │  │  └─ TenantLayout.tsx   # Layout used in /demo/[tenant]
│  │  └─ forms/
│  │     └─ CheckoutForm.tsx   # Checkout form (name, email, team, etc.)
│  │
│  ├─ data/
│  │  ├─ productCatalog.ts     # Hardcoded array of ~20 office merch products
│  │  ├─ categories.ts         # Category definitions
│  │  └─ demoTenants.ts        # Optional mock tenants for tests
│  │
│  ├─ lib/
│  │  ├─ portals/
│  │  │  ├─ loadPortalConfig.ts    # Reads public/portals/[slug]/config.json
│  │  │  └─ savePortalConfig.ts    # (Optional) Writes config.json for onboarding
│  │  ├─ products/
│  │  │  └─ getProductCatalog.ts   # Helper for filtering catalog (by category/tags)
│  │  ├─ orders/
│  │  │  ├─ mapCheckoutToOrder.ts  # Transform checkout payload → internal order object
│  │  │  ├─ sendOrderEmail.ts      # Sends the "purchase order" email
│  │  │  └─ createOrderExport.ts   # (Optional) Prepares data row for Excel/CSV
│  │  ├─ email/
│  │  │  └─ transporter.ts         # Nodemailer / email provider setup
│  │  ├─ utils/
│  │  │  ├─ slugify.ts             # Slugify tenant/company names
│  │  │  └─ types.ts               # Shared types
│  │  └─ config.ts                 # App-wide config (e.g. base domain, email)
│  │
│  └─ styles/
│     └─ globals.css          # Tailwind base + global overrides
│
└─ README.md
