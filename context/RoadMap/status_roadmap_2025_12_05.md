# 📅 Statut du Projet & Roadmap - 05 Décembre 2025

Ce document retrace l'état actuel du projet Goodeez et définit la feuille de route pour les prochaines étapes.

---

## 🟢 Statut Actuel (MVP Déployé)

L'application est **en ligne et fonctionnelle** dans sa version MVP (Minimum Viable Product).

### ✅ Ce qui est fait et validé :
1.  **Infrastructure & Déploiement :**
    *   **Frontend/API :** Déployé sur **Vercel** (Next.js).
    *   **Base de Données :** Migrée vers **Supabase (PostgreSQL)**.
    *   **Stockage :** Configuré sur **Supabase Storage** (pour les logos et assets).
    *   **ORM :** Prisma configuré et connecté (avec Connection Pooling pour la stabilité).
    *   **CI/CD :** Pipeline GitHub Actions prêt (déploiement auto sur push main).

2.  **Fonctionnalités Clés :**
    *   **Multi-Tenant :** Architecture capable de gérer plusieurs portails clients (`/portal/[tenant]`).
    *   **Catalogue :** Produits, Packs et Collections gérés en base de données.
    *   **Panier & Checkout :** Tunnel de commande fonctionnel (avec logique de formulaire).
    *   **Mode Démo :** Navbar spécifique pour le store de démonstration.

3.  **Données :**
    *   Migration des données statiques (JSON/TS) vers la base de données PostgreSQL effectuée (Seed script).

---

## 🗺️ Roadmap (À partir du 05 Décembre 2025)

L'objectif est maintenant de consolider l'existant et d'améliorer l'expérience utilisateur et opérationnelle sans complexifier l'infrastructure inutilement.

### 🗓️ Court Terme (Semaine prochaine)
*Priorité : Nettoyage & Expérience Utilisateur*

1.  **Nettoyage Messaging & UX :**
    *   Harmoniser le ton (B2B/Pro) sur toutes les pages.
    *   Traduire les derniers textes en anglais (boutons, erreurs).
    *   Vérifier les "Empty States" (panier vide, pas de produits).
2.  **Génération d'Images (Client-Side) :**
    *   Implémenter la superposition du logo client sur les produits directement dans le navigateur (Canvas).
    *   *Avantage :* Zéro coût serveur, expérience instantanée pour l'utilisateur.
3.  **Emails Transactionnels :**
    *   Connecter un service d'email (Resend/SendGrid) pour envoyer une confirmation de commande propre au client.

### 🗓️ Moyen Terme (Mois prochain)
*Priorité : Administration & Sécurité*

1.  **Dashboard Admin (Back-office) :**
    *   Créer une interface simple pour ajouter/modifier des produits et des tenants sans toucher à la DB.
    *   Visualiser les commandes entrantes.
2.  **Sécurisation Onboarding :**
    *   Ajouter une validation (email pro ou code d'invitation) pour la création de nouveaux portails.
3.  **Analytics :**
    *   Activer Vercel Analytics ou PostHog pour suivre l'usage des portails.

### 🗓️ Long Terme (Q1 2026)
*Priorité : Scalabilité & Optimisation Coûts*

1.  **Optimisation Coûts (Si >1000 users) :**
    *   Mise en place de Cloudflare (CDN) devant Supabase Storage.
    *   Optimisation fine des requêtes DB.
2.  **Fonctionnalités Avancées :**
    *   Paiement réel (Stripe) si le modèle passe du "Devis" au "Paiement direct".
    *   Gestion des stocks en temps réel.

---

## 💡 Notes Techniques

*   **Architecture actuelle :** Next.js (Vercel) + Supabase (DB/Storage).
*   **Robustesse :** L'architecture actuelle est validée pour supporter **>1000 utilisateurs** sans changement majeur.
*   **Point de vigilance :** Surveiller le quota de stockage Supabase (1GB gratuit) si on décide de stocker les images générées (ce qui n'est pas prévu dans l'approche Client-Side).


Prépare le rdv dans 15 jours
    => Change le pitch deck pour refléter le MVP actuel RQ d'olivier - ne limite pas à régional, dit tu veux tester en beta test
    ensuite la stratégie d'acquisition doit être peaufiner, on peut tout miser sur google ads en vrai - ca me parait le plus simple.
    => Faut que l'on travaille toutes les images logo 
    => Faut que l'on travail tout le messaging +> il nous faut notre pitch commercial clair et net le PPT 
    => Il faut que l'on a une idée claire de la compétitition et qu'on les liste tous.
    => 

    café de la création=> tous les acteurs de la création premier jeudi du mois 8H30 à 11h 
Pour répondre à toutes les questions. 
Suivre le projet avant le création de l'entreprise, 6 mois de prépa => échanges et go / no go 
Continuer la pépinière normandie et création, suivi dans les murs 
Programme Stern => Normandie Incubation => 600 euros faut être disponible les lundis sur Rouen, il nous font bosser l'étude de marché, french tech et mis en lien dans les personnes dans le même cas que moi et challenge le projet à fond pour le faire murir - démarre en Janvier 
Chloé Klein de Normandie Incubation => 
Quitter l'emploi pour la création => 

