import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation basique
    if (!body.cart || !body.customer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.CHECKOUT_WEBHOOK_URL;
    const webhookSecret = process.env.CHECKOUT_WEBHOOK_SECRET;

    if (!webhookUrl) {
      console.error("CHECKOUT_WEBHOOK_URL is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Génération d un ID de commande simple
    const orderId = `CMD-${Date.now().toString(36).toUpperCase()}`;

    // Construction du payload enrichi
    const payload = {
      security: {
        source: "portal-checkout",
        timestamp: new Date().toISOString(),
        // AJOUT ICI : Le secret est maintenant dans le body pour être visible dans Make
        verificationToken: webhookSecret 
      },
      order: {
        id: orderId,
        status: "pending_quote",
        tenantId: body.tenantId || "demo",
        createdAt: new Date().toISOString(),
      },
      customer: body.customer,
      fulfillment: {
        shipping: body.shipping,
        billing: body.billing,
        delivery: {
          desiredDate: body.meta?.desiredDeliveryDate,
          notes: body.meta?.additionalNotes,
          internalRef: body.meta?.internalReference
        }
      },
      items: body.cart.lines.map((line: any) => ({
        type: line.type,
        description: line.type === "pack" 
          ? `${line.quantity}x PACK: ${line.product.name}` 
          : `${line.quantity}x ${line.product.name}`,
        quantity: line.quantity,
        sku: line.type === "pack" ? line.packId : line.productId,
        unitPrice: line.unitPrice,
        totalPrice: line.unitPrice * line.quantity,
        details: line // On garde tout le détail technique si besoin
      })),
      meta: {
        totalEstimated: body.cart.estimatedTotal,
        currency: "EUR"
      }
    };

    // Envoi au Webhook Make
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": webhookSecret || "", // On le garde aussi en header au cas où
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, orderId });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
