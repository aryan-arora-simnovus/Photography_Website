// src/pages/stories/EshitaElla.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FullBleedImage from './FullBleedImage';
import PullQuote from './PullQuote';
import InlineReel from './InlineReel';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

import hero from './images/ella-eshita/webp-images/hero.webp';
import LazyImage from '@/components/common/LazyImage';
import poster from './images/ella-eshita/webp-images/reel-poster.webp';
const reelSrc = 'https://res.cloudinary.com/dfmqkncaz/video/upload/v1/snippets-by-tanvi/stories/ella-eshita/reel.mp4';

import img01 from './images/ella-eshita/webp-images/01.webp';
import img02 from './images/ella-eshita/webp-images/02.webp';
import img03 from './images/ella-eshita/webp-images/03.webp';
import img04 from './images/ella-eshita/webp-images/04.webp';
import img05 from './images/ella-eshita/webp-images/05.webp';
import img06 from './images/ella-eshita/webp-images/06.webp';
import img07 from './images/ella-eshita/webp-images/07.webp';
import img08 from './images/ella-eshita/webp-images/08.webp';
import img09 from './images/ella-eshita/webp-images/09.webp';
import img10 from './images/ella-eshita/webp-images/10.webp';
import img11 from './images/ella-eshita/webp-images/26.webp';
import img12 from './images/ella-eshita/webp-images/12.webp';
import img13 from './images/ella-eshita/webp-images/27.webp';
import img14 from './images/ella-eshita/webp-images/14.webp';
import img15 from './images/ella-eshita/webp-images/22.webp';
import img16 from './images/ella-eshita/webp-images/16.webp';
import img17 from './images/ella-eshita/webp-images/17.webp';
import img18 from './images/ella-eshita/webp-images/18.webp';
import img19 from './images/ella-eshita/webp-images/24.webp';
import img20 from './images/ella-eshita/webp-images/20.webp';
import img22 from './images/ella-eshita/webp-images/22.webp';
import img34 from './images/ella-eshita/webp-images/34.webp';

export default function EshitaElla() {
  const gallery = [
    img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
    img11, img12, img13, img14, img20 , img15, img16, img17, img18, img19, 
  ];


  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
      },
    },
  });

  // Helper function to determine if image is landscape

  return (
    <main className="bg-white text-gray-900 font-light leading-relaxed">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full aspect-[3/2] md:aspect-[3/2] bg-black">
  <LazyImage
    src={hero}
    alt="Eshita and Ella"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ aspectRatio: '3/2' }} // for maximum browser support
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center max-w-4xl px-6">
    <h1 className="text-white font-light text-4xl md:text-5xl lg:text-6xl mb-3 tracking-wide leading-tight">
      Styled With Soul
    </h1>
    <p className="text-white/90 text-lg md:text-xl font-light tracking-wider">
      Eshita & Ella for Nicobar
    </p>
  </div>
</section>


      {/* ---------- OPENING ---------- */}
      <article className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 mb-8">
          When your home is an extension of your soul, every corner speaks — and Eshita's world does just that.
        </p>
        <p className="text-lg font-light leading-relaxed text-gray-600 max-w-2xl mx-auto">
          A celebrated interior designer known for her effortless blend of modern lines and earthy textures, 
          she invited us into her curated sanctuary for a day that felt more like a warm conversation than a shoot.
        </p>
      </article>

      {/* ---------- VISUAL STORY ---------- */}
      <FullBleedImage src={img05} alt="Eshita's living space" />

      <article className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-light text-nature-forest mb-8 text-center">
          The Heart of Home
        </h2>
        <p className="text-lg font-light leading-relaxed mb-8">
          By her side was Ella — her constant companion, and undoubtedly, the heart of the home. 
          The way she moved from room to room, settling on rugs, trailing Eshita with loving eyes, 
          reminded us that the best spaces aren't just designed — they're deeply lived in.
        </p>
      </article>

      <FullBleedImage src={img22} alt="Ella in her element" />

      <PullQuote>
        This wasn't about styling for a frame. It was about capturing an atmosphere — 
        one where form meets feeling.
      </PullQuote>

      {/* ---------- REEL SECTION ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Reel Player */}
          <div className="lg:order-1">
            <InlineReel 
              poster={poster} 
              src={reelSrc}
              className="sticky top-24"
            />
          </div>

          {/* Story Content */}
          <div className="space-y-8 lg:order-2">
            <h2 className="text-3xl font-light text-nature-forest leading-tight">
              Where Stories Live
            </h2>
            <p className="text-lg font-light leading-relaxed text-gray-700">
              Nicobar's collection found its home here — not just visually, but emotionally. 
              Draped over soft armchairs, spread across sun-drenched floors, or tucked casually 
              beside Ella's favorite nook, the products became part of a lived-in story.
            </p>
            <blockquote className="italic border-l-2 border-nature-moss pl-6 py-2 text-nature-forest font-light text-lg">
              "Every element had purpose, and every corner held character."
            </blockquote>
          </div>
        </div>
      </section>

      <FullBleedImage src={img34} alt="Design details" />

      {/* ---------- CONCLUSION ---------- */}
      <article className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg font-light leading-relaxed text-gray-700">
          This wasn't about perfection — it was about connection. In Eshita's world, 
          design breathes with intention, warmth, and the quiet poetry of everyday life.
        </p>
      </article>

      {/* ---------- GALLERY ---------- */}
      {/* ---------- GALLERY ---------- */}
<section className="px-6 pb-32 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-center text-3xl font-light text-nature-forest mb-2">
  Lived In, Loved In
</h2>
<p className="text-center text-sm text-gray-500 italic mb-14">
  A space full of feeling — told in light, form, and the way Ella looks at her.
</p>


    {/* --- Mobile: Keen Slider --- */}
<div className="md:hidden">
  <div ref={sliderRef} className="keen-slider">
        {gallery.map((src, index) => (
      <div
        key={index}
        className="keen-slider__slide flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg shadow-md overflow-hidden"
      >
        <LazyImage
          src={src}
          alt={`Gallery ${index + 1}`}
          className="max-h-[90%] max-w-full object-contain"
        />
        <p className="text-center text-sm text-gray-600 mt-2">
          {index + 1} / {gallery.length}
        </p>
      </div>
    ))}
  </div>
</div>


    {/* --- Desktop/Tablet: 2-Column Grid --- */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
      {gallery.map((src, index) => {
        const isLandscape = index === 4 || index === 15; // Optional logic
        return (
          <div
            key={src}
            className={`${
              isLandscape ? 'md:col-span-2' : 'col-span-1'
            }`}
          >
            <LazyImage
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 object-cover"
            />
          </div>
        );
      })}
    </div>
  </div>
</section>


    </main>
  );
}
