import { NextRequest, NextResponse } from 'next/server'
import { Order, CartItem, CustomerInfo } from '@/lib/utils/types'
import { saveOrderLocal } from '@/lib/orders/saveOrderLocal'

interface OrderRequest {
  tenant: string
  customer: CustomerInfo
  items: CartItem[]
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json()
    const { tenant, customer, items, total } = body

    if (!tenant || !customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `${tenant}-${Date.now()}-${Math.random().toString(36).substring(7)}`

    // Create order object
    const order: Order = {
      id: orderId,
      tenant,
      orderDate: new Date().toISOString(),
      customer,
      items,
      total,
      status: 'pending',
    }

    // Save order to local file system
    await saveOrderLocal(order)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order placed successfully',
    })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
