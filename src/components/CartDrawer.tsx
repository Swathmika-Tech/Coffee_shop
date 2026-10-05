import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Coffee, Store, Utensils, Truck } from 'lucide-react';
import { CartItem, FulfillmentType, Order, OrderFulfillment } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  const [tableNumber, setTableNumber] = useState('4');
  const [customerName, setCustomerName] = useState('Alex Mercer');
  const [customerPhone, setCustomerPhone] = useState('(555) 392-1084');
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * 0.085;
  const tip = subtotal * (tipPercent / 100);
  const grandTotal = subtotal + tax + tip;

  const handleCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and phone number for the order.');
      return;
    }

    setIsSubmitting(true);

    const fulfillment: OrderFulfillment = {
      type: fulfillmentType,
      customerName,
      customerPhone,
      tableNumber: fulfillmentType === 'dine-in' ? tableNumber : undefined,
      deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
      pickupTime: fulfillmentType === 'pickup' ? '12-15 mins' : undefined,
    };

    const newOrder: Order = {
      orderId: `KH-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      tax,
      tip,
      total: grandTotal,
      fulfillment,
      status: 'received',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onClearCart();
      onClose();
      onOrderPlaced(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#fbf9f5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-800" />
            <h2 className="font-serif text-xl font-medium text-stone-900">Your Barista Order</h2>
            {cart.length > 0 && (
              <span className="text-xs text-stone-500 font-mono">
                ({cart.reduce((a, b) => a + b.quantity, 0)} items)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fbf9f5]/50">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
              <Coffee className="w-8 h-8 stroke-1 text-stone-400" />
            </div>
            <h3 className="font-serif text-lg text-stone-800 font-medium">Your bag is empty</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
              Explore our single-origin coffees, signature drinks, or whole bean bags to craft your order.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-md transition-colors cursor-pointer"
            >
              Browse Seasonal Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Fulfillment Mode Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Order Fulfillment
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-2.5 rounded-md border text-center text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    fulfillmentType === 'pickup'
                      ? 'border-amber-800 bg-amber-50/60 text-stone-900 font-medium ring-1 ring-amber-800'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Store className="w-4 h-4 text-amber-800" />
                  <span>Pickup</span>
                  <span className="text-[10px] text-stone-400">10–15 min</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('dine-in')}
                  className={`p-2.5 rounded-md border text-center text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    fulfillmentType === 'dine-in'
                      ? 'border-amber-800 bg-amber-50/60 text-stone-900 font-medium ring-1 ring-amber-800'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Utensils className="w-4 h-4 text-amber-800" />
                  <span>Dine-In</span>
                  <span className="text-[10px] text-stone-400">At Table</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-2.5 rounded-md border text-center text-xs transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                    fulfillmentType === 'delivery'
                      ? 'border-amber-800 bg-amber-50/60 text-stone-900 font-medium ring-1 ring-amber-800'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-800" />
                  <span>Delivery</span>
                  <span className="text-[10px] text-stone-400">Courier</span>
                </button>
              </div>

              {/* Conditional fulfillment inputs */}
              {fulfillmentType === 'dine-in' && (
                <div className="mt-3 p-3 bg-stone-50 rounded-md border border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-700 font-medium">Table Number:</span>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-white border border-stone-300 rounded px-2.5 py-1 text-xs text-stone-800 font-mono font-medium"
                  >
                    {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        Table #{n}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {fulfillmentType === 'delivery' && (
                <div className="mt-3 space-y-1.5">
                  <label className="text-[11px] text-stone-600">Local Delivery Address (City Radius 3mi):</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter street address and apartment..."
                    className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
              )}
            </div>

            {/* Itemized Cart List */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Selected Items
              </label>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-stone-50/80 rounded-lg border border-stone-200/90 flex gap-3 text-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-stone-900 truncate">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customizations tags */}
                    <div className="text-[11px] text-stone-500 mt-0.5 space-x-1.5">
                      {item.customizations.size && <span>{item.customizations.size}</span>}
                      {item.customizations.temperature && <span>· {item.customizations.temperature}</span>}
                      {item.customizations.milk && <span>· {item.customizations.milk}</span>}
                      {item.customizations.grindType && <span>· {item.customizations.grindType}</span>}
                      {item.customizations.bagWeight && <span>· {item.customizations.bagWeight}</span>}
                      {item.customizations.extraShots ? (
                        <span>· +{item.customizations.extraShots} shot</span>
                      ) : null}
                    </div>

                    {item.customizations.specialNotes && (
                      <p className="text-[10px] text-amber-800 italic mt-0.5">
                        Note: {item.customizations.specialNotes}
                      </p>
                    )}

                    {/* Quantity & line price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center gap-1.5 border border-stone-300 rounded bg-white px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-0.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-mono text-[11px] font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-0.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 pt-2 border-t border-stone-200">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Contact for Notification
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-stone-500 block mb-0.5">Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 block mb-0.5">Mobile Phone (SMS)</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:ring-1 focus:ring-amber-800 text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Barista Tip Selector */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-700">
                  Barista Team Tip
                </span>
                <span className="font-mono text-stone-600 tabular-nums">${tip.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 15, 18, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTipPercent(pct)}
                    className={`py-1.5 text-xs rounded border text-center transition-colors cursor-pointer ${
                      tipPercent === pct
                        ? 'border-stone-900 bg-stone-900 text-white font-medium'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {pct === 0 ? 'None' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Price Breakdown */}
            <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.5%)</span>
                <span className="font-mono tabular-nums text-stone-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Barista Tip ({tipPercent}%)</span>
                <span className="font-mono tabular-nums text-stone-900">${tip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-950">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}

        {/* Footer Action */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-[#fbf9f5]">
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-amber-900 text-white rounded-md text-sm font-semibold transition-colors shadow-md flex items-center justify-between cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Transmitting to Bar...' : 'Confirm & Place Order'}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono tabular-nums">${grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
