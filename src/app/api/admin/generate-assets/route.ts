import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { image, tenantId, productId, type } = await request.json();

    if (!image || !tenantId || !productId) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Remove header of base64 string
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Optimize image with Sharp
    const optimizedBuffer = await sharp(buffer)
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();

    // Define path based on type
    // Default to 'catalog' if type is 'product' or undefined, 'packs' if type is 'pack'
    let subfolder = 'catalog';
    if (type === 'pack') subfolder = 'packs';
    if (type === 'collection') subfolder = 'collections';

    const filename = `${productId}.png`;
    // Path structure: tenantId/products/subfolder/filename
    const storagePath = `${tenantId}/products/${subfolder}/${filename}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('portals')
      .upload(storagePath, optimizedBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error('Failed to upload image');
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('portals')
      .getPublicUrl(storagePath);

    // Return the public URL with a timestamp to bust cache
    const finalUrl = `${publicUrl}?t=${Date.now()}`;

    return NextResponse.json({ success: true, url: finalUrl });

  } catch (error) {
    console.error('Asset Generation Error:', error);
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
  }
}
