# OneStopMerch V0 - Multi-Tenant Merch Portal Generator

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3000` (ou 3001 si le port est déjà utilisé).

## 📋 Fonctionnalités V0

### 1. **Page d'accueil** (`/`)
- Landing page simple avec Lorem ipsum
- Boutons vers l'onboarding et le portail démo

### 2. **Onboarding** (`/onboarding`)
- Formulaire simple : nom de l'entreprise + upload de logo
- Génère automatiquement un portail brandé
- Sauvegarde locale dans `public/portals/[slug]/`

### 3. **Portails dynamiques** (`/portal/[tenant]`)
- Affichage du catalogue de ~20 produits office merch
- Overlay du logo de l'entreprise sur chaque produit
- Panier avec Context API + localStorage
- Design responsive avec Tailwind CSS

### 4. **Checkout** (`/portal/[tenant]/checkout`)
- Récapitulatif du panier
- Formulaire client (nom, email, entreprise, etc.)
- Pas de paiement réel

### 5. **Confirmation** (`/portal/[tenant]/confirmation`)
- Page de confirmation de commande
- Affichage de l'Order ID

### 6. **Export JSON local**
- Chaque commande est sauvegardée dans `public/orders/[tenant]/order-[id].json`
- Format structuré pour traitement manuel

## 🧪 Test du flow complet

### Option A : Utiliser le portail démo
1. Aller sur `http://localhost:3001/portal/demo`
2. Parcourir le catalogue
3. Ajouter des produits au panier
4. Aller au checkout
5. Remplir le formulaire
6. Confirmer la commande
7. Vérifier le fichier JSON créé dans `public/orders/demo/`

### Option B : Créer un nouveau portail
1. Aller sur `http://localhost:3001/onboarding`
2. Entrer le nom d'une entreprise (ex: "Capgemini")
3. Uploader un logo
4. Soumettre → redirection vers `/portal/capgemini`
5. Suivre le même flow que l'option A

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **State**: React Context API
- **Storage**: LocalStorage (panier) + Filesystem (portails/commandes)

## ⚠️ Limitations V0

- ❌ Pas de base de données
- ❌ Pas de paiement réel
- ❌ Pas d'envoi d'emails automatique
- ❌ Pas d'authentification
- ❌ Pas de gestion des stocks

Pour plus de détails, voir `project_context.md`
