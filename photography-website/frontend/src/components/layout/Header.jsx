import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const portfolioItems = [
  { name: 'Baby Blossom', slug: 'maternity' },
  { name: 'Lifestyle Family', slug: 'lifestyle-family-shoots' },
  { name: 'Pre-Wedding', slug: 'prewedding' },
  { name: 'Studio Sessions', slug: 'studio' },
  { name: 'Big Fam Jam', slug: 'famjam' },
  { name: 'Events', slug: 'event' },
  { name: 'Commercial', slug: 'commercial' },
];

const linkClass = 'text-[15px] text-ink hover:text-clay no-underline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsMenuOpen(false), [location.pathname, location.hash]);

  // While the menu is open the page behind it stays put, and Escape closes it.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur font-body transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_1px_0_#D8CFC2]' : ''
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between gap-8">
          <Link to="/" className="flex flex-col leading-none no-underline text-ink hover:text-ink" aria-label="Snippets by Tanvi — home">
            <span className="font-display text-[34px] tracking-[-0.01em]">Snippets</span>
            <span className="ed-cap text-[10px] tracking-[0.22em] uppercase text-stone mt-1">by Tanvi</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-[30px]">
            <div className="relative group">
              <Link to="/#work" className={`${linkClass} inline-flex items-center gap-1 py-3`} aria-haspopup="true">
                Portfolio <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all absolute left-1/2 -translate-x-1/2 top-full pt-2">
                <ul className="w-64 bg-paper border border-line rounded-md py-3 shadow-[0_24px_48px_-28px_rgba(38,34,31,0.45)] list-none m-0">
                  {portfolioItems.map((item) => (
                    <li key={item.slug}>
                      <NavLink
                        to={`/category/${item.slug}/albums`}
                        className={({ isActive }) =>
                          `block px-5 py-2.5 font-display text-[22px] no-underline hover:bg-sand ${isActive ? 'text-clay' : 'text-ink hover:text-ink'}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link to="/#stories" className={linkClass}>Stories</Link>
            <NavLink to="/about" className={({ isActive }) => `${linkClass} ${isActive ? 'text-clay' : ''}`}>About</NavLink>
            <Link
              to="/contact"
              className="inline-flex items-center min-h-[44px] px-[22px] rounded-full border border-ink text-ink text-[15px] hover:bg-ink hover:text-ivory no-underline"
            >
              Book a session
            </Link>
          </nav>

          <button
            type="button"
            className="lg:hidden w-11 h-11 inline-flex items-center justify-center text-ink"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Outside the header on purpose: the header's backdrop blur would make it the frame for this fixed
          panel, squashing the panel into the header's 80px instead of filling the screen below it. */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-ivory overflow-y-auto overscroll-contain transition-[opacity,transform] duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile" className="px-6 pt-6 pb-12 flex flex-col">
          <p className="ed-cap text-[12px] tracking-[0.22em] uppercase text-clay mb-2">Portfolio</p>
          {portfolioItems.map((item) => (
            <Link
              key={item.slug}
              to={`/category/${item.slug}/albums`}
              tabIndex={isMenuOpen ? 0 : -1}
              className="font-display text-[32px] leading-tight py-1.5 text-ink hover:text-clay no-underline"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-line mt-6 pt-6 flex flex-col gap-3">
            <Link to="/#stories" tabIndex={isMenuOpen ? 0 : -1} className="text-lg text-ink no-underline">Stories</Link>
            <Link to="/about" tabIndex={isMenuOpen ? 0 : -1} className="text-lg text-ink no-underline">About</Link>
          </div>
          <Link
            to="/contact"
            tabIndex={isMenuOpen ? 0 : -1}
            className="mt-8 inline-flex justify-center items-center min-h-[52px] rounded-full bg-ink text-ivory hover:text-ivory no-underline"
          >
            Book a session
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
