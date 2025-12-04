# 🎓 Leçon : Transition vers une Base de Données & Optimisation

Voici un résumé pédagogique des changements effectués pour passer d'un système de fichiers local à une base de données Cloud (Supabase), et comment nous avons optimisé les coûts.

## 1. Le Changement d'Architecture

### 🏠 Avant : Système de Fichiers (Local)
Au début, votre application fonctionnait comme un carnet de notes posé sur votre bureau.
*   **Stockage :** Les données (Produits, Portails) étaient écrites "en dur" dans des fichiers JSON (`src/data/products.ts`, `public/portals/...`).
*   **Lecture :** Le code utilisait `fs.readFile` (File System) pour lire ces fichiers.
*   **Problème :** Si vous hébergez l'application sur le Cloud (Vercel), ces fichiers sont réinitialisés à chaque mise à jour. Impossible de garder les nouveaux inscrits.

### ☁️ Après : Base de Données (Supabase + Prisma)
Nous avons déplacé le carnet de notes dans un coffre-fort partagé et sécurisé dans le Cloud.
*   **Stockage :** Les données sont dans **PostgreSQL** (une base de données relationnelle robuste) chez Supabase.
*   **Outil :** Nous utilisons **Prisma**. C'est un "traducteur" (ORM) qui permet à votre code TypeScript de parler à la base de données sans écrire de SQL complexe.
*   **Avantage :** Les données sont persistantes, sécurisées et accessibles de partout.

---

## 2. Le Code : Avant vs Après

Prenons l'exemple de la récupération du catalogue produits.

**Avant (Lecture fichier local) :**
```typescript
// src/lib/products/getProductCatalog.ts
import { products } from '@/data/products' // Import direct du fichier

export function getProductCatalog() {
  return products; // Retourne juste le tableau en mémoire
}
```

**Après (Requête Base de Données) :**
```typescript
// src/lib/products/getProductCatalog.ts
import { prisma } from '@/lib/prisma'

export async function getProductCatalog() {
  // Demande à Prisma d'aller chercher tous les produits dans la DB
  const products = await prisma.product.findMany(); 
  return products;
}
```
*Notez le mot-clé `async/await` : interroger une base de données prend du temps (quelques millisecondes), le code doit donc "attendre" la réponse.*

---

## 3. L'Astuce Économique : Le Caching 💰

Interroger la base de données à chaque fois qu'un utilisateur charge une page a deux défauts :
1.  **Lenteur :** Il faut faire un aller-retour réseau vers Supabase.
2.  **Coût :** Supabase (et les autres) ont des limites gratuites ou facturent au nombre de lectures.

**La Solution : Le Cache (`unstable_cache`)**

Imaginez que vous avez un menu de restaurant. Au lieu d'aller demander au chef en cuisine (la DB) ce qu'il y a au menu à chaque fois qu'un client entre, vous imprimez le menu et le gardez à l'accueil pendant 1 heure.

**Code avec Optimisation :**
```typescript
import { unstable_cache } from 'next/cache'

export const getProductCatalog = unstable_cache(
  async () => {
    // Cette partie coûteuse ne s'exécute qu'une fois par heure
    return await prisma.product.findMany();
  },
  ['product-catalog'], // Clé unique pour identifier ce cache
  { revalidate: 3600 } // Durée de vie : 3600 secondes (1 heure)
);
```

**Résultat :**
*   **Utilisateur 1 (10h00) :** Le serveur interroge Supabase. (Lent + 1 "crédit" utilisé).
*   **Utilisateur 2 à 1000 (10h01 - 10h59) :** Le serveur répond instantanément avec la copie en mémoire. (Rapide + 0 "crédit" utilisé).
*   **Utilisateur 1001 (11h01) :** Le cache est périmé, on réinterroge Supabase une fois.

C'est ainsi qu'on passe d'une application "bricolée" à une architecture **Scalable** (capable de gérer beaucoup de monde) et **Rentable**.
