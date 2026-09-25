import React, { useState } from 'react';
import { ArrowRight, Shield, MapPin, Truck, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data/honeyData';
import { KitchLogo } from './KitchLogo';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-amber-100/50 via-amber-50/30 to-transparent">
      {/* Decorative Honeycomb Hive Ambient Glows */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout: Grid with image & copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Brand Intro & Origin Kicker */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif font-bold text-amber-900 uppercase tracking-widest bg-amber-100/90 px-2.5 py-1 rounded">
                Kitch Artisanal Honey
              </span>
              <span className="text-stone-300">·</span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide uppercase text-amber-800">
                <span>Baringo</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Kakamega</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Nandi</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Lamu</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-900 leading-[1.12] text-balance">
              The best organic honey in Kenya, harvested with reverence.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Direct-from-hive single-origin organic honeys from Kenya’s pristine micro-climates. 
              Tracked live by apiary batch, verified under KEBS KS EAS 36:2018, and delivered fresh to your door with Lipa na M-Pesa.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#honey-collection"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all duration-200"
              >
                <span>Shop Fresh Harvests</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#subscription-boxes"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-lg transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 text-amber-700" />
                <span>Join Kitch Hive Club</span>
              </a>
            </div>

            {/* Trust Markers: Clean unboxed editorial notes */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">100% Raw & Unheated</div>
                  <div className="text-stone-500 text-[11px]">Enzymes preserved &lt; 15 HMF</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">Nairobi Express</div>
                  <div className="text-stone-500 text-[11px]">Same-day Boda rider delivery</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">Batch Traceable</div>
                  <div className="text-stone-500 text-[11px]">GPS coordinates on each jar</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border-2 border-amber-300/60 honey-glow-md group">
              {/* Fallback container */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-amber-600/20 via-amber-500/10 to-stone-200 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              />
              
              <img
                src={HERO_IMAGE}
                alt="Macro close-up of natural organic honeycomb hive frame bursting with pure liquid golden honey and hexagonal wax cells"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'} group-hover:scale-102`}
              />

              {/* Floating Top Honeycomb Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-400/40 text-xs font-semibold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Direct Hive Harvest · Virgin Honeycomb</span>
                </div>
              </div>

              {/* Scrim overlay with gentle terroir caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                      Live Apiary Pull · Honeycomb Hive Frame #BRG-09A
                    </div>
                    <div className="text-sm font-medium text-stone-100 mt-0.5">
                      Baringo Langstroth Hives · 100% Raw Comb & Liquid Gold
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-400/40 font-semibold">
                      KEBS Grade A
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
