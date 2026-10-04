import React from 'react';
import { cld, cldSrcSet } from '@/utils/imageUtils';

export default function LazyImage({ src, alt = '', className = '', sizes = '100vw', ...rest }) {
  // Handle Vite base path for absolute assets
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullSrc = (src && src.startsWith('/') && !src.startsWith(baseUrl))
    ? `${baseUrl.replace(/\/$/, '')}${src}`
    : src;
  const srcSet = cldSrcSet(fullSrc);

  return (
    <img
      src={cld(fullSrc)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
