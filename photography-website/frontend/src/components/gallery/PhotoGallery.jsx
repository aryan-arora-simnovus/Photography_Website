// frontend/src/components/gallery/PhotoGallery.jsx
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import FavoriteButton from '@/components/common/FavoriteButton';
import DownloadButton from '@/components/common/DownloadButton';
import ShareButton from '@/components/common/ShareButton';
import LazyImage from '@/components/common/LazyImage';

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  480: 1,
};

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-serif text-gray-600 mb-2">No photos to display</h3>
        <p className="text-gray-500">Check back soon for new photos!</p>
      </div>
    );
  }

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedPhoto(null);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <>
      {/* Modern Raw Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {photos.map((photo, idx) => (
          <div 
            key={photo.id || idx} 
            className="masonry-item mb-4 overflow-hidden cursor-zoom-in relative group"
            onClick={() => openLightbox(photo, idx)}
          >
            {photo.type === 'video' || photo.video ? (
              <video
                src={photo.video || photo.image}
                className="w-full h-auto transition-all duration-300 group-hover:brightness-110"
                muted
                playsInline
                loop
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
              />
            ) : (
              <LazyImage
                src={photo.image}
                alt={photo.alt_text || photo.title}
                className="w-full h-auto transition-all duration-300 group-hover:brightness-110"
              />
            )}
            
            {/* Minimal hover overlay for videos to show play icon */}
            {(photo.type === 'video' || photo.video) && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="text-white w-12 h-12 fill-white/20" />
              </div>
            )}

            {/* Minimal hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300"></div>
          </div>
        ))}
      </Masonry>

      {/* The Ambient "Deep Canvas" Lightbox */}
      <Dialog open={!!selectedPhoto} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-nature-forest border-none rounded-none overflow-hidden z-[100]">
          <div className="relative w-full h-full flex items-center justify-center group/lightbox overflow-hidden">
            
            <VisuallyHidden>
              <DialogTitle className="sr-only">Studio Viewer</DialogTitle>
            </VisuallyHidden>

            {/* Layer 1: Color-Adaptive Ambient Background */}
            <div className="absolute inset-0 z-0">
               {selectedPhoto && (
                 <img 
                   src={selectedPhoto.image} 
                   alt="" 
                   className="w-full h-full object-cover filter blur-[100px] brightness-[0.4] saturate-[1.5] scale-125 transition-all duration-[2s]"
                 />
               )}
               <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Layer 2: Film Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay"></div>

            {/* Top Bar: Aesthetic Controls */}
            <div className="absolute top-0 inset-x-0 p-12 flex justify-between items-center z-50">
               <div className="h-[1px] w-24 bg-white/10"></div>
               <button
                 onClick={closeLightbox}
                 className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 text-white/40 hover:text-white transition-all duration-500 hover:rotate-90 group/close bg-black/5 backdrop-blur-md"
               >
                 <X className="h-5 w-5 stroke-[1.5px]" />
               </button>
               <div className="h-[1px] w-24 bg-white/10"></div>
            </div>

            {/* Side Navigation - Hits areas with elegant indicators */}
            {photos.length > 1 && (
              <>
                <button 
                  className="absolute left-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 flex items-center justify-center rounded-full border border-white/0 hover:border-white/20 text-white/0 hover:text-white/60 transition-all duration-700 bg-white/0 hover:bg-white/5 backdrop-blur-sm"
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                >
                   <ChevronLeft className="h-6 w-6 stroke-[1px]" />
                </button>
                <button 
                  className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 flex items-center justify-center rounded-full border border-white/0 hover:border-white/20 text-white/0 hover:text-white/60 transition-all duration-700 bg-white/0 hover:bg-white/5 backdrop-blur-sm"
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                >
                   <ChevronRight className="h-6 w-6 stroke-[1px]" />
                </button>
              </>
            )}

            {/* Main Content Portrayal */}
            <div className="relative z-20 w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-20">
              {selectedPhoto && (
                <div className="relative animate-in fade-in zoom-in-95 duration-1000 ease-out flex items-center justify-center w-full h-full">
                  {/* The Print Border Effect */}
                  <div className="absolute -inset-1 border border-white/5 rounded-sm"></div>
                  
                  {selectedPhoto.type === 'video' || selectedPhoto.video ? (
                    <video
                      src={selectedPhoto.video || selectedPhoto.image}
                      controls
                      autoPlay
                      className="max-h-[80vh] max-w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[6px] md:border-[12px] border-white/5"
                    />
                  ) : (
                    <img
                      src={selectedPhoto.image}
                      alt=""
                      className="max-h-[80vh] max-w-full object-contain shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[6px] md:border-[12px] border-white/5"
                    />
                  )}
                  
                  {/* Corner Accent Branding */}
                  <div className="absolute -bottom-2 -right-2 text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold rotate-90 origin-left translate-x-full">
                     Snippets by Tanvi
                  </div>
                </div>
              )}
            </div>

            {/* Modern Pagination Dots */}
            <div className="absolute bottom-12 flex gap-3 z-50">
               {photos.length > 1 && photos.slice(0, 8).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-700 ${i === currentIndex % 8 ? 'w-8 bg-white/60' : 'w-1 bg-white/10'}`}
                  ></div>
               ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
