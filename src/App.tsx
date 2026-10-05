import React, { useState, useEffect } from 'react';
import { CoffeeItem, CartItem, Order, OrderStatus } from './types';
import { COFFEE_ITEMS } from './data/coffeeData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { CustomizerModal } from './components/CustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { BrewGuideSection } from './components/BrewGuideSection';
import { RoastFinderModal } from './components/RoastFinderModal';
import { ReservationSection } from './components/ReservationSection';
import { LoyaltyModal } from './components/LoyaltyModal';
import { RoasteryInfoSection } from './components/RoasteryInfoSection';
import { Footer } from './components/Footer';
import { Check, Coffee, ChevronRight } from 'lucide-react';

export default function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kohi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedItemForCustomizer, setSelectedItemForCustomizer] = useState<CoffeeItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  
  // Active Order state
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('kohi_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Active section for navigation highlighting
  const [activeSection, setActiveSection] = useState('hero');

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kohi_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save active order
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('kohi_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('kohi_active_order');
      }
    } catch {
      // ignore
    }
  }, [activeOrder]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // check if identical customization exists
      const existingIdx = prev.findIndex(
        (it) => it.itemId === newItem.itemId && JSON.stringify(it.customizations) === JSON.stringify(newItem.customizations)
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        updated[existingIdx].totalPrice = updated[existingIdx].quantity * updated[existingIdx].unitPrice;
        return updated;
      }
      return [...prev, newItem];
    });

    showToast(`Added "${newItem.name}" to order`);
  };

  const handleQuickAdd = (item: CoffeeItem) => {
    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      itemId: item.id,
      name: item.name,
      unitPrice: item.price,
      totalPrice: item.price,
      quantity: 1,
      image: item.image,
      customizations: {
        size: item.availableOptions?.sizes?.[0]?.label || undefined,
        milk: item.availableOptions?.milks?.[0]?.name || undefined,
        temperature: item.availableOptions?.temperatures?.[0] || undefined,
        grindType: item.availableOptions?.grindTypes?.[0] || undefined,
        bagWeight: item.availableOptions?.weights?.[0]?.label || undefined,
      },
    };
    handleAddToCart(cartItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...it,
              quantity: nextQty,
              totalPrice: nextQty * it.unitPrice,
            };
          }
          return it;
        })
        .filter((it): it is CartItem => it !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (order: Order) => {
    setActiveOrder(order);
    setIsOrderTrackerOpen(true);
    showToast(`Order ${order.orderId} received by the Barista bar!`);
  };

  const handleUpdateOrderStatus = (status: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder((prev) => prev ? { ...prev, status } : null);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Banner if Active Order in progress */}
      {activeOrder && !isOrderTrackerOpen && (
        <aside
          aria-label="Active order status"
          className="bg-stone-950 text-amber-200 px-4 py-2 text-xs flex items-center justify-between border-b border-stone-800 sticky top-0 z-50 transition-all"
        >
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Active Order <strong className="text-white font-mono">{activeOrder.orderId}</strong> is currently{' '}
                <span className="capitalize text-amber-300 font-semibold">{activeOrder.status}</span>.
              </span>
            </div>
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-amber-300 underline cursor-pointer"
            >
              <span>View Barista Tracker</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Top Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenFinder={() => setIsFinderOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onBookFlight={() => scrollToSection('reservations')}
          onOpenFinder={() => setIsFinderOpen(true)}
        />

        <MenuSection
          onSelectItem={(item) => setSelectedItemForCustomizer(item)}
          onQuickAdd={handleQuickAdd}
        />

        <BrewGuideSection />

        <ReservationSection />

        <RoasteryInfoSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenFinder={() => setIsFinderOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      <CustomizerModal
        item={selectedItemForCustomizer}
        onClose={() => setSelectedItemForCustomizer(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderTrackerModal
        order={activeOrder}
        onClose={() => setIsOrderTrackerOpen(false)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <RoastFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onSelectResult={(item) => setSelectedItemForCustomizer(item)}
      />

      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-label="Notification alert"
          className="fixed bottom-5 right-5 z-50 bg-stone-900 text-stone-100 px-4 py-3 rounded-lg shadow-xl border border-stone-700 flex items-center gap-3 text-xs animate-slide-up"
        >
          <div className="w-5 h-5 rounded-full bg-amber-600/90 flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <p className="font-medium text-stone-200">{toastMessage}</p>
        </aside>
      )}

    </div>
  );
}
