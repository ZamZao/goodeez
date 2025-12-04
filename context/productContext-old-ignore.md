````md
# 📄 Portal Catalog Context (Collections, Products, Packs, Cart, UX)

## 🎯 Scope & Goal

This context file is **only for** the merch portal catalog:

- product model  
- collection model  
- pack (bundle) model  
- cart behavior with products and packs  
- UX/UI for collections, product pages, pack pages, and cart  

Global business goal:  
👉 **Ship a simple, working merch portal and get 1–2 paying clients quickly.**  
We explicitly **avoid complex features** for now.

Copilot should **not** introduce advanced features like pack builders, promotions, or inventory logic unless explicitly requested.

---

## 🧱 Core Concepts

We have **3 main catalog entities**:

1. **Product** – atomic item (tote bag, mug, pen, notebook, hoodie, etc.)  
2. **Pack** – a fixed bundle of products (e.g. “Welcome Pack Onboarding”)  
3. **Collection** – a grouping of products (e.g. “Textile”, “Drinkware”)

The **cart** can contain:

- standalone products  
- packs (bundles)  

**Important:**  
Packs always **reference real products** internally.  
In the cart UI, packs stay **one line item** (not exploded into separate product lines).  
Standalone product lines stay separate and are **not merged** with items inside packs.

---

## 📦 Product Model

```ts
type Product = {
  id: string;            // unique product ID
  slug: string;          // for URLs
  name: string;
  description?: string;
  price: number;         // unit price (excl. tax, keep it simple)
  imageUrl?: string;
  collectionId?: string; // link to a collection
};
````

---

## 🗂 Collection Model

```ts
type Collection = {
  id: string;
  slug: string;
  name: string;         // e.g. "Textile"
  description?: string;
  productIds: string[]; // list of Product.id
};
```

---

## 🎁 Pack (Bundle) Model

```ts
type PackItem = {
  productId: string;
  quantity: number; // quantity of this product INSIDE ONE pack
};

type Pack = {
  id: string;
  slug: string;
  name: string;          // e.g. "Welcome Pack Onboarding"
  description?: string;
  items: PackItem[];     // fixed composition
  price: number;         // price for ONE pack
  imageUrl?: string;
};
```

Rules for packs:

* Pack composition (`items`) is **fixed** in the UI.
* User can only change **how many packs** they add to the cart (pack quantity).
* User **cannot** edit the pack composition from the front-end in v1.
* Every `PackItem.productId` must reference a valid `Product.id`.

Example behavior:

> “10 Welcome Packs” means 10 × (1x tote bag, 1x mug, 1x pen, 1x notebook, etc.), but this expansion is only used internally (e.g. later for supplier summaries), not shown as separate cart lines.

---

## 🛒 Cart Model & Behavior

The cart must handle:

* packs (bundles)
* standalone products

Example use case:

* User adds **10 Welcome Packs**
* User adds **2 extra mugs**

The cart UI must show:

* `Welcome Pack Onboarding × 10`
* `Mug Céramique × 2`

The mugs that are part of the pack stay inside the **pack line**, and are **not merged** visually with the standalone mugs.

```ts
type CartLineBase = {
  id: string;       // cart line ID
  quantity: number; // how many units of this line
};

type CartProductLine = CartLineBase & {
  type: 'product';
  productId: string;
  unitPrice: number; // from Product.price
};

type CartPackLine = CartLineBase & {
  type: 'pack';
  packId: string;
  unitPrice: number; // from Pack.price
  items: PackItem[]; // snapshot of pack composition
};

type CartLine = CartProductLine | CartPackLine;

type Cart = {
  lines: CartLine[];
};
```

### Cart Display Rules

* **Pack line**:

  * display pack name
  * display number of packs (quantity)
  * optionally display a small text:
    `Contient : 1x Hoodie, 1x Gourde, 1x Mug, 1x Tote Bag, 1x Carnet, 1x Stylo`
* **Product line**:

  * display product name
  * display quantity

We **do not** merge items from packs with standalone product lines in the cart UI.

---

## 🚫 Out of Scope for MVP

To stay focused and get 1–2 paying clients quickly, DO NOT implement:

* Pack builder UI (user adds/removes items from packs themselves)
* Allowing users to create new packs from the UI
* Promotions, discounts, coupons
* Taxes & shipping calculations
* Inventory / stock management
* Variant systems (sizes/colors) beyond simple product records
* Complex filters, sorting, or search logic

We ONLY need:

* basic collections pages
* basic product pages
* pack pages referencing products
* simple cart with packs + standalone products
* basic order summary / contact flow

---

# 🧩 MVP DATASET (Collections, Products, Packs)

Copilot should use this **MVP catalog** as the default data source.

## 🗂 MVP Collections

```ts
export const collections: Collection[] = [
  {
    id: 'textile',
    slug: 'textile',
    name: 'Textile',
    description: 'Hoodies, t-shirts, polos et casquettes brandés.',
    productIds: [
      'hoodie-classic',
      'tshirt-classic',
      'polo-premium',
      'cap-classic'
    ]
  },
  {
    id: 'drinkware',
    slug: 'drinkware',
    name: 'Drinkware',
    description: 'Mugs et gourdes pour le bureau ou en déplacement.',
    productIds: [
      'mug-ceramic',
      'bottle-steel',
      'cup-reusable'
    ]
  },
  {
    id: 'office',
    slug: 'office',
    name: 'Bureau',
    description: 'Papeterie et accessoires pour le quotidien au bureau.',
    productIds: [
      'notebook-a5',
      'pen-metal',
      'mousepad-classic'
    ]
  },
  {
    id: 'lifestyle',
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Produits utiles au quotidien, au bureau ou en déplacement.',
    productIds: [
      'totebag-classic',
      'backpack-urban',
      'lunchbag-insulated'
    ]
  },
  {
    id: 'tech',
    slug: 'tech',
    name: 'Tech',
    description: 'Accessoires technologiques du quotidien.',
    productIds: [
      'powerbank-10k',
      'wireless-charger'
    ]
  }
];
```

---

## 📦 MVP Products

```ts
export const products: Product[] = [
  // TEXTILE
  {
    id: 'hoodie-classic',
    slug: 'hoodie-classic',
    name: 'Hoodie Classique',
    description: 'Hoodie unisexe en coton épais, intérieur molletonné, logo brodé.',
    price: 35,
    collectionId: 'textile',
    imageUrl: '/images/products/hoodie-classic.jpg'
  },
  {
    id: 'tshirt-classic',
    slug: 'tshirt-classic',
    name: 'T-shirt Classique',
    description: 'T-shirt unisexe en coton 180g, coupe droite, impression logo.',
    price: 15,
    collectionId: 'textile',
    imageUrl: '/images/products/tshirt-classic.jpg'
  },
  {
    id: 'polo-premium',
    slug: 'polo-premium',
    name: 'Polo Premium',
    description: 'Polo piqué, coupe ajustée, broderie poitrine.',
    price: 28,
    collectionId: 'textile',
    imageUrl: '/images/products/polo-premium.jpg'
  },
  {
    id: 'cap-classic',
    slug: 'cap-classic',
    name: 'Casquette Classique',
    description: 'Casquette 5 panneaux avec logo brodé.',
    price: 18,
    collectionId: 'textile',
    imageUrl: '/images/products/cap-classic.jpg'
  },

  // DRINKWARE
  {
    id: 'mug-ceramic',
    slug: 'mug-ceramic',
    name: 'Mug Céramique',
    description: 'Mug 300 ml, compatible lave-vaisselle, impression logo.',
    price: 8,
    collectionId: 'drinkware',
    imageUrl: '/images/products/mug-ceramic.jpg'
  },
  {
    id: 'bottle-steel',
    slug: 'bottle-steel',
    name: 'Gourde Inox',
    description: 'Gourde isotherme 500 ml en acier inoxydable, double paroi.',
    price: 18,
    collectionId: 'drinkware',
    imageUrl: '/images/products/bottle-steel.jpg'
  },
  {
    id: 'cup-reusable',
    slug: 'cup-reusable',
    name: 'Gobelet Réutilisable',
    description: 'Gobelet réutilisable 40 cl pour événements et séminaires.',
    price: 3,
    collectionId: 'drinkware',
    imageUrl: '/images/products/cup-reusable.jpg'
  },

  // OFFICE
  {
    id: 'notebook-a5',
    slug: 'notebook-a5',
    name: 'Carnet A5',
    description: 'Carnet A5 à couverture rigide, 160 pages lignées, logo marqué.',
    price: 10,
    collectionId: 'office',
    imageUrl: '/images/products/notebook-a5.jpg'
  },
  {
    id: 'pen-metal',
    slug: 'pen-metal',
    name: 'Stylo Métal',
    description: 'Stylo bille en métal, encre noire, gravure laser.',
    price: 4,
    collectionId: 'office',
    imageUrl: '/images/products/pen-metal.jpg'
  },
  {
    id: 'mousepad-classic',
    slug: 'mousepad-classic',
    name: 'Tapis de Souris',
    description: 'Tapis de souris avec surface lisse et base antidérapante.',
    price: 7,
    collectionId: 'office',
    imageUrl: '/images/products/mousepad-classic.jpg'
  },

  // LIFESTYLE
  {
    id: 'totebag-classic',
    slug: 'totebag-classic',
    name: 'Tote Bag Classique',
    description: 'Tote bag en coton 140g avec impression logo.',
    price: 6,
    collectionId: 'lifestyle',
    imageUrl: '/images/products/totebag-classic.jpg'
  },
  {
    id: 'backpack-urban',
    slug: 'backpack-urban',
    name: 'Sac à Dos Urban',
    description: 'Sac à dos urbain avec compartiment pour ordinateur.',
    price: 35,
    collectionId: 'lifestyle',
    imageUrl: '/images/products/backpack-urban.jpg'
  },
  {
    id: 'lunchbag-insulated',
    slug: 'lunchbag-insulated',
    name: 'Lunch Bag Isotherme',
    description: 'Sac repas isotherme pour le déjeuner au bureau.',
    price: 16,
    collectionId: 'lifestyle',
    imageUrl: '/images/products/lunchbag-insulated.jpg'
  },

  // TECH
  {
    id: 'powerbank-10k',
    slug: 'powerbank-10k',
    name: 'Powerbank 10 000 mAh',
    description: 'Batterie externe 10 000 mAh avec logo imprimé.',
    price: 30,
    collectionId: 'tech',
    imageUrl: '/images/products/powerbank-10k.jpg'
  },
  {
    id: 'wireless-charger',
    slug: 'wireless-charger',
    name: 'Chargeur Sans Fil',
    description: 'Chargeur sans fil 10W compatible Qi, logo centré.',
    price: 28,
    collectionId: 'tech',
    imageUrl: '/images/products/wireless-charger.jpg'
  }
];
```

---

## 🎁 MVP Packs

```ts
export const packs: Pack[] = [
  {
    id: 'welcome-pack-onboarding',
    slug: 'welcome-pack-onboarding',
    name: 'Welcome Pack Onboarding',
    description: 'Le pack d’accueil standard pour les nouveaux collaborateurs.',
    price: 85, // for ONE pack
    imageUrl: '/images/packs/welcome-pack-onboarding.jpg',
    items: [
      { productId: 'hoodie-classic', quantity: 1 },
      { productId: 'bottle-steel', quantity: 1 },
      { productId: 'mug-ceramic', quantity: 1 },
      { productId: 'totebag-classic', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'pen-metal', quantity: 1 }
    ]
  },
  {
    id: 'welcome-back-pack',
    slug: 'welcome-back-pack',
    name: 'Pack Welcome Back',
    description: 'Un pack simple pour le retour de congé ou de mobilité interne.',
    price: 55,
    imageUrl: '/images/packs/welcome-back-pack.jpg',
    items: [
      { productId: 'tshirt-classic', quantity: 1 },
      { productId: 'mug-ceramic', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'pen-metal', quantity: 1 }
    ]
  },
  {
    id: 'remote-employee-pack',
    slug: 'remote-employee-pack',
    name: 'Pack Employé Remote',
    description: 'Pensé pour les collaborateurs à distance.',
    price: 95,
    imageUrl: '/images/packs/remote-employee-pack.jpg',
    items: [
      { productId: 'hoodie-classic', quantity: 1 },
      { productId: 'bottle-steel', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'pen-metal', quantity: 1 },
      { productId: 'powerbank-10k', quantity: 1 }
    ]
  },
  {
    id: 'seminar-pack',
    slug: 'seminar-pack',
    name: 'Pack Séminaire / Événement',
    description: 'Le pack idéal pour les séminaires internes et événements clients.',
    price: 60,
    imageUrl: '/images/packs/seminar-pack.jpg',
    items: [
      { productId: 'tshirt-classic', quantity: 1 },
      { productId: 'cup-reusable', quantity: 1 },
      { productId: 'totebag-classic', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'pen-metal', quantity: 1 }
    ]
  },
  {
    id: 'year-end-pack',
    slug: 'year-end-pack',
    name: 'Pack Fin d’Année',
    description: 'Un pack premium pour remercier les équipes en fin d’année.',
    price: 120,
    imageUrl: '/images/packs/year-end-pack.jpg',
    items: [
      { productId: 'hoodie-classic', quantity: 1 },
      { productId: 'mug-ceramic', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'powerbank-10k', quantity: 1 },
      { productId: 'totebag-classic', quantity: 1 }
    ]
  },
  {
    id: 'client-gift-pack',
    slug: 'client-gift-pack',
    name: 'Pack Cadeaux Clients',
    description: 'Un pack élégant pour surprendre vos meilleurs clients.',
    price: 90,
    imageUrl: '/images/packs/client-gift-pack.jpg',
    items: [
      { productId: 'bottle-steel', quantity: 1 },
      { productId: 'mug-ceramic', quantity: 1 },
      { productId: 'notebook-a5', quantity: 1 },
      { productId: 'pen-metal', quantity: 1 },
      { productId: 'wireless-charger', quantity: 1 }
    ]
  }
];
```

---

# 🧭 UX / UI SPECIFICATION

Copilot should implement pages and components following this **simple UX**.

## 1️⃣ Collections / Catalogue Pages

* **Collections listing page** (`/collections`):

  * Grid of collection cards (Textile, Drinkware, etc.)
  * Each card: name, short description, CTA **Voir la collection**

* **Collection detail page** (`/collections/[slug]`):

  * Title + description
  * Grid of related products (cards)
  * Each product card:

    * image
    * name
    * price
    * CTA **Voir le produit**

* **Catalogue page** (`/catalogue`):

  * Simple grid of all products (mix of collections)
  * Reuse the same product card component.

## 2️⃣ Product Page (Yes, we want a product page)

**Route example:** `/produits/[slug]`

Content:

* Large product image
* Product name
* Short description
* Price
* “Personnalisation incluse” badge (simple text or small tag)
* Quantity selector
* Primary button: **Ajouter au panier**

Optional small text below:

* “Ce produit est inclus dans certains packs : [liste des packs]” (display pack names that reference this product if easy to implement).

The product page must be **clean and minimal**, not overloaded.

## 3️⃣ Packs Listing Page

**Route example:** `/packs`

* Grid of pack cards
* Each card shows:

  * pack image
  * pack name
  * short description (1–2 lines max)
  * price per pack
  * CTA **Voir le pack**

## 4️⃣ Pack Detail Page (One page per pack)

**Route example:** `/packs/[slug]`

This is key for **conversion**.

Content:

1. **Hero section**

   * Large image of the pack
   * Pack name
   * Short description focused on *use case* (“Pour vos onboardings”, etc.)
   * Price per pack
   * Quantity selector (number of packs)
   * Primary button: **Ajouter au panier**

2. **Section: "Ce que contient le pack"**

   * Title: **Ce que contient ce pack**
   * For each `PackItem`:

     * product name
     * small icon / thumbnail if available
     * quantity inside one pack

   Example display line:
   `1x Hoodie Classique`
   `1x Gourde Inox`
   `1x Mug Céramique`
   etc.

3. **Section: "Personnalisation / modifications" (Contact us)**

Banner or block at the bottom of the page:

* Title: **Vous souhaitez modifier ce pack ?**

* Text, example:

  > Vous voulez ajouter ou remplacer un article dans ce pack ?
  > Aucun problème, nous ajustons le contenu à vos besoins (événements, équipes, budgets…).

* CTA:

  * Button: **Contactez-nous pour adapter ce pack**
  * This can link to:

    * a simple contact page (`/contact`)
    * or open a mailto with subject containing the pack name.

**Important:**
This is **how we handle custom requests** in v1.
We **do NOT** provide a front-end pack configurator.

## 5️⃣ Cart Page

**Route example:** `/panier`

* List of cart lines (packs and products):

  * For each **pack line**:

    * pack name
    * quantity of packs
    * price per pack + line total
    * small text or collapsible section:
      `Contient (par pack) : 1x Hoodie, 1x Gourde, 1x Mug, 1x Tote Bag, 1x Carnet, 1x Stylo`
  * For each **product line**:

    * product name
    * quantity
    * price per unit + line total

* Cart summary:

  * subtotals
  * total (no taxes or shipping in v1)

* CTA:

  * **Valider ma demande** or **Demander un devis**

This can lead to a simple checkout form or contact form where they fill in:

* Company name
* Contact person
* Email
* Message / notes

No payment integration in v1.

---

# ❌ Self-Customization of Packs (Not in v1)

Copilot must **NOT implement**:

* UI to add/remove products inside a pack
* UI to create new packs from the front-end
* Dynamic recalculation of pack price based on custom composition

All pack customization requests must be handled via the **“Contact us”** section on pack pages.

Later versions (Pro/Enterprise) may introduce:

* “Edit pack” feature
* “Create your own pack” feature

But these are explicitly **out of scope** for the MVP.

---

## ✅ Copilot’s Goal with This Context

When working on the portal catalog (collections, products, packs, cart, associated UI):

* Use the **data models** and **MVP datasets** defined here.
* Implement the **pages and UX** exactly as specified:

  * collections pages
  * product pages
  * pack pages with “Contact us to modify”
  * cart with separate lines for packs vs products
* Keep all logic **simple, readable, and minimal**, optimized for fast delivery.
* Focus on shipping a working v1 demo that is good enough to convince **1–2 paying clients**.

```
```