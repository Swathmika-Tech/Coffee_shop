import React from 'react';
import { ShoppingBag, Award, Sparkles, Clock } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenLoyalty: () => void;
  onOpenFinder: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenLoyalty,
  onOpenFinder,
  activeSection,
  onNavigate,
}) => {
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
            Kōhī Atelier
          </span>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('menu')}
            className={`transition-colors hover:text-stone-950 pb-0.5 border-b-2 cursor-pointer ${
              activeSection === 'menu'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Menu & Beans
          </button>
          <button
            onClick={() => onNavigate('brew-lab')}
            className={`transition-colors hover:text-stone-950 pb-0.5 border-b-2 cursor-pointer ${
              activeSection === 'brew-lab'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Brew Lab
          </button>
          <button
            onClick={() => onNavigate('reservations')}
            className={`transition-colors hover:text-stone-950 pb-0.5 border-b-2 cursor-pointer ${
              activeSection === 'reservations'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Tasting Flights & Tables
          </button>
          <button
            onClick={() => onNavigate('roastery')}
            className={`transition-colors hover:text-stone-950 pb-0.5 border-b-2 cursor-pointer ${
              activeSection === 'roastery'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Roastery & Hours
          </button>
          <button
            onClick={onOpenFinder}
            className="flex items-center gap-1.5 text-stone-600 hover:text-amber-900 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Roast Matcher</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={onOpenLoyalty}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/70 rounded-md transition-colors cursor-pointer"
            title="View Loyalty Stamp Card"
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Guild Card</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-amber-900 rounded-md shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-medium">
              Bag {totalItemCount > 0 && `(${totalItemCount})`}
            </span>
            {totalItemCount > 0 && (
              <span className="hidden sm:inline-block border-l border-stone-700 pl-2 text-stone-300 font-mono tabular-nums text-xs">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
