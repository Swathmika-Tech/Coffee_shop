import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { CoffeeItem } from '../types';
import { COFFEE_ITEMS } from '../data/coffeeData';

interface RoastFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (item: CoffeeItem) => void;
}

export const RoastFinderModal: React.FC<RoastFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [flavorPreference, setFlavorPreference] = useState<'floral' | 'fruity' | 'chocolate' | 'spiced'>('floral');
  const [brewMethod, setBrewMethod] = useState<'filter' | 'espresso' | 'press'>('filter');
  const [milkPreference, setMilkPreference] = useState<'black' | 'milk' | 'splash'>('black');
  const [matchItem, setMatchItem] = useState<CoffeeItem | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      let matched: CoffeeItem | undefined;
      if (flavorPreference === 'floral') {
        matched = COFFEE_ITEMS.find((it) => it.id === 'gesha_village_lot42') || COFFEE_ITEMS[0];
      } else if (flavorPreference === 'fruity') {
        matched = COFFEE_ITEMS.find((it) => it.id === 'colombia_pink_bourbon') || COFFEE_ITEMS[1];
      } else if (flavorPreference === 'chocolate') {
        matched = COFFEE_ITEMS.find((it) => it.id === 'beans_kohi_espresso_blend') || COFFEE_ITEMS[2];
      } else {
        matched = COFFEE_ITEMS.find((it) => it.id === 'cardamom_silk_flat_white') || COFFEE_ITEMS[4];
      }
      setMatchItem(matched || COFFEE_ITEMS[0]);
      setCurrentStep(4);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setMatchItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-[#fbf9f5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
              The Sensory Cup Matcher
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quiz"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {currentStep <= 3 ? (
            <div>
              {/* Progress dots */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${
                      s === currentStep
                        ? 'w-8 bg-amber-800'
                        : s < currentStep
                        ? 'w-4 bg-stone-800'
                        : 'w-4 bg-stone-200'
                    }`}
                  />
                ))}
                <span className="text-xs text-stone-400 font-mono ml-2">Step {currentStep} of 3</span>
              </div>

              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-stone-900 font-medium">
                    What aroma & taste notes appeal most to you?
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {[
                      { id: 'floral', title: 'Jasmine, White Peach & Bergamot', desc: 'Ethereal, floral, delicate tea-like mouthfeel' },
                      { id: 'fruity', title: 'Blood Orange, Wild Honey & Raspberries', desc: 'Sparkling fruit-forward acidity with cane sweetness' },
                      { id: 'chocolate', title: 'Dark Chocolate Truffle, Praline & Plum', desc: 'Deep, comforting cocoa body with velvety sweetness' },
                      { id: 'spiced', title: 'Cardamom Pods, Smoked Salt & Vanilla', desc: 'Warm botanical spices and aromatic depth' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFlavorPreference(opt.id as any)}
                        className={`p-3.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                          flavorPreference === opt.id
                            ? 'border-amber-800 bg-amber-50/50 text-stone-900 ring-1 ring-amber-800'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <p className="font-semibold text-stone-900 text-sm">{opt.title}</p>
                        <p className="text-stone-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-stone-900 font-medium">
                    How do you typically brew your coffee?
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {[
                      { id: 'filter', title: 'Pour-Over Dripper (V60, Chemex, Kalita)', desc: 'Optimized for high clarity and single-estate nuances' },
                      { id: 'espresso', title: 'Espresso Machine or Moka Pot', desc: 'Extracted under 9 bars of pressure for heavy crema' },
                      { id: 'press', title: 'French Press, AeroPress or Cold Immersion', desc: 'Full-bodied extraction emphasizing oil and body' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBrewMethod(opt.id as any)}
                        className={`p-3.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                          brewMethod === opt.id
                            ? 'border-amber-800 bg-amber-50/50 text-stone-900 ring-1 ring-amber-800'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <p className="font-semibold text-stone-900 text-sm">{opt.title}</p>
                        <p className="text-stone-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl text-stone-900 font-medium">
                    Do you prefer milk or pure black extraction?
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {[
                      { id: 'black', title: 'Strictly Pure Black', desc: 'I want to taste the soil, altitude, and processing purity' },
                      { id: 'milk', title: 'Steamed Milk or Plant Microfoam', desc: 'Lattes, flat whites, cappuccinos with silky sweetness' },
                      { id: 'splash', title: 'A Subtle Splash of Cream or Honey', desc: 'Just enough to round off the edges while tasting the bean' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMilkPreference(opt.id as any)}
                        className={`p-3.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                          milkPreference === opt.id
                            ? 'border-amber-800 bg-amber-50/50 text-stone-900 ring-1 ring-amber-800'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <p className="font-semibold text-stone-900 text-sm">{opt.title}</p>
                        <p className="text-stone-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="mt-8 flex justify-between items-center pt-4 border-t border-stone-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-amber-900 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{currentStep === 3 ? 'Reveal My Coffee Match' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Result Step */
            matchItem && (
              <div className="space-y-6">
                <div className="text-center pb-2">
                  <span className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
                    100% Terroir Alignment Match
                  </span>
                  <h3 className="font-serif text-3xl text-stone-900 font-normal mt-1">
                    {matchItem.name}
                  </h3>
                  {matchItem.origin && (
                    <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                      {matchItem.origin} · {matchItem.elevation || '2,000m'}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 items-center bg-[#fbf9f5] p-4 rounded-lg border border-stone-200">
                  <img
                    src={matchItem.image}
                    alt={matchItem.name}
                    className="w-24 h-24 rounded object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {matchItem.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {matchItem.tastingNotes.map((note) => (
                        <span key={note} className="text-[10px] bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sensory Spectrum Bars */}
                <div className="space-y-2 p-3 bg-stone-50 rounded-lg text-xs">
                  <div>
                    <div className="flex justify-between text-stone-600 mb-1">
                      <span>Floral & Bright Acidity</span>
                      <span className="font-mono">9.4 / 10</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-stone-600 mb-1">
                      <span>Cup Sweetness & Honey Tone</span>
                      <span className="font-mono">9.1 / 10</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-700 h-full rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-stone-600 mb-1">
                      <span>Body & Texture Finish</span>
                      <span className="font-mono">8.8 / 10</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-stone-700 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-2.5 text-stone-500 hover:text-stone-900 border border-stone-300 rounded-md transition-colors cursor-pointer"
                    title="Retake Quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectResult(matchItem);
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 bg-stone-900 hover:bg-amber-900 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Customize & Order This Coffee (${matchItem.price.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};
