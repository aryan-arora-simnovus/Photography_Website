import HeroSlider from "../components/gallery/HeroSlider";
import FilmStripGallery from "../components/gallery/FilmStripGallery";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import MiniSessions from "../components/home/MiniSessions";
import HomeStories from "./HomeStories";
import CinematicParallax from "../components/common/CinematicParallax";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import LazyImage from '@/components/common/LazyImage';
import aboutImage from "@/assets/custom/webp-images/about2.webp";

const Home = () => {
  // Animation Refs
  const [storiesRef, storiesInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();



  const testimonials = [
    {
      name: "Shivani Jhaveri",
      text: "LOVELY Photos Tanvi!! You captured him so beautifully. Each moment was perfectly preserved and I'm absolutely in love with the results!",
      rating: 5,
    },
    {
      name: "Mohini Merchant",
      text: "I cannot thank you enough for the wonderful pictures! You were so calm and patient, which shows in your work. Some pictures even made my dad cry!",
      rating: 5,
    },
    {
      name: "Sonam",
      text: "Exactly what I had imagined! After seeing the results I'm so happy. Nobody would have done this better than you - you made us look so good!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* About Section — Cinematic Parallax */}
      <CinematicParallax
        title="Capturing Life's Most Precious Moments"
        subtitle="Welcome to Snippets By Tanvi — where we specialize in creating timeless memories for growing families. From the anticipation of pregnancy to the joy of new life, we're here to document every beautiful chapter with a gentle, patient approach."
        bgImage={aboutImage}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <LazyImage src={aboutImage} alt="Tanvi" className="w-full h-full object-cover" />
          </div>
          <Button
            asChild
            size="lg"
            className="bg-nature-moss hover:bg-nature-forest text-white px-8 py-6 rounded-full transition-all duration-300"
          >
            <Link to="/about">Meet Tanvi</Link>
          </Button>
        </div>
      </CinematicParallax>

      {/* Stories Section */}
      <div ref={storiesRef} className={`transition-all duration-1000 ${storiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <HomeStories />
      </div>

      {/* Mini Sessions Showcase */}
      <MiniSessions />

      {/* Film Strip Gallery */}
      <FilmStripGallery />

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 bg-nature-cream/30 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-nature-forest mb-6">
            Client Stories
          </h2>
          <div className="w-20 h-1 bg-nature-moss mx-auto"></div>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      {/* Call to Action */}
      <section className="pt-24 pb-16 bg-nature-forest text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
            Let's Story-Tell Together
          </h2>
          <p className="text-xl text-nature-sage/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Every session is unique and tailored to your family's story. 
            Ready to create something beautiful?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-nature-forest hover:bg-nature-cream transition-all duration-300 px-12 py-8 rounded-full text-lg font-bold"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default Home;
