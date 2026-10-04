import React, { useEffect, useRef } from 'react';

/** Three photo columns that drift at different speeds while the section scrolls past. */
const RecentFrames = ({ columns }) => {
  const sectionRef = useRef(null);
  const columnRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      columns.forEach((col, i) => {
        const node = columnRefs.current[i];
        if (node) node.style.transform = `translateY(${Math.round(progress * col.speed)}px)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [columns]);

  return (
    <div ref={sectionRef} className="flex flex-wrap gap-7 items-start">
      {columns.map((col, i) => (
        <div
          key={i}
          ref={(node) => { columnRefs.current[i] = node; }}
          className={`flex flex-col gap-7 flex-[1_1_260px] min-w-0 will-change-transform ${col.offset ? 'md:mt-[90px]' : ''}`}
        >
          {col.frames.map((f) => (
            <div key={f.alt} className="ed-zoom block overflow-hidden rounded" style={{ aspectRatio: f.ratio }}>
              <img src={f.src} alt={f.alt} loading="lazy" decoding="async" className="block w-full h-full object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecentFrames;
