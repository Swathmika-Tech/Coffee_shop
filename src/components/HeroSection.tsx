import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/coffeeData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookFlight: () => void;
  onOpenFinder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onBookFlight,
  onOpenFinder,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="Artisanal espresso bar and roastery interior with custom black machines and warm timber"
          className="w-full h-full object-cover object-center opacity-45 scale-102 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          {/* Subtle unboxed metadata kicker */}
          <div className="flex items-center gap-2.5 text-xs tracking-wider uppercase text-amber-300/90 font-medium mb-4">
            <span>Specialty Coffee Roastery & Tea Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2021</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">Open Today until 7:00 PM</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] mb-6 text-balance">
            Coffee shaped by terroir, micro-climate, and precise flame.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light mb-8 max-w-2xl">
            We partner directly with eight generational family estates in Ethiopia, Colombia, and Kenya. 
            Roasted weekly in small batches on our custom San Franciscan drum roaster, then calibrated to order.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-stone-100 hover:bg-white rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Explore Seasonal Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookFlight}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 hover:text-white border border-stone-700/80 rounded-md transition-colors cursor-pointer whitespace-nowrap backdrop-blur-xs"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Reserve Tasting Flight</span>
            </button>

            <button
              onClick={onOpenFinder}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-amber-300 hover:text-amber-200 hover:bg-stone-800/50 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Roast Profile</span>
            </button>
          </div>

          {/* Claim-to-Proof Adjacency */}
          <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-stone-300">
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium">89.4+</p>
              <p className="text-xs text-stone-400 mt-1">Average Specialty Cup Score</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium">100%</p>
              <p className="text-xs text-stone-400 mt-1">Direct-Farm Traceability</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium">&lt; 7 Days</p>
              <p className="text-xs text-stone-400 mt-1">Peak Post-Roast Window</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
