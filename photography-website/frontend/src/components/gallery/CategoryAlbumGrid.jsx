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

  const inPairs = albums.length % 2 === 0 && albums.length % 3 !== 0;

  return (
    <div className="min-h-screen bg-white">
      <CategoryStaticLayouts slug={categorySlug} />

      {/* Large Modern Album Grid */}
      <section className="pt-10 pb-16 md:pt-32">
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
                    {/* Portrait covers, so the photos show uncropped. Two or four albums sit in pairs; otherwise rows of three. */}
                    <div className={`flex flex-wrap justify-center gap-x-8 gap-y-14 mx-auto ${inPairs ? 'max-w-[880px]' : ''}`}>
                      {albums.map((album, index) => (
                        <BigAlbumCard
                          key={album.id}
                          album={album}
                          categorySlug={categorySlug}
                          index={index}
                          inPairs={inPairs}
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
                  <div className="pt-8 md:pt-24 pb-20 text-center max-w-5xl mx-auto px-4">
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

const BigAlbumCard = ({ album, categorySlug, index, inPairs }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/category/${categorySlug}/album/${album.slug}`}
      className={`ed-zoom ed-fade group block w-full max-w-[420px] sm:w-[calc(50%-16px)] ${
        inPairs ? '' : 'lg:w-[calc((100%-64px)/3)]'
      } text-ink hover:text-ink no-underline`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* 2:3 matches the covers; Cloudinary crops any other shape around the subject. */}
      <span className="block aspect-[2/3] overflow-hidden rounded-sm bg-sand">
        {album.thumbnail_url && !imageError ? (
          <LazyImage
            src={album.thumbnail_url}
            aspect="2:3"
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
            alt={`${album.client_name} preview`}
            className="block w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center">
            <Camera className="h-12 w-12 text-nature-moss opacity-20" />
          </span>
        )}
      </span>
      <span className="flex justify-between items-baseline gap-4 mt-[18px]">
        <span className="font-display text-[30px] leading-[1.1]">{album.client_name}</span>
        <span className="ed-cap text-stone whitespace-nowrap">Vol. {String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className="ed-cap block mt-2.5 text-clay">View collection →</span>
    </Link>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <section className="bg-nature-cream py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="h-12 bg-gray-200 rounded w-96 max-w-full mx-auto mb-6 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-[600px] max-w-full mx-auto animate-pulse"></div>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1296px] mx-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 aspect-[2/3] rounded-sm animate-pulse"
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
