Voici un **fichier de contexte complet** que tu peux donner à Copilot.
Tu peux le mettre dans `context_logo_placement.md` ou l’inclure dans ton README.

````md
# 🧩 Goodeez – Logo Placement Context

## 🎯 Objectif

Le but est de **superposer automatiquement le logo d’une entreprise** sur des mockups produits (t-shirts, mugs, gourdes, etc.) pour générer des visuels brandés.

On veut :

- un rendu **propre et réaliste**, cohérent d’un produit à l’autre ;
- un système **déclaratif** (une config par produit) ;
- quelque chose de **simple à coder** (Canvas, Sharp, CSS overlay, peu importe la techno).

---

## 🧱 Modèle d’image & de logo

Chaque visuel produit est une image de base, stockée dans :

`/public/products/images/<filename>`

On superpose dessus le **logo client** (PNG avec fond transparent de préférence).

On travaille dans un système **normalisé** :

- `centerXPct` = position horizontale du **centre du logo** en pourcentage de la largeur de l’image (`0–100`)  
- `centerYPct` = position verticale du **centre du logo** en pourcentage de la hauteur de l’image  
- `widthPct` = largeur du logo en pourcentage de la largeur de l’image  
- `rotateDeg` = rotation du logo en degrés (optionnel)  
- `warp` = info simplifiée pour gérer les objets cylindriques / perspective (optionnel)

```ts
type LogoWarp =
  | { type: 'none' }
  | { type: 'cylindrical'; intensity: number }   // mugs, bouteilles, gobelets, stylos
  | { type: 'perspective'; intensity: number };  // carnet incliné, porte-clé

type LogoPlacement = {
  centerXPct: number;  // 0–100, from left
  centerYPct: number;  // 0–100, from top
  widthPct: number;    // 0–100, relative to image width
  rotateDeg?: number;  // default 0
  warp?: LogoWarp;     // default { type: 'none' }
};
````

---

## 🧠 Stratégie globale de placement

### 1. Textile (t-shirt, hoodie, polos, veste)

* Logo **petit**, placé **en haut à droite** (comme une petite broderie).
* Pas de warp, pas de perspective.
* Largeur du logo ≈ **5–7%** de la largeur de l’image.

### 2. Objets cylindriques (mug, gourde, gobelet, stylo)

* Logo **centré** sur la zone visible.
* Légère rotation pour suivre l’angle de la photo.
* **Warp cylindrique** pour que le logo ait une légère courbure.
* Largeur ≈ **17–22%** pour les mugs/gourdes, **40–45%** pour les stylos.

### 3. Objets plats (tote bag, carnet, tapis de souris, powerbank)

* Tote bags : logo **centré** et bien visible (zone principale d’impression).
* Carnet : logo **centré**, avec un léger effet **perspective** si le carnet est incliné.
* Mousepad : logo **en bas à gauche**, petit.
* Powerbank : logo centré.
* Largeur ≈ **20–30%** selon l’objet.

### 4. Lifestyle spécifiques (backpack, porte-clé)

* Backpack : logo sur la **pochette du haut**, centré.
* Porte-clé : logo **centré** sur la plaque métallique/bois.
* Légère perspective si nécessaire.

---

## 🗺️ Configuration par produit

Ci-dessous, une **config par productId**, basée sur les visuels actuels.

> Les valeurs sont approximatives mais cohérentes : Copilot peut les adapter si besoin en ajustant les pourcentages.

```ts
// Map: productId -> LogoPlacement
export const logoPlacements: Record<string, LogoPlacement> = {
  // WEAR – logo petit en haut à droite
  'hoodie-basic': {
    centerXPct: 88,   // haut droite
    centerYPct: 18,
    widthPct: 7,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'tshirt-basic': {
    centerXPct: 88,
    centerYPct: 20,
    widthPct: 6,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'polo-classic': {
    centerXPct: 89,
    centerYPct: 22,
    widthPct: 5.5,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'polo-premium': {
    centerXPct: 88,
    centerYPct: 24,
    widthPct: 5,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'cap-basic': {
    // façade avant, centré
    centerXPct: 50,
    centerYPct: 33,
    widthPct: 13,
    rotateDeg: 0,
    warp: { type: 'cylindrical', intensity: 0.05 }
  },
  'cap-premium': {
    centerXPct: 50,
    centerYPct: 35,
    widthPct: 12,
    rotateDeg: 0,
    warp: { type: 'cylindrical', intensity: 0.06 }
  },
  'veste-premium': {
    centerXPct: 87,
    centerYPct: 26,
    widthPct: 6,
    rotateDeg: 0,
    warp: { type: 'none' }
  },

  // DRINKWARE – logo centré, warp cylindrique
  'bottle-basic': {
    centerXPct: 50,
    centerYPct: 52,
    widthPct: 17,
    rotateDeg: -3,
    warp: { type: 'cylindrical', intensity: 0.1 }
  },
  'mug-basic': {
    centerXPct: 50,
    centerYPct: 45,
    widthPct: 22,
    rotateDeg: -2,
    warp: { type: 'cylindrical', intensity: 0.12 }
  },
  'cup-event': {
    centerXPct: 50,
    centerYPct: 48,
    widthPct: 20,
    rotateDeg: 0,
    warp: { type: 'cylindrical', intensity: 0.15 }
  },

  // OFFICE
  'notebook-hard': {
    centerXPct: 50,
    centerYPct: 50,
    widthPct: 20,
    rotateDeg: -6,
    warp: { type: 'perspective', intensity: 0.15 } // carnet légèrement incliné
  },
  'mousepad': {
    // petit logo en bas à gauche
    centerXPct: 18,
    centerYPct: 78,
    widthPct: 12,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'pen-basic': {
    centerXPct: 50,
    centerYPct: 60,
    widthPct: 45,
    rotateDeg: 0,
    warp: { type: 'cylindrical', intensity: 0.1 }
  },
  'pen-premium': {
    centerXPct: 50,
    centerYPct: 62,
    widthPct: 40,
    rotateDeg: 0,
    warp: { type: 'cylindrical', intensity: 0.1 }
  },

  // LIFESTYLE
  'tote-basic': {
    centerXPct: 50,
    centerYPct: 52,
    widthPct: 28,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'tote-premium': {
    centerXPct: 50,
    centerYPct: 52,
    widthPct: 30,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'backpack': {
    // sur la pochette du haut
    centerXPct: 50,
    centerYPct: 35,
    widthPct: 22,
    rotateDeg: 0,
    warp: { type: 'none' }
  },
  'porte-cle': {
    centerXPct: 50,
    centerYPct: 68,
    widthPct: 22,
    rotateDeg: -3,
    warp: { type: 'perspective', intensity: 0.1 }
  },

  // TECH
  'powerbank-8k': {
    centerXPct: 50,
    centerYPct: 50,
    widthPct: 28,
    rotateDeg: 0,
    warp: { type: 'none' }
  }
};
```

---

## 🔧 Implémentation (idée générique pour Copilot)

Peu importe la techno (Canvas, Sharp, CSS), l’algorithme reste le même :

1. Charger l’image produit.
2. Calculer la taille du logo :
   `logoWidth = imageWidth * (widthPct / 100)`
3. Calculer la position du centre :
   `centerX = imageWidth * (centerXPct / 100)`
   `centerY = imageHeight * (centerYPct / 100)`
4. En déduire le rectangle du logo (x, y, w, h).
5. Appliquer éventuellement :

   * rotation `rotateDeg`
   * warp cylindrique ou perspective en fonction de `warp.type`
6. Dessiner le logo sur l’image en respectant cette config.

Copilot doit :

* utiliser **`logoPlacements[product.id]`** comme **source de vérité** pour les positions de logo ;
* ne pas inventer de nouvelles règles sans mise à jour explicite de ce fichier de contexte ;
* garder la logique simple et deterministic pour qu’on puisse corriger les pourcentages au besoin.

---

## ✅ Résumé pour Copilot

* Chaque produit a un `productId` et un `LogoPlacement` associé.

* Le logo est toujours positionné en fonction de `centerXPct`, `centerYPct` et `widthPct`.

* Les règles globales :

  * textile → petit logo en haut droite
  * cylindriques → logo centré + warp cylindrique
  * plats → logo centré (ou bas gauche pour mousepad)
  * backpack → pochette du haut, centré
  * porte-clé → centré sur la plaque

* Toute implémentation doit se baser sur la map `logoPlacements` ci-dessus.

Fin du contexte.

```
::contentReference[oaicite:0]{index=0}
```
