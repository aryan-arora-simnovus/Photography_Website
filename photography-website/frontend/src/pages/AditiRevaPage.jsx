// src/pages/stories/AditiReva.jsx
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'
import { PlayCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FullBleedImage from './FullBleedImage'
import PullQuote from './PullQuote'
import InlineReel from './InlineReel'
import LazyImage from '@/components/common/LazyImage'

// Hero & Reel assets

import reelPoster from '@/assets/custom/webp-images/reva-reel-poster.webp'
const reelSrc = 'https://res.cloudinary.com/dfmqkncaz/video/upload/v1/snippets-by-tanvi/stories/aditi-reva/reel.mp4';

// Narrative images
import block1 from '@/assets/custom/webp-images/reva-1.webp'
import block2 from '@/assets/custom/webp-images/reva-2.webp'
import block3 from '@/assets/custom/webp-images/reva-3.webp'
import block4 from '@/assets/custom/webp-images/reva-4.webp'
import block5 from '@/assets/custom/webp-images/reva-5.webp'
import block6 from './images/aditi-reva/webp-images/48.webp'

import hero from './images/aditi-reva/webp-images/41.webp'
// Gallery images (20+)
import g01 from './images/aditi-reva/webp-images/01.webp'
import g02 from './images/aditi-reva/webp-images/02.webp'
import g03 from './images/aditi-reva/webp-images/29.webp'
import g04 from './images/aditi-reva/webp-images/04.webp'
import g05 from './images/aditi-reva/webp-images/05.webp'
import g06 from './images/aditi-reva/webp-images/06.webp'
import g07 from './images/aditi-reva/webp-images/07.webp'
import g08 from './images/aditi-reva/webp-images/08.webp'
import g09 from './images/aditi-reva/webp-images/09.webp'
import g10 from './images/aditi-reva/webp-images/10.webp'
import g11 from './images/aditi-reva/webp-images/11.webp'
import g12 from './images/aditi-reva/webp-images/34.webp'
import g13 from './images/aditi-reva/webp-images/13.webp'
import g14 from './images/aditi-reva/webp-images/14.webp'
import g15 from './images/aditi-reva/webp-images/15.webp'
import g16 from './images/aditi-reva/webp-images/16.webp'
import g17 from './images/aditi-reva/webp-images/17.webp'
import g18 from './images/aditi-reva/webp-images/18.webp'
import g19 from './images/aditi-reva/webp-images/19.webp'
import g20 from './images/aditi-reva/webp-images/20.webp'
import g47 from './images/aditi-reva/webp-images/47.webp'


import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';


export default function AditiRevaPage() {
  const [showReel, setShowReel] = useState(false)
  const gallery = [g01,g02,g03,g04,g05,g06,g07,g08,g09,g10,g11,g12,g13,g15,g14,g16,g17,g18,g19,g20,g47]
  const isLandscape = (index) => index === 14 // Example: img07, img13, img19


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

  return (
    <main className="bg-white text-gray-900 font-light leading-relaxed">
      {/* HERO */}
      <section className="relative w-full aspect-[3/2] bg-black">
        <LazyImage
          src={hero}
          alt="A Day with Reva"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ aspectRatio: '3/2' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center px-6">
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">
            A Day in the Life of Baby
          </h1>
          <p className="text-white/90 text-lg md:text-xl">Capturing Quiet Joys</p>
        </div>
      </section>

      {/* INTRO */}
      <article className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-xl md:text-2xl text-gray-800 mb-6">
          With Aditi and her little one, Reva, we spent a day documenting the ordinary yet beautiful rhythms of babyhood.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From morning yawns to tiny feet padding across the floor, every moment felt like magic waiting to be remembered.
        </p>
      </article>

      {/* INLINE REEL */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <InlineReel
            poster={reelPoster}
            src={reelSrc}
            className="mx-auto"
            />
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-nature-forest">
              Moments That Matter
            </h2>
            <p className="text-lg text-gray-700">
              There were no big setups—just Reva in her element, and Aditi by her side. The way they looked at each other reminded me that love lives in the simplest things.
            </p>
            <PullQuote>
              A Day in the Life of Baby is a gentle reminder of how beautiful the ordinary can be.
            </PullQuote>
          </div>
        </div>
      </section>

      {/* NARRATIVE BLOCKS */}
<section className="py-24 px-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
    {[
      {
        img: block1,
        heading: 'The Magic in the Ordinary',
        text: 'From messy hair and morning yawns to soft giggles and tiny feet—every detail felt like magic waiting to be remembered.'
      },
      {
        img: block2,
        heading: 'A Love Without Direction',
        text: 'Truly candid moments with no direction—just the pure joy of mother and child discovering the world together.'
      },
      {
        img: block3,
        heading: 'Beauty in Unpredictability',
        text: 'Reva reminded me how the tiniest change in light, or a soft blur of movement, can make a moment come alive.'
      },
      {
        img: block4,
        heading: 'Waiting, Watching, Feeling',
        text: 'There was no pressure to perform. Just quiet joy in observing and gently framing what’s already unfolding.'
      },
      {
        img: block5,
        heading: 'Cherished Fragments',
        text: 'These are the frames that stay with you—not for perfection, but for the life and love they hold.'
      },
      {
        img: block6,
        heading: 'What Matters Most',
        text: 'A handful of truly alive moments captured in time—full of love, warmth, and the promise of growth.'
      }
        ].map((block, i) => (
      <motion.div
        key={i}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <LazyImage
          src={block.img}
          alt={block.heading}
          className="w-full h-auto object-cover rounded-2xl shadow-xl"
        />
        <h3 className="text-xl md:text-2xl font-serif text-nature-forest">{block.heading}</h3>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">{block.text}</p>
      </motion.div>
    ))}
  </div>
</section>



  

      {/* GALLERY */}
           <section className="px-6 pb-32 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h6 className="text-center text-3xl font-light text-nature-forest mb-2">
  The Day, Unfolded
</h6>
<p className="text-center text-sm text-gray-500 italic mb-14">
  Every glance, every quiet moment — just as it was.
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
      {gallery.map((src, index) => (
        <div
          key={src}
          className={`${
            isLandscape(index) ? 'md:col-span-2' : 'col-span-1'
          }`}
        >
          <LazyImage
            src={src}
            alt={`Gallery ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 object-cover"
          />
        </div>
      ))}
    </div>
  </div>
</section>
    </main>
  )
}
