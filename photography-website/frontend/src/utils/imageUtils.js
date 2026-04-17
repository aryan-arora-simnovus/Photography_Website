/**
 * Simplified image utility since we are serving static files directly now.
 */
export const getImageUrl = (url) => {
  if (!url) return null;
  return url;
};
