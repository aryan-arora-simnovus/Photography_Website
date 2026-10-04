import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const arrowClass =
  'w-[52px] h-[52px] rounded-full border border-ink text-ink inline-flex items-center justify-center hover:bg-ink hover:text-ivory';

const KindWords = ({ items }) => {
  const [index, setIndex] = useState(0);
  const go = (n) => setIndex((n + items.length) % items.length);
  const q = items[index];

  return (
    <div className="text-center">
      <p className="ed-cap text-clay mb-[34px]">Kind words</p>
      <figure key={index} className="ed-fade m-0" aria-live="polite">
        <blockquote className="font-display m-0 text-[clamp(30px,3.6vw,52px)] leading-[1.18] tracking-[-0.01em]">
          “{q.text}”
        </blockquote>
        <figcaption className="ed-cap mt-[30px] text-stone">{q.name}</figcaption>
      </figure>
      <div className="flex justify-center items-center gap-1.5 mt-[34px]">
        <button type="button" className={arrowClass} onClick={() => go(index - 1)} aria-label="Previous review">
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => go(i)}
            aria-label={`Review ${i + 1}`}
            aria-current={i === index}
            className="w-11 h-11 inline-flex items-center justify-center"
          >
            <span className={`block w-2 h-2 rounded-full transition-transform ${i === index ? 'bg-ink scale-150' : 'bg-[#B9AE9F]'}`} />
          </button>
        ))}
        <button type="button" className={arrowClass} onClick={() => go(index + 1)} aria-label="Next review">
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default KindWords;
