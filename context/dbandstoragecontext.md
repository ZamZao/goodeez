# 🗄️ Database & Storage Architecture Context

## Vue d'ensemble

L'application utilise une architecture **hybride** pour séparer les données et les fichiers :

- **Supabase (PostgreSQL)** : Toutes les données structurées (clients, produits, commandes, etc.)
- **AWS S3** : Tous les fichiers binaires (images produits, logos, images générées avec logos)
- **Prisma ORM** : L'interface entre l'app et Supabase

```
┌──────────────────────────────────────────────────────────┐
│ APPLICATION (Next.js)                                    │
│ - Pages, API routes, Composants React                   │
└───────────────┬──────────────────────────────────────────┘
                │
    ┌───────────┴────────────┬──────────────────┐
    │                        │                  │
    ▼                        ▼                  ▼
┌──────────────┐    ┌─────────────────┐   ┌──────────────┐
│   Prisma     │    │   AWS S3        │   │ Vercel Blob  │
│   (ORM)      │    │   (Images)      │   │ (Images CDN) │
└──────┬───────┘    └────────┬────────┘   └──────┬───────┘
       │                     │                    │
       ▼                     ▼                    ▼
┌──────────────┐    ┌─────────────────┐   ┌──────────────┐
│  Supabase    │    │  S3 Bucket      │   │ Vercel Blob  │
│ (PostgreSQL) │    │ (stockage brut)  │   │ (CDN global) │
└──────────────┘    └─────────────────┘   └──────────────┘
```

---

## 1️⃣ Supabase : Base de Données (Données Structurées)

### Qu'est-ce que Supabase ?

Supabase est une plateforme BaaS (Backend as a Service) construite sur PostgreSQL. Elle fournit :
- Une base de données PostgreSQL managée
- Une API REST/GraphQL auto-générée
- L'authentification (JWT)
- Le stockage (blob storage optionnel)

Pour ce projet, on utilise **uniquement** Supabase pour la base de données, pas pour le stockage d'images.

### Tables Supabase

#### 1. **Tenants** (Portails clients)
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,           -- "capgemini", "edf", etc.
  name VARCHAR(255) NOT NULL,                   -- "Capgemini", "EDF", etc.
  logoUrl VARCHAR(2048),                        -- URL S3 du logo
  primaryColor VARCHAR(7),                      -- "#1B4F9C"
  secondaryColor VARCHAR(7),                    -- "#FFCA2C"
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 2. **Products** (Catalogue produits - partagés par tous les tenants)
```sql
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,                  -- "mug-ceramic", "hoodie-basic"
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  imageUrl VARCHAR(2048),                       -- URL S3 image de base (sans logo)
  category VARCHAR(100),
  collectionId VARCHAR(255),                    -- FK vers collections
  logoPlacementConfig JSONB,                    -- Config de placement du logo
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 3. **Collections** (Catégories : Vêtements, Drinkware, etc.)
```sql
CREATE TABLE collections (
  id VARCHAR(255) PRIMARY KEY,                  -- "wear", "drinkware"
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  imageUrl VARCHAR(2048),                       -- URL S3 image collection
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 4. **Packs** (Bundles de produits)
```sql
CREATE TABLE packs (
  id VARCHAR(255) PRIMARY KEY,                  -- "onboarding-classic"
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  imageUrl VARCHAR(2048),                       -- URL S3 image du pack
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 5. **PackItems** (Items dans un pack)
```sql
CREATE TABLE pack_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  packId VARCHAR(255) NOT NULL REFERENCES packs(id),
  productId VARCHAR(255) NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

#### 6. **Orders** (Commandes)
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenantId UUID NOT NULL REFERENCES tenants(id),
  orderDate TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending',        -- pending, confirmed, processing, completed
  total FLOAT NOT NULL,
  
  -- Customer info
  customerFirstName VARCHAR(255) NOT NULL,
  customerLastName VARCHAR(255) NOT NULL,
  customerEmail VARCHAR(255) NOT NULL,
  customerCompany VARCHAR(255),
  customerDepartment VARCHAR(255),
  customerPhone VARCHAR(20),
  
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### 7. **OrderItems** (Items dans une commande)
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  orderId UUID NOT NULL REFERENCES orders(id),
  type VARCHAR(50),                             -- 'product' ou 'pack'
  itemId VARCHAR(255),                          -- productId ou packId
  name VARCHAR(255),
  quantity INT NOT NULL,
  unitPrice FLOAT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

#### 8. **TenantProductImages** (Images générées avec logos par tenant)
```sql
CREATE TABLE tenant_product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenantId UUID NOT NULL REFERENCES tenants(id),
  productId VARCHAR(255) NOT NULL REFERENCES products(id),
  generatedImageUrl VARCHAR(2048),              -- URL S3 de l'image avec logo
  generatedAt TIMESTAMP DEFAULT NOW(),
  expiresAt TIMESTAMP,                          -- Optional: régénération périodique
  
  UNIQUE(tenantId, productId)
);
```

---

## 2️⃣ AWS S3 : Stockage d'Images (Fichiers Binaires)

### Pourquoi AWS S3 et pas Supabase Storage ?

| Critère | Supabase Storage | AWS S3 |
| :--- | :--- | :--- |
| **Coût** | ~$0.025 par GB | ~$0.023 par GB (moins cher à grande échelle) |
| **Bande passante** | 500 GB gratuit/mois | 1 GB gratuit/mois |
| **Scalabilité** | Bonne | Excellent (durabilité 99.999999999%) |
| **Intégration CloudFront** | Possible | Native (plus simple avec CloudFront) |
| **CDN global** | Via Vercel | CloudFront ou autre |

**Décision** : AWS S3 + CloudFront pour un CDN global = images ultra-rapides mondialement.

### Structure du Bucket S3

```
s3://goodeez-prod-bucket/
│
├── products/                          ← Images de base (statiques)
│   ├── mug-ceramic.jpg
│   ├── hoodie-unisex.png
│   ├── notebook-leather.jpg
│   └── ...
│
├── collections/                       ← Images des catégories
│   ├── wear-collection.png
│   ├── drinkware-collection.png
│   └── ...
│
├── packs/                             ← Images des packs
│   ├── onboarding-classic.png
│   ├── event-stand.png
│   └── ...
│
└── tenants/                           ← Images personnalisées par tenant
    ├── capgemini/
    │   ├── logo.png                   ← Logo uploadé
    │   ├── mug-ceramic-with-logo.jpg  ← Générée automatiquement
    │   ├── hoodie-with-logo.png
    │   └── ...
    │
    ├── edf/
    │   ├── logo.png
    │   ├── mug-ceramic-with-logo.jpg  ← Différente (logo EDF) !
    │   └── ...
    │
    └── ...
```

### Nommage des fichiers

**Format standardisé :**
```
s3://goodeez-prod-bucket/tenants/{tenantId}/{productId}-with-logo.{ext}

Exemples :
s3://goodeez-prod-bucket/tenants/capgemini/mug-ceramic-with-logo.jpg
s3://goodeez-prod-bucket/tenants/edf/hoodie-unisex-with-logo.png
```

---

## 🔄 Flux de Données Complet

### Scénario 1 : Afficher un produit (sans logo)

```
1. User visite /portal/capgemini/products
   ↓
2. Next.js (Server Component) :
   const products = await prisma.product.findMany()
   ↓
3. Prisma interroge Supabase :
   SELECT * FROM products
   ↓
4. Supabase répond avec les données + imageUrl (S3) :
   {
     id: "mug-ceramic",
     name: "Ceramic Mug",
     price: 8,
     imageUrl: "https://cdn.goodeez.com/products/mug-ceramic.jpg"
   }
   ↓
5. Next.js rend la page avec l'image
   <Image src="https://cdn.goodeez.com/products/mug-ceramic.jpg" />
   ↓
6. Le navigateur demande l'image → CloudFront → S3 (ou cache CDN)
```

### Scénario 2 : Afficher un produit AVEC logo du tenant

```
1. User visite /portal/capgemini/products/mug-ceramic
   ↓
2. Next.js (Server Component) :
   const product = await prisma.product.findUnique({ id: "mug-ceramic" })
   const tenantImage = await prisma.tenantProductImage.findUnique({
     where: { tenantId_productId: { tenantId: "capgemini", productId: "mug-ceramic" } }
   })
   ↓
3. Si tenantImage existe :
   Utiliser tenantImage.generatedImageUrl
   → https://cdn.goodeez.com/tenants/capgemini/mug-ceramic-with-logo.jpg
   ↓
4. Si tenantImage n'existe pas :
   a) Télécharger l'image de base (S3)
   b) Télécharger le logo du tenant (S3)
   c) Générer l'image composite (Canvas + Sharp)
   d) Uploader le résultat à S3
   e) Sauvegarder l'URL dans tenant_product_images (Supabase)
   f) Retourner l'image
```

### Scénario 3 : Upload du logo du tenant

```
1. User (admin tenant) upload son logo
   ↓
2. API route /api/admin/upload-logo reçoit le fichier
   ↓
3. Prisma met à jour le logo URL dans Supabase :
   await prisma.tenant.update({
     where: { id: tenantId },
     data: { logoUrl: "s3://goodeez-prod-bucket/tenants/capgemini/logo.png" }
   })
   ↓
4. (Optionnel) Invalidate cache des images générées
   DELETE FROM tenant_product_images WHERE tenantId = "capgemini"
   ↓
5. Prochaine visite : les images seront régénérées avec le nouveau logo
```

---

## 🛠️ Intégration Prisma

### Setup Initial

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

### Utilisation dans une Page

```typescript
// src/app/portal/[tenant]/products/page.tsx
import { prisma } from '@/lib/prisma'

export default async function ProductsPage({ params }: { params: { tenant: string } }) {
  // Récupérer les produits depuis Supabase via Prisma
  const products = await prisma.product.findMany({
    include: {
      collection: true
    }
  })

  // Récupérer les images avec logos du tenant
  const tenant = await prisma.tenant.findUnique({
    where: { slug: params.tenant }
  })

  const tenantImages = await prisma.tenantProductImage.findMany({
    where: { tenantId: tenant.id }
  })

  return (
    <div>
      {products.map(product => {
        const customImage = tenantImages.find(img => img.productId === product.id)
        const imageUrl = customImage?.generatedImageUrl || product.imageUrl

        return (
          <ProductCard
            key={product.id}
            product={product}
            imageUrl={imageUrl}
          />
        )
      })}
    </div>
  )
}
```

---

## 🌐 URLs et Accès

### URLs S3 (Public Read)

Toutes les images doivent être **publiquement accessibles** :

```
https://cdn.goodeez.com/products/mug-ceramic.jpg
https://cdn.goodeez.com/tenants/capgemini/mug-ceramic-with-logo.jpg
```

(Configuré via CloudFront alias)

### Credentials (Sécurité)

Les credentials AWS sont stockées en variables d'environnement (jamais en dur) :

```bash
# .env.local (ou secrets Vercel)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET_NAME=goodeez-prod-bucket
AWS_S3_REGION=eu-west-1
AWS_CLOUDFRONT_URL=https://cdn.goodeez.com

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=postgresql://user:pass@xxxxx.supabase.co:5432/postgres
```

---

## 📊 Performances

### Optimisations

1. **CDN Global (CloudFront)** :
   - Images cachées géographiquement
   - TTL : 30 jours (images statiques)
   - Invalidation après upload de logo

2. **Image Optimization (Next.js)** :
   ```typescript
   <Image
     src={imageUrl}
     alt="Product"
     width={500}
     height={500}
     quality={80}
     placeholder="blur"
   />
   ```

3. **Database Indexing** :
   ```sql
   CREATE INDEX idx_tenant_product_images ON tenant_product_images(tenantId, productId);
   CREATE INDEX idx_orders_tenant ON orders(tenantId);
   CREATE INDEX idx_products_collection ON products(collectionId);
   ```

4. **Lazy Loading** :
   - Charger les images au-dessus de la ligne de flottaison
   - Lazy load les images en dessous

---

## 🚀 Roadmap de Migration

### Phase 1 : Setup (Semaine 1)
- [ ] Créer compte Supabase
- [ ] Créer compte AWS S3
- [ ] Configurer les tables Supabase
- [ ] Configurer les buckets S3
- [ ] Seed les données produits/collections

### Phase 2 : Migration Code (Semaine 2-3)
- [ ] Migrer `products.ts` → Supabase
- [ ] Migrer `collections.ts` → Supabase
- [ ] Migrer `packs.ts` → Supabase
- [ ] Mettre à jour les pages (findMany, findUnique, etc.)
- [ ] Upload des images de base sur S3

### Phase 3 : Images avec Logo (Semaine 3-4)
- [ ] Créer endpoint `/api/generate-product-image`
- [ ] Implémenter génération logo overlay
- [ ] Upload automatique sur S3
- [ ] Cache dans tenant_product_images

### Phase 4 : Production (Semaine 4-5)
- [ ] Configurer CloudFront CDN
- [ ] Tests de charge
- [ ] Déployer sur Vercel
- [ ] Monitoring & alertes

---

## 📝 Résumé

| Composant | Technologie | Rôle |
| :--- | :--- | :--- |
| **Données** | Supabase (PostgreSQL) | Stocke toutes les données structurées |
| **Images de base** | AWS S3 | Stocke les images produits (statiques) |
| **Images avec logos** | AWS S3 | Stocke les images générées par tenant |
| **CDN** | CloudFront | Accélère la livraison des images globalement |
| **ORM** | Prisma | Interface entre Next.js et Supabase |
| **Générations** | AWS Lambda (optionnel) | Génère/met à jour les images composite |

