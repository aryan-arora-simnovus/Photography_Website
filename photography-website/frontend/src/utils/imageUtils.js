/**
 * Image URL helpers.
 *
 * Portfolio images live on Cloudinary. Requesting them with `f_auto,q_auto`
 * lets Cloudinary serve AVIF/WebP at a visually lossless quality, and a width
 * transform stops phones from downloading full-size originals.
 */
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(?!f_auto)/;

export const isCloudinary = (url) => typeof url === 'string' && CLOUDINARY_UPLOAD.test(url);

/**
 * Add Cloudinary delivery transforms; non-Cloudinary URLs are returned untouched.
 * `aspect` (e.g. '2:3') crops to that shape around the subject Cloudinary detects,
 * so a frame that doesn't match the photo never cuts through faces.
 */
export const cld = (url, { width, aspect } = {}) => {
  if (!isCloudinary(url)) return url;
  const transforms = aspect
    ? ['f_auto', 'q_auto', 'c_fill', 'g_auto', `ar_${aspect}`, width && `w_${width}`]
    : ['f_auto', 'q_auto', width && `w_${width},c_limit`];
  return url.replace(CLOUDINARY_UPLOAD, `$1${transforms.filter(Boolean).join(',')}/`);
};

const SRCSET_WIDTHS = [480, 800, 1200, 1800, 2400];

/** Responsive srcset for Cloudinary images, or undefined for anything else. */
export const cldSrcSet = (url, { aspect } = {}) =>
  isCloudinary(url)
    ? SRCSET_WIDTHS.map((w) => `${cld(url, { width: w, aspect })} ${w}w`).join(', ')
    : undefined;

const CLOUDINARY_VIDEO = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload\/)(?!q_auto|so_)/;

/**
 * Web-sized H.264 MP4 of a Cloudinary video, fitted inside a `size`-pixel square so portrait
 * and landscape films come out equally light; the uploaded originals can be 70 MB or more.
 */
export const cldVideo = (url, { size = 1280 } = {}) =>
  typeof url === 'string' ? url.replace(CLOUDINARY_VIDEO, `$1q_auto,w_${size},h_${size},c_limit/`) : url;

/** A frame from two seconds into a Cloudinary video, to use as its poster. */
export const cldVideoPoster = (url, { width = 960 } = {}) =>
  typeof url === 'string' && CLOUDINARY_VIDEO.test(url)
    ? url.replace(CLOUDINARY_VIDEO, `$1so_2,f_auto,q_auto,w_${width},c_limit/`).replace(/\.\w+$/, '.jpg')
    : undefined;

export const getImageUrl = (url) => {
  if (!url) return null;
  return cld(url);
};
