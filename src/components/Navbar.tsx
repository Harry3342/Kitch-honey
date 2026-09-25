import React, { useState } from 'react';
import { ShoppingBag, Box, Database, ShieldCheck, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { KitchLogo } from './KitchLogo';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsSubscriptionPortalOpen, 
    setIsInventoryManagerOpen, 
    subscriptions,
    products,
    isAdminAuthenticated 
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalLowStock = products.filter(p => p.stock <= p.lowStockThreshold).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EA]/95 backdrop-blur-md border-b border-amber-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Kitch Brand Logo & Wordmark (Strictly shrink-0) */}
        <a 
          href="#" 
          className="flex items-center transition-opacity hover:opacity-90 shrink-0"
          aria-label="Kitch - The Best Organic Honey In Kenya"
        >
          <KitchLogo variant="horizontal" size="md" showTagline={true} />
        </a>

        {/* Zone 2: Orderly Navigation Links (hidden on < lg to prevent crowding, whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-700 shrink-0">
          <a 
            href="#honey-collection" 
            className="whitespace-nowrap hover:text-amber-900 transition-colors py-1 hover:underline underline-offset-4 decoration-amber-600/50"
          >
            Honey Harvests
          </a>
          <a 
            href="#subscription-boxes" 
            className="whitespace-nowrap hover:text-amber-900 transition-colors py-1 hover:underline underline-offset-4 decoration-amber-600/50"
          >
            Hive Subscriptions
          </a>
          <a 
            href="#traceability" 
            className="whitespace-nowrap hover:text-amber-900 transition-colors py-1 hover:underline underline-offset-4 decoration-amber-600/50"
          >
            Traceability & Terroirs
          </a>
          <a 
            href="#kebs-standards" 
            className="whitespace-nowrap hover:text-amber-900 transition-colors flex items-center gap-1.5 py-1 hover:underline underline-offset-4 decoration-amber-600/50"
          >
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>KEBS Certified</span>
          </a>
        </nav>

        {/* Zone 3: Orderly Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Store Administrator Live Stock Switcher (Inaccessible to regular users; only visible when admin is authenticated) */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setIsInventoryManagerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              title="Online Store Administrator Mode — Real-time inventory tracking"
            >
              <Database className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
              <span className="hidden md:inline">Admin Stock</span>
              {totalLowStock > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              )}
            </button>
          )}

          {/* Subscriptions Portal button */}
          <button
            onClick={() => setIsSubscriptionPortalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-stone-800 bg-amber-100/70 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Manage your Kitch Hive Club subscription"
          >
            <Box className="w-3.5 h-3.5 text-amber-800 shrink-0" />
            <span className="hidden md:inline">My Hive Box</span>
            {subscriptions.length > 0 && (
              <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200/90 px-1.5 py-0.5 rounded leading-none">
                {subscriptions.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shadow-sm shrink-0"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="hidden sm:inline font-medium">Bag</span>
            <span className="font-mono tabular-nums font-semibold bg-amber-600 text-white rounded px-1.5 py-0.5 text-[11px] leading-none">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle (Visible on screens < lg) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-950 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-200/80 rounded-lg transition-colors shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-stone-900" />
            ) : (
              <Menu className="w-5 h-5 text-stone-900" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown (< lg) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/80 bg-[#FAF5EA]/98 px-4 py-3 space-y-1 shadow-md">
          <a 
            href="#honey-collection" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-100/80 transition-colors"
          >
            <span>Honey Harvests</span>
            <span className="text-xs text-amber-700 font-mono">Collection →</span>
          </a>
          <a 
            href="#subscription-boxes" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-100/80 transition-colors"
          >
            <span>Hive Subscriptions</span>
            <span className="text-xs text-amber-700 font-mono">Club →</span>
          </a>
          <a 
            href="#traceability" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-100/80 transition-colors"
          >
            <span>Traceability & Terroirs</span>
            <span className="text-xs text-amber-700 font-mono">Apiaries →</span>
          </a>
          <a 
            href="#kebs-standards" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-100/80 transition-colors border-t border-amber-200/40 mt-1 pt-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>KEBS Certified KS EAS 36:2018</span>
          </a>
        </div>
      )}
    </header>
  );
};
