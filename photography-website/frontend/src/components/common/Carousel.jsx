// components/common/Carousel.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from '@/components/common/LazyImage';

const Carousel = ({ 
  images, 
  autoPlay = true, 
  interval = 5000, 
  showControls = true, 
  showIndicators = true,
  aspectRatio = "aspect-[16/9]"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle autoplay
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(goToNext, interval);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, interval, goToNext]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrevious]);
  
  if (!images || images.length === 0) {
    return null;
  }
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Images */}
      <div className={`relative ${aspectRatio} overflow-hidden`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <LazyImage
              src={image.src || image}
              alt={image.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Controls */}
      {showControls && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <Button
            onClick={toggleAutoPlay}
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
