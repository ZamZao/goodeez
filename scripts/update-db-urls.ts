import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({ path: '.env.local', override: true })

// Force use of Direct URL for this script to avoid pooler issues
if (process.env.DIRECT_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.DIRECT_DATABASE_URL
}

console.log('Using DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@')) // Log masked URL

const prisma = new PrismaClient()

async function updateDbUrls() {
  console.log('🚀 Starting DB URL update...')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing')
    process.exit(1)
  }

  const storageBaseUrl = `${supabaseUrl}/storage/v1/object/public/portals`

  const tenants = await prisma.tenant.findMany()
  console.log(`Found ${tenants.length} tenants.`)

  for (const tenant of tenants) {
    if (tenant.logoUrl && tenant.logoUrl.startsWith('/portals/')) {
      // Remove leading /portals/
      const relativePath = tenant.logoUrl.replace('/portals/', '')
      const newUrl = `${storageBaseUrl}/${relativePath}`

      console.log(`Updating ${tenant.slug}: ${tenant.logoUrl} -> ${newUrl}`)

      await prisma.tenant.update({
        where: { id: tenant.id },
        data: { logoUrl: newUrl }
      })
    } else {
      console.log(`Skipping ${tenant.slug} (already updated or invalid): ${tenant.logoUrl}`)
    }
  }

  console.log('✅ DB URL update completed!')
}

updateDbUrls()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
