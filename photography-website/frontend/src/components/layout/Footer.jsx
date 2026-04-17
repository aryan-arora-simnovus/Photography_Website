import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Heart } from 'lucide-react';
import AnimatedSignature from '../common/AnimatedSignature';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nature-forest text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-nature-sage" />
              <span className="text-xl font-serif font-semibold">
                Snippets By Tanvi
              </span>
            </Link>
            <p className="text-nature-sage leading-relaxed">
              Capturing life's most precious moments through the lens of creativity and love. 
              Specializing in maternity, newborn, and family photography.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/snippetsbytanvi/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-nature-sage hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
          

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-nature-sage hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-nature-sage hover:text-white transition-colors"
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                className="block text-nature-sage hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-nature-sage" />
                <a 
                  href="mailto:snippetsbytanvi@gmail.com"
                  className="text-nature-sage hover:text-white transition-colors"
                >
                  snippetsbytanvi@gmail.com
                </a>
              </div>
            
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-nature-sage mt-0.5" />
                <span className="text-nature-sage">
                  Surat, Gujarat<br />
                  Available for travel
                </span>
              </div>
            </div>
          </div>
          {/* Gift Vouchers Section */}
<div className="space-y-4">
  <h3 className="text-lg font-serif font-semibold">Gift Memories</h3>
  <p className="text-nature-sage leading-relaxed">
    Gift your loved ones the joy of timeless memories with a <strong>Snippets by Tanvi</strong> photography gift voucher.
  </p>
  <p className="text-nature-sage text-sm italic">
    Beautifully packaged & valid for all session types.
  </p>
  <a 
    href="/contact" 
    className="inline-block text-sm font-medium text-white bg-nature-sage px-4 py-2 rounded hover:bg-white hover:text-nature-forest transition-all duration-200"
  >
    Enquire Now
  </a>
</div>

        </div>


        
        <div className="border-t border-nature-sage/20 mt-8 pt-8">
          {/* Animated Signature */}
          <div className="flex justify-center mb-6">
            <AnimatedSignature color="#a6b697" className="relative" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-nature-sage text-sm">
              © {currentYear} Snippets By Tanvi. All rights reserved.
            </p>
            <p className="text-nature-sage text-sm flex items-center space-x-1 mt-2 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for capturing memories</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
