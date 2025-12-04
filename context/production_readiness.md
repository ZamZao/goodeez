# 🚀 Analyse de Viabilité Production & Scalabilité

Ce document résume l'état actuel de l'architecture technique, ses limites, et le plan de transition pour passer d'un MVP local à une application scalable (100+ utilisateurs).

## 1. État Actuel (Architecture MVP)

L'application fonctionne actuellement en mode **"Full Local"**.

*   **Base de Données :** Fichiers JSON locaux (`src/data/*.json`).
*   **Stockage Images :** Système de fichiers local (`public/portals/...`).
*   **Traitement :** CPU du serveur local (Node.js + Sharp).

### ✅ Ce qui fonctionne
*   Développement rapide.
*   Démos en local (localhost).
*   **Hébergement VPS Persistant** (DigitalOcean, OVH, EC2) pour 1 à 2 utilisateurs simultanés maximum.

### ❌ Ce qui NE fonctionne PAS
*   **Hébergement Serverless (Vercel, Netlify) :**
    *   *Pourquoi ?* Le système de fichiers est éphémère. À chaque redéploiement ou mise en veille, **toutes les images générées et les nouveaux portails créés sont supprimés**.
*   **Concurrence :** Si 2 utilisateurs écrivent dans le JSON en même temps, risque de corruption de données.

---

## 2. Points de Rupture (Breaking Points)

| Composant | Limite Actuelle | Conséquence en Prod (Vercel) |
| :--- | :--- | :--- |
| **Stockage Images** | Disque Local | **Perte totale des images** après ~15min ou redéploiement. |
| **Base de Données** | Fichiers JSON | **Perte des comptes clients** après redéploiement. |
| **Performance** | CPU Local | Timeout des fonctions si >5 générations d'images simultanées. |

---

## 3. Stratégie Court Terme (MVP / Démo 1-2 Users)

Si l'objectif est de tester avec 1 ou 2 clients sans refaire le code maintenant :

1.  **Hébergement Obligatoire :** **VPS (Serveur Privé Virtuel)**.
    *   *Exemples :* DigitalOcean Droplet, Hetzner, AWS EC2.
    *   *Méthode :* Docker ou `npm start` avec PM2.
2.  **Maintenance :** Backups manuels réguliers des dossiers `src/data` et `public/portals`.
3.  **Risque :** Faible pour 2 utilisateurs, mais aucune scalabilité.

---

## 4. Roadmap de Transition (Objectif 100-200 Users)

Pour passer à l'échelle et utiliser une infrastructure moderne (Vercel), voici les étapes techniques nécessaires :

### Étape 1 : Externaliser le Stockage (Priorité Haute 🔴)
Remplacer l'écriture locale des images par un service de stockage Cloud.
*   **Solution :** Vercel Blob ou AWS S3.
*   **Impact Code :** Modifier `/api/admin/generate-assets` pour uploader le Buffer au lieu d'écrire sur le disque.

### Étape 2 : Base de Données Réelle (Priorité Haute 🔴)
Remplacer les fichiers JSON par une base de données relationnelle.
*   **Solution :** PostgreSQL (via Supabase ou Neon) + Prisma ORM.
*   **Impact Code :** Remplacer les lectures/écritures JSON par des appels Prisma (`db.tenant.create`, `db.product.findMany`).

### Étape 3 : Authentification (Priorité Moyenne 🟡)
Sécuriser l'accès aux portails et à l'admin.
*   **Solution :** Clerk ou NextAuth.

### Étape 4 : Files// filepath: /workspaces/codespaces-nextjs/context/production_readiness.md
# 🚀 Analyse de Viabilité Production & Scalabilité

Ce document résume l'état actuel de l'architecture technique, ses limites, et le plan de transition pour passer d'un MVP local à une application scalable (100+ utilisateurs).

## 1. État Actuel (Architecture MVP)

L'application fonctionne actuellement en mode **"Full Local"**.

*   **Base de Données :** Fichiers JSON locaux (`src/data/*.json`).
*   **Stockage Images :** Système de fichiers local (`public/portals/...`).
*   **Traitement :** CPU du serveur local (Node.js + Sharp).

### ✅ Ce qui fonctionne
*   Développement rapide.
*   Démos en local (localhost).
*   **Hébergement VPS Persistant** (DigitalOcean, OVH, EC2) pour 1 à 2 utilisateurs simultanés maximum.

### ❌ Ce qui NE fonctionne PAS
*   **Hébergement Serverless (Vercel, Netlify) :**
    *   *Pourquoi ?* Le système de fichiers est éphémère. À chaque redéploiement ou mise en veille, **toutes les images générées et les nouveaux portails créés sont supprimés**.
*   **Concurrence :** Si 2 utilisateurs écrivent dans le JSON en même temps, risque de corruption de données.

---

## 2. Points de Rupture (Breaking Points)

| Composant | Limite Actuelle | Conséquence en Prod (Vercel) |
| :--- | :--- | :--- |
| **Stockage Images** | Disque Local | **Perte totale des images** après ~15min ou redéploiement. |
| **Base de Données** | Fichiers JSON | **Perte des comptes clients** après redéploiement. |
| **Performance** | CPU Local | Timeout des fonctions si >5 générations d'images simultanées. |

---

## 3. Stratégie Court Terme (MVP / Démo 1-2 Users)

Si l'objectif est de tester avec 1 ou 2 clients sans refaire le code maintenant :

1.  **Hébergement Obligatoire :** **VPS (Serveur Privé Virtuel)**.
    *   *Exemples :* DigitalOcean Droplet, Hetzner, AWS EC2.
    *   *Méthode :* Docker ou `npm start` avec PM2.
2.  **Maintenance :** Backups manuels réguliers des dossiers `src/data` et `public/portals`.
3.  **Risque :** Faible pour 2 utilisateurs, mais aucune scalabilité.

---

## 4. Roadmap de Transition (Objectif 100-200 Users)

Pour passer à l'échelle et utiliser une infrastructure moderne (Vercel), voici les étapes techniques nécessaires :

### Étape 1 : Externaliser le Stockage (Priorité Haute 🔴)
Remplacer l'écriture locale des images par un service de stockage Cloud.
*   **Solution :** Vercel Blob ou AWS S3.
*   **Impact Code :** Modifier `/api/admin/generate-assets` pour uploader le Buffer au lieu d'écrire sur le disque.

### Étape 2 : Base de Données Réelle (Priorité Haute 🔴)
Remplacer les fichiers JSON par une base de données relationnelle.
*   **Solution :** PostgreSQL (via Supabase ou Neon) + Prisma ORM.
*   **Impact Code :** Remplacer les lectures/écritures JSON par des appels Prisma (`db.tenant.create`, `db.product.findMany`).

### Étape 3 : Authentification (Priorité Moyenne 🟡)
Sécuriser l'accès aux portails et à l'admin.
*   **Solution :** Clerk ou NextAuth.

### Étape 4 : Files d'attente (Priorité Basse 🟢)
Gérer la génération d'images en arrière-plan pour ne pas bloquer l'interface.
