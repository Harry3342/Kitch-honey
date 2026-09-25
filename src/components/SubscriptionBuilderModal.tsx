import React, { useState } from 'react';
import { X, Check, ShieldCheck, RefreshCw, Smartphone, CreditCard, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { SubscriptionBoxPlan } from '../types';
import { KENYAN_COUNTIES } from '../data/honeyData';
import { useShop } from '../context/ShopContext';
import { KitchLogo } from './KitchLogo';

interface SubscriptionBuilderModalProps {
  plan: SubscriptionBoxPlan | null;
  onClose: () => void;
}

export const SubscriptionBuilderModal: React.FC<SubscriptionBuilderModalProps> = ({ plan, onClose }) => {
  const { subscribeToPlan, setIsSubscriptionPortalOpen } = useShop();

  const [step, setStep] = useState<'customize' | 'delivery' | 'payment_auth' | 'confirmed'>('customize');
  const [frequency, setFrequency] = useState<'biweekly' | 'monthly' | 'bimonthly' | 'quarterly'>('monthly');
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([
    'Baringo Wild Acacia (Light Amber)',
    'Kakamega Rainforest (Dark Amber)'
  ]);

  // Form details
  const [customerName, setCustomerName] = useState('Wangari Muthoni');
  const [customerPhone, setCustomerPhone] = useState('0722 849 192');
  const [customerEmail, setCustomerEmail] = useState('wangari.muthoni@gmail.com');
  const [county, setCounty] = useState(KENYAN_COUNTIES[0].name);
  const [deliveryAddress, setDeliveryAddress] = useState('Apt 4B, Kingara Close, Lavington, Nairobi');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_ratiba' | 'card_recurring'>('mpesa_ratiba');

  // Simulation states
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [simulatedPin, setSimulatedPin] = useState('');
  const [showSimulatedPrompt, setShowSimulatedPrompt] = useState(false);
  const [createdSubscriptionCode, setCreatedSubscriptionCode] = useState('');

  if (!plan) return null;

  const toggleVariety = (variety: string) => {
    setSelectedVarieties(prev => 
      prev.includes(variety)
        ? prev.filter(v => v !== variety)
        : [...prev, variety]
    );
  };

  const handleStartAuthorization = () => {
    if (paymentMethod === 'mpesa_ratiba') {
      setShowSimulatedPrompt(true);
    } else {
      finalizeSubscription();
    }
  };

  const finalizeSubscription = async () => {
    setIsAuthorizing(true);
    setShowSimulatedPrompt(false);

    // Simulate 1.5s network round-trip with Safaricom Daraja API
    setTimeout(async () => {
      const result = await subscribeToPlan(plan, {
        customerName,
        customerPhone,
        customerEmail,
        county,
        deliveryAddress,
        frequency,
        paymentMethod,
        selectedVarieties
      });

      setIsAuthorizing(false);
      if (result.success && result.subscription) {
        setCreatedSubscriptionCode(result.subscription.mpesaSubscriptionCode || 'MPESA-RAT-90812');
        setStep('confirmed');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <KitchLogo variant="icon-only" size="sm" />
            <div>
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                Kitch Hive Club Setup
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                {plan.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto">
          
          {/* STEP 1: CUSTOMIZE CADENCE & PROFILES */}
          {step === 'customize' && (
            <div className="space-y-6">
              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Delivery Cadence
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'biweekly', label: 'Every 2 Weeks', desc: 'Brisk household' },
                    { id: 'monthly', label: 'Monthly (Recommended)', desc: 'Standard pantry pace' },
                    { id: 'bimonthly', label: 'Every 2 Months', desc: 'Casual honey lovers' },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id as any)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        frequency === freq.id
                          ? 'border-amber-600 bg-amber-50/60 text-stone-900'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      <div className="text-xs font-bold">{freq.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{freq.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terroir Flavor Preferences */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Choose Preferred Terroirs in Rotation
                </label>
                <p className="text-xs text-stone-500 mb-3">
                  Our apiculture team will rotate based on fresh seasonal harvests:
                </p>

                <div className="space-y-2">
                  {[
                    'Baringo Wild Acacia (Light Amber, Delicate & Silky)',
                    'Kakamega Rainforest (Dark Amber, Bold & Medicinal)',
                    'Lamu Coastal Mangrove (Crisp Marine Saline Undertone)',
                    'Mount Kenya Whipped Raw Ginger & Cinnamon Honey',
                    'Nandi Melipona Stingless Bee Elixir (Medicinal Tang)'
                  ].map((variety) => {
                    const isSelected = selectedVarieties.includes(variety);
                    return (
                      <div
                        key={variety}
                        onClick={() => toggleVariety(variety)}
                        className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-stone-800 bg-stone-50 text-stone-900'
                            : 'border-stone-200 text-stone-500 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-xs font-medium">{variety}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price summary */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-900">
                    Recurring Crate Price: KES {plan.priceKES.toLocaleString()} / {frequency}
                  </div>
                  <div className="text-stone-500 mt-0.5">
                    Free Nairobi Delivery included · +{plan.loyaltyPointsPerCycle} Kitch Points each cycle
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('delivery')}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Continue to Delivery Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: DELIVERY DETAILS */}
          {step === 'delivery' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Delivery Address in Kenya
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Safaricom Mobile (for M-Pesa)</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-stone-600 mb-1 font-medium">Email Address (for Dispatch Invoices)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="text-xs">
                <label className="block text-stone-600 mb-1 font-medium">County / Delivery Zone</label>
                <select
                  value={county}
                  onChange={e => setCounty(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600 bg-white"
                >
                  {KENYAN_COUNTIES.map(c => (
                    <option key={c.code} value={c.name}>
                      {c.name} ({c.estimatedDelivery})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs">
                <label className="block text-stone-600 mb-1 font-medium">Street, Estate or House / Office Address</label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. House #14, Acacia Court, Dennis Pritt Rd, Kilimani"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('customize')}
                  className="py-2.5 px-4 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment_auth')}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <span>Select Recurring Payment Method</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & M-PESA RATIBA AUTHORIZATION */}
          {step === 'payment_auth' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Recurring Billing Authorization
                </label>
                <p className="text-xs text-stone-600 mb-4">
                  Select your preferred recurring billing option. Safaricom M-Pesa Ratiba will automatically prompt your phone before each cycle:
                </p>

                <div className="space-y-3">
                  {/* M-Pesa Ratiba */}
                  <div
                    onClick={() => setPaymentMethod('mpesa_ratiba')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'mpesa_ratiba'
                        ? 'border-emerald-600 bg-emerald-50/50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                          M
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">Lipa na M-Pesa Ratiba (Standing Order)</div>
                          <div className="text-[11px] text-stone-500">
                            Automatic STK prompt to {customerPhone} every {frequency}
                          </div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'mpesa_ratiba' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                      }`}>
                        {paymentMethod === 'mpesa_ratiba' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>

                  {/* Card Recurring */}
                  <div
                    onClick={() => setPaymentMethod('card_recurring')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card_recurring'
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">Credit / Debit Card (Visa / Mastercard)</div>
                          <div className="text-[11px] text-stone-500">
                            Secured tokenized recurring auto-debit via Pesapal Kenya
                          </div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'card_recurring' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'
                      }`}>
                        {paymentMethod === 'card_recurring' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Plan:</span>
                  <span className="font-semibold text-stone-900">{plan.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Billing Schedule:</span>
                  <span className="font-semibold text-stone-900 capitalize">{frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Cycle Charge:</span>
                  <span className="font-mono font-bold text-stone-900">KES {plan.priceKES.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">First Box Delivery:</span>
                  <span className="font-medium text-emerald-800">Within 24-48 Hours</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('delivery')}
                  className="py-2.5 px-4 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStartAuthorization}
                  disabled={isAuthorizing}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  {isAuthorizing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authorizing with Safaricom Daraja...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Authorize Subscription · KES {plan.priceKES.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: CONFIRMED */}
          {step === 'confirmed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Welcome to The Kitch Hive Club!
                </h3>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  Your recurring subscription is officially active. First harvest crate is being allocated and packed at our Karen, Nairobi facility.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs max-w-md mx-auto text-left space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">M-Pesa Standing Order:</span>
                  <span className="font-bold text-stone-900">{createdSubscriptionCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">Subscriber:</span>
                  <span className="text-stone-800">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">Phone:</span>
                  <span className="text-stone-800">{customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-sans">Cycle Amount:</span>
                  <span className="font-bold text-emerald-800">KES {plan.priceKES.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setIsSubscriptionPortalOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Manage Subscription in Member Portal
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* SAFARICOM M-PESA RATIBA POPUP SIMULATOR */}
      {showSimulatedPrompt && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-2xl max-w-sm w-full p-6 space-y-5 border border-emerald-500/50 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <div className="w-6 h-6 rounded bg-emerald-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                M
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-emerald-400">
                SAFARICOM M-PESA SIM TOOLKIT
              </div>
            </div>

            <div className="text-xs leading-relaxed text-stone-300 font-mono">
              Do you wish to authorize a standing order of <strong className="text-emerald-400">KES {plan.priceKES.toLocaleString()}</strong> to <strong className="text-white">KITCH ORGANIC HONEY LTD</strong> for {plan.title} every {frequency}?
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-stone-400 uppercase">
                Enter M-Pesa PIN to Authorize:
              </label>
              <input
                type="password"
                maxLength={4}
                value={simulatedPin}
                onChange={e => setSimulatedPin(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-lg text-center text-xl tracking-[0.5em] font-mono text-white focus:outline-hidden focus:border-emerald-500"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSimulatedPrompt(false)}
                className="py-2.5 text-xs font-mono rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={finalizeSubscription}
                className="py-2.5 text-xs font-mono font-bold rounded bg-emerald-500 hover:bg-emerald-400 text-stone-950"
              >
                AUTHORIZE PIN
              </button>
            </div>
            
            <div className="text-[10px] text-center text-stone-500 font-mono">
              Daraja Ratiba Engine · Encrypted Safaricom Sandbox
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
