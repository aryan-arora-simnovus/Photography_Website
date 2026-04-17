// Enhanced HomeStories.jsx with Magazine Layout
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Calendar, User } from 'lucide-react';
import story1 from '@/assets/custom/webp-images/story1.webp';
import story2 from '@/assets/custom/webp-images/story2.webp';
import story3 from '@/assets/custom/webp-images/story3.webp';

const stories = [
  {
    slug: 'styled-with-soul',
    title: 'Styled With Soul',
    subtitle: 'A Lifestyle Narrative',
    excerpt: "When your home is an extension of your soul, every corner speaks — capturing a world that feels uniquely personal...",
    bgImage: story1,
    type: 'lifestyle',
    readTime: '5 min read',
    featured: true
  },
  {
    slug: 'love-woven-in-letters',
    title: 'Love Woven in Letters',
    subtitle: 'A Timeless Love Story',
    excerpt: "Some stories aren't told—they're felt. A love that looks like an era gone by, captured in its purest form...",
    bgImage: story2,
    type: 'pre-wedding',
    readTime: '4 min read',
    featured: false
  },
  {
    slug: 'quiet-joys',
    title: 'Quiet Joys',
    subtitle: 'The Beauty of Small Moments',
    excerpt: 'From morning yawns to tiny feet padding across the floor, every detail feels like magic in this intimate session...',
    bgImage: story3,
    type: 'newborn',
    readTime: '3 min read',
    featured: false
  },
];

export default function HomeStories() {
  return (
    <section className="py-24 bg-gradient-to-br from-nature-cream/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
       
          <h2 className="text-5xl font-serif font-bold text-nature-forest mb-6">
            Behind Every Frame
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the stories behind our most cherished photography sessions, 
            where moments become memories and emotions are captured forever.
          </p>
        </div>

        {/* Magazine-Style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Featured Story - Large Card */}
          <div className="lg:col-span-8 group">
            <div 
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center transition-all duration-700 group-hover:shadow-3xl group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${stories[0].bgImage})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center space-x-4 mb-4">
               
                  <div className="flex items-center text-white/80 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {stories[0].readTime}
                  </div>
                </div>
                
                <h3 className="text-4xl font-serif font-bold text-white mb-2">
                  {stories[0].title}
                </h3>
                <p className="text-xl text-white/80 mb-4 font-light">
                  {stories[0].subtitle}
                </p>
                <p className="text-white/70 mb-6 line-clamp-2 leading-relaxed">
                  {stories[0].excerpt}
                </p>
                
                <Link 
                  to={`/stories/${stories[0].slug}`}
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20  text-white px-6 py-3 rounded-full transition-all duration-300 group-hover:bg-white/30"
                >
                  <span>Read Story</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Stories - Smaller Cards */}
          <div className="lg:col-span-4 space-y-6">
            {stories.slice(1).map((story, index) => (
              <div 
                key={story.slug}
                className="group h-[240px] relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.03]"
                style={{ backgroundImage: `url(${story.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-3 mb-3">
                 
                    <span className="text-white/70 text-xs">{story.readTime}</span>
                  </div>
                  
                  <h4 className="text-xl font-serif font-bold text-white mb-2">
                    {story.title}
                  </h4>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {story.excerpt}
                  </p>
                  
                  <Link 
                    to={`/stories/${story.slug}`}
                    className="inline-flex items-center text-white/80 hover:text-white text-sm transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Stories Button */}
        {/* <div className="text-center mt-16">
          <Link 
            to="/stories"
            className="inline-flex items-center space-x-2 bg-nature-forest hover:bg-nature-moss text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">View All Stories</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
