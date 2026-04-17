// components/gallery/CategoryAlbumGrid.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Camera,
  Users,
  ArrowLeft,
  User,
} from "lucide-react";
import CategoryStaticLayouts from "@/components/gallery/CategoryStaticLayouts";
import LazyImage from '@/components/common/LazyImage';

import { useCategories, usePhotos, useAlbums } from "../../hooks/usePhotos";
import { getImageUrl } from "../../utils/imageUtils";
import PhotoGallery from "./PhotoGallery";

const categoryHeadlines = {
  maternity: {
    subtitle: "The Beginning of Love",
    description: "Honoring the radiant glow and the quiet anticipation of new beginnings."
  },
  "lifestyle-family-shoots": {
    subtitle: "Tiny Miracles",
    description: "Capturing the pure essence and gentle curiosity of your little ones."
  },
  baby: {
    subtitle: "Tiny Miracles",
    description: "Capturing the pure essence and gentle curiosity of your little ones."
  },
  prewedding: {
    subtitle: "Before the Vows",
    description: "Quiet moments of connection and the beautiful promise of forever."
  },
  studio: {
    subtitle: "Personal Narratives",
    description: "Artistic portraits captured in the stillness of our creative space."
  },
  famjam: {
    subtitle: "The Family Bond",
    description: "Laughter, legacy, and the beautiful chaos that makes your family whole."
  },
  event: {
    subtitle: "Cycles of Joy",
    description: "Preserving the energy and excitement of life's greatest celebrations."
  },
  commercial: {
    subtitle: "Commercial Visions",
    description: "Merging style and storytelling for a distinctive visual identity."
  }
};

const CategoryAlbumGrid = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const { categories, loading: categoriesLoading } = useCategories();
  
  // For categories without albums, we fetch photos directly
  const currentCategory = categories.find(c => c.slug === categorySlug);
  const { photos: directPhotos, loading: photosLoading } = usePhotos({ 
    category: categorySlug,
    active: !!(currentCategory?.has_no_albums) 
  });

  const { albums, loading: albumsLoading } = useAlbums(categorySlug);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoriesLoading) {
      fetchCategoryData();
    }
  }, [categorySlug, searchParams, categoriesLoading]);

  const fetchCategoryData = async () => {
    const cat = categories.find(c => c.slug === categorySlug) || { name: categorySlug };
    setCategory(cat);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCategoryData();
  };

  const sessionTypes = [
    { value: "studio", label: "Studio Session" },
    { value: "outdoor", label: "Outdoor Session" },
    { value: "home", label: "Home Session" },
    { value: "lifestyle", label: "Lifestyle Session" },
    { value: "portrait", label: "Portrait Session" },
  ];

  if (categoriesLoading || albumsLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simplified Filters */}
      <CategoryStaticLayouts slug={categorySlug} />

      <section className="bg-white shadow-sm py-8 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between max-w-4xl mx-auto">
          </div>
        </div>
      </section>

      {/* Large Modern Album Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* 1. If Category has albums */}
            {!category?.has_no_albums && (
              <div className="mb-20">
                {albums.length > 0 ? (
                  <>
                    <div className="text-center mb-16">
                      <h2 className="text-5xl md:text-7xl font-serif font-extralight text-nature-forest mb-6 tracking-tight">
                        The Lookbook
                      </h2>
                      <div className="w-24 h-1 bg-nature-moss mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {albums.map((album, index) => (
                        <BigAlbumCard
                          key={album.id}
                          album={album}
                          categorySlug={categorySlug}
                          index={index}
                        />
                      ))}
                    </div>
                  </>
                ) : !directPhotos || directPhotos.length === 0 ? (
                  <EmptyState categoryName={category?.title || category?.name} />
                ) : null}
              </div>
            )}

            {/* 2. If Category has direct photos (no albums or mixed) */}
            {directPhotos && directPhotos.length > 0 && (
              <div>
                  <div className="pt-24 pb-20 text-center max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-6 mb-8">
                       <div className="h-[1px] w-12 bg-nature-moss/20"></div>
                       <span className="text-nature-moss text-[10px] tracking-[0.8em] uppercase font-bold">
                         {categoryHeadlines[categorySlug]?.subtitle || 'The Collection'}
                       </span>
                       <div className="h-[1px] w-12 bg-nature-moss/20"></div>
                    </div>
                    
                    <h1 className="text-6xl md:text-9xl font-serif font-extralight text-nature-forest mb-12 tracking-tighter leading-none italic">
                      {albums.length > 0 ? "Studio's Soul" : currentCategory?.title}
                    </h1>
                    
                    <div className="h-[1px] w-24 bg-nature-moss/30 mx-auto mb-12"></div>
                    
                    <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed italic">
                      {categoryHeadlines[categorySlug]?.description || "A curated journey through timeless love, captured with a gentle lens and a soulful perspective."}
                    </p>
                  </div>
                <PhotoGallery photos={directPhotos} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const BigAlbumCard = ({ album, categorySlug, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div
      className="group relative bg-white overflow-hidden transition-all duration-1000 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.15}s`,
        animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <Link to={`/category/${categorySlug}/album/${album.slug}`} className="block">
        {/* Cinematic Image Container */}
        <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
          {album.thumbnail_url && !imageError ? (
            <LazyImage
              src={getImageUrl(album.thumbnail_url)}
              alt={`${album.client_name} preview`}
              className="w-full h-full object-cover object-[center_30%] transition-transform duration-[2s] scale-100 group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-nature-sage/10 flex items-center justify-center">
              <Camera className="h-12 w-12 text-nature-moss opacity-20" />
            </div>
          )}

          {/* Minimalist Signature Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
             <div className="flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase font-light translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  Vol. {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-extralight text-white leading-tight tracking-tight">
                  {album.client_name}
                </h3>
             </div>
          </div>
          
          {/* Decorative Corner Tag */}
          <div className="absolute top-8 right-8 overflow-hidden">
             <div className="h-[1px] w-0 group-hover:w-16 bg-white/40 transition-all duration-1000 delay-300"></div>
          </div>
        </div>

        {/* Caption below image for that magazine look */}
        <div className="py-6 flex justify-between items-center px-2">
           <div className="h-[1px] w-8 bg-nature-moss/30"></div>
           <span className="text-[9px] tracking-[0.4em] uppercase text-nature-moss/60 font-semibold group-hover:text-nature-moss transition-colors">
              View Collection
           </span>
           <div className="h-[1px] w-8 bg-nature-moss/30"></div>
        </div>
      </Link>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <section className="bg-nature-cream py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-[600px] mx-auto animate-pulse"></div>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 aspect-[4/3] rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const EmptyState = ({ categoryName }) => (
  <div className="text-center py-24">
    <User className="h-24 w-24 text-gray-300 mx-auto mb-8" />
    <h3 className="text-3xl font-serif text-gray-600 mb-6">
      No client albums yet
    </h3>
    <p className="text-xl text-gray-500 mb-12">
      Client albums for {categoryName} will be added soon.
    </p>
  </div>
);

export default CategoryAlbumGrid;
