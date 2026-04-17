import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MagneticCursor from '../common/MagneticCursor';
import PhotoOfTheDay from '../common/PhotoOfTheDay';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MagneticCursor />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <PhotoOfTheDay />
    </div>
  );
};

export default Layout;

