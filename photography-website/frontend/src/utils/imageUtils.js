/**
 * Image URL helpers.
 *
 * Portfolio images live on Cloudinary. Requesting them with `f_auto,q_auto`
 * lets Cloudinary serve AVIF/WebP at a visually lossless quality, and a width
 * transform stops phones from downloading full-size originals.
 */
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?!f_auto)/;

export const isCloudinary = (url) => typeof url === 'string' && CLOUDINARY_UPLOAD.test(url);

/** Add Cloudinary delivery transforms; non-Cloudinary URLs are returned untouched. */
export const cld = (url, { width } = {}) => {
  if (!isCloudinary(url)) return url;
  const transforms = ['f_auto', 'q_auto', width && `w_${width},c_limit`].filter(Boolean).join(',');
  return url.replace(CLOUDINARY_UPLOAD, `$1${transforms}/`);
};

const SRCSET_WIDTHS = [480, 800, 1200, 1800, 2400];

/** Responsive srcset for Cloudinary images, or undefined for anything else. */
export const cldSrcSet = (url) =>
  isCloudinary(url) ? SRCSET_WIDTHS.map((w) => `${cld(url, { width: w })} ${w}w`).join(', ') : undefined;

export const getImageUrl = (url) => {
  if (!url) return null;
  return cld(url);
};
