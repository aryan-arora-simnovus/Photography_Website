import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import filmWide from '@/assets/custom/hero/hero-film-1600.mp4';
import filmTall from '@/assets/custom/hero/hero-film-portrait.mp4';
import posterWide from '@/assets/custom/hero/hero-poster-1600.webp';
import posterTall from '@/assets/custom/hero/hero-poster-portrait.webp';

/*
 * "Through the lens" hero.
 * The headline is cut out of the ivory page so Tanvi's film plays inside the letters. While the
 * section is pinned, scrolling zooms into the full stop after "in between" until it opens like an
 * aperture and the film fills the screen.
 */

const HEADER_H = 80; // fixed site header (h-20)
const IVORY = '#F5F1EA';
const CLAY = '#8E4A33';
const FONT = '"Instrument Serif", Georgia, serif';

// Headline lines as [text, italic] runs; `indent` is in ems. The last line ends in the lens dot.
const WIDE_LINES = [
  { runs: [['Love, ', false], ['laughter', true]], indent: 0 },
  { runs: [['& everything', false]], indent: 0.55 },
  { runs: [['in between', false]], indent: 1.1 },
];
const TALL_LINES = [
  { runs: [['Love,', false]], indent: 0 },
  { runs: [['laughter', true], [' &', false]], indent: 0 },
  { runs: [['everything', false]], indent: 0 },
  { runs: [['in between', false]], indent: 0 },
];

const LINE_HEIGHT = 0.9;
const DOT_GAP = 0.05; // em between "between" and the dot
const DOT_R = 0.075; // em
const RING_R = 1.35; // ring radius as a multiple of the dot radius

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let measureCtx = null;
const runWidth = (text, italic, size) => {
  measureCtx = measureCtx || document.createElement('canvas').getContext('2d');
  measureCtx.font = `${italic ? 'italic ' : ''}400 ${size}px ${FONT}`;
  return measureCtx.measureText(text).width;
};

/** Fit the headline into the pinned viewport and place the lens dot after the last word. */
const computeLayout = (w, h) => {
  const tall = w / h < 1.05;
  const spec = tall ? TALL_LINES : WIDE_LINES;
  const mx = Math.max(20, Math.round(w * (tall ? 0.06 : 0.055)));
  const top = HEADER_H + (tall ? 32 : 24);
  const reserve = tall ? 290 : 196; // space kept free for the intro and buttons
  const base = 100;
  const widths = spec.map((l) => l.runs.reduce((sum, [t, italic]) => sum + runWidth(t, italic, base), 0));
  const needed = Math.max(
    ...spec.map((l, i) => l.indent * base + widths[i] + (i === spec.length - 1 ? (DOT_GAP + 2 * DOT_R) * base : 0)),
  );
  const avail = h - top - reserve;
  const byWidth = ((w - 2 * mx) / needed) * base;
  const byHeight = avail / (0.75 + (spec.length - 1) * LINE_HEIGHT + 0.25);
  const size = Math.max(40, Math.min(byWidth, byHeight, tall ? 170 : 280));
  const blockH = size * (0.75 + (spec.length - 1) * LINE_HEIGHT + 0.25);
  const firstBaseline = top + Math.max(0, (avail - blockH) / 2) + size * 0.75;

  const lines = spec.map((l, i) => ({
    runs: l.runs,
    x: mx + l.indent * size,
    y: firstBaseline + i * LINE_HEIGHT * size,
    width: (widths[i] / base) * size,
  }));
  const last = lines[lines.length - 1];
  const r = DOT_R * size;
  const cx = last.x + last.width + DOT_GAP * size + r;
  const cy = last.y - r;
  const far = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy));
  return { w, h, tall, mx, size, lines, dot: { cx, cy, r }, maxScale: (far / r) * 1.04 };
};

const prefersStill = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true);

const HeroLens = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const ringRef = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);
  const tintRef = useRef(null);
  const videoRef = useRef(null);
  const visibleRef = useRef(true);

  const [still] = useState(prefersStill);
  const [paused, setPaused] = useState(still);
  const [layout, setLayout] = useState(null);

  // Measure before the first paint, on resize, and again once the display font has loaded.
  useLayoutEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = pinRef.current;
      if (el && el.clientWidth && el.clientHeight) setLayout(computeLayout(el.clientWidth, el.clientHeight));
    };
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    document.fonts
      ?.load(`400 100px ${FONT}`)
      .then(() => document.fonts.load(`italic 400 100px ${FONT}`))
      .then(measure)
      .catch(() => {});
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll drives the zoom. Styles are written straight to the DOM so scrolling never re-renders React.
  useEffect(() => {
    if (!layout || still) return undefined;
    const { dot, maxScale } = layout;
    const apply = (p) => {
      const t = easeInOut(clamp01((p - 0.04) / 0.72));
      const s = Math.exp(Math.log(maxScale) * t);
      const transform = `translate(${dot.cx} ${dot.cy}) scale(${s}) translate(${-dot.cx} ${-dot.cy})`;
      zoomRef.current?.setAttribute('transform', transform);
      ringRef.current?.setAttribute('transform', transform);
      if (svgRef.current) svgRef.current.style.visibility = t >= 1 ? 'hidden' : 'visible';

      const intro = 1 - clamp01(p / 0.1);
      if (introRef.current) {
        introRef.current.style.opacity = intro;
        introRef.current.style.transform = `translateY(${(intro - 1) * 24}px)`;
        introRef.current.style.visibility = intro === 0 ? 'hidden' : 'visible';
      }
      const outro = clamp01((p - 0.8) / 0.12);
      if (outroRef.current) {
        outroRef.current.style.opacity = outro;
        outroRef.current.style.transform = `translateY(${(1 - outro) * 24}px)`;
        outroRef.current.style.visibility = outro === 0 ? 'hidden' : 'visible';
      }
      if (tintRef.current) tintRef.current.style.opacity = 0.6 + 0.4 * clamp01((p - 0.7) / 0.25);
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const range = section.offsetHeight - window.innerHeight;
      apply(range > 0 ? clamp01(-section.getBoundingClientRect().top / range) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [layout, still]);

  const tall = layout ? layout.tall : typeof window !== 'undefined' && window.innerWidth / window.innerHeight < 1.05;
  const film = tall ? filmTall : filmWide;
  const poster = tall ? posterTall : posterWide;

  // Play only while the hero is on screen and the visitor hasn't paused it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const sync = () => {
      if (!paused && visibleRef.current) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      sync();
    });
    if (sectionRef.current) io.observe(sectionRef.current);
    sync();
    return () => io.disconnect();
  }, [paused, film]);

  const pad = layout ? { left: layout.mx, right: layout.mx } : { left: 24, right: 24 };

  return (
    <section ref={sectionRef} className={`ed-lens${still ? ' is-still' : ''}`} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Love, laughter &amp; everything in between.
      </h1>
      <div ref={pinRef} className="ed-lens-pin">
        <video
          key={film}
          ref={videoRef}
          className="ed-lens-film"
          src={film}
          poster={poster}
          muted
          loop
          playsInline
          preload={still ? 'none' : 'auto'}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        <div ref={tintRef} className="ed-lens-tint" aria-hidden="true" />

        {layout ? (
          <svg
            ref={svgRef}
            className="ed-lens-svg"
            viewBox={`0 0 ${layout.w} ${layout.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <mask id="ed-lens-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={layout.w} height={layout.h}>
                <g ref={zoomRef}>
                  <rect width={layout.w} height={layout.h} fill="#fff" />
                  {layout.lines.map((line, i) => (
                    <text
                      key={i}
                      className="ed-lens-word"
                      x={line.x}
                      y={line.y}
                      fontSize={layout.size}
                      fill="#000"
                      stroke="#000"
                      strokeWidth={layout.size * 0.012}
                      strokeLinejoin="round"
                      xmlSpace="preserve"
                      style={{ animationDelay: `${0.2 + i * 0.18}s` }}
                    >
                      {line.runs.map(([text, italic], j) => (
                        <tspan key={j} fontStyle={italic ? 'italic' : 'normal'}>
                          {text}
                        </tspan>
                      ))}
                    </text>
                  ))}
                  <circle
                    className="ed-lens-word"
                    cx={layout.dot.cx}
                    cy={layout.dot.cy}
                    r={layout.dot.r}
                    fill="#000"
                    style={{ animationDelay: `${0.2 + layout.lines.length * 0.18}s` }}
                  />
                </g>
              </mask>
            </defs>
            <rect width={layout.w} height={layout.h} fill={IVORY} mask="url(#ed-lens-mask)" />
            <g ref={ringRef}>
              <circle
                className="ed-lens-ring"
                cx={layout.dot.cx}
                cy={layout.dot.cy}
                r={layout.dot.r * RING_R}
                fill="none"
                stroke={CLAY}
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
        ) : (
          <div className="absolute inset-0 bg-ivory" />
        )}

        <div ref={introRef} className="ed-lens-intro" style={pad}>
          <div className="max-w-[480px]">
            <p className="ed-cap text-clay mb-3">Lifestyle · Commercial · Films</p>
            <p className="m-0 mb-6 text-[#4A433D]">
              Maternity, newborn, milestone and family photography by Tanvi — gentle, patient sessions that turn
              fleeting moments into timeless visual stories.
            </p>
            <div className="flex flex-wrap gap-x-[26px] gap-y-3 items-center">
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
          {!still && (
            <p className="ed-lens-cue ed-cap" aria-hidden="true">
              Scroll to look closer
              <span />
            </p>
          )}
        </div>

        <div ref={outroRef} className="ed-lens-outro" style={pad}>
          <p className="ed-cap text-ivory/80 mb-4">Snippets by Tanvi · Films</p>
          <p className="font-display text-ivory m-0 mb-8 max-w-[920px] text-[clamp(40px,5.6vw,88px)] leading-[0.98] tracking-[-0.01em]">
            Photography is the beauty of <em>life captured.</em>
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 min-h-[52px] px-[30px] rounded-full bg-ivory text-ink text-[15px] font-medium tracking-[0.04em] hover:text-ink"
          >
            Book a session
            <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        <button
          type="button"
          className="ed-lens-toggle"
          style={{ right: pad.right }}
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play the film' : 'Pause the film'}
        >
          {paused ? <Play className="w-4 h-4" strokeWidth={1.5} /> : <Pause className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      </div>
    </section>
  );
};

export default HeroLens;
