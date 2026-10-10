// components/InlineReel.jsx
import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import LazyImage from '@/components/common/LazyImage';

// `aspect` is the poster's shape (CSS ratio); the video letterboxes inside it rather than being cropped.
// Without a `src` the card shows just the poster, so a reel that isn't online yet never offers a dead play button.
export default function InlineReel({ poster, src, className = '', aspect = '9 / 16', alt = 'Still from the film' }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [w, h] = aspect.split('/').map(Number);
  const isWide = w > h;
  const posterSizes = isWide ? '(min-width: 1024px) 560px, 100vw' : '384px';
  const frameClass = `relative mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl ${isWide ? '' : 'max-w-sm'} ${className}`;

  if (!src) {
    return (
      <div className={frameClass}>
        <div className="relative w-full" style={{ aspectRatio: aspect }}>
          <LazyImage src={poster} alt={alt} sizes={posterSizes} className="block w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  // play() runs inside the click itself, so phones allow it to start with sound.
  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
  };

  return (
    <div className={frameClass}>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        <video
          ref={videoRef}
          src={src}
          preload="none"
          playsInline
          loop
          controls={started}
          className="block w-full h-full object-contain"
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label="Play reel"
            className="group absolute inset-0 block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LazyImage
              src={poster}
              sizes={posterSizes}
              alt=""
              className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Button Overlay */}
            <span className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
              <span className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </span>
            </span>
            {/* Reel Label */}
            <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              Watch Reel
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
