import React from 'react';

export default function LazyImage({ src, alt = '', className = '', ...rest }) {
  // Handle Vite base path for absolute assets
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullSrc = (src && src.startsWith('/') && !src.startsWith(baseUrl))
    ? `${baseUrl.replace(/\/$/, '')}${src}`
    : src;

  return (
    <img
      src={fullSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
