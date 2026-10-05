import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CoffeeItem, CartItem, CartCustomizations } from '../types';

interface CustomizerModalProps {
  item: CoffeeItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item.availableOptions?.sizes?.[0]?.label || '');
  const [selectedMilk, setSelectedMilk] = useState(item.availableOptions?.milks?.[0]?.name || '');
  const [selectedTemp, setSelectedTemp] = useState(item.availableOptions?.temperatures?.[0] || 'Hot');
  const [selectedSweetness, setSelectedSweetness] = useState(item.availableOptions?.sweetness?.[0] || '');
  const [selectedGrind, setSelectedGrind] = useState(item.availableOptions?.grindTypes?.[0] || '');
  const [selectedWeight, setSelectedWeight] = useState(item.availableOptions?.weights?.[0]?.label || '');
  const [extraShots, setExtraShots] = useState(0);
  const [specialNotes, setSpecialNotes] = useState('');

  // Calculate unit price dynamically based on selections
  let unitPrice = item.price;

  if (item.availableOptions?.sizes) {
    const sizeOpt = item.availableOptions.sizes.find((s) => s.label === selectedSize);
    if (sizeOpt) unitPrice += sizeOpt.priceDelta;
  }

  if (item.availableOptions?.milks) {
    const milkOpt = item.availableOptions.milks.find((m) => m.name === selectedMilk);
    if (milkOpt) unitPrice += milkOpt.priceDelta;
  }

  if (item.availableOptions?.weights) {
    const weightOpt = item.availableOptions.weights.find((w) => w.label === selectedWeight);
    if (weightOpt) unitPrice += weightOpt.priceDelta;
  }

  unitPrice += extraShots * 1.00;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const customizations: CartCustomizations = {};
    if (selectedSize) customizations.size = selectedSize;
    if (selectedMilk) customizations.milk = selectedMilk;
    if (item.availableOptions?.temperatures) customizations.temperature = selectedTemp;
    if (selectedSweetness) customizations.sweetness = selectedSweetness;
    if (selectedGrind) customizations.grindType = selectedGrind;
    if (selectedWeight) customizations.bagWeight = selectedWeight;
    if (extraShots > 0) customizations.extraShots = extraShots;
    if (specialNotes.trim()) customizations.specialNotes = specialNotes.trim();

    const uniqueId = `${item.id}-${Date.now()}`;
    const cartItem: CartItem = {
      id: uniqueId,
      itemId: item.id,
      name: item.name,
      unitPrice,
      totalPrice,
      quantity,
      image: item.image,
      customizations,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#fbf9f5]">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-800 font-medium">
              Barista Specification
            </span>
            <h3 className="font-serif text-xl font-medium text-stone-900 leading-tight">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 flex-1">
          {/* Item Quick Overview */}
          <div className="flex gap-4 items-start pb-4 border-b border-stone-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-md object-cover border border-stone-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
              {item.origin && (
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-2">
                  <span>Origin: {item.origin}</span>
                  {item.elevation && <span>· Elev: {item.elevation}</span>}
                </div>
              )}
              {item.tastingNotes && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tastingNotes.map((note) => (
                    <span key={note} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-sm">
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Whole Bean Bag Options: Weight & Grind */}
          {item.availableOptions?.weights && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Bag Weight / Volume
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.availableOptions.weights.map((w) => (
                  <button
                    key={w.label}
                    type="button"
                    onClick={() => setSelectedWeight(w.label)}
                    className={`px-3.5 py-2.5 text-left text-xs rounded-md border transition-all cursor-pointer ${
                      selectedWeight === w.label
                        ? 'border-amber-800 bg-amber-50/50 text-stone-900 font-medium ring-1 ring-amber-800'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium text-stone-900">{w.label}</div>
                    {w.priceDelta > 0 && (
                      <span className="text-stone-500 text-[11px]">+${w.priceDelta.toFixed(2)}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.availableOptions?.grindTypes && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Grind Setting (Precision SSP Milled)
              </label>
              <div className="space-y-1.5">
                {item.availableOptions.grindTypes.map((grind) => (
                  <label
                    key={grind}
                    className={`flex items-center justify-between p-2.5 text-xs rounded-md border cursor-pointer transition-colors ${
                      selectedGrind === grind
                        ? 'border-amber-800 bg-amber-50/40 text-stone-900 font-medium'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{grind}</span>
                    <input
                      type="radio"
                      name="grind"
                      value={grind}
                      checked={selectedGrind === grind}
                      onChange={() => setSelectedGrind(grind)}
                      className="text-amber-800 focus:ring-amber-800"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Temperature or Warming Toggle */}
          {item.availableOptions?.temperatures && item.availableOptions.temperatures.length > 1 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                {item.category === 'bakery' ? 'Serving Preparation' : 'Serving Temperature'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.availableOptions.temperatures.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setSelectedTemp(temp)}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-colors cursor-pointer ${
                      selectedTemp === temp
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {temp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cup Size */}
          {item.availableOptions?.sizes && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Beverage Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.availableOptions.sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    onClick={() => setSelectedSize(size.label)}
                    className={`p-2.5 text-left text-xs rounded-md border transition-all cursor-pointer ${
                      selectedSize === size.label
                        ? 'border-amber-800 bg-amber-50/50 text-stone-900 font-medium ring-1 ring-amber-800'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium">{size.label}</div>
                    <div className="text-stone-500 text-[11px]">{size.volume} {size.priceDelta > 0 && `(+$${size.priceDelta.toFixed(2)})`}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Selection */}
          {item.availableOptions?.milks && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Choice of Milk or Plant Alternative
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.availableOptions.milks.map((milk) => (
                  <button
                    key={milk.id}
                    type="button"
                    onClick={() => setSelectedMilk(milk.name)}
                    className={`p-2 text-left text-xs rounded-md border transition-colors cursor-pointer flex items-center justify-between ${
                      selectedMilk === milk.name
                        ? 'border-amber-800 bg-amber-50/50 text-stone-900 font-medium ring-1 ring-amber-800'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{milk.name}</span>
                    {milk.priceDelta > 0 ? (
                      <span className="text-stone-500 font-mono text-[11px]">+${milk.priceDelta.toFixed(2)}</span>
                    ) : (
                      <span className="text-stone-400 text-[11px]">Free</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Espresso Shots */}
          {item.availableOptions?.allowExtraShots && (
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div>
                <p className="text-xs font-medium text-stone-900">Extra Single-Origin Ristretto Shot</p>
                <p className="text-[11px] text-stone-500">+$1.00 per pulled extraction</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                  disabled={extraShots === 0}
                  className="w-7 h-7 rounded border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm w-5 text-center font-semibold text-stone-900">
                  {extraShots}
                </span>
                <button
                  type="button"
                  onClick={() => setExtraShots(Math.min(3, extraShots + 1))}
                  className="w-7 h-7 rounded border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Sweetness */}
          {item.availableOptions?.sweetness && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Sweetness Level
              </label>
              <div className="flex flex-wrap gap-2">
                {item.availableOptions.sweetness.map((sweet) => (
                  <button
                    key={sweet}
                    type="button"
                    onClick={() => setSelectedSweetness(sweet)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                      selectedSweetness === sweet
                        ? 'border-amber-800 bg-amber-50 text-stone-900 font-medium'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {sweet}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Barista Request */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              Special Barista Request (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra hot, light foam, separate cup for milk..."
              className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800"
            />
          </div>

        </div>

        {/* Sticky Purchase Module Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#fbf9f5] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-300 rounded-md bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-mono font-semibold text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add CTA with computed price */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-5 bg-stone-900 hover:bg-amber-900 text-white rounded-md text-sm font-medium transition-colors shadow-xs flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
