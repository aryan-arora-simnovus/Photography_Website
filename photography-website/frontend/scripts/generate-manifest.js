import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const PUBLIC_DIR = path.join(__dirname, '../public');
const PORTFOLIO_DIR = path.join(PUBLIC_DIR, 'portfolio');
const OUTPUT_FILE = path.join(__dirname, '../src/data/portfolioManifest.json');

// Ensure the portfolio directory exists
if (!fs.existsSync(PORTFOLIO_DIR)) {
  fs.mkdirSync(PORTFOLIO_DIR, { recursive: true });
  fs.mkdirSync(path.join(PORTFOLIO_DIR, 'hero'), { recursive: true });
  fs.mkdirSync(path.join(PORTFOLIO_DIR, 'featured'), { recursive: true });
  fs.mkdirSync(path.join(PORTFOLIO_DIR, 'famjam'), { recursive: true });
  fs.mkdirSync(path.join(PORTFOLIO_DIR, 'maternity'), { recursive: true });
}

// Supported extensions
const extRegex = /\.(jpg|jpeg|png|webp|gif|mp4|webm|mov)$/i;
const videoRegex = /\.(mp4|webm|mov)$/i;

const manifest = {
  hero: [],
  featured: [],
  categories: {}
};

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'dfmqkncaz';

// Helper: Sanitize paths same as the upload script
const sanitizePath = (p) => {
  return p
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/\\/g, '/')
    .replace(/[^a-zA-Z0-9/._-]/g, '');
};

// Helper: Get Cloudinary URL
const getCloudinaryUrl = (relativePath, isVideo) => {
  const sanitized = sanitizePath(relativePath);
  const resourceType = isVideo ? 'video' : 'image';
  // Note: We use the snippets-by-tanvi root folder as defined in upload script
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/v1/snippets-by-tanvi/${sanitized}`;
};

// Helper: Format a filename into a nice title
const formatTitle = (filename) => {
  return filename
    .replace(extRegex, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

// Helper: Scan a directory and return relative public URLs
const scanDir = (dirPath, relativeUrlPrefix) => {
  if (!fs.existsSync(dirPath)) return [];
  
  const results = [];
  const items = fs.readdirSync(dirPath).filter(item => !item.startsWith('.'));
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && extRegex.test(item)) {
      const isVideo = videoRegex.test(item);
      const relativePath = `${relativeUrlPrefix}/${item}`;
      results.push({
        [isVideo ? 'video' : 'image']: getCloudinaryUrl(relativePath, isVideo),
        title: formatTitle(item),
        type: isVideo ? 'video' : 'image'
      });
    }
  }
  return results;
};

// Process folders
const folders = fs.readdirSync(PORTFOLIO_DIR);

for (const folder of folders) {
  const folderPath = path.join(PORTFOLIO_DIR, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    
    // Check for hero/featured special folders
    if (folder === 'hero') {
      const scannedImages = scanDir(folderPath, folder);
      manifest.hero = scannedImages.map((img, i) => ({
        id: `h${i}`,
        image: img.image,
        title: img.title || `Beautiful Moments`,
        description: 'Capturing the magic of life with timeless elegance'
      }));
    } else if (folder === 'featured') {
      const scannedImages = scanDir(folderPath, folder);
      manifest.featured = scannedImages.map((img, i) => ({
        id: `f${i}`,
        image: img.image,
        title: img.title || `Memory ${i}`,
        creative_text: 'Where life begins'
      }));
    } else {
      // Normal Category - Scan for photos AND subdirectories (albums)
      const items = fs.readdirSync(folderPath);
      let photosInRoot = [];
      
      for (const item of items) {
        const itemPath = path.join(folderPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isFile() && extRegex.test(item)) {
          const isVideo = videoRegex.test(item);
          const relativePath = `${folder}/${item}`;
          photosInRoot.push({
            id: `${folder}-${photosInRoot.length}`,
            [isVideo ? 'video' : 'image']: getCloudinaryUrl(relativePath, isVideo),
            title: formatTitle(item),
            type: isVideo ? 'video' : 'image'
          });
        } else if (stat.isDirectory()) {
          // It's an album!
          const albumPhotos = scanDir(itemPath, `${folder}/${item}`);
          manifest.categories[`${folder}/${item}`] = albumPhotos.map((img, i) => ({
            id: `${folder}-${item}-${i}`,
            image: img.image,
            title: img.title
          }));
        }
      }
      
      // Still allow loose photos in the category root
      if (photosInRoot.length > 0) {
        manifest.categories[folder] = photosInRoot;
      }
    }
  }
}

// Write to src/data
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

console.log(`📸 Successfully generated portfolio manifest!`);
console.log(`   Found ${manifest.hero.length} hero images`);
console.log(`   Found ${manifest.featured.length} featured images`);
console.log(`   Found ${Object.keys(manifest.categories).length} content categories`);
