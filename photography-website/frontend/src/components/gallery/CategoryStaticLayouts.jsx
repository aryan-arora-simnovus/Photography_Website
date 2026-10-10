import React from 'react';


import MaternityBanner from '@/assets/custom/webp-images/maternitybanner.webp';
import BabyBanner from '@/assets/custom/webp-images/babybanner.webp';
import PreWeddingBanner from '@/assets/custom/webp-images/preweddingbanner.webp';
import StudioBanner from '@/assets/custom/webp-images/studiobanner.webp';
import WeddingBanner from '@/assets/custom/webp-images/weddingbanner.webp';
import FamJamBanner from '@/assets/custom/webp-images/famjambanner.webp';

import EventBanner from '@/assets/custom/webp-images/eventbanner.webp';
import FashionBanner from '@/assets/custom/webp-images/fashionbanner.webp';

import LazyImage from '@/components/common/LazyImage';

// On phones the banner is too short to hold the title clear of the fixed header, so the photo starts below
// the header and the title sits underneath it; from 640px up the title is laid over the photo.
const baseLayout = (imgSrc, altText, title, subtitle) => (
  <section className="relative w-full overflow-hidden pt-20 sm:pt-0">
    {/* Hero Image (every banner is 3:2) */}
    <div className="relative bg-black">
      <LazyImage
        src={imgSrc}
        alt={altText}
        loading="eager"
        fetchPriority="high"
        className="block w-full h-auto aspect-[3/2] object-contain"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
    </div>

    {/* Centered Text */}
    <div className="bg-black px-6 pt-2 pb-10 sm:p-0 sm:px-6 sm:bg-transparent sm:absolute sm:inset-0 flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide">
        {title}
      </h2>
      <p className="text-xl md:text-2xl text-white/90 font-light italic max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  </section>
);


const categoryLayouts = {
  maternity: baseLayout(
    MaternityBanner,
    'Baby Blossom Photography',
    'The Baby Blossom Journey',
    'Every baby bump has its own rhythm—a quiet, blooming magic that deserves to be preserved in timeless frames.'
  ),

  'lifestyle-family-shoots': baseLayout(
    BabyBanner,
    'Baby Milestone Photography (3–12 Months)',
    'Milestone Magic',
    'From first smiles to birthday grins—each baby milestone is a memory to treasure forever.'
  ),

  baby: baseLayout(
    BabyBanner,
    'Baby Milestone Photography (3–12 Months)',
    'Milestone Magic',
    'From first smiles to birthday grins—each baby milestone is a memory to treasure forever.'
  ),

  prewedding: baseLayout(
    PreWeddingBanner,
    'Pre-Wedding Photography',
    'Love Stories Begin',
    'Capturing your love story before the big day — soft light, candid moments, timeless romance.'
  ),

  studio: baseLayout(
    StudioBanner,
    'Studio Photography',
    'Studio Elegance',
    'Controlled light, timeless portraits — your vision brought to life in perfect conditions.'
  ),


  famjam: baseLayout(
    FamJamBanner,
    'Family Photography',
    'Family Connections',
    'Multi-generational family portraits — fun, candid, and full of love.'
  ),



  event: baseLayout(
    EventBanner,
    'Event Photography',
    'Moments in Motion',
    'Capturing the energy and atmosphere of your special occasions — live and candid.'
  ),

  commercial: baseLayout(
    FashionBanner,
    'Fashion & Editorial Photography',
    'Commercial Vision',
    'Editorial styling, creative concepts, and high-fashion visuals that make brands shine.'
  ),
};

const CategoryStaticLayouts = ({ slug }) => {
  return categoryLayouts[slug] || null;
};

export default CategoryStaticLayouts;
