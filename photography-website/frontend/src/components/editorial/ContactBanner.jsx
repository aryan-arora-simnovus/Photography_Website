import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { about } from './homeContent';

/** Full-width "Let's preserve yours" call to action used at the foot of pages. */
const ContactBanner = ({ image = about.contactImage }) => (
  <section className="px-6 md:px-8 pb-[120px]">
    <div className="relative max-w-[1296px] mx-auto rounded-md overflow-hidden min-h-[560px] flex items-end">
      <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[rgba(28,24,21,0.45)]" />
      <div className="relative p-[clamp(32px,6vw,80px)] text-ivory max-w-[760px]">
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
