// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

// Photos under these folders were also uploaded to Cloudinary by scripts/upload-to-cloudinary.js,
// as snippets-by-tanvi/stories/<path inside the folder>. Importing one of them yields its Cloudinary
// URL instead of bundling the original, so LazyImage can serve it resized and as AVIF/WebP.
// Only files checked to match their Cloudinary copy byte for byte (src/data/cloudinaryUploads.json)
// are swapped; anything else, such as a photo added later and not uploaded yet, is bundled as usual.
const CLOUDINARY_STORIES = 'https://res.cloudinary.com/dfmqkncaz/image/upload/v1/snippets-by-tanvi/stories/';
const UPLOADED_ROOTS = ['src/pages/images', 'src/assets/custom'].map((dir) => path.resolve(__dirname, dir) + path.sep);

function cloudinaryPhotos() {
  const uploaded = new Set(
    JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/cloudinaryUploads.json'), 'utf8')),
  );
  return {
    name: 'cloudinary-photos',
    enforce: 'pre',
    load(id) {
      const file = id.split('?')[0];
      const root = UPLOADED_ROOTS.find((dir) => file.startsWith(dir));
      if (!root) return null;
      const rel = file.slice(root.length).split(path.sep).join('/');
      return uploaded.has(rel) ? `export default ${JSON.stringify(CLOUDINARY_STORIES + rel)};` : null;
    },
  };
}

export default defineConfig({
  plugins: [cloudinaryPhotos(), react()],
  base: process.env.VITE_BASE_PATH || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // global: {}, // removed mapbox-gl leftover
  },
  // optimizeDeps removed mapbox-gl
});
