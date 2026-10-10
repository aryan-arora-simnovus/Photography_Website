// components/InlineReel.jsx
import React, { useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import LazyImage from '@/components/common/LazyImage';

// `aspect` is the poster's shape (CSS ratio); the video letterboxes inside it rather than being cropped.
export default function InlineReel({ poster, src, className = '', aspect = '9 / 16' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [w, h] = aspect.split('/').map(Number);
  const isWide = w > h;

  return (
    <div className={`relative mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl ${isWide ? '' : 'max-w-sm'} ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {isPlaying ? (
          <div className="relative w-full h-full">
            <video
              src={src} 
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain"
            />
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <Play className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative block w-full h-full focus:outline-none"
          >
            <LazyImage
              src={poster}
              alt="Play reel"
              className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:bg-white transition-colors duration-300">
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </div>
            </div>
            {/* Reel Label */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-800">Watch Reel</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
