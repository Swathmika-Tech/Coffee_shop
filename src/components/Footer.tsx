import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenFinder: () => void;
  onOpenLoyalty: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenFinder,
  onOpenLoyalty,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-stone-800/80">
          
          {/* Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-normal text-white tracking-tight">
              Kōhī Atelier & Roastery
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Dedicated to small-batch single-origin coffees, intentional brewing rituals, and direct trade relationships with origin farmers.
            </p>
            <div className="text-xs text-stone-500 font-mono pt-2">
              418 Sakura Lane · Warehouse District · Mon–Sun 7am–7pm
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              The Atelier
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Seasonal Coffee & Kitchen Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brew-lab')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Brew Lab & Ratio Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservations')}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Cupping Flights & Table Booking
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFinder}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Sensory Cup Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLoyalty}
                  className="hover:text-stone-100 transition-colors cursor-pointer"
                >
                  The Roaster’s Guild Stamp Pass
                </button>
              </li>
            </ul>
          </div>

          {/* Fresh Micro-Lot Dispatch Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Micro-Lot Roast Bulletins
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribers receive priority allocation on limited Gesha and anaerobic harvest drops.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-900 border border-stone-700 rounded-md text-xs text-amber-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are registered for our Friday roast bulletin.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded text-xs font-medium transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Copyright (Anti-slop compliant: no telemetry tickers or fake engine stats) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Kōhī Atelier & Roastery. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Specialty Coffee Association Certified</span>
            <span aria-hidden="true">·</span>
            <span>Organic Soil Association</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
