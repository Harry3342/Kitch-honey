import React from 'react';
import { X, Trash2, Plus, Minus, Clock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { KENYAN_COUNTIES } from '../data/honeyData';
import { KitchLogo } from './KitchLogo';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartReservationSecondsRemaining,
    selectedCounty,
    setSelectedCounty,
    deliveryFee,
    totalWithDelivery,
    loyaltyPoints,
    redeemedPoints,
    setRedeemedPoints,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateCartQuantity,
    removeFromCart
  } = useShop();

  if (!isCartOpen) return null;

  const minutes = Math.floor(cartReservationSecondsRemaining / 60);
  const seconds = cartReservationSecondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const isNairobi = selectedCounty.zone === 'nairobi_express';
  const freeDeliveryShortfall = 3500 - cartSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <KitchLogo variant="icon-only" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-stone-900 leading-none">
                  Shopping Bag
                </h2>
                <span className="text-xs font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">Kitch Organic Kenya</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Stock Hold Timer */}
        {cart.length > 0 && (
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-900">
              <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>Apiary batch stock reserved for you</span>
            </div>
            <div className="font-mono font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
              {formattedTime}
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-xl">
                🍯
              </div>
              <div className="text-sm font-semibold text-stone-800">Your bag is empty</div>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our raw single-origin Kenyan honeys harvested by local pastoralists.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-semibold text-amber-800 hover:underline"
              >
                Browse Harvest Collection →
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex items-start gap-3.5 p-3 rounded-xl border border-stone-200/80 bg-white"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-stone-500 font-mono">
                    Batch #{item.product.quality.batchNumber.split('-')[0]}
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-stone-500">
                    {item.product.weightGrams}g · {item.product.quality.apiaryRegion.split(',')[0]}
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-md">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.product.stock <= 0}
                        className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      KES {(item.product.priceKES * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Delivery & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            
            {/* Delivery County Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Delivery Zone:</span>
                </span>
                <span className="text-stone-500 font-mono text-[11px]">
                  {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                </span>
              </div>
              <select
                value={selectedCounty.code}
                onChange={e => {
                  const matched = KENYAN_COUNTIES.find(c => c.code === e.target.value);
                  if (matched) setSelectedCounty(matched);
                }}
                className="w-full text-xs py-2 px-3 bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-hidden focus:border-amber-600"
              >
                {KENYAN_COUNTIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>

              {isNairobi && freeDeliveryShortfall > 0 && (
                <div className="text-[11px] text-amber-800 font-medium">
                  Add KES {freeDeliveryShortfall.toLocaleString()} more for Free Nairobi Express Delivery!
                </div>
              )}
            </div>

            {/* Loyalty Points Redemption Toggle */}
            {loyaltyPoints > 0 && (
              <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900">Kitch Loyalty Points:</span>
                  <span className="text-stone-600 block text-[11px]">You have {loyaltyPoints} points available</span>
                </div>
                {redeemedPoints > 0 ? (
                  <button
                    type="button"
                    onClick={() => setRedeemedPoints(0)}
                    className="text-xs text-amber-900 font-semibold underline"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRedeemedPoints(Math.min(loyaltyPoints, cartSubtotal))}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold"
                  >
                    Apply KES {Math.min(loyaltyPoints, cartSubtotal)} Off
                  </button>
                )}
              </div>
            )}

            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums text-stone-900">
                  KES {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {redeemedPoints > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Loyalty Discount:</span>
                  <span className="font-mono tabular-nums">- KES {redeemedPoints.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums text-base text-stone-950">
                  KES {totalWithDelivery.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
            >
              <span>Proceed to Lipa na M-Pesa Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safaricom Daraja Secured · KEBS Certified Quality</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
