Tu as bien fait de regarder Swag, ça montre exactement ce qui manque à ton portail :

* **Un vrai “storytelling” visuel** : gros hero immersif, photos produits hero, CTA très visible.
* **Des sections qui rythment la page** : packs, use cases, “how it works”, preuves sociales, FAQ.
* **Une hiérarchie claire** : gros titres, sous-titres, cartes bien séparées, fonds alternés.
* **Une identité forte** : bleu de marque très présent, arrondis, ombres, visuels fun.

On va encoder tout ça dans un **fichier de contexte** pour Copilot, pour qu’il te sorte une landing “à la Swag” mais adaptée à Goodeez, en **Next.js + Tailwind**.

---

## 🧾 `landing_ui_context.md` (à coller dans ton repo)

```md
# landing_ui_context.md

## 🎯 Objectif

Créer une **landing page marketing** moderne pour Goodeez (portail de merch d’entreprise), inspirée des grands sites de “swag/swag management” :

- Hero très visuel avec CTA fort
- Sections qui expliquent le produit (packs, use-cases, steps)
- Preuve sociale (chiffres, témoignages, logos)
- FAQ + footer clean

Technos :

- Next.js App Router
- TypeScript
- Tailwind CSS (+ shadcn/ui si besoin)
- Design responsive (mobile → desktop)

Le but est de transformer la page d’accueil actuelle, assez “plate”, en **vraie landing premium**.  
La page visée est `app/page.tsx` ou un composant `LandingPage` dédié.

---

## 🎨 Direction design

### Palette & style

- Couleur primaire : `--brand-primary` (par défaut `#2563eb`, remplaçable par la couleur du client/portail).
- Couleur secondaire : variante plus claire du primaire.
- Fonds :
  - `bg-white` pour certaines sections
  - `bg-slate-50` / `bg-slate-100` pour alterner
  - `bg-gradient-to-b from-slate-50 via-white to-slate-50` pour le hero
- Coins arrondis : `rounded-2xl` sur les cartes, `rounded-full` sur badges.
- Ombres :
  - légère sur les cartes : `shadow-sm hover:shadow-md`
  - plus marquée sur le hero visuel : `shadow-xl`
- Typo :
  - Titres hero : `text-4xl md:text-5xl font-bold tracking-tight`
  - Sous-titres : `text-slate-500 md:text-lg`
  - Petits labels : `text-xs uppercase tracking-wide text-slate-500`

### Interactions

- Tous les boutons/CTA : `transition`, `hover:scale-[1.01]`, `hover:shadow-md`.
- Cartes : `hover:-translate-y-1 hover:shadow-lg`.
- Légères animations d’apparition possibles (via `animate-in` ou `framer-motion`, mais non obligatoire).

---

## 🧱 Structure globale de la page

La landing est composée des sections suivantes dans l’ordre :

1. **Navbar sticky**
2. **Hero principal “Boutique de la boîte”**
3. Bande de **logos clients** (preuve sociale simple)
4. Section **Packs vedettes**
5. Section **“Pourquoi un portail Goodeez ?”** (3–4 bénéfices)
6. Section **“Comment ça marche”** (3 étapes)
7. Section **Collections / Cas d’usage** (cartes large)
8. Section **Stats & réassurance** (chiffres clés)
9. Section **Témoignage** (une carte + photo)
10. Section **FAQ**
11. **Footer** complet

Chaque section doit être un composant réutilisable dans `components/landing/`.

---

## 1️⃣ Navbar

Composant : `LandingNavbar`

- Position : sticky top, fond semi-opaque
- Classe conteneur : `w-full border-b border-slate-200 bg-white/80 backdrop-blur`
- Intérieur : `max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4`

Contenu :

- À gauche : logo Goodeez (ou texte `"Goodeez"`) + petit label `"Portails de merch d’entreprise"`
- Au centre (desktop) : liens d’ancre :
  - `Packs`
  - `Fonctionnalités`
  - `Comment ça marche`
  - `FAQ`
- À droite :
  - lien `"Voir une démo"`
  - bouton primaire `"Créer mon portail"` (`bg-[var(--brand-primary)] text-white px-4 py-2 rounded-full`)

Sur mobile : menu burger + drawer simple (shadcn `Sheet` possible).

---

## 2️⃣ Hero

Composant : `LandingHero`

Conteneur principal :

- `max-w-6xl mx-auto px-4 pt-10 pb-12 md:pt-16 md:pb-20`
- Layout `md:grid md:grid-cols-2 md:gap-10 items-center`

Colonne gauche :

- Petit badge : `inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700`
  - texte type : `"Pensé pour RH & Office Managers"`
- Titre : `"Votre boutique de merch, prête en 5 minutes."`
- Sous-titre (2–3 lignes) : expliquer :
  > Portail brandé, packs d’onboarding, cadeaux collaborateurs.  
  > Vos équipes commandent, vos fournisseurs expédient. Zéro stock, zéro Excel.
- Zone CTA :
  - bouton primaire `"Parcourir le catalogue"`
  - bouton ghost `"Voir un exemple de portail"`

Colonne droite :

- Carte mockup : `relative rounded-3xl bg-white shadow-xl p-4 md:p-6 overflow-hidden`
- Utiliser 2–3 images produits (ou carrés de couleur placeholders) disposées en `grid grid-cols-2 gap-3`, avec un petit tag `bg-[var(--brand-primary)] text-white text-xs rounded-full px-2 py-1 absolute` sur l’une des images (`"Pack Onboarding"`).
- Ajouter un petit badge en bas de la carte :  
  `inline-flex items-center gap-1 rounded-full bg-slate-900 text-white text-xs px-3 py-1`  
  texte : `"Livraison directe aux collaborateurs"`.

---

## 3️⃣ Bande logos clients

Composant : `LandingLogosStrip`

Section légère sous le hero :

- `bg-white py-6 md:py-8 border-y border-slate-100`
- Titre discret : `"Ils utilisent déjà des portails de merch personnalisés"`
- Logos fictifs en gris (ou initiales) dans un `flex flex-wrap justify-center gap-6 opacity-60`.

---

## 4️⃣ Section Packs vedettes

Composant : `LandingFeaturedPacks`

Section :

- `bg-slate-50 py-10 md:py-16`
- Conteneur : `max-w-6xl mx-auto px-4`
- En-tête : 
  - `flex items-end justify-between mb-6`
  - Titre `"Packs prêts pour vos équipes"` (`text-2xl md:text-3xl font-semibold`)
  - lien `"Voir tous les packs →"` (ancre vers section packs/portail)

Grille de cartes (3 ou 4) :

- `grid gap-6 md:grid-cols-3`
- Carte :
  - `bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition`
  - image mockup en haut (`aspect-[4/3] rounded-t-2xl bg-slate-100`)
  - contenu : nom du pack, description courte, prix, badge `Best seller` si besoin.
  - CTA discret : `"Voir le détail"` ou direct `"Ajouter au panier"` pour le portail.

---

## 5️⃣ Section “Pourquoi Goodeez ?” (bénéfices)

Composant : `LandingBenefits`

Section :

- `bg-white py-10 md:py-16`
- Titre centré `"Pourquoi un portail de merch plutôt que des commandes à la main ?"`
- Sous-titre : ligne expliquant la simplification (zéro Excel, zéro cartons, etc.)

Grille 3 colonnes :

- `grid gap-8 md:grid-cols-3 mt-8`
- Chaque carte :
  - icône simple (emoji ou icône CSS)
  - titre (ex : `"Zéro gestion de stock"`, `"Packs d’onboarding automatiques"`, `"Expédition directe aux collaborateurs"`)
  - paragraphe court.

Style : `bg-slate-50 rounded-2xl p-6`.

---

## 6️⃣ Section “Comment ça marche” (steps)

Composant : `LandingHowItWorks`

Section :

- `bg-slate-50 py-10 md:py-16`
- En-tête centré : `"Comment ça marche ?"`

Steps horizontaux :

- `grid gap-6 md:grid-cols-3 mt-8`
- Step card :
  - `rounded-2xl bg-white p-6 shadow-sm relative`
  - petit numéro cercle en haut : `absolute -top-3 left-6 h-8 w-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-sm font-semibold`
  - titre + description courte.

Steps possibles :
1. `"On crée votre portail brandé"`
2. `"Vos équipes commandent leurs packs"`
3. `"Nous gérons production & livraison"`

---

## 7️⃣ Section Collections / Cas d’usage

Composant : `LandingUseCases`

Section :

- `bg-white py-10 md:py-16`
- Titre `"Pour toutes les occasions de votre entreprise"`

Cartes horizontales type “large pill” :

- `grid gap-4 md:grid-cols-5`
- Chaque carte :
  - `relative overflow-hidden rounded-2xl h-32 md:h-40`
  - fond image floue ou dégradé
  - overlay sombre : `bg-black/40`
  - texte blanc centré : `"Onboarding"`, `"Événements"`, `"Cadeaux clients"`, `"Remote teams"`, `"Anniversaires d’entreprise"`.

Hover : `scale-[1.02]`.

---

## 8️⃣ Section Stats & réassurance

Composant : `LandingStats`

Section :

- `bg-slate-900 text-white py-10 md:py-16`
- Layout `md:flex md:items-center md:justify-between max-w-6xl mx-auto px-4 gap-10`
- Texte :
  - titre : `"On expédie du merch tous les jours pour des équipes partout en Europe."`
  - sous-titre : phrase de réassurance.
- Grille de chiffres :
  - 3 stats : nombre de packs envoyés, nombre de pays, note de satisfaction.
  - Chaque stat : `text-3xl font-semibold` + label `text-sm text-slate-300`.

---

## 9️⃣ Section Témoignage

Composant : `LandingTestimonial`

Section :

- `bg-white py-10 md:py-16`
- Carte centrée :
  - `max-w-3xl mx-auto rounded-3xl bg-slate-50 p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center`
  - à gauche : avatar rond / photo (placeholder)
  - à droite : citation + nom + rôle + entreprise.
- Citation format : `text-lg md:text-xl font-medium text-slate-800`.

---

## 🔟 FAQ

Composant : `LandingFaq`

Section :

- `bg-slate-50 py-10 md:py-16`
- Titre centré `"Questions fréquentes"`
- Accordéon (shadcn `Accordion`) ou simple listes de questions/réponses :

  - `"Comment sont gérés les délais de production ?"`
  - `"Peut-on personnaliser les packs par équipe ?"`
  - `"Y a-t-il un minimum de commande ?"`
  - `"Comment se passe la facturation ?"`

Style :

- container FAQ : `max-w-3xl mx-auto space-y-4`
- questions : `rounded-2xl bg-white px-4 py-3 shadow-sm`.

---

## 1️⃣1️⃣ Footer

Composant : `LandingFooter`

Section :

- `bg-slate-900 text-slate-300 py-8 mt-8`
- `max-w-6xl mx-auto px-4`
- Layout :
  - colonne gauche : logo/nom Goodeez + phrase `"Portails de merch pour RH & Office Managers."`
  - colonnes droite : liens :
    - Produit : Fonctionnalités, Packs, Tarifs, FAQ
    - Ressources : Blog (plus tard), Support
    - Légal : CGU, Confidentialité
- Bas de page : `border-t border-slate-800 mt-6 pt-4 text-xs text-slate-500 flex justify-between`

---

## 🧩 Intégration avec le portail existant

- La landing est **publique** : `app/page.tsx`.
- Les portails clients (`/portal/[tenant]`) peuvent avoir une version simplifiée (hero + packs + catalogue).
- Réutiliser certains composants (Packs grid, Collections cards) dans le portail.

---

## ✅ Ce que Copilot doit faire avec ce contexte

1. Créer une structure de composants dans `components/landing/` :
   - `LandingNavbar.tsx`
   - `LandingHero.tsx`
   - `LandingLogosStrip.tsx`
   - `LandingFeaturedPacks.tsx`
   - `LandingBenefits.tsx`
   - `LandingHowItWorks.tsx`
   - `LandingUseCases.tsx`
   - `LandingStats.tsx`
   - `LandingTestimonial.tsx`
   - `LandingFaq.tsx`
   - `LandingFooter.tsx`
2. Créer une page `app/page.tsx` qui compose ces sections dans l’ordre.
3. Utiliser Tailwind pour la mise en page et les effets (`rounded-2xl`, `shadow`, `hover:-translate-y-1`, gradients, etc.).
4. Garder tout **responsive** (grilles `md:grid-cols-*`, padding `px-4`, `max-w-6xl mx-auto`).
5. Prévoir une variable CSS `--brand-primary` sur le `<body>` ou dans un provider pour que la couleur puisse s’adapter à chaque portail.

L’objectif final :  
👉 une landing **vivante, brandée, premium**, inspirée par les grosses boîtes de swag, mais optimisée pour ton modèle Goodeez.
```
