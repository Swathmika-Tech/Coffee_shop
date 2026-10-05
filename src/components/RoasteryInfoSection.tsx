import React, { useMemo } from 'react';
import { MapPin, Clock, Wifi, Music, Dog, Flame } from 'lucide-react';

export const RoasteryInfoSection: React.FC = () => {
  // Compute live open/closed status based on current time
  const roasteryStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = now.getHours();
    const isWeekend = day === 0 || day === 6;

    const openHour = isWeekend ? 8 : 7;
    const closeHour = 19; // 7:00 PM

    const isOpen = hour >= openHour && hour < closeHour;
    return {
      isOpen,
      closesAt: '7:00 PM',
      opensAt: isWeekend ? '8:00 AM' : '7:00 AM',
    };
  }, []);

  return (
    <section id="roastery" className="py-20 bg-[#fbf9f5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            The Physical Roastery
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
            Crafted for Contemplation & Conversation
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Housed in a converted 1940s timber warehouse. Natural northern light, curated acoustic warmth, and direct view of our production roaster.
          </p>
        </div>

        {/* 3 Grid Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: Hours & Live Status */}
          <div className="p-6 bg-white border border-stone-200/90 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 font-medium mb-4">
              <Clock className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-lg">Hours of Extraction</h3>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 mb-4 p-2.5 bg-stone-50 rounded-md border border-stone-200 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${roasteryStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-600'}`} />
              <span className="font-semibold text-stone-900">
                {roasteryStatus.isOpen ? 'Open Now' : 'Closed for the Night'}
              </span>
              <span className="text-stone-500">
                · {roasteryStatus.isOpen ? `Closes at ${roasteryStatus.closesAt}` : `Opens at ${roasteryStatus.opensAt}`}
              </span>
            </div>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between pb-1.5 border-b border-stone-100">
                <span>Monday – Friday</span>
                <span className="font-medium text-stone-900">7:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-stone-100">
                <span>Saturday & Sunday</span>
                <span className="font-medium text-stone-900">8:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between text-amber-900 font-medium pt-1">
                <span>Roasting Batches</span>
                <span>Tue & Fri mornings</span>
              </div>
            </div>
          </div>

          {/* Card 2: Location & Commute */}
          <div className="p-6 bg-white border border-stone-200/90 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 font-medium mb-4">
              <MapPin className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-lg">Address & Transit</h3>
            </div>

            <p className="text-xs font-semibold text-stone-900">
              418 Sakura Lane, Warehouse District
            </p>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Corner of Sakura Lane and 4th Avenue. Bounded by old red brick facades and shaded courtyard maple trees.
            </p>

            <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-stone-800">Transit:</span>
                <span>2-minute walk from Grand Central Tram Stop</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-stone-800">Bicycle:</span>
                <span>Covered lock racks in the inner courtyard</span>
              </div>
            </div>
          </div>

          {/* Card 3: Space Environment */}
          <div className="p-6 bg-white border border-stone-200/90 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 font-medium mb-4">
              <Flame className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-lg">Space Amenities</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200/70">
                <div className="flex items-center gap-1.5 text-stone-900 font-medium mb-0.5">
                  <Wifi className="w-3.5 h-3.5 text-amber-800" />
                  <span>Fiber WiFi</span>
                </div>
                <span className="text-[11px] text-stone-500">300 Mbps symmetric</span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200/70">
                <div className="flex items-center gap-1.5 text-stone-900 font-medium mb-0.5">
                  <Music className="w-3.5 h-3.5 text-amber-800" />
                  <span>Acoustics</span>
                </div>
                <span className="text-[11px] text-stone-500">Low-fi & Jazz (55 dB)</span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200/70">
                <div className="flex items-center gap-1.5 text-stone-900 font-medium mb-0.5">
                  <Dog className="w-3.5 h-3.5 text-amber-800" />
                  <span>Pet Friendly</span>
                </div>
                <span className="text-[11px] text-stone-500">Courtyard & patio</span>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border border-stone-200/70">
                <div className="flex items-center gap-1.5 text-stone-900 font-medium mb-0.5">
                  <Flame className="w-3.5 h-3.5 text-amber-800" />
                  <span>Roast Drum</span>
                </div>
                <span className="text-[11px] text-stone-500">Viewable daily</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
