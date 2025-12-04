# 🧾 checkout_context.md

## 🎯 Objectif du checkout

Ce fichier définit **le fonctionnement du checkout dans le portail OneStopMerch**.

**Changement majeur :** Le traitement de la commande est délégué à un système externe via un **Webhook sécurisé**.

But business du checkout :
- Permettre au client de **valider sa commande** (packs + produits).
- Récupérer toutes les **infos nécessaires** pour le fulfillment (livraison, contact, contenu).
- Transmettre ces données de manière **sécurisée** à un webhook d automation (ex: Make, n8n, Zapier).

👉 **IMPORTANT :**
Le backend Next.js agit comme un **proxy sécurisé**. Le frontend ne connaît jamais l URL du webhook ni le secret.

---

## 🧱 Flow général

1. **Front** : L utilisateur remplit son panier et le formulaire de checkout.
2. **Front** : Soumission du formulaire → `POST /api/checkout`.
3. **Back (`/api/checkout`)** :
   - Valide les données entrantes.
   - Construit un payload complet (Order Name, Order Number, Client Data, Items, Fulfillment info).
   - Ajoute une couche de sécurité (Header `x-webhook-secret`).
   - Envoie le payload au **Webhook URL** (défini en variable d environnement).
4. **Back** : Si le webhook répond 200 OK, renvoie `{ success: true }` au front.
5. **Front** : Redirige l utilisateur vers `/checkout/success`.

---

## 🔒 Sécurité & Architecture

Pour empêcher que "n importe qui" n envoie des données sur le webhook :

1. **Masquage de l URL** : L URL du webhook (`CHECKOUT_WEBHOOK_URL`) est stockée côté serveur (env var). Elle n est jamais exposée au client.
2. **Authentification du Webhook** :
   - Le backend envoie un header secret : `x-webhook-secret: <CHECKOUT_WEBHOOK_SECRET>`.
   - Le système de réception (Make/n8n) doit vérifier ce header pour accepter la requête.
3. **Validation** : L API `/api/checkout` doit valider strictement le format des données avant de les transmettre.

---

## 🖥️ Frontend : Page Checkout

### 1. Récapitulatif Panier (Lecture Seule)
Sur `/checkout`, afficher un récapitulatif non modifiable :
- **Packs** : Nom, quantité, prix unitaire, total ligne. Petit texte "Contient : 1x Hoodie, 1x Gourde...".
- **Produits** : Nom, quantité, prix unitaire, total ligne.
- **Total** : Total estimatif (HT).
- **Navigation** : Lien "Retour au panier" pour modifier.

### 2. Affichage des délais
Avant le bouton de validation, afficher clairement :
> ⏱️ **Délais de production & livraison**
>
> En raison d’un volume de commandes élevé, nos délais de production et de livraison sont actuellement estimés entre **5 et 6 semaines** après validation du paiement et des visuels.
>
> Nous travaillons activement à réduire ces délais en-dessous de **3 semaines** dans les prochains mois.

### 3. Formulaire de Checkout
Le formulaire doit récupérer les blocs suivants :

**A. Informations client**
- `companyName` (obligatoire)
- `contactName` (obligatoire)
- `email` (obligatoire)
- `phone` (optionnel)
- `department` (optionnel)

**B. Informations de facturation**
- `billingAddressLine1` (obligatoire)
- `billingAddressLine2` (optionnel)
- `billingPostalCode` (obligatoire)
- `billingCity` (obligatoire)
- `billingCountry` (défaut "France")
- `billingVatNumber` ou `billingSiret` (optionnel)

**C. Informations de livraison**
- `shippingAddressLine1` (obligatoire)
- `shippingAddressLine2` (optionnel)
- `shippingPostalCode` (obligatoire)
- `shippingCity` (obligatoire)
- `shippingCountry` (défaut "France")
- `shippingContactName` (optionnel, défaut = contact principal)
- `shippingNotes` (optionnel - ex: digicode)

**D. Meta**
- `desiredDeliveryDate` (indicatif)
- `internalReference` (optionnel)
- `additionalNotes` (optionnel)

---

## 📦 Backend : Structure du Payload Webhook

Le backend doit enrichir les données du front pour créer un objet "Order" complet envoyé au Webhook.

**Format JSON envoyé au Webhook :**

```json
{
  "security": {
    "source": "onestopmerch-portal",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  "order": {
    "id": "ORD-1703671200-A1B2", // Généré par le back
    "status": "pending_quote",
    "createdAt": "2023-10-27T10:00:00Z",
    "tenantId": "demo"
  },
  "customer": {
    "companyName": "ACME Corp",
    "contactName": "John Doe",
    "email": "john@acme.com",
    "phone": "+33612345678",
    "department": "HR"
  },
  "fulfillment": {
    "shippingAddress": {
      "line1": "...",
      "city": "...",
      "country": "..."
    },
    "billingAddress": {
      "line1": "...",
      "city": "...",
      "country": "..."
    },
    "desiredDeliveryDate": "2023-12-01"
  },
  "items": [
    {
      "type": "pack",
      "id": "onboarding-classic",
      "name": "Pack Onboarding Classique",
      "quantity": 10,
      "unitPrice": 85,
      "totalPrice": 850,
      "details": [ // Détail du contenu pour le fulfillment
        { "productId": "hoodie-basic", "quantity": 1 },
        { "productId": "mug-basic", "quantity": 1 }
      ]
    }
  ],
  "totals": {
    "subtotal": 1450,
    "currency": "EUR"
  }
}
```

---

## 🛠️ Implémentation Technique (Backend)

### 1. Variables d environnement
Ajouter dans `.env.local` :
```bash
CHECKOUT_WEBHOOK_URL=https://hook.eu1.make.com/...
CHECKOUT_WEBHOOK_SECRET=votre_secret_super_securise
```

### 2. Route API (`src/app/api/checkout/route.ts`)

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validation basique
    if (!body.cart || !body.customer) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // 2. Construction du payload enrichi
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const webhookPayload = {
      security: {
        source: "onestopmerch-portal",
        timestamp: new Date().toISOString()
      },
      order: {
        id: orderId,
        status: "pending_quote",
        createdAt: new Date().toISOString(),
        tenantId: body.tenantId || "unknown"
      },
      customer: body.customer,
      fulfillment: {
        shippingAddress: body.shipping,
        billingAddress: body.billing,
        desiredDeliveryDate: body.meta?.desiredDeliveryDate
      },
      items: body.cart.lines.map((line: any) => ({
        type: line.type,
        id: line.type === "pack" ? line.packId : line.productId,
        name: line.product.name,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        totalPrice: line.unitPrice * line.quantity,
        details: line.type === "pack" ? line.items : undefined
      })),
      totals: {
        subtotal: body.cart.estimatedTotal,
        currency: "EUR"
      }
    };

    // 3. Envoi au Webhook
    const webhookUrl = process.env.CHECKOUT_WEBHOOK_URL;
    const webhookSecret = process.env.CHECKOUT_WEBHOOK_SECRET;

    if (!webhookUrl) {
      console.log("Mock Webhook Payload:", JSON.stringify(webhookPayload, null, 2));
      return NextResponse.json({ success: true, mock: true, orderId });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": webhookSecret || "",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, orderId });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

---

## 🤖 Automation (Webhook Logic)

C est le **Webhook** (Make/Zapier) qui est responsable de la suite :
1. Enregistrer la commande dans un Airtable/Google Sheets.
2. **Envoyer l email de confirmation** au client.

**Modèle d email à utiliser par l automation :**
> Sujet : [OneStopMerch] Confirmation de votre demande de devis
>
> Bonjour {{contactName}},
>
> Merci pour votre demande de devis. Nous avons bien reçu votre commande pour :
> * {{nombrePacks}} packs
> * {{nombreProduits}} produits individuels
>
> Notre équipe va préparer un devis détaillé incluant le récapitulatif, le montant total et un lien de paiement.
>
> ⏱️ **Délais estimés** : 5 à 6 semaines après validation.
>
> Vous recevrez votre devis sous peu à : {{email}}.
>
> Merci,
> L équipe OneStopMerch

---

## ✅ Frontend : Page de Succès

Après redirection vers `/checkout/success`, afficher :

> ✅ **Votre demande de devis a bien été envoyée.**
>
> Nous vous avons envoyé un email de confirmation à **{{email}}**.
> Vous recevrez votre devis détaillé ainsi qu’un lien de paiement sécurisé dans un second temps.
>
> ⏱️ **Rappel des délais estimés** :
> actuellement entre **5 et 6 semaines** après validation du paiement et des visuels.
>
> Pour toute question : [support@onestopmerch.com](mailto:support@onestopmerch.com)

---

## 🚫 Ce que le checkout NE DOIT PAS faire (MVP)

* Pas de paiement direct (Stripe Checkout) dans le front.
* Pas de calcul complexe de TVA ou frais de port en temps réel.
* Pas de gestion multi-adresses ou multi-devises.
* Pas de modification de la composition des packs au checkout.
