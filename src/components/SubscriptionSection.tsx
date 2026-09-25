import React from 'react';
import { Check, ShieldCheck, RefreshCw, Sparkles, Gift } from 'lucide-react';
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_IMAGE } from '../data/honeyData';
import { useShop } from '../context/ShopContext';
import { SubscriptionBoxPlan } from '../types';

export const SubscriptionSection: React.FC = () => {
  const { openSubscriptionBuilder, subscriptions, setIsSubscriptionPortalOpen } = useShop();

  return (
    <section id="subscription-boxes" className="py-16 sm:py-24 bg-honeycomb-warm border-y border-amber-200/80 relative overflow-hidden">
      {/* Warm honey hive background aura */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2">
            <RefreshCw className="w-4 h-4 text-amber-700" />
            <span>The Kitch Hive Club</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-stone-900 text-balance">
            Never run out of pure raw honey. Curated recurring subscription crates.
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Freshly bottled single-origin jars delivered on your schedule across Kenya. 
            Enjoy up to 20% member savings, zero delivery charges in Nairobi, and automatic M-Pesa Ratiba renewals you control with one tap.
          </p>

          {subscriptions.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setIsSubscriptionPortalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-100/90 hover:bg-amber-200/90 px-3.5 py-1.5 rounded-lg border border-amber-300/60 transition-colors"
              >
                <span>You have {subscriptions.length} active subscription{subscriptions.length > 1 ? 's' : ''}</span>
                <span className="underline">Manage in Portal →</span>
              </button>
            </div>
          )}
        </div>

        {/* Subscription Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBSCRIPTION_PLANS.map((plan: SubscriptionBoxPlan) => {
            const savingsKES = plan.originalValueKES - plan.priceKES;
            const savingsPercent = Math.round((savingsKES / plan.originalValueKES) * 100);

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  plan.popular
                    ? 'border-amber-600 shadow-md ring-1 ring-amber-600/30'
                    : 'border-stone-200/90 shadow-sm hover:border-stone-300'
                }`}
              >
                {/* Popularity Banner */}
                {plan.popular && (
                  <div className="bg-stone-900 text-amber-300 text-center py-1.5 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Loyal Choice</span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-stone-500 font-medium">Recurring Crate</div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price & Savings */}
                    <div className="py-3 border-y border-stone-100 flex items-baseline justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tabular-nums">
                            KES {plan.priceKES.toLocaleString()}
                          </span>
                          <span className="text-xs text-stone-500">
                            / {plan.defaultFrequency}
                          </span>
                        </div>
                        <div className="text-xs text-stone-400 line-through tabular-nums">
                          Value: KES {plan.originalValueKES.toLocaleString()}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                          Save {savingsPercent}%
                        </span>
                      </div>
                    </div>

                    {/* What is inside */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                        What is inside each box:
                      </div>
                      <ul className="space-y-2 text-xs text-stone-600">
                        {plan.includedItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="pt-6 mt-6 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => openSubscriptionBuilder(plan)}
                      className={`w-full py-3 px-4 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>Configure Crate & Subscribe</span>
                    </button>

                    <div className="text-[11px] text-center text-stone-400 mt-2">
                      Pause, skip or cancel anytime · No lock-in
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* M-Pesa Ratiba (Recurring Billing) Guarantee Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-700 font-bold text-sm">
              M
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900">Safaricom M-Pesa Ratiba</div>
              <div className="text-xs text-stone-500 mt-0.5">
                Authorize safe standing order directly from your Safaricom SIM menu.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 text-amber-700 font-bold text-sm">
              %
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900">Loyalty Kitch Points</div>
              <div className="text-xs text-stone-500 mt-0.5">
                Earn 120-400 points on every delivery, redeemable for discounts or free honeycomb jars.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 text-stone-700 font-bold text-sm">
              QC
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900">Guaranteed Fresh Batch</div>
              <div className="text-xs text-stone-500 mt-0.5">
                Bottled strictly within 14 days of harvest with fresh batch lab certificate.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
