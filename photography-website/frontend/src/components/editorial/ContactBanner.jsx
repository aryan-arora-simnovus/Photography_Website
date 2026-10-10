import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LazyImage from '@/components/common/LazyImage';
import { about } from './homeContent';

/**
 * "Let's preserve yours" call to action used at the foot of pages. The photo (portrait, 2:3)
 * sits beside the words in its own frame rather than behind them, so it is never cropped.
 */
const ContactBanner = ({ image = about.contactImage }) => (
  <section className="px-6 md:px-8 pb-[120px]">
    <div className="max-w-[1296px] mx-auto rounded-md overflow-hidden bg-ink flex flex-col md:flex-row">
      <LazyImage
        src={image}
        alt=""
        sizes="(min-width: 768px) 440px, 100vw"
        className="block w-full aspect-[2/3] object-cover md:w-[min(40%,440px)] md:flex-none md:order-2"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-end p-[clamp(32px,6vw,80px)] text-ivory">
        <p className="font-display italic text-2xl mb-3.5">Photography is the beauty of life captured.</p>
        <h2 className="font-display font-normal mb-[34px] text-[clamp(52px,7vw,112px)] leading-[0.95] tracking-[-0.02em]">
          Let&apos;s preserve <em>yours.</em>
        </h2>
        <div className="flex flex-wrap gap-x-[26px] gap-y-3.5 items-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 min-h-[52px] px-[30px] rounded-full bg-ivory text-ink text-[15px] font-medium tracking-[0.04em] hover:text-ink"
          >
            Book a session
            <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <a href="mailto:snippetsbytanvi@gmail.com" className="ed-ul text-ivory hover:text-ivory">
            snippetsbytanvi@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactBanner;
