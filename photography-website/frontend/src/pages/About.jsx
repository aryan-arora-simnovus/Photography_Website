import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ContactBanner from '@/components/editorial/ContactBanner';
import LazyImage from '@/components/common/LazyImage';
import studio1 from '@/assets/custom/webp-images/studio1.webp';
import studio2 from '@/assets/custom/webp-images/studio2.webp';
import studio3 from '@/assets/custom/webp-images/studio3.webp';
import family from '@/assets/custom/webp-images/family.webp';
import portrait from '@/assets/custom/webp-images/about2.webp';
import filmPoster from '@/assets/custom/webp-images/reva-reel-poster.webp';
import { cld, cldVideo } from '@/utils/imageUtils';

// Tanvi's own About film (about/hero.mp4) was never uploaded, so this slot shows a Snippets family film
// for now, credited underneath. Swap in her film's Cloudinary URL once it is online.
const aboutVideo = cldVideo('https://res.cloudinary.com/dfmqkncaz/video/upload/v1/snippets-by-tanvi/stories/reva-reel.mp4');

const stats = [
  ['5+', 'Years of experience', 'Maternity, newborn and family photography'],
  ['500+', 'Happy families', 'Precious moments for families across India'],
  ['5★', 'Reviews', 'Consistently rated excellent by clients'],
  ['Certified', 'Professional', 'Professional photographer'],
];

const services = [
  {
    title: 'Baby Blossom',
    kind: 'Maternity',
    description: 'Artistic, soulful portraiture celebrating the radiant magic of motherhood.',
    features: ['28–36 weeks ideal timing', 'Studio or outdoor locations', 'Partner included', 'Wardrobe consultation'],
  },
  {
    title: 'Newborn',
    kind: 'First weeks',
    description: "Gentle, safe sessions capturing your baby's first precious days with artistic poses and natural family interactions.",
    features: ['First 2 weeks ideal', 'Home or studio sessions', 'Safe posing techniques', 'Family photos included'],
  },
  {
    title: 'Milestones',
    kind: '3 · 6 · 9 · 12 months',
    description: "Documenting your baby's growth at 3, 6, 9 and 12 months with playful, age-appropriate setups.",
    features: ['Age-appropriate setups', 'Developmental milestones', 'Props and themes', 'Growth documentation'],
  },
  {
    title: 'Family Portraits',
    kind: 'Every size',
    description: 'Timeless family memories that show your unique bond, for any season or occasion.',
    features: ['All family sizes', 'Seasonal themes', 'Multiple locations', 'Extended family welcome'],
  },
];

const About = () => (
  <div className="bg-ivory text-ink font-body text-[17px] leading-[1.65] overflow-hidden pt-20">
    {/* Intro */}
    <section className="max-w-[1360px] mx-auto px-6 md:px-8 pt-10 pb-28 flex flex-wrap gap-16 items-center">
      <div className="flex-[1.2_1_420px] min-w-0">
        <p className="ed-cap ed-rise text-clay mb-7">About</p>
        <h1 className="ed-rise font-display font-normal m-0 text-[clamp(56px,7vw,116px)] leading-[0.95] tracking-[-0.02em]" style={{ animationDelay: '.15s' }}>
          Hello, I&apos;m <em>Tanvi.</em>
        </h1>
        <p className="ed-rise mt-8 mb-5 max-w-[560px] text-[21px] text-[#3A342F]" style={{ animationDelay: '.3s' }}>
          A passionate photographer dedicated to capturing life&apos;s most precious moments with artistry, patience and
          love.
        </p>
        <p className="ed-rise mb-10 max-w-[560px] text-[#4A433D]" style={{ animationDelay: '.4s' }}>
          For over five years I&apos;ve had the privilege of documenting the journey of growing families — from the
          anticipation of pregnancy to the joy of new life and the wonder of childhood milestones. Every session is a
          celebration of love, connection, and the story that makes your family yours.
        </p>
        <Link
          to="/contact"
          className="ed-rise group inline-flex items-center gap-3 min-h-[52px] px-[30px] rounded-full bg-ink text-ivory text-[15px] font-medium tracking-[0.04em] hover:bg-clay hover:text-ivory"
          style={{ animationDelay: '.5s' }}
        >
          Book a session
          <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="flex-[1_1_340px] min-w-0 max-w-[480px] mx-auto">
        <div className="ed-ph aspect-[2/3] overflow-hidden rounded-t-full rounded-b">
          <LazyImage src={portrait} alt="Tanvi with her camera, in black and white" sizes="(min-width: 1024px) 480px, 100vw" loading="eager" fetchPriority="high" className="block w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Film + words */}
    <section className="bg-paper py-[120px]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 flex flex-wrap gap-16 items-center">
        <figure className="flex-[1.2_1_440px] min-w-0 m-0">
          <video
            src={aboutVideo}
            poster={cld(filmPoster, { width: 1280 })}
            controls
            playsInline
            preload="none"
            className="block w-full aspect-video object-cover rounded bg-sand"
          >
            <track kind="captions" />
          </video>
          <figcaption className="ed-cap text-stone mt-4">
            From <Link to="/stories/quiet-joys" className="ed-ul text-stone hover:text-ink">Quiet Joys</Link>, a Snippets family film
          </figcaption>
        </figure>
        <div className="flex-[1_1_380px] min-w-0">
          <p className="ed-cap text-clay mb-5">Behind the lens</p>
          <h2 className="font-display font-normal m-0 mb-7 text-[clamp(34px,3.6vw,52px)] leading-[1.08] tracking-[-0.01em]">
            “Hi, I&apos;m Tanvi — the heart and soul behind the lens at <em>Snippets by Tanvi.</em>”
          </h2>
          <p className="mb-5 text-[#3A342F]">
            Photography for me isn&apos;t just about clicking pictures — it&apos;s about preserving feelings, phases, and
            fleeting moments that often pass us by. Whether it&apos;s the delicate glow of a mother-to-be, the yawn of a
            newborn, or the burst of laughter in a family hug, I strive to turn those snippets into timeless visual
            stories.
          </p>
          <p className="font-display italic text-[24px] leading-[1.35] text-[#3A342F] m-0">
            Over the years, I&apos;ve been blessed to work with wonderful families, expecting parents, giggling toddlers,
            and couples deeply in love.
          </p>
        </div>
      </div>
    </section>

    {/* Why families choose me */}
    <section className="max-w-[1360px] mx-auto px-6 md:px-8 py-[120px]">
      <div className="flex flex-wrap justify-between items-end gap-5 mb-12">
        <h2 className="font-display font-normal m-0 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
          Why families <em>choose me</em>
        </h2>
        <p className="m-0 max-w-[420px] text-stone text-[15px]">
          Experience, dedication, and a gentle approach that puts families at ease.
        </p>
      </div>
      <dl className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line m-0">
        {stats.map(([value, label, note]) => (
          <div key={label} className="flex flex-col-reverse py-8 pr-6 border-b border-line lg:border-b-0">
            <dd className="m-0 mt-2 text-stone text-[15px]">{note}</dd>
            <dt className="ed-cap text-ink mt-3">{label}</dt>
            <dd className="m-0 font-display text-[60px] leading-none">{value}</dd>
          </div>
        ))}
      </dl>
    </section>

    {/* Philosophy */}
    <section className="bg-sand py-[120px]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 flex flex-wrap gap-16 items-center">
        <div className="flex-[1_1_380px] min-w-0">
          <div className="ed-ph aspect-[2/3] overflow-hidden rounded">
            <LazyImage src={family} alt="A large family posed together" sizes="(min-width: 1024px) 45vw, 100vw" className="block w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-[1.1_1_420px] min-w-0">
          <p className="ed-cap text-clay mb-5">Philosophy</p>
          <h2 className="font-display font-normal m-0 mb-7 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
            Comfortable, relaxed, <em>truly yourselves.</em>
          </h2>
          <p className="mb-10 max-w-[560px] text-[#3A342F]">
            I believe the most beautiful photographs happen when families feel comfortable, relaxed and truly
            themselves. My approach is gentle and patient, creating space for natural emotions and connections to unfold.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 border-t border-[#CFC4B5] pt-8">
            <div>
              <h3 className="font-display font-normal text-[28px] m-0 mb-1">Flexible timing</h3>
              <p className="m-0 text-stone text-[15px]">Sessions adapt to your baby&apos;s unique schedule.</p>
            </div>
            <div>
              <h3 className="font-display font-normal text-[28px] m-0 mb-1">Your choice</h3>
              <p className="m-0 text-stone text-[15px]">Studio or outdoor — wherever you feel at home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Studio */}
    <section className="max-w-[1360px] mx-auto px-6 md:px-8 py-[120px]">
      <div className="text-center mb-14">
        <p className="ed-cap text-clay mb-3.5">The studio</p>
        <h2 className="font-display font-normal mx-auto max-w-[760px] m-0 text-[clamp(40px,4.6vw,68px)] leading-[1.02] tracking-[-0.01em]">
          The heart of our <em>creative home</em>
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-stone">
          Designed to feel like home, our space embraces natural textures, cosy corners, and a touch of magic for every
          session.
        </p>
      </div>
      {/* The studio photos are square: one large square beside two small ones, all uncropped. */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
        <div className="ed-zoom ed-ph col-span-2 md:row-span-2 aspect-square md:aspect-auto overflow-hidden rounded">
          <LazyImage src={studio2} alt="The Snippets studio interior" sizes="(min-width: 768px) 66vw, 100vw" className="block w-full h-full object-cover" />
        </div>
        <div className="ed-zoom ed-ph aspect-square overflow-hidden rounded">
          <LazyImage src={studio1} alt="A studio set with a cyclorama wall" sizes="(min-width: 768px) 33vw, 50vw" className="block w-full h-full object-cover" />
        </div>
        <div className="ed-zoom ed-ph aspect-square overflow-hidden rounded">
          <LazyImage src={studio3} alt="Studio decor and shelving" sizes="(min-width: 768px) 33vw, 50vw" className="block w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="bg-paper py-[120px]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="flex flex-wrap justify-between items-end gap-5 mb-12">
          <h2 className="font-display font-normal m-0 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
            Photography <em>services</em>
          </h2>
          <p className="m-0 max-w-[420px] text-stone text-[15px]">
            Specialising in documenting your family&apos;s journey with artistry and care.
          </p>
        </div>
        <div className="border-t border-line">
          {services.map((s, i) => (
            <article key={s.title} className="grid md:grid-cols-[80px_1.1fr_1fr] gap-x-10 gap-y-4 py-10 border-b border-line">
              <span className="ed-cap text-[#9A9086] pt-3">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display font-normal m-0 text-[clamp(36px,3.8vw,56px)] leading-none">{s.title}</h3>
                <p className="ed-cap text-clay mt-3 mb-0">{s.kind}</p>
              </div>
              <div>
                <p className="mt-0 mb-5 text-[#3A342F]">{s.description}</p>
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                  {s.features.map((f) => (
                    <li key={f} className="px-3.5 py-1.5 rounded-full border border-line text-[14px] text-[#4A433D]">{f}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <div className="pt-[120px]">
      <ContactBanner />
    </div>
  </div>
);

export default About;
