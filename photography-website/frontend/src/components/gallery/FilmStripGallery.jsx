import React, { useRef, useEffect, useState } from 'react';
import LazyImage from '@/components/common/LazyImage';

/**
 * FilmStripGallery — A horizontal-scrolling film-strip section.
 * Photos presented as 35mm film frames with sprocket holes and frame numbers.
 * Mouse wheel scrolls horizontally. Includes vintage film grain overlay.
 */
const FilmStripGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Load a diverse sample of photos from all categories
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const manifestModule = await import('../../data/portfolioManifest.json');
        const manifest = manifestModule.default || manifestModule;
        
        // Use only featured images for the film roll as requested
        const featuredPhotos = manifest.featured || [];
        
        // Shuffle for visual variety if there are many, but usually we'll have 20-25
        const shuffled = [...featuredPhotos].sort(() => Math.random() - 0.5);

        setPhotos(shuffled);
      } catch (err) {
        console.error('FilmStrip: Error loading photos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Horizontal scroll on mouse wheel
  useEffect(() => {
    const el = stripRef.current;
    if (!el || photos.length === 0) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 2;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [photos]);

  // Auto-scroll animation when not hovering
  useEffect(() => {
    const el = stripRef.current;
    if (!el || isHovering || photos.length === 0) return;

    let animId;
    const autoScroll = () => {
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(autoScroll);
    };
    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, [isHovering, photos]);

  if (loading || photos.length === 0) return null;

  // Double the photos for seamless loop feel
  const filmPhotos = [...photos, ...photos.slice(0, Math.min(4, photos.length))];

  return (
    <section className="film-strip-section py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Film grain overlay — CSS noise */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")'}}></div>
      
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12 relative z-20">
        <div className="flex items-center gap-4 justify-center">
          <div className="h-[1px] w-16 bg-amber-500/30"></div>
          <span className="text-[10px] tracking-[0.6em] uppercase text-amber-500/70 font-bold">
            The Film Roll
          </span>
          <div className="h-[1px] w-16 bg-amber-500/30"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-extralight text-white text-center mt-6 tracking-tight">
          Uncut Moments
        </h2>
        <p className="text-center text-white/40 text-sm mt-4 italic">
          Scroll horizontally to explore the reel
        </p>
      </div>

      {/* Film strip container */}
      <div
        ref={stripRef}
        className="film-strip-scroll relative z-20 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex items-center py-8" style={{ width: 'max-content' }}>
          {/* Left padding */}
          <div className="w-12 shrink-0"></div>

          {filmPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="film-frame group relative shrink-0 mx-2"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Film frame container */}
              <div className="relative bg-[#111] rounded-sm overflow-hidden shadow-2xl"
                style={{ width: '320px' }}
              >
                {/* Top sprocket holes */}
                <div className="flex justify-between items-center px-3 py-2 bg-[#0a0a0a]">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`top-${i}`}
                      className="w-3 h-2 rounded-sm bg-[#1a1a1a] border border-[#333]"
                    ></div>
                  ))}
                </div>

                {/* Photo area with 35mm border */}
                <div className="relative mx-3 my-1">
                  <div className="relative overflow-hidden rounded-[2px] bg-[#222]"
                    style={{ aspectRatio: '3/2' }}
                  >
                    <LazyImage
                      src={photo.image}
                      alt={photo.title || `Frame ${index + 1}`}
                      className="w-full h-full object-cover object-[center_25%] transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />
                    
                    {/* Vintage warm overlay on hover */}
                    <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-500"></div>
                    
                    {/* Corner frame marks */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20"></div>
                  </div>
                </div>

                {/* Bottom sprocket holes + frame number */}
                <div className="flex justify-between items-center px-3 py-2 bg-[#0a0a0a]">
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`bot-l-${i}`}
                        className="w-3 h-2 rounded-sm bg-[#1a1a1a] border border-[#333]"
                      ></div>
                    ))}
                  </div>
                  
                  {/* Frame number — Kodak style */}
                  <span className="text-[9px] font-mono text-amber-500/50 tracking-wider">
                    {String(index + 1).padStart(2, '0')}A
                  </span>

                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`bot-r-${i}`}
                        className="w-3 h-2 rounded-sm bg-[#1a1a1a] border border-[#333]"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Photo title hidden as requested */}
            </div>
          ))}

          {/* Right padding */}
          <div className="w-12 shrink-0"></div>
        </div>
      </div>

      {/* Film brand watermark */}
      <div className="container mx-auto px-4 mt-8 relative z-20">
        <div className="flex justify-between items-center opacity-20">
          <span className="text-[8px] tracking-[0.5em] uppercase text-amber-500 font-mono">
            Snippets 400
          </span>
          <span className="text-[8px] tracking-[0.5em] uppercase text-amber-500 font-mono">
            Tanvi • Surat
          </span>
          <span className="text-[8px] tracking-[0.5em] uppercase text-amber-500 font-mono">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <style>{`
        .film-strip-scroll::-webkit-scrollbar {
          display: none;
        }
        .film-frame {
          animation: filmReveal 0.8s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes filmReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default FilmStripGallery;
