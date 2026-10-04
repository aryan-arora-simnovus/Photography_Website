import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LazyImage from '@/components/common/LazyImage';

const sessions = [
  {
    theme: 'Janmashtami',
    tagline: 'Little Krishna, infinite love',
    description: 'Your little one dressed as Kanha — handcrafted props, vibrant drapes and a setup straight out of Gokul.',
    image: 'https://res.cloudinary.com/dfmqkncaz/image/upload/v1/snippets-by-tanvi/MINI_S/aanchal--hr3.webp',
  },
  {
    theme: 'Christmas',
    tagline: 'Merry little moments',
    description: 'Twinkling lights, cosy knits and holiday magic, in a whimsical setup your family will treasure.',
    image: 'https://res.cloudinary.com/dfmqkncaz/image/upload/v1/snippets-by-tanvi/MINI_S/sheetal---hr---christmas-28.webp',
  },
  {
    theme: 'Diwali',
    tagline: 'Glow with grace',
    description: 'Diyas, marigolds and golden light — the radiance of Diwali and the sparkle in your family’s eyes.',
    image: 'https://res.cloudinary.com/dfmqkncaz/image/upload/v1/snippets-by-tanvi/MINI_S/tanya---diwali---hr-42.webp',
  },
  {
    theme: 'Valentine’s',
    tagline: 'Love in every frame',
    description: 'Roses, soft pinks and heart-full vibes — for a couple, a family, or your little valentine.',
    image: 'https://res.cloudinary.com/dfmqkncaz/image/upload/v1/snippets-by-tanvi/MINI_S/shreya-and-dixit---v---hr-30.webp',
  },
];

const MiniSessions = () => (
  <section id="mini-sessions" className="max-w-[1360px] mx-auto px-6 md:px-8 pt-[130px] scroll-mt-20">
    <div className="flex flex-wrap justify-between items-end gap-5 mb-12">
      <div>
        <p className="ed-cap text-clay mb-3.5">Limited edition</p>
        <h2 className="font-display font-normal m-0 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
          Mini <em>sessions</em>
        </h2>
      </div>
      <p className="m-0 max-w-[420px] text-stone text-[15px]">
        Beautifully curated, theme-based setups for every festival and occasion. Thirty minutes, one dreamy setup,
        memories that last.
      </p>
    </div>
    <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {sessions.map((s) => (
        <article key={s.theme} className="ed-zoom">
          <div className="aspect-[3/4] overflow-hidden rounded">
            <LazyImage
              src={s.image}
              alt={`${s.theme} mini session`}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="block w-full h-full object-cover"
            />
          </div>
          <p className="ed-cap text-stone mt-5 mb-1.5">{s.theme}</p>
          <h3 className="font-display font-normal text-[30px] leading-[1.1] m-0">{s.tagline}</h3>
          <p className="mt-2.5 text-[15px] text-[#4A433D]">{s.description}</p>
        </article>
      ))}
    </div>
    <div className="mt-12 flex justify-center">
      <Link
        to="/contact"
        className="group inline-flex items-center gap-3 min-h-[52px] px-[30px] rounded-full border border-ink text-ink text-[15px] font-medium tracking-[0.04em] hover:bg-ink hover:text-ivory"
      >
        Book a mini session
        <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
      </Link>
    </div>
  </section>
);

export default MiniSessions;
