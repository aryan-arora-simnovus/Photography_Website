// src/pages/stories/MeghaNeelanshPage.jsx
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Calendar, PlayCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FullBleedImage from './FullBleedImage'
import PullQuote from './PullQuote'
import InlineReel from './InlineReel'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

// Assets
import Story2Poster from '@/assets/custom/webp-images/megha-neelansh-poster.webp'
const LoveBanner = 'https://res.cloudinary.com/dfmqkncaz/video/upload/v1/snippets-by-tanvi/stories/megha/reel.mp4';
import Hero from '@/assets/custom/webp-images/megha-mosaic-3.webp' // Your main hero image
import LazyImage from '@/components/common/LazyImage';
import Img1 from '@/assets/custom/webp-images/megha-letter1.webp'
import Img2 from '@/assets/custom/webp-images/megha-letter2.webp'
import Img3 from '@/assets/custom/webp-images/megha-mosaic-1.webp'

// Import all 20+ gallery images
import img01 from './images/megha/webp-images/01.webp'
import img02 from './images/megha/webp-images/02.webp'
import img03 from './images/megha/webp-images/03.webp'
import img04 from './images/megha/webp-images/04.webp'
import img05 from './images/megha/webp-images/05.webp'
import img06 from './images/megha/webp-images/06.webp'
import img07 from './images/megha/webp-images/07.webp'
import img08 from './images/megha/webp-images/08.webp'
import img09 from './images/megha/webp-images/09.webp'
import img10 from './images/megha/webp-images/10.webp'
import img11 from './images/megha/webp-images/11.webp'
import img12 from './images/megha/webp-images/12.webp'
import img13 from './images/megha/webp-images/13.webp'
import img14 from './images/megha/webp-images/14.webp'
import img15 from './images/megha/webp-images/15.webp'
import img16 from './images/megha/webp-images/16.webp'
import img17 from './images/megha/webp-images/17.webp'
import img18 from './images/megha/webp-images/18.webp'
import img19 from './images/megha/webp-images/19.webp'
import img20 from './images/megha/webp-images/20.webp'

export default function MeghaNeelanshPage() {
  const [isOpen, setIsOpen] = useState(false)

  const gallery = [
    img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ]

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
})

  // Helper function for landscape images (adjust indexes based on your actual landscape images)
  const isLandscape = (index) => index === 33 // Example: img07, img13, img19

  return (
    <main className="bg-white text-gray-900 font-light leading-relaxed">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full aspect-[3/2] bg-black">
        <LazyImage
          src={Hero}
          alt="Megha and Neelansh"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ aspectRatio: '3/2' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center max-w-4xl px-6">
          <h1 className="text-white font-light text-4xl md:text-5xl lg:text-6xl mb-3 tracking-wide leading-tight">
            Love Woven in Letters
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-wider">
            Megha & Neelansh
          </p>
        </div>
      </section>

      {/* ---------- OPENING ---------- */}
      <article className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800 mb-8">
          Some stories aren't told — they're felt. Like old letters tucked away in wooden drawers, 
          love that lingers in the air, and silence that speaks louder than words.
        </p>
        <p className="text-lg font-light leading-relaxed text-gray-600 max-w-2xl mx-auto">
          For Megha and Neelansh, love looks like an era gone by — graceful, grounded, 
          and beautifully unhurried. In saree and kurta, they stepped into timeless elegance.
        </p>
      </article>

      {/* ---------- VISUAL STORY ---------- */}
      <FullBleedImage src={Img1} alt="Vintage romance" />

      <article className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-light text-nature-forest mb-8 text-center">
          An Era of Pause
        </h2>
        <p className="text-lg font-light leading-relaxed mb-8">
          Shot in spaces that whispered nostalgia, this pre-wedding shoot was less about posing 
          and more about pausing — to feel, to remember, to hold each other a little closer. 
          With every glance, every gentle brush of hands, their story came alive.
        </p>
      </article>

      <FullBleedImage src={Img2} alt="Handwritten emotions" />

      <PullQuote>
        Love Woven in Letters became more than just a theme. It became a feeling — 
        beautiful, handwritten, and endlessly deep.
      </PullQuote>

      {/* ---------- REEL SECTION ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Reel Player */}
          <div className="lg:order-1">
            <InlineReel 
              poster={Story2Poster} 
              src={LoveBanner}
              className="sticky top-24"
            />
          </div>

          {/* Story Content */}
          <div className="space-y-8 lg:order-2">
            <h2 className="text-3xl font-light text-nature-forest leading-tight">
              Poetry in Motion
            </h2>
            <p className="text-lg font-light leading-relaxed text-gray-700">
              This wasn't about styling for a frame. It was about capturing an atmosphere 
              where time slowed down, and love lingered in the little things. A folded note. 
              A soft smile. The stillness between two people who just know.
            </p>
            <blockquote className="italic border-l-2 border-nature-moss pl-6 py-2 text-nature-forest font-light text-lg">
              "What I loved most was the silence — the unsaid things that made their chemistry feel almost vintage."
            </blockquote>
          </div>
        </div>
      </section>

      <FullBleedImage src={Img3} alt="Timeless connection" />

      {/* ---------- CONCLUSION ---------- */}
      <article className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg font-light leading-relaxed text-gray-700">
          Not loud or staged, but soft and stirring, like poetry from another time. 
          In their world, connection feels like home — familiar, quiet, and endlessly beautiful.
        </p>
      </article>

      {/* ---------- GALLERY ---------- */}
      <section className="px-6 pb-32 bg-gray-50">
  <div className="max-w-7xl mx-auto">
<h2 className="text-center text-3xl font-light text-nature-forest mb-2">
  A Love Letter in Frames
</h2>
<p className="text-center text-sm text-gray-500 italic mb-14">
  Glimpses of what words couldn’t say — held in light and shadow.
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
