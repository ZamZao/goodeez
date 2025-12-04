import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)
const BUCKET_NAME = 'portals'
const LOCAL_DIR = path.join(process.cwd(), 'public', 'portals')

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  }))
  return Array.prototype.concat(...files)
}

async function seedStorage() {
  console.log(`🚀 Starting storage seed from ${LOCAL_DIR}...`)

  if (!fs.existsSync(LOCAL_DIR)) {
    console.error(`❌ Directory ${LOCAL_DIR} does not exist.`)
    return
  }

  // Ensure bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  if (listError) {
    console.error('❌ Failed to list buckets:', listError.message)
    return
  }

  const bucketExists = buckets.find(b => b.name === BUCKET_NAME)
  if (!bucketExists) {
    console.log(`Bucket '${BUCKET_NAME}' not found. Creating it...`)
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true
    })
    if (createError) {
      console.error(`❌ Failed to create bucket '${BUCKET_NAME}':`, createError.message)
      return
    }
    console.log(`✅ Bucket '${BUCKET_NAME}' created successfully.`)
  } else {
    console.log(`✅ Bucket '${BUCKET_NAME}' exists.`)
  }

  const files = await getFiles(LOCAL_DIR)
  console.log(`Found ${files.length} files to upload.`)

  let successCount = 0
  let errorCount = 0

  for (const filePath of files) {
    // Calculate relative path for storage (e.g., "demo/logo.png")
    const relativePath = path.relative(LOCAL_DIR, filePath)
    // Normalize path separators for storage (always forward slashes)
    const storagePath = relativePath.split(path.sep).join('/')

    // Skip system files
    if (storagePath.includes('.DS_Store')) continue

    try {
      const fileBuffer = await fs.promises.readFile(filePath)
      
      // Determine content type (basic)
      let contentType = 'application/octet-stream'
      if (storagePath.endsWith('.png')) contentType = 'image/png'
      if (storagePath.endsWith('.jpg') || storagePath.endsWith('.jpeg')) contentType = 'image/jpeg'
      if (storagePath.endsWith('.svg')) contentType = 'image/svg+xml'
      if (storagePath.endsWith('.json')) contentType = 'application/json'

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType,
          upsert: true
        })

      if (error) {
        console.error(`❌ Failed to upload ${storagePath}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Uploaded: ${storagePath}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Error processing ${storagePath}:`, err)
      errorCount++
    }
  }

  console.log(`\n🏁 Storage seed completed!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

seedStorage()
