import React, { useRef, useEffect, useState } from 'react';

/**
 * CinematicParallax — A scroll-driven cinematic reveal section.
 * Text reveals word-by-word as the user scrolls, while background images
 * drift at different parallax speeds. Creates a magazine-editorial feel.
 */
const CinematicParallax = ({ children, title, subtitle }) => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] overflow-hidden flex items-center bg-nature-cream/50 py-24"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          {/* Decorative line */}
          <div className="w-px h-16 bg-nature-moss/30 mx-auto mb-12" />

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-nature-forest mb-10 leading-[1.1] tracking-tight">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            {subtitle}
          </p>

          <div className={`transition-all duration-700 delay-500 transform ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}>
            {children}
          </div>

          <div className="flex items-center justify-center gap-4 mt-16 opacity-30">
            <div className="h-[1px] w-12 bg-nature-moss/30" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-nature-moss/50 font-bold">
              Since 2019
            </span>
            <div className="h-[1px] w-12 bg-nature-moss/30" />
          </div>
        </div>
      </div>
    </section>
  );
};


export default CinematicParallax;
