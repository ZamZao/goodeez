import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { slugify } from '@/lib/utils/slugify'
import { savePortalConfig } from '@/lib/portals/savePortalConfig'
import { PortalConfig } from '@/lib/utils/types'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const companyName = formData.get('companyName') as string
    const logo = formData.get('logo') as File

    if (!companyName || !logo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug
    const slug = slugify(companyName)

    // Upload logo to Supabase Storage
    const logoBuffer = await logo.arrayBuffer()
    const logoExt = path.extname(logo.name)
    const logoFilename = `logo${logoExt}`
    const storagePath = `${slug}/${logoFilename}`

    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('portals')
      .upload(storagePath, logoBuffer, {
        contentType: logo.type,
        upsert: true
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      throw new Error('Failed to upload logo')
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('portals')
      .getPublicUrl(storagePath)

    // Create portal config
    const config: PortalConfig = {
      slug,
      name: companyName,
      logoUrl: publicUrl,
      createdAt: new Date().toISOString(),
    }

    await savePortalConfig(slug, config)

    return NextResponse.json({ slug, config })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to create portal' },
      { status: 500 }
    )
  }
}
