import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Camera,
  Heart,
  Award,
  Users,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import ReactPlayer from "react-player";
import studio1 from "@/assets/custom/webp-images/studio1.webp";
import studio2 from "@/assets/custom/webp-images/studio2.webp";
import studio3 from "@/assets/custom/webp-images/studio3.webp";
import abouthero from "@/assets/custom/about-hero.MP4";
import about from "@/assets/custom/webp-images/about2.webp";
import family from "@/assets/custom/webp-images/family.webp";
import LazyImage from '@/components/common/LazyImage';
import { useInView } from "../hooks/useInView";

const About = () => {
  // Animation Refs
  const [heroRef, heroInView] = useInView();
  const [videoRef, videoInView] = useInView();
  const [achievementsRef, achievementsInView] = useInView();
  const [philosophyRef, philosophyInView] = useInView();
  const [studioRef, studioInView] = useInView();
  const [servicesRef, servicesInView] = useInView();

  const achievements = [
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Specializing in maternity, newborn, and family photography",
    },
    {
      icon: Users,
      title: "500+ Happy Families",
      description: "Capturing precious moments for families across India",
    },
    {
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistently rated excellent by satisfied clients",
    },
    {
      icon: Heart,
      title: "Certified Professional",
      description: "Professional Photographer",
    },
  ];

  const services = [
    {
      title: "Baby Blossom (Maternity)",
      description:
        "Artistic, soulful portraiture celebrating the radiant magic of motherhood.",
      features: [
        "28-36 weeks ideal timing",
        "Studio or outdoor locations",
        "Partner included",
        "Wardrobe consultation",
      ],
    },
    {
      title: "Newborn Photography",
      description:
        "Gentle, safe sessions capturing your baby's first precious days with artistic poses and natural family interactions.",
      features: [
        "First 2 weeks ideal",
        "Home or studio sessions",
        "Safe posing techniques",
        "Family photos included",
      ],
    },
    {
      title: "Milestone Sessions",
      description:
        "Documenting your baby's growth journey at 3, 6, 9, and 12 months with playful and developmental-appropriate poses.",
      features: [
        "Age-appropriate setups",
        "Developmental milestones",
        "Props and themes",
        "Growth documentation",
      ],
    },
    {
      title: "Family Portraits",
      description:
        "Creating timeless family memories that showcase your unique bond and love, suitable for any season or occasion.",
      features: [
        "All family sizes",
        "Seasonal themes",
        "Multiple locations",
        "Extended family welcome",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-nature-cream py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-nature-forest mb-6">
                Hello, I'm Tanvi
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                A passionate photographer dedicated to capturing life's most
                precious moments with artistry, patience, and love.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                For over 5 years, I've had the privilege of documenting the
                beautiful journey of growing families - from the anticipation of
                pregnancy to the joy of new life and the wonder of childhood
                milestones. Every session is a celebration of love, connection,
                and the unique story that makes your family special.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-nature-moss hover:bg-nature-forest transition-all-refined"
                >
                  <Link to="/contact">Book Your Session</Link>
                </Button>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="bg-nature-sage/20 rounded-2xl p-8">
                <LazyImage
                  src={about}
                  alt="Tanvi - Professional Photographer"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="py-20 bg-gradient-to-br from-nature-cream to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`relative transition-all duration-1000 ${videoInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[580px] rounded-2xl overflow-hidden shadow-2xl">
                <ReactPlayer
                  url={abouthero}
                  controls
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0 rounded-2xl"
                />
              </div>
            </div>
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${videoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl font-serif font-bold text-nature-forest">
                “Hi, I’m Tanvi — the heart and soul behind the lens at Snippets
                by Tanvi.”
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Photography for me isn’t just about clicking pictures — it’s
                about preserving feelings, phases, and fleeting moments that
                often pass us by. Whether it’s the delicate glow of a
                mother-to-be, the yawn of a newborn, or the burst of laughter in
                a family hug, I strive to turn those snippets into timeless
                visual stories.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-light italic">
                Over the years, I’ve been blessed to work with wonderful
                families, expecting parents, giggling toddlers, and couples
                deeply in love. What drives me is the connection I build with
                each of you — understanding your journey and celebrating it with
                sincerity, creativity, and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section ref={achievementsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${achievementsInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-serif font-bold text-nature-forest mb-4">
              Why Families Choose Me
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience, dedication, and a gentle approach that puts families
              at ease while creating beautiful, lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={index} 
                  className={`transition-all duration-1000 delay-${index * 150} ${achievementsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <Card className="text-center group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-nature-cream rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-nature-sage transition-colors">
                        <Icon className="h-8 w-8 text-nature-moss group-hover:text-white" />
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-nature-forest mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section ref={philosophyRef} className="py-20 bg-nature-cream/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`relative overflow-hidden transition-all duration-1000 ${philosophyInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <LazyImage
                src={family}
                alt="Photography session in progress"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg animate-float-up delay-1000">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-400" />
                  <span className="font-serif font-semibold text-nature-forest">
                    Gentle Approach
                  </span>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${philosophyInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-3xl font-serif font-bold text-nature-forest mb-6">
                My Photography Philosophy
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  I believe that the most beautiful photographs happen when
                  families feel comfortable, relaxed, and truly themselves. My
                  approach is gentle, patient, and focused on creating an
                  environment where natural emotions and connections can unfold
                  organically.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <Clock className="h-6 w-6 text-nature-moss mb-3" />
                    <h4 className="font-serif font-semibold text-nature-forest mb-1">
                      Flexible Timing
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sessions adapt to your baby's unique schedule
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <MapPin className="h-6 w-6 text-nature-moss mb-3" />
                    <h4 className="font-serif font-semibold text-nature-forest mb-1">
                      Your Choice
                    </h4>
                    <p className="text-sm text-gray-600">
                      Studio or outdoor; wherever you feel home
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section ref={studioRef} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${studioInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-nature-forest">
              The Heart of Our Creative Home
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
              Designed to feel like home, our space embraces natural textures, 
              cozy corners, and a touch of magic for every session.
            </p>
          </div>

          <div className={`w-full h-[500px] mb-12 rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 delay-200 ${studioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <LazyImage
              src={studio2}
              alt="Studio Interior"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className={`w-full md:w-1/2 h-[450px] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 delay-400 ${studioInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <LazyImage
                src={studio1}
                alt="Studio Setup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className={`w-full md:w-1/2 h-[450px] rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 delay-600 ${studioInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <LazyImage
                src={studio3}
                alt="Studio Decor"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 bg-nature-cream/20">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-700 ${servicesInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-serif font-bold text-nature-forest mb-4">
              Photography Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specializing in documenting your family's journey with artistry and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`transition-all duration-1000 delay-${index * 150} ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-none bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-nature-forest">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-nature-sage/20 flex items-center justify-center">
                            <span className="text-nature-forest text-xs">✓</span>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
