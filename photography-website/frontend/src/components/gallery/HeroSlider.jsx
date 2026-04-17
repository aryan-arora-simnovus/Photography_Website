import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useHeroPhotos } from '../../hooks/usePhotos';
import LazyImage from '@/components/common/LazyImage';

const HeroSlider = () => {
  const { heroPhotos, loading, error } = useHeroPhotos();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fallback slides with Cloudinary placeholders if needed
  const defaultSlides = [
    {
      id: 'd1',
      title: "Beautiful Maternity Moments",
      image: 'snippets-by-tanvi/hero/hero1',
      alt_text: "Maternity photography session",
      description: "Capturing the magic of motherhood with timeless elegance"
    },
    {
      id: 'd2',
      title: "Precious Newborn Sessions",
      image: 'snippets-by-tanvi/hero/hero2',
      alt_text: "Newborn photography session",
      description: "Tender moments with your little miracle"
    }
  ];

  const poeticHeadlines = [
    "Fragments Of Forever",
    "Where Light Meets Soul",
    "The Silent Narrative",
    "Honest Human Stories",
    "Art In Every Breath",
    "A Timeless Chronicle",
    "Echoes Of Tomorrow",
    "The Poetic Frame"
  ];

  const slides = heroPhotos.length > 0 ? heroPhotos : defaultSlides;

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  if (loading && heroPhotos.length === 0) {
    return (
      <div className="w-full h-screen bg-nature-forest flex items-center justify-center">
        <div className="text-center">
           <div className="w-16 h-16 border-2 border-nature-sage border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
           <p className="text-nature-sage font-serif italic text-xl tracking-widest">Crafting Your Story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden group bg-[#0a0a0a]">
      {/* Noise Texture Overlay */}
      
      {/* Vertical Branding - Left Edge */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <p className="text-[10px] tracking-[1em] uppercase text-white/20 font-light rotate-[-90deg] origin-left whitespace-nowrap">
          Snippets • By • Tanvi • {new Date().getFullYear()}
        </p>
      </div>

      {/* Floating Section Index */}
      <div className="absolute right-12 top-12 z-40 hidden md:flex items-center gap-4">
         <span className="text-[10px] tracking-widest text-white/40 font-mono">01 — 08</span>
         <div className="h-[1px] w-8 bg-white/20"></div>
         <span className="text-[10px] tracking-widest text-white uppercase font-bold">Volume I</span>
      </div>

      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Cinematic Background */}
            <div className="relative w-full h-full overflow-hidden">
              <div className="w-full h-full">
                <LazyImage
                  src={slide.image}
                  alt={slide.alt_text || slide.title}
                  className="w-full h-full object-cover object-[center_30%]"
                  // Disable lazy loading for the active slide and the next slide to ensure smooth transitions
                  loading={(index === currentSlide || index === (currentSlide + 1) % slides.length) ? "eager" : "lazy"}
                  // Boost priority for the active slide
                  fetchPriority={index === currentSlide ? "high" : "auto"}
                />
              </div>
              
              {/* Static Overlays - High Performance */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
 
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-12 md:px-24">
                <div className={`max-w-5xl transition-opacity duration-1000 delay-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}>
                  
                  <div className="flex items-center gap-4 mb-8">
                     <div className="h-[1px] w-12 bg-amber-500"></div>
                     <span className="text-xs uppercase tracking-[0.5em] text-amber-500 font-bold">The Art Of Memory</span>
                  </div>

                  <h1 className="text-[12vw] sm:text-7xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.8] mb-12 text-white tracking-tighter">
                    {(poeticHeadlines[index % poeticHeadlines.length]).split(' ').map((word, i) => (
                      <span 
                        key={i} 
                        className={`block ${i % 2 !== 0 ? 'font-extralight italic ml-[0.5em]' : 'font-bold'}`}
                      >
                        {word}
                      </span>
                    ))}
                  </h1>

                  <div className="flex flex-col md:flex-row md:items-end gap-12 mt-16">
                    <Button 
                      asChild 
                      size="lg" 
                      className="group bg-white text-black hover:bg-amber-50 transition-all duration-500 px-16 py-10 rounded-full text-xs tracking-[0.3em] font-bold uppercase overflow-hidden relative"
                    >
                      <Link to="/contact">
                        <span className="relative z-10">Reserve Your Chapter</span>
                        <div className="absolute inset-0 bg-amber-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      </Link>
                    </Button>
                    
                    <div className="flex flex-col gap-2 max-w-[280px]">
                       <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 leading-relaxed">
                          Capturing the raw, honest beauty of your family narrative. Preservation through the lens of art and empathy.
                       </p>
                       <div className="h-[1px] w-24 bg-white/20 mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Minimalist Navigation */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 right-12 z-40 flex items-center gap-6">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-mono text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
             <div className="w-12 h-[1px] bg-white/20 relative">
                <div 
                  className="absolute inset-0 bg-amber-500 transition-all duration-[6s] linear"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
             </div>
             <span className="text-[10px] font-mono text-white/40">{String(slides.length).padStart(2, '0')}</span>
          </div>

          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Background Year Decal */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 z-20 pointer-events-none">
         <span className="text-[20vw] font-serif font-black text-white/[0.02] leading-none tracking-tighter">
            EST. 2019
         </span>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Control */}
      {slides.length > 1 && (
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-10 right-8 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
};

export default HeroSlider;