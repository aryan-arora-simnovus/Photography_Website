import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultTarget = path.resolve(__dirname, '..', 'public', 'portfolio');
const targetDir = process.argv[2] || defaultTarget;

if (!fs.existsSync(targetDir)) {
  console.error(`Error: Directory not found: ${targetDir}`);
  console.error(`Please provide a valid path or ensure the script is in the correct project structure.`);
  process.exit(1);
}

const supportedExts = ['.jpg', '.jpeg'];
let completed = 0;
let skipped = 0;

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      
      if (!supportedExts.includes(ext)) {
        skipped++;
        continue;
      }

      const safeName = path.basename(file, ext).replace(/\s+/g, '-').toLowerCase();
      const outputPath = path.join(dir, `${safeName}.webp`);

      try {
        await sharp(fullPath)
          .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px
          .webp({ quality: 80 })                             // Convert to optimized WebP
          .toFile(outputPath);
          
        fs.unlinkSync(fullPath); // Delete the original file

        completed++;
        console.log(`✅ Converted & removed original: ${fullPath} -> ${safeName}.webp`);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
      }
    }
  }
}

console.log(`🚀 Starting recursive optimization in: ${path.resolve(targetDir)}`);

(async () => {
  await processDirectory(targetDir);
  console.log(`\n🎉 Optimization Complete!`);
  console.log(`   Processed: ${completed}`);
  console.log(`   Skipped: ${skipped}`);
})();
