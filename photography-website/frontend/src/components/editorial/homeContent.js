// Web-sized (1600px) copies of photos from assets/custom/webp-images, made for the homepage.
import maternityBanner from '@/assets/custom/home/maternitybanner.webp';
import momBabyWindow from '@/assets/custom/home/maternity-extra-2.webp';
import coupleHug from '@/assets/custom/home/megha-mosaic-3.webp';
import momToddlerLaugh from '@/assets/custom/home/reva-1.webp';
import studioTutu from '@/assets/custom/home/maternity-extra-3.webp';
import famjamBanner from '@/assets/custom/home/famjambanner.webp';
import eventBanner from '@/assets/custom/home/eventbanner.webp';
import commercialBanner from '@/assets/custom/home/fashionbanner.webp';
import coupleUnderTree from '@/assets/custom/home/megha-letter1.webp';
import milestoneBoard from '@/assets/custom/home/reva-4.webp';
import styledWithSoul from '@/assets/custom/home/eshita-extra-1.webp';
import bwCouple from '@/assets/custom/home/story2.webp';
import momWithKids from '@/assets/custom/home/maternity-extra-1.webp';
import newbornParents from '@/assets/custom/home/studiobanner.webp';
import liftUp from '@/assets/custom/home/reva-6.webp';
import picnic from '@/assets/custom/home/preweddingbanner.webp';
import silhouette from '@/assets/custom/home/anniversary-banner.webp';
import tanviPortrait from '@/assets/custom/home/about2.webp';

export const heroSlides = [
  { src: momBabyWindow, alt: 'Mother holding her baby by a window', label: 'Newborn' },
  { src: coupleHug, alt: 'Couple embracing outdoors', label: 'Pre-wedding' },
  { src: momToddlerLaugh, alt: 'Mother and toddler laughing together', label: 'Lifestyle family' },
  { src: maternityBanner, alt: 'Expectant mother lying among flowers', label: 'Baby Blossom' },
];

// Slugs match the existing /category/:categorySlug/albums routes.
export const workCategories = [
  { name: 'Baby Blossom', slug: 'maternity', description: 'Celebrating the glow of motherhood', image: maternityBanner },
  { name: 'Lifestyle Family', slug: 'lifestyle-family-shoots', description: 'Celebrating little milestones', image: momToddlerLaugh },
  { name: 'Pre-Wedding', slug: 'prewedding', description: 'Intimate couple sessions', image: coupleHug },
  { name: 'Studio Sessions', slug: 'studio', description: 'Professional indoor photography', image: studioTutu },
  { name: 'Big Fam Jam', slug: 'famjam', description: 'Large multi-generational families', image: famjamBanner },
  { name: 'Events', slug: 'event', description: 'Professional event coverage', image: eventBanner },
  { name: 'Commercial', slug: 'commercial', description: 'Editorial and artistic vision', image: commercialBanner },
];

export const stories = [
  { title: 'Love Woven in Letters', kind: 'Pre-wedding', subtitle: 'A timeless love story', to: '/stories/love-woven-in-letters', image: coupleUnderTree, alt: 'Couple sitting under a tree' },
  { title: 'Quiet Joys', kind: 'Lifestyle', subtitle: 'The beauty of small moments', to: '/stories/quiet-joys', image: milestoneBoard, alt: 'Little girl beside a milestone chalkboard' },
  { title: 'Styled With Soul', kind: 'Lifestyle', subtitle: 'A lifestyle narrative', to: '/stories/styled-with-soul', image: styledWithSoul, alt: 'Woman in red at home with her French bulldog' },
];

// Three columns that drift at different speeds as the page scrolls.
export const recentFrames = [
  {
    speed: 40,
    frames: [
      { src: maternityBanner, alt: 'Expectant mother lying among flowers', ratio: '4 / 5' },
      { src: bwCouple, alt: 'Couple by a lake in black and white', ratio: '3 / 2' },
      { src: momWithKids, alt: 'Mother with her two children', ratio: '4 / 5' },
    ],
  },
  {
    speed: -50,
    offset: true,
    frames: [
      { src: newbornParents, alt: 'Parents lying with their newborn', ratio: '3 / 2' },
      { src: liftUp, alt: 'Mother lifting her laughing child', ratio: '4 / 5' },
      { src: picnic, alt: 'Couple picnicking on a lawn', ratio: '3 / 2' },
    ],
  },
  {
    speed: 70,
    frames: [
      { src: studioTutu, alt: 'Toddler in a tutu in the studio', ratio: '4 / 5' },
      { src: silhouette, alt: 'Silhouette of a mother lifting her baby', ratio: '4 / 5' },
      { src: famjamBanner, alt: 'Family running across a lakeside lawn', ratio: '3 / 2' },
    ],
  },
];

export const testimonials = [
  { text: 'I cannot thank you enough for the wonderful pictures! You were so calm and patient, which shows in your work. Some pictures even made my dad cry!', name: 'Mohini Merchant' },
  { text: 'Lovely photos Tanvi! You captured him so beautifully. Each moment was perfectly preserved and I’m absolutely in love with the results!', name: 'Shivani Jhaveri' },
  { text: 'Exactly what I had imagined! Nobody would have done this better than you — you made us look so good!', name: 'Sonam' },
];

export const about = { portrait: tanviPortrait, contactImage: coupleUnderTree };
