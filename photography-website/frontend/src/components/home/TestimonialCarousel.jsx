import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto px-12 h-[400px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 z-10 p-2 text-nature-forest hover:text-nature-moss transition-colors"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 z-10 p-2 text-nature-forest hover:text-nature-moss transition-colors"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      {/* Testimonial Cards */}
      <div className="relative w-full h-full overflow-hidden">
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
          const isNext = index === (currentIndex + 1) % testimonials.length;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center justify-center ${
                isActive 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : isPrev 
                    ? 'opacity-0 -translate-x-full scale-95 z-0' 
                    : 'opacity-0 translate-x-full scale-95 z-0'
              }`}
            >
              <Card className="bg-white border-none shadow-2xl rounded-3xl overflow-hidden max-w-3xl">
                <CardContent className="p-12 md:p-16 text-center">
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-[#D4AF37] fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl font-serif text-nature-forest italic leading-relaxed mb-8">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="w-12 h-px bg-nature-sage mx-auto mb-6"></div>
                  
                  <cite className="not-italic font-bold text-nature-moss tracking-widest uppercase text-sm">
                    {testimonial.name}
                  </cite>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-500 rounded-full ${
              currentIndex === index ? 'w-8 bg-nature-moss' : 'w-2 bg-nature-sage/40 hover:bg-nature-sage'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
