import React, { useEffect, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

const HeroSlideshow = ({ slides, interval = 4800 }) => {
  const [{ current, previous }, setSlide] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      setSlide((s) => ({ previous: s.current, current: (s.current + 1) % slides.length }));
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <div className="relative">
      <div className="ed-stage aspect-[4/5] max-h-[78vh] ml-auto">
        {slides.map((slide, i) => (
          <div
            key={slide.alt}
            className={`ed-slide ${i === current ? 'is-on' : i === previous ? 'is-prev' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="ed-cap text-stone">{slides[current].label}</span>
        <span className="font-display italic text-[22px]">
          {pad(current + 1)} <span className="text-[#9A9086]">/ {pad(slides.length)}</span>
        </span>
      </div>
    </div>
  );
};

export default HeroSlideshow;
