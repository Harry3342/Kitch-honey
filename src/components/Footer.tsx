import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Lock, Globe } from 'lucide-react';
import { KitchLogo } from './KitchLogo';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setIsInventoryManagerOpen, isAdminAuthenticated } = useShop();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <KitchLogo variant="footer" size="lg" showTagline={true} />
            <p className="text-stone-400 text-xs leading-relaxed pt-1">
              Kenya’s premier raw, single-origin organic apiculture brand. Sustaining indigenous forest canopies and semi-arid pastoralist beekeepers through fair-trade honey and recurring subscriber crates.
            </p>
            <div className="text-[11px] text-amber-400 font-mono">
              KEBS KS EAS 36:2018 Certified · Standard Permit #92810
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-stone-100 font-semibold uppercase tracking-wider text-[11px]">
              Collection & Terroirs
            </div>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><a href="#honey-collection" className="hover:text-white transition-colors">Baringo Wild Acacia</a></li>
              <li><a href="#honey-collection" className="hover:text-white transition-colors">Kakamega Rainforest Honey</a></li>
              <li><a href="#honey-collection" className="hover:text-white transition-colors">Lamu Coastal Mangrove Honey</a></li>
              <li><a href="#honey-collection" className="hover:text-white transition-colors">Nandi Hills Melipona (Stingless Bee)</a></li>
              <li><a href="#honey-collection" className="hover:text-white transition-colors">Mau Forest Natural Honeycomb</a></li>
            </ul>
          </div>

          {/* Subscriptions & Club */}
          <div className="space-y-3">
            <div className="text-stone-100 font-semibold uppercase tracking-wider text-[11px]">
              Kitch Hive Club
            </div>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><a href="#subscription-boxes" className="hover:text-white transition-colors">The Terroir Discovery Box</a></li>
              <li><a href="#subscription-boxes" className="hover:text-white transition-colors">Family Wellness & Immunity Crate</a></li>
              <li><a href="#subscription-boxes" className="hover:text-white transition-colors">Artisan Beekeeper Reserve</a></li>
              <li><a href="#subscription-boxes" className="hover:text-white transition-colors">M-Pesa Ratiba Recurring Billing</a></li>
              <li><a href="#subscription-boxes" className="hover:text-white transition-colors">Member Loyalty Kitch Points</a></li>
            </ul>
          </div>

          {/* Contact & Kenya Logistics */}
          <div className="space-y-3">
            <div className="text-stone-100 font-semibold uppercase tracking-wider text-[11px]">
              Karen Apiculture Hub & Dispatch
            </div>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Mbagathi Ridge, Karen, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">+254 (0) 722 849 192</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono">apiary@kitch.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="https://kitch.co.ke" className="hover:text-amber-400 font-mono text-amber-300 transition-colors">
                  www.kitch.co.ke
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[10px] uppercase text-stone-500 font-medium">Payment Partners</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                  Lipa na M-PESA
                </span>
                <span className="bg-stone-800 text-stone-300 font-mono px-2 py-0.5 rounded text-[10px] border border-stone-700">
                  VISA / Mastercard
                </span>
                <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                  Airtel Money
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} Kitch Organic Honey Limited. Official Website: <a href="https://kitch.co.ke" className="text-stone-400 hover:text-amber-400 underline decoration-stone-600">kitch.co.ke</a>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="hover:text-stone-300 cursor-pointer">Privacy & Data</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Apiculture</span>
            <span>·</span>
            <span className="hover:text-stone-300 cursor-pointer">Safaricom Daraja Verified</span>
            <span>·</span>
            <button
              onClick={() => setIsInventoryManagerOpen(true)}
              className="hover:text-amber-400 text-stone-500 transition-colors inline-flex items-center gap-1 focus:outline-none"
              title="Store Administrator Access Only"
            >
              <Lock className="w-3 h-3 text-stone-500 hover:text-amber-400" />
              <span>{isAdminAuthenticated ? 'Admin Operations' : 'Store Admin'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
