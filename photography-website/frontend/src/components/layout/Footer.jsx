import React from 'react';
import { Link } from 'react-router-dom';

const columnTitle = 'text-[12px] tracking-[0.22em] uppercase font-medium text-clay mb-4';
const footerLink = 'block py-1 text-ink hover:text-clay no-underline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ivory text-ink font-body text-[15px] border-t border-line">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 pt-20 pb-10">
        <div className="flex flex-wrap gap-x-16 gap-y-12 justify-between">
          <div className="flex-[1.4_1_280px] max-w-[420px]">
            <Link to="/" className="font-display text-[44px] leading-none text-ink hover:text-ink no-underline">
              Snippets <em>by Tanvi</em>
            </Link>
            <p className="mt-5 text-stone leading-relaxed">
              Moments of love, laughter &amp; everything in between. Maternity, newborn, milestone and family
              photography — lifestyle, commercial &amp; films.
            </p>
          </div>

          <div className="flex-[1_1_160px]">
            <p className={columnTitle}>Explore</p>
            <Link to="/#work" className={footerLink}>Portfolio</Link>
            <Link to="/#stories" className={footerLink}>Stories</Link>
            <Link to="/about" className={footerLink}>About</Link>
            <Link to="/contact" className={footerLink}>Book a session</Link>
          </div>

          <div className="flex-[1_1_200px]">
            <p className={columnTitle}>Say hello</p>
            <a href="mailto:snippetsbytanvi@gmail.com" className={footerLink}>snippetsbytanvi@gmail.com</a>
            <a href="https://www.instagram.com/snippetsbytanvi/" target="_blank" rel="noopener noreferrer" className={footerLink}>
              Instagram — @snippetsbytanvi
            </a>
            <p className="mt-3 text-stone">Surat, Gujarat · available for travel</p>
          </div>

          <div className="flex-[1_1_220px] max-w-[300px]">
            <p className={columnTitle}>Gift memories</p>
            <p className="text-stone leading-relaxed">
              A Snippets photography gift voucher — beautifully packaged and valid for all session types.
            </p>
            <Link to="/contact" className="inline-block mt-3 text-ink border-b border-ink hover:text-clay hover:border-clay no-underline">
              Enquire about vouchers
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-wrap justify-between gap-3 text-[13px] text-stone">
          <p className="m-0">© {currentYear} Snippets by Tanvi. All rights reserved.</p>
          <p className="m-0">Photography is the beauty of life captured.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
