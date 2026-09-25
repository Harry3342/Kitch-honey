import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Award, Check, Plus, Minus, Info } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const maxCanAdd = Math.min(product.stock, 10);

  const handleAdd = () => {
    if (quantity > product.stock) return;
    const success = addToCart(product.id, quantity);
    if (success) {
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Product Visual & Quality Seal */}
          <div className="md:col-span-5 bg-stone-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xs bg-stone-200">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* KEBS Official Seal Card */}
              <div className="p-3.5 bg-white rounded-xl border border-stone-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>KEBS Quality Assurance</span>
                </div>
                <div className="text-stone-600 space-y-1 text-[11px]">
                  <div>Standard: <strong className="text-stone-800">KS EAS 36:2018 (Grade A)</strong></div>
                  <div>Cert Permit: <span className="font-mono text-stone-700">{product.quality.kebsCertificateNo}</span></div>
                  <div>Origin: <span className="text-stone-700">{product.quality.apiaryRegion}</span></div>
                </div>
              </div>
            </div>

            {/* Real-time Apiary Stock Snapshot */}
            <div className="mt-4 pt-4 border-t border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>Available in apiary:</span>
                <span className="font-mono font-bold text-stone-900">{product.stock} jars</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                <span>Currently in shopper carts:</span>
                <span className="font-mono text-amber-700">{product.reserved} jars held</span>
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Passport & Specs */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              
              {/* Header */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-800">
                  Batch #{product.quality.batchNumber} · Harvested {product.quality.harvestDate}
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  {product.name}
                </h2>
                <div className="text-sm italic text-stone-500 mt-0.5">
                  {product.swahiliTitle}
                </div>
              </div>

              {/* Price & Weight */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                  KES {product.priceKES.toLocaleString()}
                </span>
                <span className="text-sm text-stone-500">
                  / {product.weightGrams}g glass jar
                </span>
              </div>

              {/* Narrative description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Lab Quality Analysis Table */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 space-y-3">
                <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Lab Testing & Botanical Analysis</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-white rounded border border-stone-100">
                    <div className="text-stone-400 text-[10px] uppercase">Moisture Content</div>
                    <div className="font-mono font-bold text-stone-800 text-sm">
                      {product.quality.moistureContent}%
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">Standard &lt; 19.0%</div>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-100">
                    <div className="text-stone-400 text-[10px] uppercase">HMF (Heat Exposure)</div>
                    <div className="font-mono font-bold text-stone-800 text-sm">
                      {product.quality.hmfLevel} mg/kg
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">Ultra-Raw (&lt; 15 mg)</div>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-100">
                    <div className="text-stone-400 text-[10px] uppercase">Fructose/Glucose</div>
                    <div className="font-mono font-bold text-stone-800 text-sm">
                      {product.quality.fructoseGlucoseRatio}
                    </div>
                    <div className="text-[10px] text-stone-500">Natural nectar ratio</div>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-100">
                    <div className="text-stone-400 text-[10px] uppercase">Lead Beekeeper</div>
                    <div className="font-medium text-stone-800 text-xs truncate">
                      {product.quality.leadBeekeeper}
                    </div>
                    <div className="text-[10px] text-stone-500">{product.quality.cooperativeName.split(' ')[0]} Coop</div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded border border-stone-100">
                  <span className="font-semibold text-stone-700">Dominant Pollen: </span>
                  {product.quality.pollenGrainDensity}
                </div>
              </div>

              {/* Tasting Notes */}
              <div>
                <div className="text-xs font-semibold text-stone-800 mb-2">Tasting Notes</div>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity + Add to Bag */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded-lg p-1 w-full sm:w-auto justify-between">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(maxCanAdd, q + 1))}
                  disabled={quantity >= maxCanAdd || isOutOfStock}
                  className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={isOutOfStock}
                className={`flex-1 w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : isOutOfStock ? (
                  <span>Harvest Batch Sold Out</span>
                ) : (
                  <span>
                    Add {quantity} {quantity === 1 ? 'Jar' : 'Jars'} to Bag · KES {(product.priceKES * quantity).toLocaleString()}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
