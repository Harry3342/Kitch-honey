import React, { useState } from 'react';
import { Plus, Check, FileText, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForDetail } = useShop();
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    const success = addToCart(product.id, 1);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1600);
    }
  };

  return (
    <div 
      onClick={() => setSelectedProductForDetail(product)}
      className="group relative flex flex-col bg-white/95 backdrop-blur-xs rounded-xl border border-stone-200/80 overflow-hidden hover:border-amber-400/80 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Asset Container (65-70% height emphasis) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {/* Fallback container */}
        <div 
          className={`absolute inset-0 bg-stone-100 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-serif text-sm">
            🍯
          </div>
        </div>

        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Minimalist Stock & Quality Indicators (Clean, unboxed or single subtle status) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider text-stone-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-2xs">
            Batch #{product.quality.batchNumber.split('-')[0]}
          </span>
          {isOutOfStock ? (
            <span className="text-[11px] font-medium text-red-700 bg-red-50/90 backdrop-blur-sm px-2 py-0.5 rounded border border-red-200">
              Harvest Sold Out
            </span>
          ) : isLowStock ? (
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50/90 backdrop-blur-sm px-2 py-0.5 rounded border border-amber-200">
              Only {product.stock} jars left
            </span>
          ) : (
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50/90 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-200">
              In Stock · {product.stock} available
            </span>
          )}
        </div>

        {/* Quick View Traceability Badge on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="flex items-center gap-1 text-xs font-medium text-stone-900 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-stone-200">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            Inspect Lab Passport
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-1.5">
          {/* Unboxed Metadata (Category · Weight · Moisture) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-normal">
            <span className="capitalize">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weightGrams}g Glass Jar</span>
            <span aria-hidden="true">·</span>
            <span>{product.quality.moistureContent}% Moisture</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>

          {/* Swahili secondary title */}
          <div className="text-xs italic text-amber-800/80">
            {product.swahiliTitle}
          </div>

          {/* Brief Terroir Tasting Snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 pt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-stone-400">Price</div>
            <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
              KES {product.priceKES.toLocaleString()}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Reserved</span>
              </>
            ) : isOutOfStock ? (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Sold Out</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
