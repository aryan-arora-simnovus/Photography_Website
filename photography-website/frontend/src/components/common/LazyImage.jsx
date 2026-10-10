import React, { useCallback, useState } from 'react';
import { cld, cldSrcSet } from '@/utils/imageUtils';

// Phones at 3x pixel density would fetch each photo at three times its on-screen width. Past about
// 2x the extra detail can't be seen, so shrink `sizes` to make the browser pick a 2x file instead.
const MAX_DENSITY = 2;
const capDensity = (sizes) => {
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  if (dpr <= MAX_DENSITY) return sizes;
  const k = MAX_DENSITY / dpr;
  return sizes
    .split(',')
    .map((part) => part.replace(/(\d+(?:\.\d+)?)(px|vw)\s*$/, (_, n, unit) => `${+(n * k).toFixed(1)}${unit}`))
    .join(',');
};

/**
 * Responsive image. Cloudinary photos get AVIF/WebP and a srcset, so pass `sizes` for the
 * slot the image fills (the default assumes full width). Every image stays hidden until it
 * has decoded and then fades in over its frame's placeholder, rather than painting in strips.
 */
export default function LazyImage({ src, alt = '', className = '', sizes = '100vw', aspect, onLoad, onError, ...rest }) {
  // Handle Vite base path for absolute assets
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullSrc = (src && src.startsWith('/') && !src.startsWith(baseUrl))
    ? `${baseUrl.replace(/\/$/, '')}${src}`
    : src;
  const srcSet = cldSrcSet(fullSrc, { aspect });

  // Keyed by source so a new photo in the same <img> fades in again.
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loaded = loadedSrc === fullSrc;
  // A cached image can finish before React attaches onLoad.
  const ref = useCallback((node) => {
    if (node?.complete && node.naturalWidth) setLoadedSrc(fullSrc);
  }, [fullSrc]);

  return (
    <img
      ref={ref}
      src={cld(fullSrc, { aspect })}
      srcSet={srcSet}
      sizes={srcSet ? capDensity(sizes) : undefined}
      alt={alt}
      className={`${className} ${loaded ? 'ed-img-in' : 'ed-img-wait'}`}
      loading="lazy"
      decoding="async"
      onLoad={(e) => { setLoadedSrc(fullSrc); onLoad?.(e); }}
      onError={(e) => { setLoadedSrc(fullSrc); onError?.(e); }}
      {...rest}
    />
  );
}
