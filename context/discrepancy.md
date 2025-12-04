# 🚨 Analyse des Contradictions (Discrepancies)

Ce fichier recense les incohérences détectées entre les différents fichiers de contexte (`checkoutcontext.md`, `productContext.md`, `ecomportalcontext.md`, etc.).

> **Règle générale de résolution** : Les fichiers les plus spécifiques et récemment modifiés (`checkoutcontext.md`, `productContext.md`) prévalent sur les fichiers généralistes (`ecomportalcontext.md`, `project_context.md`).

---

## 1. Paiement vs Devis (Checkout)

*   **Source A (`ecomportalcontext.md` / `project_context.md`)** :
    *   Mentionne souvent "E-commerce", "Stripe", "Paiement en ligne", "Billing logic".
    *   Suggère un flux classique d'achat immédiat.
*   **Source B (`checkoutcontext.md` - Version actuelle)** :
    *   Stipule explicitement : **"PAS de paiement en ligne direct dans le portail pour le MVP"**.
    *   Le checkout est une **"Demande de devis"**.
*   **👉 Résolution** : Le MVP est un système de **Devis (Quote)**. Pas de Stripe pour l'instant.

## 2. Gestion des Packs (Contenu)

*   **Source A (`ecomportalcontext.md`)** :
    *   Évoque un "Pack Builder" ou la possibilité pour l'utilisateur de composer son pack (ajouter/retirer des items).
*   **Source B (`productContext.md`)** :
    *   Définit des packs avec un contenu **fixe** (ex: "Welcome Pack" contient exactement 1 Hoodie + 1 Gourde).
    *   L'utilisateur ne peut changer que la quantité de packs, pas le contenu interne.
*   **👉 Résolution** : Les packs sont **fixes** pour le MVP. La personnalisation du contenu se fait hors-ligne via le contact commercial (bouton "Modifier ce pack" qui ouvre un mailto).

## 3. Images Produits (Source)

*   **Source A (`productContext.md` - Ancienne version / Code existant)** :
    *   Utilise des URLs externes (Unsplash) pour les images produits.
*   **Source B (`logoplacementcontext.md` & Requêtes récentes)** :
    *   Nécessite des images **locales** (`/public/images/products/...`) pour garantir le bon positionnement du logo (overlay CSS) et la cohérence visuelle.
*   **👉 Résolution** : Migration obligatoire vers des **images locales** stockées dans `public/images/products/`.

## 4. Délais de Livraison

*   **Source A (Visions générales)** :
    *   Peut laisser entendre une livraison standard e-commerce (quelques jours).
*   **Source B (`checkoutcontext.md`)** :
    *   Impose un message d'avertissement strict : **"5 à 6 semaines"**.
*   **👉 Résolution** : Afficher clairement **5-6 semaines** partout (Panier, Checkout, Confirmation).

## 5. Authentification & Accès

*   **Source A (`project_context.md`)** :
    *   Suggère une gestion multi-tenant complexe avec login/mot de passe, rôles, etc.
*   **Source B (Implémentation actuelle / `landingcontext.md`)** :
    *   L'accès semble se faire via une URL publique ou semi-privée (`/portal/[tenant]`) sans mur de connexion strict (Hard Login) pour le MVP, ou une auth très simplifiée.
*   **👉 Résolution** : Accès simplifié par URL (slug tenant) pour fluidifier la démo MVP.

## 6. Application du Logo (Technique)

*   **Source A (Supposition implicite)** :
    *   Génération d'images côté serveur (le client reçoit une image fusionnée).
*   **Source B (`logoplacementcontext.md`)** :
    *   Superposition **CSS (Overlay)** côté client. L'image de base et le logo sont deux couches distinctes.
*   **👉 Résolution** : Utiliser la méthode **Overlay CSS** (Composant `ProductImageWithLogo`) pour éviter la complexité backend.

---

## ✅ Actions Correctives Recommandées

1.  Nettoyer `ecomportalcontext.md` pour retirer les mentions de Stripe/Paiement immédiat.
2.  Mettre à jour `productCatalog.ts` pour utiliser uniquement des chemins locaux.
3.  S'assurer que le wording "Devis" remplace "Commande" ou "Achat" dans l'interface.
