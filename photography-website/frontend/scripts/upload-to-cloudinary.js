import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORTFOLIO_DIR = path.join(__dirname, '../public/portfolio');
const CLOUDINARY_FOLDER = 'snippets-by-tanvi'; // The root folder in Cloudinary

async function uploadFile(filePath, cloudinaryPath) {
  try {
    // Sanitize public_id: Cloudinary only likes alphanumeric, underscores, and hyphens/slashes
    const sanitizedId = cloudinaryPath
      .replace(/\s+/g, '-')
      .replace(/&/g, 'and')
      .replace(/[^a-zA-Z0-9/_-]/g, '');

    // Check if it already exists to save time
    try {
      await cloudinary.api.resource(`${CLOUDINARY_FOLDER}/${sanitizedId}`, { 
        resource_type: filePath.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image' 
      });
      console.log(`⏩ Skipping (exists): ${sanitizedId}`);
      return true;
    } catch (e) {
      // Doesn't exist, proceed to upload
    }

    const isVideo = filePath.match(/\.(mp4|webm|mov)$/i);
    
    // For videos or large files, use upload_chunked
    const uploadMethod = isVideo ? cloudinary.uploader.upload_large : cloudinary.uploader.upload;

    const result = await uploadMethod(filePath, {
      public_id: sanitizedId,
      folder: CLOUDINARY_FOLDER,
      resource_type: 'auto',
      overwrite: false,
      chunk_size: 6000000 // 6MB chunks for reliability
    });
    
    console.log(`✅ Uploaded: ${result.public_id}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error.message);
    return null;
  }
}

async function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await walkDir(filePath, callback);
    } else {
      await callback(filePath);
    }
  }
}

async function startUpload() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("Missing Cloudinary credentials in .env file!");
    return;
  }

  const dirsToUpload = [
    { local: path.join(__dirname, '../src/pages/images'), cloud: 'stories' },
    { local: path.join(__dirname, '../src/assets/custom'), cloud: 'stories' }
  ];

  console.log("🚀 Starting Cloudinary Sync...");
  
  for (const dirCfg of dirsToUpload) {
    if (!fs.existsSync(dirCfg.local)) continue;
    
    await walkDir(dirCfg.local, async (filePath) => {
      const relativePath = path.relative(dirCfg.local, filePath);
      const cloudPath = dirCfg.cloud ? `${dirCfg.cloud}/${relativePath}` : relativePath;
      
      const publicIdWithExt = cloudPath.replace(/\\/g, '/');
      const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
      
      await uploadFile(filePath, publicId);
    });
  }

  console.log("✨ All done! Your portfolio is now in the cloud.");
}

startUpload();
