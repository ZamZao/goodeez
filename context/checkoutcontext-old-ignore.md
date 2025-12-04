
Voici une **version mise à jour complète de `checkout_context.md`** qui :

* décrit le **flow business** (demande de devis, délais 5–6 semaines, etc.)
* définit le **formulaire** (infos client + livraison)
* spécifie la **route API `/api/checkout`** (Next.js / app router)
* explique ce que doit faire le backend (loguer la commande + envoyer un mail de confirmation)
* explique ce que doit faire le front (envoyer le payload + rediriger vers page de succès)
* NE parle plus de Make (juste éventuellement “hookable plus tard”)

À coller tel quel dans ton repo 👇

````md
# 🧾 checkout_context.md

## 🎯 Objectif du checkout

Ce fichier définit **le fonctionnement du checkout dans le portail OneStopMerch**, côté front et back.

But business du checkout :

- Permettre au client de **valider sa commande** (packs + produits)
- Récupérer toutes les **infos nécessaires** pour traiter un devis et une commande
- Envoyer un **email de confirmation** au client
- Préparer le terrain pour, plus tard, brancher de l’automatisation (Make, Stripe, etc.)

👉 **IMPORTANT :**  
Dans le MVP, il n’y a **PAS de paiement en ligne direct** dans le portail.  
Le checkout = **demande de devis / validation de commande**, pas un paiement.

---

## 🧱 Flow général

1. L’utilisateur remplit son panier (packs + produits).
2. Il clique sur **“Valider ma demande / Demander un devis”** → page `/checkout`.
3. Sur la page `/checkout` :
   - il voit un **récapitulatif lecture seule du panier**
   - il remplit un **formulaire** (infos client + livraison + remarques)
   - il voit les **délais de livraison** (5–6 semaines).
4. À la soumission du formulaire :
   - le **front** envoie un `POST` à `/api/checkout` avec un payload JSON structuré.
   - le **backend** :
     - valide les données (minimum)
     - logue ou stocke la commande (au minimum: `console.log`, plus tard DB)
     - envoie un **email de confirmation** au client
     - renvoie `{ success: true }`
5. Le front, si succès :
   - redirige vers `/checkout/success`
   - affiche un message de confirmation avec rappel des délais.

Plus tard, on pourra raccrocher cette route `/api/checkout` à Make ou autre automation, mais ce n’est pas le sujet du MVP.

---

## 📋 Contenu du formulaire de checkout (front)

Le formulaire `/checkout` doit récupérer **3 blocs principaux** :

### 🔹 A. Informations client

Champs :

- `companyName` – Nom de l’entreprise (obligatoire)
- `contactName` – Nom & prénom du contact (obligatoire)
- `email` – Email du contact (obligatoire)
- `phone` – Téléphone (optionnel)
- `department` – Service / Fonction (RH, Office Manager, etc.) (optionnel)

### 🔹 B. Informations de facturation (simples)

- `billingAddressLine1` (obligatoire)
- `billingAddressLine2` (optionnel)
- `billingPostalCode` (obligatoire)
- `billingCity` (obligatoire)
- `billingCountry` (pré-rempli à "France" par défaut)
- `billingVatNumber` ou `billingSiret` (optionnel)

### 🔹 C. Informations de livraison

Pour le MVP : **une seule adresse de livraison**.

- `shippingAddressLine1` (obligatoire)
- `shippingAddressLine2` (optionnel)
- `shippingPostalCode` (obligatoire)
- `shippingCity` (obligatoire)
- `shippingCountry` (pré-rempli "France")
- `shippingContactName` (optionnel, par défaut même que `contactName`)
- `shippingNotes` (optionnel – ex. "9h–17h", "2ème étage", etc.)

### 🔹 D. Autres champs (optionnels mais utiles)

- `desiredDeliveryDate` – Date souhaitée (indicative, champ texte/date)
- `internalReference` – Référence interne du client (optionnel)
- `additionalNotes` – Zone de texte libre pour commentaires (optionnel)

---

## ⏱️ Affichage des délais de livraison

Sur la page `/checkout`, avant le bouton de validation, afficher clairement :

> ⏱️ **Délais de production & livraison**
>
> En raison d’un volume de commandes élevé, nos délais de production et de livraison sont actuellement estimés entre **5 et 6 semaines** après validation du paiement et des visuels.
>
> Nous travaillons activement à réduire ces délais en-dessous de **3 semaines** dans les prochains mois.

Cette note doit être dans un bloc bien visible (par ex. encadré, icône d’horloge).

---

## 🧺 Récapitulatif panier dans le checkout

Sur `/checkout`, afficher un **récapitulatif lecture seule** :

- Lignes de **packs** :
  - nom du pack
  - quantité de packs
  - prix unitaire
  - total de la ligne
  - petit texte "Contient : 1x Hoodie, 1x Gourde, etc."
- Lignes de **produits** :
  - nom du produit
  - quantité
  - prix unitaire
  - total de la ligne

Afficher :

- un **total estimatif** (`estimatedTotal`) simple (sans taxes, sans livraison pour l’instant).
- un lien "Retour au panier" permettant de revenir et modifier si besoin.

Le panier ne doit pas être modifiable sur `/checkout`, uniquement en lecture.

---

## 🧮 Structure du payload envoyé au backend

Quand l’utilisateur valide le formulaire, le front doit construire un JSON de ce type et l’envoyer à `/api/checkout` :

```ts
type CheckoutPayload = {
  type: 'checkout_submission';
  submittedAt: string; // new Date().toISOString()
  customer: {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    department?: string;
  };
  billing: {
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    city: string;
    country: string;
    vatNumber?: string;
    siret?: string;
  };
  shipping: {
    addressLine1: string;
    addressLine2?: string;
    postalCode: string;
    city: string;
    country: string;
    contactName?: string;
    notes?: string;
  };
  meta: {
    desiredDeliveryDate?: string;
    internalReference?: string;
    additionalNotes?: string;
  };
  cart: {
    lines: CartLine[]; // réutiliser les types de cart du context catalogue
    currency: 'EUR';
    estimatedTotal: number;
  };
};
````

Exemple d’appel côté front :

```ts
async function submitCheckout(formValues, cart, router) {
  const payload: CheckoutPayload = {
    type: 'checkout_submission',
    submittedAt: new Date().toISOString(),
    customer: {
      companyName: formValues.companyName,
      contactName: formValues.contactName,
      email: formValues.email,
      phone: formValues.phone,
      department: formValues.department,
    },
    billing: {
      addressLine1: formValues.billingAddressLine1,
      addressLine2: formValues.billingAddressLine2,
      postalCode: formValues.billingPostalCode,
      city: formValues.billingCity,
      country: formValues.billingCountry || 'France',
      vatNumber: formValues.billingVatNumber,
      siret: formValues.billingSiret,
    },
    shipping: {
      addressLine1: formValues.shippingAddressLine1,
      addressLine2: formValues.shippingAddressLine2,
      postalCode: formValues.shippingPostalCode,
      city: formValues.shippingCity,
      country: formValues.shippingCountry || 'France',
      contactName: formValues.shippingContactName || formValues.contactName,
      notes: formValues.shippingNotes,
    },
    meta: {
      desiredDeliveryDate: formValues.desiredDeliveryDate,
      internalReference: formValues.internalReference,
      additionalNotes: formValues.additionalNotes,
    },
    cart: {
      lines: cart.lines,
      currency: 'EUR',
      estimatedTotal: cart.total,
    },
  };

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Afficher une erreur utilisateur
    return;
  }

  // Redirection vers la page de succès
  router.push('/checkout/success');
}
```

---

## 🖥️ Route backend `/api/checkout` (Next.js app router)

La route backend doit :

1. Récupérer le JSON
2. Faire une validation minimale (ex: email, companyName, cart non vide)
3. Loguer ou stocker la commande (console.log au minimum, DB plus tard)
4. Envoyer un **email de confirmation au client**
5. Retourner un JSON `{ success: true }` en cas de succès

Exemple de route `app/api/checkout/route.ts` :

```ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation minimale
    if (!body?.customer?.email || !body?.customer?.companyName) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // TODO: ajouter des validations supplémentaires si nécessaire

    // 1. Log (MVP) - plus tard: écrire en DB
    console.log('Nouvelle demande de checkout:', JSON.stringify(body, null, 2));

    // 2. Envoi de l’email de confirmation au client
    // À implémenter avec un service d’email (Nodemailer, Resend, Sendgrid…)
    // Pseudo-code :
    //
    // await sendConfirmationEmail({
    //   to: body.customer.email,
    //   subject: `[OneStopMerch] Confirmation de votre demande de devis`,
    //   templateData: {
    //     contactName: body.customer.contactName,
    //     email: body.customer.email,
    //     companyName: body.customer.companyName,
    //     estimatedTotal: body.cart.estimatedTotal,
    //     // etc.
    //   },
    // });
    //
    // Pour l’instant Copilot peut générer un stub sendConfirmationEmail().

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur route /api/checkout', error);
    return NextResponse.json(
      { error: 'Erreur interne serveur' },
      { status: 500 }
    );
  }
}
```

---

## 📧 Contenu de l’email de confirmation (back)

La fonction `sendConfirmationEmail` (à implémenter plus tard) doit envoyer un email du type :

**Sujet :**
`[OneStopMerch] Confirmation de votre demande de devis`

**Corps (exemple) :**

> Bonjour {{contactName}},
>
> Merci pour votre demande de devis sur votre portail de merch.
>
> Nous avons bien reçu votre commande pour :
>
> * {{nombrePacks}} packs
> * {{nombreProduits}} produits individuels
>
> Notre équipe va préparer un devis détaillé incluant :
>
> * le récapitulatif des articles
> * les quantités
> * le montant total
> * un lien de paiement sécurisé
>
> ⏱️ **Délais estimés** : la production et la livraison sont actuellement estimées entre **5 et 6 semaines** après validation du paiement et des visuels.
>
> Vous recevrez votre devis sous peu à l’adresse : {{email}}.
>
> Merci,
> L’équipe OneStopMerch

Pour le MVP, Copilot peut :

* créer un **stub** `sendConfirmationEmail()` qui ne fait rien ou qui log
* ou intégrer un provider simple plus tard.

---

## ✅ Page de succès `/checkout/success`

Après un POST réussi, le front doit rediriger vers `/checkout/success`.

Contenu conseillé :

> ✅ **Votre demande de devis a bien été envoyée.**
>
> Nous vous avons envoyé un email de confirmation à **{{email}}**.
> Vous recevrez votre devis détaillé ainsi qu’un lien de paiement sécurisé dans un second temps.
>
> ⏱️ **Rappel des délais estimés** :
> actuellement entre **5 et 6 semaines** après validation du paiement et des visuels.
> Nous travaillons activement à ramener ces délais en-dessous de **3 semaines**.
>
> Pour toute question, vous pouvez nous contacter à : [support@onestopmerch.com](mailto:support@onestopmerch.com)

---

## 🚫 Ce que le checkout NE DOIT PAS faire dans le MVP

* Ne pas intégrer le paiement carte directement (pas de Stripe Checkout dans le front).
* Ne pas gérer TVA complexe, frais de port automatiques, codes promo.
* Ne pas gérer multi-adresses de livraison, multi-devises.
* Ne pas permettre de modifier la composition des packs au checkout.

---

## 🎯 Rôle de Copilot avec ce contexte

Quand Copilot travaille sur le checkout :

* Créer la page `/checkout` :

  * formulaire complet (clients, facturation, livraison, notes)
  * récapitulatif panier lecture seule
  * bloc d’info sur les délais (5–6 semaines)
  * bouton “Valider ma demande” qui appelle `submitCheckout()`
* Créer la route backend `/api/checkout` comme spécifié
* Créer la page `/checkout/success`
* Prévoir un stub `sendConfirmationEmail()` pour l’email de confirmation
* Garder le code **simple, clair, minimal**, avec comme priorité :
  👉 **pouvoir traiter une vraie demande client et y répondre rapidement.**

```
```