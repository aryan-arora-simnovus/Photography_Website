import React, { useEffect, useState, useRef } from 'react';
import LazyImage from '@/components/common/LazyImage';

/**
 * PhotoOfTheDay — A persistent floating card in the bottom-right corner
 * that showcases a featured photo with a glassmorphic frame and pulsing glow.
 * Minimizable. Auto-cycles through photos.
 */
const PhotoOfTheDay = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef(null);

  // Load photos from manifest
  useEffect(() => {
    const load = async () => {
      try {
        const mod = await import('../../data/portfolioManifest.json');
        const manifest = mod.default || mod;
        const allPhotos = [];
        
        Object.entries(manifest.categories || {}).forEach(([cat, arr]) => {
          if (Array.isArray(arr)) {
            // Pick 1 photo from each category
            const mid = Math.floor(arr.length / 2);
            if (arr[mid]) allPhotos.push({ ...arr[mid], categoryName: cat });
          }
        });

        setPhotos(allPhotos);
        
        // Show after a delay for non-intrusive entrance
        setTimeout(() => setIsLoaded(true), 3000);
      } catch (err) {
        console.error('PhotoOfTheDay: Error loading', err);
      }
    };
    load();
  }, []);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    if (photos.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 8000);
    return () => clearInterval(timerRef.current);
  }, [photos]);

  // Don't show if dismissed or no photos
  if (isDismissed || photos.length === 0 || !isLoaded) return null;

  // Check session storage to not annoy returning visitors
  if (typeof window !== 'undefined' && sessionStorage.getItem('potd-dismissed')) return null;

  const currentPhoto = photos[currentIndex];
  const categoryLabel = currentPhoto?.categoryName
    ?.split('/')[0]
    ?.replace(/[_-]/g, ' ')
    ?.replace(/\b\w/g, c => c.toUpperCase()) || 'Featured';

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('potd-dismissed', 'true');
  };

  return (
    <div
      className={`fixed z-40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isMinimized
          ? 'bottom-4 right-4 w-14 h-14'
          : 'bottom-6 right-6 w-64'
      }`}
      style={{
        animation: 'potdSlideIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
      }}
    >
      {isMinimized ? (
        /* Minimized state — small pulsing orb */
        <button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 relative group"
        >
          <LazyImage
            src={currentPhoto?.image}
            alt="Photo of the day"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
          {/* Pulsing ring */}
          <div className="absolute -inset-1 rounded-full border border-nature-moss/50 animate-ping opacity-30" />
        </button>
      ) : (
        /* Full card */
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-nature-sage/10">
          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-nature-moss/10 blur-3xl rounded-full -z-10 animate-pulse" />

          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <LazyImage
              src={currentPhoto?.image}
              alt={currentPhoto?.title || 'Photo of the day'}
              className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all text-xs"
                title="Minimize"
              >
                —
              </button>
              <button
                onClick={handleDismiss}
                className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all text-xs"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-nature-sage animate-pulse" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-bold">
                  Photo of the Day
                </span>
              </div>
              <p className="text-white text-sm font-serif font-light leading-snug">
                A moment worth remembering
              </p>
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">{categoryLabel}</p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-1 py-2 bg-black/20">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentIndex ? 'w-4 bg-white/60' : 'w-1 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes potdSlideIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoOfTheDay;
