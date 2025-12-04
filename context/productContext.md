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
This dataset is aligned with the **current real images** stored in the repo.

All product images are stored in:

`/public/products/images/<filename>`

No subfolders.

---

## 🗂 MVP Collections (NEW)

```ts
export const collections: Collection[] = [
  {
    id: 'wear',
    slug: 'wear',
    name: 'Wear',
    description: 'Hoodies, t-shirts, polos, casquettes et vestes brandés.',
    productIds: [
      'hoodie-basic',
      'tshirt-basic',
      'polo-classic',
      'polo-premium',
      'cap-basic',
      'cap-premium',
      'veste-premium'
    ]
  },
  {
    id: 'drinkware',
    slug: 'drinkware',
    name: 'Drinkware',
    description: 'Mugs, gourdes et gobelets pour le bureau ou en déplacement.',
    productIds: [
      'bottle-basic',
      'mug-basic',
      'cup-event'
    ]
  },
  {
    id: 'office',
    slug: 'office',
    name: 'Bureau',
    description: 'Papeterie et accessoires pour le quotidien au bureau.',
    productIds: [
      'notebook-hard',
      'mousepad',
      'pen-basic',
      'pen-premium'
    ]
  },
  {
    id: 'lifestyle',
    slug: 'lifestyle',
    name: 'Lifestyle',
    description: 'Produits utiles au quotidien, au bureau ou en déplacement.',
    productIds: [
      'tote-basic',
      'tote-premium',
      'backpack',
      'porte-cle'
    ]
  },
  {
    id: 'tech',
    slug: 'tech',
    name: 'Tech',
    description: 'Accessoires technologiques du quotidien.',
    productIds: [
      'powerbank-8k'
    ]
  }
];
```

---

## 📦 MVP Products (NEW – based on current files)

```ts
export const products: Product[] = [
  // WEAR
  {
    id: 'hoodie-basic',
    slug: 'hoodie-basic',
    name: 'Hoodie 280g',
    description: 'Hoodie unisexe en coton épais, intérieur molletonné, logo brodé.',
    price: 35,
    collectionId: 'wear',
    imageUrl: '/products/images/hoodie-basic.jpeg'
  },
  {
    id: 'tshirt-basic',
    slug: 'tshirt-basic',
    name: 'T-shirt 180g',
    description: 'T-shirt unisexe en coton 180g, coupe droite, impression logo.',
    price: 15,
    collectionId: 'wear',
    imageUrl: '/products/images/tshirt-basic.jpg'
  },
  {
    id: 'polo-classic',
    slug: 'polo-classic',
    name: 'Polo Classique',
    description: 'Polo piqué, coupe droite, marquage cœur.',
    price: 25,
    collectionId: 'wear',
    imageUrl: '/products/images/polo-classic.webp'
  },
  {
    id: 'polo-premium',
    slug: 'polo-premium',
    name: 'Polo Premium',
    description: 'Polo premium, coupe ajustée, broderie poitrine.',
    price: 30,
    collectionId: 'wear',
    imageUrl: '/products/images/polo-premium.jpg'
  },
  {
    id: 'cap-basic',
    slug: 'cap-basic',
    name: 'Casquette 5 panneaux',
    description: 'Casquette 5 panneaux, taille réglable, logo brodé.',
    price: 15,
    collectionId: 'wear',
    imageUrl: '/products/images/cap-basic.jpg'
  },
  {
    id: 'cap-premium',
    slug: 'cap-premium',
    name: 'Casquette Premium',
    description: 'Casquette premium avec finition soignée et broderie haute densité.',
    price: 18,
    collectionId: 'wear',
    imageUrl: '/products/images/cap-premium.jpg'
  },
  {
    id: 'veste-premium',
    slug: 'veste-premium',
    name: 'Veste Premium',
    description: 'Veste zippée premium pour les collaborateurs, idéale pour les welcome back.',
    price: 45,
    collectionId: 'wear',
    imageUrl: '/products/images/veste-premium.jpeg'
  },

  // DRINKWARE
  {
    id: 'bottle-basic',
    slug: 'bottle-basic',
    name: 'Gourde Inox 500ml',
    description: 'Gourde isotherme 500 ml en acier inoxydable, double paroi.',
    price: 18,
    collectionId: 'drinkware',
    imageUrl: '/products/images/bottle.jpeg'
  },
  {
    id: 'mug-basic',
    slug: 'mug-basic',
    name: 'Mug Blanc',
    description: 'Mug 300 ml, compatible lave-vaisselle, impression logo.',
    price: 8,
    collectionId: 'drinkware',
    imageUrl: '/products/images/mug-basic.jpg'
  },
  {
    id: 'cup-event',
    slug: 'cup-event',
    name: 'Gobelet Réutilisable',
    description: 'Gobelet réutilisable pour événements, séminaires et salons.',
    price: 3,
    collectionId: 'drinkware',
    imageUrl: '/products/images/cup-event.jpg'
  },

  // OFFICE
  {
    id: 'notebook-hard',
    slug: 'notebook-hard',
    name: 'Carnet A5 Rigide',
    description: 'Carnet A5 à couverture rigide, 160 pages lignées, logo marqué.',
    price: 10,
    collectionId: 'office',
    imageUrl: '/products/images/notebook-hard.jpg'
  },
  {
    id: 'mousepad',
    slug: 'mousepad',
    name: 'Tapis de Souris',
    description: 'Tapis de souris avec surface lisse et base antidérapante.',
    price: 7,
    collectionId: 'office',
    imageUrl: '/products/images/mousepad.jpeg'
  },
  {
    id: 'pen-basic',
    slug: 'pen-basic',
    name: 'Stylo Basique',
    description: 'Stylo bille basique, idéal pour les packs à grand volume.',
    price: 2,
    collectionId: 'office',
    imageUrl: '/products/images/pen-basic.jpg'
  },
  {
    id: 'pen-premium',
    slug: 'pen-premium',
    name: 'Stylo Premium',
    description: 'Stylo premium présenté en coffret, idéal pour cadeaux clients.',
    price: 4,
    collectionId: 'office',
    imageUrl: '/products/images/pen-premium.jpg'
  },

  // LIFESTYLE
  {
    id: 'tote-basic',
    slug: 'tote-basic',
    name: 'Tote Bag 140g',
    description: 'Tote bag en coton 140g avec impression logo.',
    price: 6,
    collectionId: 'lifestyle',
    imageUrl: '/products/images/tote-basic.webp'
  },
  {
    id: 'tote-premium',
    slug: 'tote-premium',
    name: 'Tote Bag Premium',
    description: 'Tote bag premium plus épais, idéal pour packs cadeaux.',
    price: 10,
    collectionId: 'lifestyle',
    imageUrl: '/products/images/tote-premium.webp'
  },
  {
    id: 'backpack',
    slug: 'backpack',
    name: 'Sac à Dos',
    description: 'Sac à dos urbain avec compartiment pour ordinateur.',
    price: 35,
    collectionId: 'lifestyle',
    imageUrl: '/products/images/backpack.jpg'
  },
  {
    id: 'porte-cle',
    slug: 'porte-cle',
    name: 'Porte-clé',
    description: 'Porte-clé métal et bois, idéal en petit extra cadeau.',
    price: 5,
    collectionId: 'lifestyle',
    imageUrl: '/products/images/portecle.jpg'
  },

  // TECH
  {
    id: 'powerbank-8k',
    slug: 'powerbank-8k',
    name: 'Powerbank 8 000 mAh',
    description: 'Batterie externe 8 000 mAh avec logo imprimé.',
    price: 28,
    collectionId: 'tech',
    imageUrl: '/products/images/powerbank-8k.jpg'
  }
];
```

---

## 🎁 MVP Packs (NEW – using current products)

```ts
export const packs: Pack[] = [
  {
    id: 'onboarding-classic',
    slug: 'onboarding-classic',
    name: 'Pack Onboarding Classique',
    description: 'Le pack d’accueil standard pour les nouveaux collaborateurs au bureau.',
    price: 85, // for ONE pack
    imageUrl: '/packs/onboarding-classic.jpg',
    items: [
      { productId: 'hoodie-basic',  quantity: 1 },
      { productId: 'mug-basic',     quantity: 1 },
      { productId: 'bottle-basic',  quantity: 1 },
      { productId: 'tote-basic',    quantity: 1 },
      { productId: 'pen-premium',   quantity: 1 }
    ]
  },
  {
    id: 'onboarding-remote',
    slug: 'onboarding-remote',
    name: 'Pack Onboarding Remote / Light',
    description: 'Pensé pour les collaborateurs en télétravail ou les budgets plus légers.',
    price: 90,
    imageUrl: '/packs/onboarding-remote.jpg',
    items: [
      { productId: 'tshirt-basic',  quantity: 1 },
      { productId: 'mug-basic',     quantity: 1 },
      { productId: 'notebook-hard', quantity: 1 },
      { productId: 'pen-basic',     quantity: 1 },
      { productId: 'powerbank-8k',  quantity: 1 }
    ]
  },
  {
    id: 'welcome-back',
    slug: 'welcome-back',
    name: 'Pack Welcome Back',
    description: 'Un pack pour célébrer le retour de congé ou de mobilité interne.',
    price: 80,
    imageUrl: '/packs/welcome-back.jpg',
    items: [
      { productId: 'veste-premium', quantity: 1 },
      { productId: 'bottle-basic',  quantity: 1 },
      { productId: 'mousepad',      quantity: 1 },
      { productId: 'pen-premium',   quantity: 1 }
    ]
  },
  {
    id: 'seminar-pack',
    slug: 'seminar-pack',
    name: 'Pack Séminaire / Team Building',
    description: 'Le pack idéal pour les séminaires internes et journées d’équipe.',
    price: 60,
    imageUrl: '/packs/seminar-pack.jpg',
    items: [
      { productId: 'tshirt-basic',  quantity: 1 },
      { productId: 'cap-basic',     quantity: 1 },
      { productId: 'tote-basic',    quantity: 1 },
      { productId: 'cup-event',     quantity: 1 }
    ]
  },
  {
    id: 'event-stand',
    slug: 'event-stand',
    name: 'Pack Salon / Stand',
    description: 'Un pack pensé pour les salons professionnels et événements clients.',
    price: 70,
    imageUrl: '/packs/event-stand.jpg',
    items: [
      { productId: 'polo-classic',  quantity: 1 },
      { productId: 'cap-premium',   quantity: 1 },
      { productId: 'tote-basic',    quantity: 1 },
      { productId: 'cup-event',     quantity: 1 },
      { productId: 'porte-cle',     quantity: 1 }
    ]
  },
  {
    id: 'year-end-pack',
    slug: 'year-end-pack',
    name: 'Pack Fin d’Année',
    description: 'Un pack pour remercier les équipes en fin d’année.',
    price: 95,
    imageUrl: '/packs/year-end-pack.jpg',
    items: [
      { productId: 'hoodie-basic',  quantity: 1 },
      { productId: 'mug-basic',     quantity: 1 },
      { productId: 'tote-premium',  quantity: 1 },
      { productId: 'porte-cle',     quantity: 1 }
    ]
  },
  {
    id: 'client-gift-pack',
    slug: 'client-gift-pack',
    name: 'Pack Cadeaux Clients',
    description: 'Un pack élégant pour surprendre vos meilleurs clients et partenaires.',
    price: 90,
    imageUrl: '/packs/client-gift-pack.jpg',
    items: [
      { productId: 'tote-premium',  quantity: 1 },
      { productId: 'notebook-hard', quantity: 1 },
      { productId: 'pen-premium',   quantity: 1 },
      { productId: 'powerbank-8k',  quantity: 1 },
      { productId: 'porte-cle',     quantity: 1 }
    ]
  }
];
```

---

# 🧭 UX / UI SPECIFICATION

Copilot should implement pages and components following this **simple UX**.

## 1️⃣ Collections / Catalogue Pages

* **Collections listing page** (`/collections`):

  * Grid of collection cards (Wear, Drinkware, etc.)
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

## 2️⃣ Product Page

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

3. **Section: "Personnalisation / modifications" (Contact us)**

Banner or block at the bottom of the page:

* Title: **Vous souhaitez modifier ce pack ?**

* Text, example:

  > Vous voulez ajouter ou remplacer un article dans ce pack ?
  > Aucun problème, nous ajustons le contenu à vos besoins (événements, équipes, budgets…).

* CTA:

  * Button: **Contactez-nous pour adapter ce pack**
  * This can link to a simple contact page (`/contact`) or open a mailto with subject containing the pack name.

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