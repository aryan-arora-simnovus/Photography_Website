import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ArrowRight, Star } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import LazyImage from '@/components/common/LazyImage';

// Curated hero images for each themed mini session
const miniSessions = [
  {
    id: 'janmashtami',
    theme: 'Janmashtami',
    tagline: 'Little Krishna, Infinite Love',
    description: 'Celebrate the divine playfulness of your little one dressed as Kanha — with handcrafted props, vibrant drapes, and a setup straight out of Gokul.',
    image: '/portfolio/MINI_S/aanchal--hr3.webp',
    accent: '#D4A574',
    icon: '🪈',
  },
  {
    id: 'christmas',
    theme: 'Christmas',
    tagline: 'Merry Little Moments',
    description: 'Twinkling lights, cozy knits, and holiday magic — capture the warmth of the season with a whimsical Christmas-themed setup your family will treasure.',
    image: '/portfolio/MINI_S/sheetal---hr---christmas-28.webp',
    accent: '#8B4513',
    icon: '🎄',
  },
  {
    id: 'diwali',
    theme: 'Diwali',
    tagline: 'Glow with Grace',
    description: 'Diyas, marigolds, and golden light — a festive setup that captures the radiance of Diwali and the sparkle in your family\'s eyes.',
    image: '/portfolio/MINI_S/tanya---diwali---hr-42.webp',
    accent: '#E8A742',
    icon: '🪔',
  },
  {
    id: 'valentines',
    theme: "Valentine's",
    tagline: 'Love in Every Frame',
    description: 'Roses, soft pinks, and heart-full vibes — whether it\'s a couple, a family, or your little valentine, this setup is pure romance.',
    image: '/portfolio/MINI_S/shreya-&-dixit---v---hr-30.webp',
    accent: '#C77D8A',
    icon: '💕',
  },
];

const MiniSessions = () => {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.05 });
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      ref={sectionRef}
      id="mini-sessions"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8f5f0 0%, #faf8f5 30%, #f5efe8 60%, #f8f5f0 100%)',
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #D4A574, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #C77D8A, transparent 70%)' }}
        />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #5f7470 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(122, 135, 111, 0.12), rgba(166, 182, 151, 0.08))',
              border: '1px solid rgba(122, 135, 111, 0.15)',
            }}
          >
            <Sparkles className="h-4 w-4 text-nature-moss" />
            <span className="text-sm font-sans font-medium tracking-widest uppercase text-nature-moss">
              Limited Edition
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-nature-forest mb-6 leading-[1.1]">
            Mini Session <br className="hidden sm:block" />
            <span
              className="italic font-light"
              style={{
                background: 'linear-gradient(135deg, #7a876f, #5f7470)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Experiences
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
            Beautifully curated, theme-based setups designed to celebrate every festival & occasion.
            <br className="hidden md:block" />
            <span className="text-nature-forest/80 font-normal">
              30 minutes. One dreamy setup. Memories that last forever.
            </span>
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {miniSessions.map((session, index) => (
            <div
              key={session.id}
              className={`group relative transition-all duration-700 ${
                sectionInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(session.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3"
                style={{
                  boxShadow: hoveredCard === session.id
                    ? `0 25px 60px -12px ${session.accent}40`
                    : '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <LazyImage
                    src={session.image}
                    alt={`${session.theme} Mini Session`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, ${session.accent}E6 0%, ${session.accent}80 25%, transparent 60%)`,
                      opacity: hoveredCard === session.id ? 1 : 0.85,
                    }}
                  />

                  {/* Theme icon floating */}
                  <div className="absolute top-4 right-4 text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-lg">
                    {session.icon}
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                    <h3 className="text-2xl font-serif font-bold mb-1 leading-tight">
                      {session.theme}
                    </h3>

                    <p className="text-sm text-white/90 italic font-serif mb-3">
                      {session.tagline}
                    </p>

                    <p
                      className="text-xs text-white/75 leading-relaxed font-sans transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: hoveredCard === session.id ? '80px' : '0px',
                        opacity: hoveredCard === session.id ? 1 : 0,
                        marginBottom: hoveredCard === session.id ? '12px' : '0px',
                      }}
                    >
                      {session.description}
                    </p>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-white/90 transition-all duration-500"
                      style={{
                        opacity: hoveredCard === session.id ? 1 : 0,
                        transform: hoveredCard === session.id ? 'translateY(0)' : 'translateY(8px)',
                      }}
                    >
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Area */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-gray-500 font-light text-base leading-relaxed">
              Each mini session is a <span className="text-nature-forest font-medium">fully styled, theme-based setup</span> — 
              with handpicked props, curated backdrops, and professional lighting.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-sans font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #5f7470, #7a876f)',
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Book Your Mini Session</span>
            </Link>
           
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-6 mt-8 text-gray-400 text-xs font-sans tracking-wider uppercase">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>100+ Happy Families</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
            <span className="hidden sm:inline">Seasonal Themes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniSessions;
