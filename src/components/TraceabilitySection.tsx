import React, { useState } from 'react';
import { ShieldCheck, MapPin, Compass, Award, CheckCircle2, ChevronRight, Droplet } from 'lucide-react';
import { KENYAN_TERROIRS } from '../data/honeyData';

export const TraceabilitySection: React.FC = () => {
  const [activeTerroirIndex, setActiveTerroirIndex] = useState(0);
  const activeTerroir = KENYAN_TERROIRS[activeTerroirIndex];

  return (
    <section id="traceability" className="py-16 sm:py-24 bg-honeycomb-warm border-b border-amber-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Kenya Apiary Terroirs & Traceability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-stone-900 text-balance">
            Rooted in Kenya’s wild landscapes and protected indigenous sanctuaries.
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed">
            Every drop is traceable to the exact hive, beekeeping cooperative, and botanical nectar source. 
            We never blend or pasteurize honey, preserving volatile bio-active enzymes and unique micro-climate aromatics.
          </p>
        </div>

        {/* Terroir Exploration Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Terroirs Selector Tabs */}
          <div className="lg:col-span-5 space-y-2.5">
            {KENYAN_TERROIRS.map((t, idx) => {
              const isActive = activeTerroirIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTerroirIndex(idx)}
                  className={`w-full p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'border-amber-700 bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{t.region}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5 truncate max-w-xs">{t.floralSource}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-800 translate-x-1' : 'text-stone-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Terroir Dossier Card */}
          <div className="lg:col-span-7 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
            
            <div className="border-b border-stone-200 pb-4">
              <div className="text-xs font-mono uppercase text-amber-800 tracking-wider">
                Sanctuary Terroir Dossier
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {activeTerroir.region}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-stone-400 uppercase text-[10px] block">Floral Nectar Source</span>
                <span className="font-semibold text-stone-800 text-xs mt-0.5 block">{activeTerroir.floralSource}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-stone-400 uppercase text-[10px] block">Altitude & Climate</span>
                <span className="font-semibold text-stone-800 text-xs mt-0.5 block">{activeTerroir.elevation} · {activeTerroir.climate}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-stone-400 uppercase text-[10px] block">Harvest Season</span>
                <span className="font-semibold text-stone-800 text-xs mt-0.5 block">{activeTerroir.harvestSeason}</span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                <span className="text-stone-400 uppercase text-[10px] block">Terroir Tasting Profile</span>
                <span className="font-semibold text-stone-800 text-xs mt-0.5 block">{activeTerroir.tasteSignature}</span>
              </div>
            </div>

            {/* Environmental Stewardship statement */}
            <div className="p-4 bg-amber-100/60 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-800" />
                <span>Fair Pastoralist Trade & Habitat Protection</span>
              </div>
              <p className="text-amber-900/90 text-[11px] leading-relaxed">
                We pay beekeepers 35% above conventional market broker rates, providing modern protective gear, clean solar smokers, and direct hive-sponsorship funding that protects acacia conservancies from charcoal burning.
              </p>
            </div>

          </div>

        </div>

        {/* KEBS KS EAS 36:2018 Certification Benchmarks */}
        <div id="kebs-standards" className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="text-2xl font-serif font-bold text-stone-900">
              Tested to Kenya Bureau of Standards (KEBS) KS EAS 36:2018
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Every single batch is independently tested before bottling at our Karen honey lab.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-amber-700" />
                <span>Moisture Standard &lt; 19%</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Commercial blended honeys ferment because they harvest unripe comb. Kitch Organic Honey tests between 16.5% and 17.5% moisture, ensuring eternal shelf life without additives.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Glucose Syrup / Adulteration</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Isotope and pollen grain density testing guarantees 0% added cane sugar, corn starch, or artificial colorants. Just 100% bee-made nectar.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>HMF Level &lt; 15 mg/kg</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                High HMF indicates heat damage. Our honey is gravity-strained through mesh at room temperature. Live diastase, invertase, and antioxidant enzymes remain intact.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
