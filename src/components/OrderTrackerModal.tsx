import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, Coffee, Bell, ChevronRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus?: (status: OrderStatus) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status || 'received');

  // Auto-advance simulation after initial placement for delightful real-time feel
  useEffect(() => {
    if (currentStatus === 'received') {
      const timer = setTimeout(() => {
        setCurrentStatus('grinding');
        onUpdateStatus?.('grinding');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (currentStatus === 'grinding') {
      const timer = setTimeout(() => {
        setCurrentStatus('brewing');
        onUpdateStatus?.('brewing');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentStatus, onUpdateStatus]);

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    {
      key: 'received',
      label: 'Order Confirmed',
      desc: 'Sent directly to the Barista display ticket queue',
    },
    {
      key: 'grinding',
      label: 'Grinding Single Origin',
      desc: 'Milled to micron precision on 98mm SSP flat burrs',
    },
    {
      key: 'brewing',
      label: 'Extraction & Steaming',
      desc: 'Pulling temperature-calibrated espresso & texturing microfoam',
    },
    {
      key: 'ready',
      label: 'Ready for You',
      desc: order.fulfillment.type === 'dine-in' 
        ? `Bringing to Table #${order.fulfillment.tableNumber || '4'}`
        : 'Awaiting your pickup at the wooden bar counter',
    },
  ];

  const statusOrder: OrderStatus[] = ['received', 'grinding', 'brewing', 'ready'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  const advanceStep = () => {
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      setCurrentStatus(nextStatus);
      onUpdateStatus?.(nextStatus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Roastery Queue</span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-white mt-1">
              Order {order.orderId}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracker"
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Tracker */}
        <div className="p-6 bg-[#fbf9f5] border-b border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Fulfillment Target
              </p>
              <p className="text-sm font-medium text-stone-900 capitalize">
                {order.fulfillment.type === 'pickup' && 'Bar Counter Pickup (10–12 min)'}
                {order.fulfillment.type === 'dine-in' && `Table #${order.fulfillment.tableNumber || '4'} Service`}
                {order.fulfillment.type === 'delivery' && 'Local City Dispatch'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Placed At
              </p>
              <p className="text-sm font-mono font-medium text-stone-900">
                {order.timestamp}
              </p>
            </div>
          </div>

          {/* Stepper list */}
          <div className="space-y-4 relative mt-6">
            {steps.map((s, idx) => {
              const isDone = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              return (
                <div key={s.key} className="flex items-start gap-3.5 relative">
                  {/* Step indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition-colors mt-0.5 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-stone-900 text-white ring-4 ring-amber-100'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium leading-none ${
                        isCurrent ? 'text-stone-950 font-semibold' : isDone ? 'text-stone-700' : 'text-stone-400'
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advance simulation button for easy verification */}
          {currentIndex < statusOrder.length - 1 && (
            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={advanceStep}
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors cursor-pointer"
              >
                <span>Advance Barista Prep Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Order Receipt Details */}
        <div className="p-6 max-h-60 overflow-y-auto space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Order Summary ({order.items.length} items)
          </p>
          {order.items.map((it) => (
            <div key={it.id} className="flex justify-between items-start text-xs border-b border-stone-100 pb-2">
              <div>
                <span className="font-medium text-stone-900">{it.quantity}x {it.name}</span>
                <div className="text-[11px] text-stone-500 space-x-1">
                  {it.customizations.size && <span>{it.customizations.size}</span>}
                  {it.customizations.milk && <span>· {it.customizations.milk}</span>}
                  {it.customizations.temperature && <span>· {it.customizations.temperature}</span>}
                  {it.customizations.grindType && <span>· {it.customizations.grindType}</span>}
                </div>
              </div>
              <span className="font-mono text-stone-900 font-medium tabular-nums">
                ${it.totalPrice.toFixed(2)}
              </span>
            </div>
          ))}

          <div className="pt-2 flex justify-between items-center text-sm font-semibold text-stone-900">
            <span>Total Charged</span>
            <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-600 text-xs">
            <Bell className="w-4 h-4 text-amber-800" />
            <span>SMS updates active for {order.fulfillment.customerPhone}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
