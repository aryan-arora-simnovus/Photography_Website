import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PEEK_HALF_WIDTH = 150;

const WorkList = ({ categories }) => {
  const [hovered, setHovered] = useState(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.min(r.width - PEEK_HALF_WIDTH, Math.max(PEEK_HALF_WIDTH, e.clientX - r.left));
    setPos({ x, y: e.clientY - r.top });
  };

  const peek = categories[hovered >= 0 ? hovered : 0];

  return (
    <div
      className="ed-list relative border-b border-line"
      onPointerMove={handleMove}
      onPointerLeave={() => setHovered(-1)}
    >
      <div
        className={`ed-peek ${hovered >= 0 ? 'is-on' : ''}`}
        style={{ left: pos.x, top: pos.y }}
        aria-hidden="true"
      >
        <img src={peek.image} alt="" />
      </div>
      {categories.map((c, i) => (
        <Link
          key={c.slug}
          to={`/category/${c.slug}/albums`}
          className="ed-row flex items-baseline gap-6 py-[22px] border-t border-line text-ink hover:text-ink no-underline"
          onPointerEnter={() => setHovered(i)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(-1)}
        >
          <span className="ed-cap flex-none w-[34px] text-[#9A9086]">{String(i + 1).padStart(2, '0')}</span>
          <span className="font-display flex-1 leading-none text-[clamp(38px,5.4vw,84px)]">{c.name}</span>
          <span className="hidden sm:block flex-none basis-[280px] text-right text-stone text-[15px]">{c.description}</span>
        </Link>
      ))}
    </div>
  );
};

export default WorkList;
