import { prisma } from '@/lib/prisma'
import { Order } from '@/lib/utils/types'

export async function saveOrderLocal(order: Order): Promise<void> {
  try {
    // Find the tenant ID from the slug
    const tenant = await prisma.tenant.findUnique({ where: { slug: order.tenant } })
    
    // If tenant doesn't exist in DB (e.g. legacy local tenant), we might fail or need a fallback.
    // For now, let's assume all tenants are in DB or we fail.
    if (!tenant) {
      console.error(`Tenant not found in database: ${order.tenant}`)
      // Fallback to local file save if tenant not found in DB? 
      // Or just throw. The user wants to use DB.
      throw new Error(`Tenant not found: ${order.tenant}`)
    }

    await prisma.order.create({
      data: {
        id: order.id,
        tenantId: tenant.id,
        orderDate: new Date(order.orderDate),
        status: order.status,
        total: order.total,
        customerFirstName: order.customer.firstName,
        customerLastName: order.customer.lastName,
        customerEmail: order.customer.email,
        customerCompany: order.customer.company,
        customerDepartment: order.customer.department,
        customerPhone: order.customer.phone,
        items: {
          create: order.items.map((item: any) => ({
            type: item.product.category === 'Pack' ? 'pack' : 'product',
            itemId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.price
          }))
        }
      }
    })
  } catch (error) {
    console.error('Failed to save order to database:', error)
    throw error
  }
}
