import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SubscriptionSection } from './components/SubscriptionSection';
import { SubscriptionBuilderModal } from './components/SubscriptionBuilderModal';
import { SubscriptionPortalModal } from './components/SubscriptionPortalModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InventoryManagerModal } from './components/InventoryManagerModal';
import { TraceabilitySection } from './components/TraceabilitySection';
import { Footer } from './components/Footer';
import { Truck, Sparkles, Filter, CheckCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    products,
    selectedProductForDetail,
    setSelectedProductForDetail,
    isCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isSubscriptionBuilderOpen,
    setIsSubscriptionBuilderOpen,
    selectedPlanForBuilder,
    isSubscriptionPortalOpen,
    setIsSubscriptionPortalOpen,
    isInventoryManagerOpen,
    setIsInventoryManagerOpen
  } = useShop();

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'monofloral' | 'forest' | 'medicinal' | 'comb'>('all');

  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern selection:bg-amber-200 selection:text-amber-950">
      
      {/* Slim Top Logistics Notice (<= 40px as per frontend-design) */}
      <aside aria-label="Dispatch Notice" className="bg-stone-900 text-stone-300 py-2 px-4 text-xs border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs truncate sm:overflow-visible">
              <strong className="text-white">Nairobi Express:</strong> Same-day Boda rider dispatch | <strong className="text-white">Upcountry:</strong> Fargo Courier 24-48hrs | Lipa na M-PESA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-amber-300">
            <span>KEBS Certified KS EAS 36:2018</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>100% Raw Unpasteurized</span>
          </div>
        </div>
      </aside>

      {/* Top Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Harvest Collection Section */}
        <section id="honey-collection" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
                Fresh Harvest Allocation
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">
                Single-Origin Raw Honey Jars
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Unprocessed, gravity-strained, and verified by apiary batch number.
              </p>
            </div>

            {/* Segmented Filter Controls (Buttons with click handlers as approved in frontend-design) */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Terroirs' },
                { id: 'monofloral', label: 'Monofloral' },
                { id: 'forest', label: 'Rainforest' },
                { id: 'medicinal', label: 'Medicinal Melipona' },
                { id: 'comb', label: 'Virgin Comb' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    categoryFilter === tab.id
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid: 3-column desktop as per guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Trust callout directly adjacent to products */}
          <div className="mt-12 p-5 bg-[#FAF6EE] rounded-xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-stone-900">Guaranteed Unheated & Unadulterated</strong>
                <span className="text-stone-600">Each jar is bottled cold at our Karen hub with full moisture & HMF test report.</span>
              </div>
            </div>
            <a
              href="#kebs-standards"
              className="text-amber-900 font-semibold underline hover:text-amber-800 whitespace-nowrap"
            >
              View Lab Standards & Regulations →
            </a>
          </div>

        </section>

        {/* Subscription Section: The Hive Box */}
        <SubscriptionSection />

        {/* Kenyan Terroirs & Traceability Dossier */}
        <TraceabilitySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
      />

      <CartDrawer />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <SubscriptionBuilderModal
        plan={selectedPlanForBuilder}
        onClose={() => setIsSubscriptionBuilderOpen(false)}
      />

      <SubscriptionPortalModal
        isOpen={isSubscriptionPortalOpen}
        onClose={() => setIsSubscriptionPortalOpen(false)}
      />

      <InventoryManagerModal
        isOpen={isInventoryManagerOpen}
        onClose={() => setIsInventoryManagerOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
