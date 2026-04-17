import React, { useState, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { Camera } from 'lucide-react';
import { usePhotos } from '../../hooks/usePhotos';
import LazyImage from '@/components/common/LazyImage';

const FeaturedGallery = ({ initialLimit = 8 }) => {
  const { photos, loading, error } = usePhotos({ is_featured: true });
  const [imageLoadStates, setImageLoadStates] = useState({});
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  const displayPhotos = photos.slice(0, displayLimit);

  const handleImageLoad = useCallback((photoId) => {
    setImageLoadStates((prev) => ({ ...prev, [photoId]: "loaded" }));
  }, []);

  const handleImageError = useCallback((photoId) => {
    setImageLoadStates((prev) => ({ ...prev, [photoId]: "error" }));
  }, []);

  if (loading && photos.length === 0) {
    return <OrganicLoadingSkeleton />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="organic-gallery-container py-12">


      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
        className="organic-masonry-grid flex gap-8"
        columnClassName="organic-masonry-column bg-clip-padding"
      >
        {displayPhotos.map((photo, index) => (
          <OrganicPhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            imageLoadState={imageLoadStates[photo.id]}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
          />
        ))}
      </Masonry>

      {photos.length > displayLimit && (
        <div className="text-center mt-12">
          <button
            onClick={() => setDisplayLimit(prev => prev + 4)}
            className="px-8 py-3 bg-nature-cream text-nature-forest font-bold rounded-full hover:bg-nature-sage/20 transition-all duration-300"
          >
            Load More Moments
          </button>
        </div>
      )}
    </div>
  );
};

const OrganicPhotoCard = ({
  photo,
  index,
  imageLoadState,
  onImageLoad,
  onImageError
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="organic-photo-card group block mb-8 animate-reveal-up"
      style={{ animationDelay: `${(index % 3) * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden transition-all duration-700 hover:shadow-2xl rounded-2xl bg-nature-cream/10">
        {/* Loading state */}
        {imageLoadState !== "loaded" && imageLoadState !== "error" && (
          <div className="absolute inset-0 bg-nature-cream/30 animate-pulse flex items-center justify-center min-h-[300px]">
             <div className="w-8 h-8 border-2 border-nature-moss border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Main Content via Local File System */}
        {photo.type === 'video' || photo.video ? (
          <video
            src={photo.video || photo.image}
            className={`w-full h-auto object-cover transition-all duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            muted
            playsInline
            onLoadStart={() => onImageLoad(photo.id)}
            autoPlay
            loop
          />
        ) : (
          <LazyImage
            src={photo.image}
            alt={photo.alt_text || photo.title}
            className={`w-full h-auto object-cover transition-all duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            } ${imageLoadState === "loaded" ? "opacity-100" : "opacity-0"}`}
            onLoad={() => onImageLoad(photo.id)}
            onError={() => onImageError(photo.id)}
          />
        )}

        {/* Overlay Content */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 flex items-end ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="p-8 w-full">
            <h3 className="text-2xl font-serif text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {photo.title}
            </h3>
            <p className="text-white/70 italic text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {photo.creative_text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganicLoadingSkeleton = () => (
  <div className="py-20 text-center">
    <div className="w-12 h-12 border-4 border-nature-moss border-t-transparent rounded-full animate-spin mx-auto"></div>
  </div>
);

const ErrorState = () => (
  <div className="text-center py-24 px-4 bg-nature-cream/20 rounded-3xl mx-4">
    <Camera className="h-16 w-16 text-nature-sage mx-auto mb-6" />
    <h3 className="text-2xl font-serif text-nature-forest mb-4">
      Gallery Temporarily Restoring
    </h3>
    <p className="text-gray-600 max-w-md mx-auto italic">
      We're refining our selection of beautiful moments. Please check back in a moment.
    </p>
  </div>
);

export default FeaturedGallery;
