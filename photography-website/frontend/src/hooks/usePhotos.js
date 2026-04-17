import { useState, useEffect, useMemo } from 'react';
// Trigger HMR 2

export const usePhotos = (filters = {}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    // Basic dynamic import to fetch latest manifest
    let isMounted = true;
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        // We append a query string to avoid strict caching during local dev if needed,
        // but dynamic imports of JSON inside Vite usually hot-reload perfectly.
        const manifestModule = await import(`../data/portfolioManifest.json`);
        const manifest = manifestModule.default || manifestModule;

        if (!isMounted) return;

        if (filters.category) {
          const folder = filters.album ? `${filters.category}/${filters.album}` : filters.category;
          setPhotos(manifest.categories[folder] || []);
        } else if (filters.is_featured) {
          setPhotos(manifest.featured || []);
        } else {
          setPhotos([]);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPhotos();
    return () => { isMounted = false; };
  }, [filterKey]);

  return { photos, loading, error, setPhotos };
};

export const useHeroPhotos = () => {
  const [heroPhotos, setHeroPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHeroPhotos = async () => {
      try {
        const manifestModule = await import(`../data/portfolioManifest.json`);
        const manifest = manifestModule.default || manifestModule;
        
        if (isMounted) setHeroPhotos(manifest.hero || []);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHeroPhotos();
    return () => { isMounted = false; };
  }, []);

  return { heroPhotos, loading, error };
};

export const useCategories = () => {
  // Aligned with Header.jsx slugs
  const staticCategories = [
    { title: 'Baby Blossom', slug: 'maternity' },
    { title: 'Lifestyle Family Shoots', slug: 'lifestyle-family-shoots' },
    { title: 'Pre-Wedding Sessions', slug: 'prewedding', has_no_albums: true },
    { title: 'Studio Sessions', slug: 'studio' },
    { title: 'Big Fam Jam', slug: 'famjam', has_no_albums: true },
    { title: 'Event Photography', slug: 'event', has_no_albums: true },
    { title: 'Commercial Shoots', slug: 'commercial' }
  ];

  const [categories, setCategories] = useState(staticCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return { categories, loading, error };
};

export const useAlbums = (categorySlug) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const manifestModule = await import(`../data/portfolioManifest.json`);
        const manifest = manifestModule.default || manifestModule;
        
        if (!isMounted) return;

        // Find all categories that start with `${categorySlug}/`
        const albumKeys = Object.keys(manifest.categories).filter(k => 
          k.startsWith(`${categorySlug}/`)
        );

        const albumData = albumKeys.map(key => {
          const photos = manifest.categories[key];
          const albumName = key.split('/').slice(1).join('/'); 
          
          return {
            id: key,
            slug: albumName,
            client_name: albumName.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            thumbnail_url: photos[0]?.image, 
            photo_count: photos.length,
            session_date: new Date().toISOString(),
            location: 'Session Gallery',
            description: `A beautiful ${categorySlug} session capturing timeless moments.`
          };
        });

        setAlbums(albumData);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAlbums();
    return () => { isMounted = false; };
  }, [categorySlug]);

  return { albums, loading, error };
};
