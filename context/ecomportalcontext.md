# 📄 **ecommerce_portal_context.md**

*(For GitHub Copilot — Only applies to the portal code)*

## 🎯 Scope

This context applies **only** to the code inside the `/portal/` directory.

The `/portal/` directory represents the **client-facing branded merchandise portal** that companies use to browse packs, collections, and products.

Copilot should **not modify or suggest changes** outside this folder.

---

## 🧩 Purpose of the Portal

The portal simulates a **mini e-commerce experience** for corporate clients.
It is not a full webshop — it is a **demo-oriented**, lightweight browsing UI with:

* navigation
* packs
* collections
* product pages
* cart
* checkout placeholder

The goal is to **make prospects feel like they have their own internal webshop**, without implementing full e-commerce logic.

---

## 🛠 Functional Expectations

### NAVIGATION (required)

* Home
* Packs
* Collections
* Catalogue
* Support
* Cart icon

Navigation must be simple, always visible, and responsive.

---

### HOME PAGE

Contains:

* Hero section (title, subtitle, CTA)
* Packs shortcuts
* Collections shortcuts
* Best-sellers grid

Clean, minimal, corporate.

---

### PACKS

A curated list of 6–8 packs:

* Pack Onboarding
* Pack Welcome Back
* Pack Séminaire
* Pack Fin d’Année
* Pack Remote
* Pack Cadeaux Clients
* Pack Événement
* Pack Anniversaire d’Entreprise

Each pack is a **bundle product page** with:

* image(s)
* list of included items
* price
* CTA “Add to cart”

---

### COLLECTIONS

Five categories:

* Textile
* Drinkware
* Office
* Lifestyle
* Tech

Each collection page renders its products in a clean grid.

---

### PRODUCT PAGE

Each product page includes:

* Large product image
* Title
* Mini description
* Options (size/color if necessary)
* “Personalisation incluse” badge
* Quantity selector
* CTA “Add to cart”

This must be extremely simple.

---

### CART

* List of selected items
* Quantities
* Total
* CTA “Proceed to order”

Checkout = placeholder UI only.

---

## 🎨 Design & Style Guidelines

* Clean corporate style
* White backgrounds
* Light gray borders (#e5e7eb)
* Rounded corners (`rounded-xl`)
* soft shadows
* centered product images
* brand color = blue (unless overridden per-company)
* generous spacing (`py-6`, `px-4`, `space-y-6`)

Buttons must be clear primary CTAs.

---

## 📁 Folder Expectations

Copilot should follow this structure:

```
/portal
  /components
    NavBar.jsx
    Footer.jsx
    ProductCard.jsx
    PackCard.jsx
  /data
    products.json
    packs.json
    collections.json
  /home
  /packs
  /collections
  /catalogue
  /product/[id]
  /cart
```

All components must be **modular**, **reusable**, and **simple**.

---

## 🚫 Out of Scope (DO NOT BUILD)

Copilot must NOT:

* add authentication
* add advanced checkout logic
* add payment systems
* modify backend schemas
* introduce complex state management
* create random products or packs

---

## 🔚 Copilot's Goal

When editing `/portal/` files:

**Build a clean, professional, lightweight e-commerce-like UI that gives prospects the illusion of a polished internal merchandise store.**

Focus on clarity, structure, and reusability.