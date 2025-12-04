const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.join(__dirname, '../public/products');

// Configuration for compression
const QUALITY = 80;

async function optimizeImages(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await optimizeImages(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        await processImage(filePath, ext);
      }
    }
  }
}

async function processImage(filePath, ext) {
  try {
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;
    let pipeline = sharp(originalBuffer);

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: QUALITY });
    }

    const optimizedBuffer = await pipeline.toBuffer();
    const optimizedSize = optimizedBuffer.length;

    if (optimizedSize < originalSize) {
      fs.writeFileSync(filePath, optimizedBuffer);
      const saved = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      console.log(`✅ Optimized: ${path.relative(process.cwd(), filePath)} (-${saved}%)`);
    } else {
      console.log(`⏭️  Skipped: ${path.relative(process.cwd(), filePath)} (already optimized)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log('🚀 Starting image optimization...');
optimizeImages(TARGET_DIR).then(() => {
  console.log('✨ Image optimization complete!');
});
