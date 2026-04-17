import React from 'react';
import LazyImage from '@/components/common/LazyImage';

export default function FullBleedImage({ src, alt, isLandscape = false }) {
  return (
    <figure className="w-screen relative left-1/2 right-1/2 -mx-[50vw] my-8">
      <LazyImage
        src={src}
        alt={alt}
        className={`w-full object-contain ${
          isLandscape ? 'max-h-[500px]' : 'max-h-[800px]'
        }`}
      />
    </figure>
  );
}