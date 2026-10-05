import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CoffeeItem, CategoryType } from '../types';
import { COFFEE_ITEMS } from '../data/coffeeData';

interface MenuSectionProps {
  onSelectItem: (item: CoffeeItem) => void;
  onQuickAdd: (item: CoffeeItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'pour-over', label: 'Single Origin Filter' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'signatures', label: 'Specialty Signatures' },
    { id: 'beans', label: 'Whole Bean Bags' },
    { id: 'bakery', label: 'Pastry & Kitchen' },
  ];

  const filteredItems = useMemo(() => {
    return COFFEE_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Roast filter
      if (selectedRoast !== 'all' && item.roastLevel !== selectedRoast) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchOrigin = item.origin?.toLowerCase().includes(query);
        const matchNotes = item.tastingNotes.some((n) => n.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchOrigin && !matchNotes) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedRoast, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#fbf9f5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
              Curated Daily Selections
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
              Seasonal Barista & Roaster Menu
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              Freshly ground to order using 98mm SSP flat burrs. Available for counter pickup, dining in, or nationwide bag delivery.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by notes, origin, or drink..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800 focus:border-amber-800 text-stone-800 placeholder-stone-400 transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filter Tabs & Roast Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 mb-10">
          {/* Functional Button Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100/80 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Roast level quick filter */}
          <div className="flex items-center gap-2 text-xs text-stone-500 self-start sm:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span>Roast:</span>
            <select
              value={selectedRoast}
              onChange={(e) => setSelectedRoast(e.target.value)}
              className="bg-white border border-stone-200 text-stone-800 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-800"
            >
              <option value="all">All Profiles</option>
              <option value="Light">Light & Floral</option>
              <option value="Medium-Light">Medium-Light</option>
              <option value="Medium">Medium & Balanced</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-xl border border-dashed border-stone-300">
            <p className="font-serif text-xl text-stone-800">No items match your criteria</p>
            <p className="text-xs text-stone-500 mt-1.5">Try clearing the search term or switching category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRoast('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white border border-stone-200/80 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300"
              >
                {/* 65%-75% Visual Height Leading Container */}
                <div
                  className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-950/5 group-hover:bg-stone-950/0 transition-colors" />

                  {/* Single subtle tag if seasonal or signature (Anti-badge spam) */}
                  {item.isSeasonal && (
                    <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 bg-stone-950/80 text-amber-200 backdrop-blur-xs rounded-sm">
                      Seasonal Harvest
                    </span>
                  )}
                  {!item.isSeasonal && item.isSignature && (
                    <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 bg-stone-950/80 text-stone-200 backdrop-blur-xs rounded-sm">
                      Atelier Signature
                    </span>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <span className="uppercase tracking-wider font-medium text-amber-900/90 text-[11px]">
                        {item.category === 'pour-over' ? 'Pour Over' : item.category === 'espresso' ? 'Espresso' : item.category === 'signatures' ? 'Signature' : item.category === 'beans' ? 'Roasted Bag' : 'Bakery'}
                      </span>
                      {item.origin && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="truncate max-w-[140px]">{item.origin}</span>
                        </>
                      )}
                      {item.roastLevel && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span>{item.roastLevel}</span>
                        </>
                      )}
                    </div>

                    {/* Product Title */}
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-left w-full group/title cursor-pointer"
                    >
                      <h3 className="font-serif text-lg font-medium text-stone-900 group-hover/title:text-amber-900 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </button>

                    {item.subName && (
                      <p className="text-xs text-stone-500 italic mt-0.5 line-clamp-1 font-serif">
                        {item.subName}
                      </p>
                    )}

                    <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting Notes as clean typographic tags */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tastingNotes.slice(0, 3).map((note) => (
                          <span
                            key={note}
                            className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Module */}
                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500 block">Price</span>
                      <span className="font-mono text-base font-medium text-stone-950 tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => onQuickAdd(item)}
                        aria-label={`Quick add ${item.name} to order`}
                        className="p-1.5 text-white bg-stone-900 hover:bg-amber-900 rounded-md transition-colors cursor-pointer shadow-2xs"
                        title="Quick Add standard option"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
