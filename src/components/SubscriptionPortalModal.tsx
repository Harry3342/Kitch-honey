import React, { useState } from 'react';
import { X, Box, Calendar, MapPin, Smartphone, Pause, Play, SkipForward, AlertCircle, Award, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { KitchLogo } from './KitchLogo';

interface SubscriptionPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionPortalModal: React.FC<SubscriptionPortalModalProps> = ({ isOpen, onClose }) => {
  const { 
    subscriptions, 
    pauseSubscription, 
    resumeSubscription, 
    cancelSubscription, 
    skipNextDelivery,
    loyaltyPoints 
  } = useShop();

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3.5">
            <KitchLogo variant="icon-only" size="md" />
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Kitch Hive Club
              </h2>
              <div className="text-xs text-stone-500">
                Loyalty & Recurring Honey Subscription Dashboard
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loyalty Points Banner */}
        <div className="p-4 bg-gradient-to-r from-amber-900 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-300" />
            <div>
              <div className="text-xs text-amber-200 uppercase tracking-wider font-semibold">
                Available Kitch Loyalty Points
              </div>
              <div className="text-xl font-bold font-mono">
                {loyaltyPoints} Points <span className="text-xs text-amber-300/80 font-sans font-normal">(Worth KES {loyaltyPoints} discount)</span>
              </div>
            </div>
          </div>
          <span className="text-xs bg-amber-800/60 text-amber-200 px-2.5 py-1 rounded border border-amber-700/60">
            Gold Hive Tier
          </span>
        </div>

        {/* Feedback alert */}
        {feedbackMessage && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Subscription List */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {subscriptions.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Box className="w-12 h-12 text-stone-300 mx-auto" />
              <div className="text-sm font-semibold text-stone-800">No active subscriptions</div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Join the Kitch Hive Club to receive fresh raw honey on autopilot with member discounts and free delivery in Kenya.
              </p>
            </div>
          ) : (
            subscriptions.map(sub => {
              const isActive = sub.status === 'active';
              const isPaused = sub.status === 'paused';

              return (
                <div 
                  key={sub.id} 
                  className={`p-5 rounded-2xl border transition-all ${
                    isActive ? 'border-amber-600/60 bg-amber-50/20 shadow-xs' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-200/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-stone-900 font-serif">
                          {sub.planTitle}
                        </h3>
                        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                          isActive 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : isPaused 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-stone-200 text-stone-600'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Cadence: <strong className="capitalize text-stone-700">{sub.frequency}</strong> · KES {sub.priceKES.toLocaleString()} / cycle
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="font-mono text-stone-500 text-[11px] block">
                        {sub.mpesaSubscriptionCode}
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        {sub.paymentMethod === 'mpesa_ratiba' ? 'M-Pesa Standing Order' : 'Card Auto-Debit'}
                      </span>
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 text-xs text-stone-600">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-stone-400 text-[11px]">Next Scheduled Dispatch:</div>
                        <div className="font-semibold text-stone-800">{sub.nextDispatchDate}</div>
                        <div className="text-[10px] text-stone-400">Billing: {sub.nextBillingDate}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-stone-400 text-[11px]">Delivery Location:</div>
                        <div className="font-medium text-stone-800 truncate max-w-[200px]">{sub.deliveryAddress}</div>
                        <div className="text-[10px] text-stone-500">{sub.county}</div>
                      </div>
                    </div>
                  </div>

                  {/* Varietal preferences */}
                  {sub.selectedVarieties && sub.selectedVarieties.length > 0 && (
                    <div className="py-2 border-t border-stone-200/60 text-xs">
                      <span className="text-stone-400 text-[11px] block mb-1">Current Flavour Preferences:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.selectedVarieties.map((v, i) => (
                          <span key={i} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px] text-stone-700">
                            {v.split('(')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2">
                    {isActive ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            skipNextDelivery(sub.id);
                            showFeedback('Next delivery delayed by 30 days.');
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
                        >
                          <SkipForward className="w-3.5 h-3.5 text-stone-500" />
                          <span>Skip Next Delivery</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            pauseSubscription(sub.id);
                            showFeedback('Subscription paused. No charges will be processed.');
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                        >
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Plan</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          resumeSubscription(sub.id);
                          showFeedback('Subscription resumed successfully!');
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Resume Plan</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel your honey subscription?')) {
                          cancelSubscription(sub.id);
                          showFeedback('Subscription cancelled.');
                        }
                      }}
                      className="text-xs text-stone-400 hover:text-red-600 ml-auto transition-colors"
                    >
                      Cancel Membership
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
