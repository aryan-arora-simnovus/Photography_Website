import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, Camera, Heart, Baby, Users, PartyPopper, Sparkles } from 'lucide-react';
import snippetslogo from '@/assets/custom/webp-images/snippetslogo.webp';
import LazyImage from '@/components/common/LazyImage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioItems = [
    { name: 'Baby Blossom', slug: 'maternity', icon: Heart, description: 'Celebrating the glow of motherhood' },
    { name: 'Lifestyle Family Shoots', slug: 'lifestyle-family-shoots', icon: Baby, description: 'Celebrating little milestones' },
    { name: 'Pre-Wedding Sessions', slug: 'prewedding', icon: Users, description: 'Intimate couple sessions' },
    { name: 'Studio Sessions', slug: 'studio', icon: Camera, description: 'Professional indoor photography' },
    { name: 'Big Fam Jam', slug: 'famjam', icon: Users, description: 'Large multi-generational families' },
    { name: 'Event Photography', slug: 'event', icon: PartyPopper, description: 'Professional event coverage' },
    { name: 'Commercial Shoots', slug: 'commercial', icon: Sparkles, description: 'Editorial and artistic vision' }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const isHomePage = location.pathname === '/';
  const headerTransparencyClass = isScrolled 
    ? 'bg-white/95 py-2 shadow-sm border-b border-nature-sage/10 text-gray-800' 
    : isHomePage
      ? 'bg-transparent py-6 border-transparent text-white'
      : 'bg-white py-4 border-b border-transparent text-gray-800';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerTransparencyClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <NavLink to="/" className="relative z-50 transition-transform duration-300 hover:scale-105">
            <LazyImage
              src={snippetslogo}
              alt="Snippets by Tanvi"
              className={`transition-all duration-500 object-contain brightness-0 invert filter ${
                isScrolled || !isHomePage ? 'brightness-100 invert-0' : ''
              } ${
                isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-20'
              }`}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu className="z-50">
              <NavigationMenuList className="flex space-x-1">
                <NavigationMenuItem>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium transition-all ${
                        isActive 
                          ? (isScrolled || !isHomePage ? 'text-nature-moss font-semibold' : 'text-white font-bold border-b-2 border-white') 
                          : (isScrolled || !isHomePage ? 'text-gray-600 hover:text-nature-forest' : 'text-white/80 hover:text-white')
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`bg-transparent text-sm font-medium ${
                    isScrolled || !isHomePage ? 'text-gray-600 hover:text-nature-forest' : 'text-white hover:text-white/80'
                  }`}>
                    Portfolio
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="md:w-[600px]">
                    <div className="grid w-full gap-2 p-6 md:grid-cols-2 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-xl border border-nature-sage/10 text-gray-800">
                      {portfolioItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <NavigationMenuLink asChild key={item.slug}>
                            <NavLink
                              to={`/category/${item.slug}/albums`}
                            >
                              {({ isActive }) => (
                                <div className={`flex items-center space-x-4 rounded-xl p-3 transition-all duration-300 ${
                                  isActive
                                    ? 'bg-nature-cream/60 text-nature-forest ring-1 ring-nature-moss/20'
                                    : 'hover:bg-nature-cream/40 hover:text-nature-forest text-gray-600'
                                }`}>
                                  <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-white' : 'bg-gray-50 group-hover:bg-white'}`}>
                                    <Icon className="h-5 w-5 text-nature-moss" />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="text-sm font-semibold leading-none">{item.name}</div>
                                    <p className="line-clamp-1 text-xs text-gray-500 font-light">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </NavLink>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium transition-all ${
                        isActive 
                          ? (isScrolled || !isHomePage ? 'text-nature-moss font-semibold' : 'text-white font-bold border-b-2 border-white') 
                          : (isScrolled || !isHomePage ? 'text-gray-600 hover:text-nature-forest' : 'text-white/80 hover:text-white')
                      }`
                    }
                  >
                    About
                  </NavLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild size="sm" className={`${
              isScrolled || !isHomePage ? 'bg-nature-moss hover:bg-nature-forest' : 'bg-white text-nature-forest hover:bg-nature-cream'
            } ml-4 transition-colors duration-300`}>
              <Link to="/contact">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden relative z-50 ${isScrolled || !isHomePage ? 'text-nature-forest' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 animate-scale-in" /> : <Menu className="h-6 w-6 animate-scale-in" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <nav className="space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-2xl font-serif font-bold transition-all ${
                    isActive ? 'text-nature-moss pl-4 border-l-4 border-nature-moss' : 'text-gray-800'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="pt-8 border-t border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Our Portfolio</p>
              <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[40vh] pr-2">
                {portfolioItems.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={`/category/${item.slug}/albums`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-nature-cream/50 flex items-center justify-center group-hover:bg-nature-sage/20 transition-colors">
                      <item.icon className="h-5 w-5 text-nature-forest" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-nature-moss transition-colors">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          
          <div className="mt-auto pb-12">
            <Button asChild className="w-full bg-nature-moss py-6 text-lg">
              <Link to="/contact">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
