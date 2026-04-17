// components/gallery/AlbumGallery.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PhotoGallery from "./PhotoGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Share2,
  Download,
  MapPin,
  User,
  Clock,
} from "lucide-react";

import { usePhotos } from "../../hooks/usePhotos";
import { getImageUrl } from "../../utils/imageUtils";

const AlbumGallery = () => {
  const { categorySlug, albumSlug } = useParams();
  const [category, setCategory] = useState(null);
  const { photos, loading, error } = usePhotos({ category: categorySlug, album: albumSlug });
  
  const album = {
    client_name: albumSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category_name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    session_date: new Date().toISOString(),
    photo_count: photos.length,
    description: `A stunning collection from the ${albumSlug.replace(/-/g, ' ')} session.`,
    location: 'Studio Session',
    photos: photos
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${album.client_name} - ${album.category_name} Photography`,
          text: album.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) return <AlbumLoadingSkeleton />;
  if (error) return <ErrorState error={error} categorySlug={categorySlug} />;
  if (!album) return <NotFoundState categorySlug={categorySlug} />;

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Magazine Split Hero */}
      <section className="relative min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
        {/* Left Side: Typography & Story */}
        <div className="w-full lg:w-[40%] p-12 lg:p-24 flex flex-col justify-center relative z-10 bg-white">
          <Link
            to={`/category/${categorySlug}/albums`}
            className="inline-flex items-center text-nature-moss/60 hover:text-nature-moss mb-20 transition-all duration-500 uppercase tracking-[0.4em] text-[10px] font-bold group"
          >
            <ArrowLeft className="h-3 w-3 mr-3 group-hover:-translate-x-2 transition-transform" />
            Back to {album.category_name}
          </Link>

          <div className="space-y-12">
            <div>
              <span className="text-nature-moss/40 text-[10px] tracking-[0.6em] uppercase font-bold block mb-4">
                Series No. {String(Math.floor(Math.random() * 90) + 10)}
              </span>
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-serif font-extralight text-nature-forest leading-[1.1] tracking-tighter">
                {album.client_name}
              </h1>
            </div>

            <div className="max-w-md">
              <p className="text-lg text-gray-500 font-light leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:mr-1 first-letter:text-nature-moss">
                {album.description}
              </p>
            </div>

            <div className="pt-8">
              <div className="flex items-center gap-4 text-nature-moss/60">
                 <div className="h-[1px] w-12 bg-nature-moss/30"></div>
                 <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Begin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Cover Image */}
        <div className="w-full lg:w-[60%] h-[60vh] lg:h-screen relative overflow-hidden bg-nature-cream/20">
          {album.photos && album.photos[0] && (
            <img 
              src={getImageUrl(album.photos[0].image)} 
              alt={`${album.client_name} cover`} 
              className="w-full h-full object-cover"
            />
          )}
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-nature-forest/5 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 px-4">
             <div className="h-[1px] flex-grow bg-nature-sage/10"></div>
             <span className="text-[10px] tracking-[0.8em] uppercase text-nature-moss/40 font-bold">The Collection</span>
             <div className="h-[1px] flex-grow bg-nature-sage/10"></div>
          </div>

          {album.photos && album.photos.length > 0 ? (
            <PhotoGallery photos={album.photos} />
          ) : (
            <EmptyPhotosState albumName={album.client_name} />
          )}
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-32 bg-nature-cream/10 border-t border-nature-sage/5">
        <div className="container mx-auto px-4 text-center">
           <span className="text-[10px] tracking-[0.5em] uppercase text-nature-moss/30 font-bold block mb-8">Next Chapter</span>
           <Link 
             to={`/category/${categorySlug}/albums`}
             className="text-4xl md:text-5xl font-serif text-nature-forest hover:text-nature-moss transition-colors duration-500 italic"
           >
             Continue Exploring {album.category_name}
           </Link>
        </div>
      </section>
    </div>
  );
};

// Loading, Error, and Empty state components...
const AlbumLoadingSkeleton = () => (
  <div className="min-h-screen bg-white">
    <section className="bg-nature-cream py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>
    </section>

    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 aspect-square rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ErrorState = ({ error, categorySlug }) => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-serif text-gray-800 mb-4">
        Album Not Found
      </h2>
      <p className="text-gray-600 mb-8">{error}</p>
      <Link to={`/category/${categorySlug}`}>
        <Button className="bg-nature-moss hover:bg-nature-forest">
          Back to Albums
        </Button>
      </Link>
    </div>
  </div>
);

const EmptyPhotosState = ({ albumName }) => (
  <div className="text-center py-20">
    <Camera className="h-20 w-20 text-gray-300 mx-auto mb-6" />
    <h3 className="text-2xl font-serif text-gray-600 mb-4">No photos yet</h3>
    <p className="text-gray-500">
      Photos for {albumName}'s session will be added soon.
    </p>
  </div>
);

export default AlbumGallery;
