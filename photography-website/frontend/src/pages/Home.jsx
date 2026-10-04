import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import HeroSlideshow from '@/components/editorial/HeroSlideshow';
import WorkList from '@/components/editorial/WorkList';
import RecentFrames from '@/components/editorial/RecentFrames';
import KindWords from '@/components/editorial/KindWords';
import MiniSessions from '@/components/editorial/MiniSessions';
import ContactBanner from '@/components/editorial/ContactBanner';
import {
  heroSlides,
  workCategories,
  stories,
  recentFrames,
  testimonials,
  about,
} from '@/components/editorial/homeContent';

const arrowClass =
  'w-[52px] h-[52px] rounded-full border border-ink text-ink inline-flex items-center justify-center hover:bg-ink hover:text-ivory';

const Home = () => {
  const railRef = useRef(null);
  const { hash } = useLocation();

  // Header links such as /#work land here; scroll to the section once it has rendered.
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [hash]);

  const scrollRail = (dir) => {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: dir * Math.max(300, rail.clientWidth * 0.6), behavior: 'smooth' });
  };

  return (
    <div className="bg-ivory text-ink font-body text-[17px] leading-[1.65] overflow-hidden pt-20">
      {/* Hero */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 pt-6 pb-24 flex flex-wrap gap-14 items-end">
        <div className="flex-[1.25_1_420px] min-w-0 pb-3">
          <p className="ed-cap ed-rise text-clay mb-7">Lifestyle · Commercial · Films</p>
          <h1 className="ed-rise font-display font-normal m-0 text-[clamp(58px,7.6vw,128px)] leading-[0.94] tracking-[-0.02em]" style={{ animationDelay: '.15s' }}>
            Love, <em>laughter</em>
            <br />
            &amp; everything
            <br />
            <em className="text-clay">in between.</em>
          </h1>
          <p className="ed-rise mt-[34px] mb-9 max-w-[460px] text-[#4A433D]" style={{ animationDelay: '.3s' }}>
            Maternity, newborn, milestone and family photography by Tanvi — gentle, patient sessions that
            turn fleeting moments into timeless visual stories.
          </p>
          <div className="ed-rise flex flex-wrap gap-x-[26px] gap-y-3.5 items-center" style={{ animationDelay: '.45s' }}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 min-h-[52px] px-[30px] rounded-full bg-ink text-ivory text-[15px] font-medium tracking-[0.04em] hover:bg-clay hover:text-ivory"
            >
              Book a session
              <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            <a href="#work" className="ed-ul text-[15px] tracking-[0.04em] text-ink">
              View the portfolio
            </a>
          </div>
        </div>
        <div className="flex-[1_1_380px] min-w-0">
          <HeroSlideshow slides={heroSlides} />
        </div>
      </section>

      {/* The work */}
      <section id="work" className="max-w-[1360px] mx-auto px-6 md:px-8 pt-[72px] pb-[120px] scroll-mt-24">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <h2 className="font-display font-normal m-0 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
            The <em>work</em>
          </h2>
          <p className="m-0 max-w-[360px] text-stone text-[15px]">
            Seven ways we tell a family&apos;s story. Hover a chapter to take a look.
          </p>
        </div>
        <WorkList categories={workCategories} />
      </section>

      {/* Stories */}
      <section id="stories" className="bg-sand pt-[110px] pb-[120px] scroll-mt-20">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 flex flex-wrap justify-between items-end gap-5 mb-11">
          <div>
            <p className="ed-cap text-clay mb-3.5">Stories</p>
            <h2 className="font-display font-normal m-0 text-[clamp(40px,4.6vw,68px)] leading-none tracking-[-0.01em]">
              Every family is a <em>story</em>
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button type="button" className={arrowClass} onClick={() => scrollRail(-1)} aria-label="Previous stories">
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button type="button" className={arrowClass} onClick={() => scrollRail(1)} aria-label="Next stories">
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div
          ref={railRef}
          className="ed-rail pr-8"
          style={{ paddingLeft: 'max(24px, calc((100vw - 1296px) / 2))' }}
        >
          {stories.map((s) => (
            <Link key={s.to} to={s.to} className="ed-zoom flex-[0_0_min(560px,82vw)] snap-start text-ink hover:text-ink no-underline">
              <span className="block aspect-[4/5] overflow-hidden rounded">
                <img src={s.image} alt={s.alt} loading="lazy" decoding="async" className="block w-full h-full object-cover" />
              </span>
              <span className="flex justify-between items-baseline gap-4 mt-[18px]">
                <span className="font-display text-[34px] leading-[1.1]">{s.title}</span>
                <span className="ed-cap text-stone whitespace-nowrap">{s.kind}</span>
              </span>
              <span className="block mt-1.5 text-stone text-[15px]">{s.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      <MiniSessions />

      {/* Recent frames */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 pt-[130px] pb-[140px]">
        <div className="text-center mb-16">
          <p className="ed-cap text-clay mb-3.5">Recent frames</p>
          <h2 className="font-display font-normal mx-auto max-w-[820px] text-[clamp(36px,4vw,60px)] leading-[1.08] tracking-[-0.01em]">
            The delicate glow of a mother-to-be, the yawn of a newborn, <em>the burst of laughter in a family hug.</em>
          </h2>
        </div>
        <RecentFrames columns={recentFrames} />
      </section>

      {/* About */}
      <section id="about" className="bg-paper py-[120px]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 flex flex-wrap gap-[72px] items-center">
          <div className="flex-[1_1_340px] min-w-0 max-w-[480px]">
            <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b">
              <img src={about.portrait} alt="Tanvi with her camera, in black and white" loading="lazy" decoding="async" className="block w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-[1.3_1_440px] min-w-0">
            <p className="ed-cap text-clay mb-[18px]">Behind the lens</p>
            <h2 className="font-display font-normal mb-7 text-[clamp(42px,5vw,76px)] leading-none tracking-[-0.01em]">
              Hi, I&apos;m <em>Tanvi.</em>
            </h2>
            <p className="mb-[18px] max-w-[580px] text-[19px] text-[#3A342F]">
              Photography for me isn&apos;t just about clicking pictures — it&apos;s about preserving feelings, phases and
              fleeting moments that often pass us by.
            </p>
            <p className="mb-10 max-w-[580px] text-[#4A433D]">
              I believe the most beautiful photographs happen when families feel comfortable, relaxed and truly
              themselves. My approach is gentle and patient, at home, outdoors, or in the Snippets studio.
            </p>
            <dl className="flex flex-wrap gap-x-14 gap-y-7 py-[26px] border-y border-line mb-9">
              {[
                ['5+', 'Years behind the lens'],
                ['500+', 'Families across India'],
                ['5★', 'Client reviews'],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="ed-cap text-stone mt-2">{label}</dt>
                  <dd className="font-display text-[52px] leading-none m-0">{value}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="ed-ul text-[15px] tracking-[0.04em] text-ink">
              More about Tanvi →
            </Link>
          </div>
        </div>
      </section>

      {/* Kind words */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-[130px]">
        <KindWords items={testimonials} />
      </section>

      <ContactBanner />
    </div>
  );
};

export default Home;
