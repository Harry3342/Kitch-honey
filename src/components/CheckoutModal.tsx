import React, { useState } from 'react';
import { X, Smartphone, CreditCard, Banknote, ShieldCheck, Check, Loader2, ArrowLeft, Truck, PackageCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, PaymentGatewayState } from '../types';
import { KitchLogo } from './KitchLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    totalWithDelivery,
    selectedCounty,
    processOrderCheckout,
    redeemedPoints
  } = useShop();

  const [customerName, setCustomerName] = useState('Wangari Muthoni');
  const [customerPhone, setCustomerPhone] = useState('0722 849 192');
  const [deliveryAddress, setDeliveryAddress] = useState('House #12, Riverside Drive, Westlands, Nairobi');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa_stk' | 'card' | 'airtel' | 'cod'>('mpesa_stk');

  // Gateway Simulation State
  const [gatewayState, setGatewayState] = useState<PaymentGatewayState>('idle');
  const [simulatedPin, setSimulatedPin] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Format phone to standard Kenyan international display
  const cleanKenyanPhone = (input: string) => {
    let clean = input.replace(/\s+/g, '');
    if (clean.startsWith('0')) clean = '254' + clean.slice(1);
    if (clean.startsWith('+254')) clean = clean.slice(1);
    return clean;
  };

  const handleInitiatePayment = async () => {
    setErrorMessage(null);

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setErrorMessage('Please fill in your name, Kenyan phone number, and delivery address.');
      return;
    }

    if (paymentMethod === 'mpesa_stk') {
      // Step 1: Initiating STK push
      setGatewayState('initiating_stk');
      setTimeout(() => {
        setGatewayState('waiting_user_pin');
      }, 1000);
    } else if (paymentMethod === 'card') {
      setGatewayState('initiating_stk');
      setTimeout(async () => {
        const result = await processOrderCheckout({
          customerName,
          customerPhone,
          deliveryAddress,
          paymentMethod: 'card'
        });
        if (result.success && result.order) {
          setConfirmedOrder(result.order);
          setGatewayState('success');
        } else {
          setErrorMessage(result.error || 'Payment failed');
          setGatewayState('failed');
        }
      }, 1800);
    } else {
      // Airtel / COD
      setGatewayState('initiating_stk');
      setTimeout(async () => {
        const result = await processOrderCheckout({
          customerName,
          customerPhone,
          deliveryAddress,
          paymentMethod
        });
        if (result.success && result.order) {
          setConfirmedOrder(result.order);
          setGatewayState('success');
        } else {
          setErrorMessage(result.error || 'Checkout failed');
          setGatewayState('failed');
        }
      }, 1200);
    }
  };

  // User authorizes M-Pesa prompt simulation
  const handleAuthorizeSimulatedMpesa = async () => {
    setGatewayState('verifying_callback');

    // Simulate Safaricom Daraja callback verification (1.5s)
    setTimeout(async () => {
      const result = await processOrderCheckout({
        customerName,
        customerPhone,
        deliveryAddress,
        paymentMethod: 'mpesa_stk'
      });

      if (result.success && result.order) {
        setConfirmedOrder(result.order);
        setGatewayState('success');
      } else {
        setErrorMessage(result.error || 'Callback timeout');
        setGatewayState('failed');
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <KitchLogo variant="icon-only" size="sm" />
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900 leading-tight">
                {gatewayState === 'success' ? 'Order Confirmed' : 'Checkout & Payment'}
              </h2>
              <p className="text-[11px] text-stone-500">
                Kitch Organic Honey · Official Store
              </p>
            </div>
          </div>

          {gatewayState !== 'waiting_user_pin' && gatewayState !== 'verifying_callback' && (
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {/* STATE: IDLE - FORM & METHOD SELECTOR */}
          {gatewayState === 'idle' && (
            <div className="space-y-6">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Delivery Details */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  1. Delivery Destination ({selectedCounty.name})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Customer Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Safaricom Phone Number</label>
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
                  <label className="block text-stone-600 mb-1 font-medium">
                    Physical Delivery Address (Estate, Apartment, Road)
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    placeholder="e.g., House 4, Acacia Ridge, Dennis Pritt Rd, Kilimani"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                  <div className="text-[11px] text-stone-400 mt-1">
                    ETA: {selectedCounty.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  2. Choose Kenyan Payment Method
                </div>

                {/* M-Pesa STK Push */}
                <div
                  onClick={() => setPaymentMethod('mpesa_stk')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'mpesa_stk'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      M
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">Lipa na M-Pesa (Online STK Push)</div>
                      <div className="text-[11px] text-stone-500">
                        Instant prompt sent to your Safaricom phone to enter M-Pesa PIN
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'mpesa_stk' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                  }`}>
                    {paymentMethod === 'mpesa_stk' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Debit / Credit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">Card Payment (Visa & Mastercard)</div>
                      <div className="text-[11px] text-stone-500">
                        Secured 3D-OTP checkout via Kenyan payment gateway
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'
                  }`}>
                    {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Cash on Delivery / Rider M-Pesa */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">Pay on Delivery (Boda Rider)</div>
                      <div className="text-[11px] text-stone-500">
                        Pay via M-Pesa or cash after inspecting your honey jar seals
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300'
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              {/* Order Summary & Pay Action */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Items Subtotal:</span>
                  <span className="font-mono tabular-nums text-stone-900">KES {cartSubtotal.toLocaleString()}</span>
                </div>
                {redeemedPoints > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Kitch Loyalty Discount:</span>
                    <span className="font-mono tabular-nums">- KES {redeemedPoints.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Courier Delivery:</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {deliveryFee === 0 ? 'FREE' : `KES ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                  <span>Total Due:</span>
                  <span className="font-mono tabular-nums text-base">KES {totalWithDelivery.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInitiatePayment}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Pay KES {totalWithDelivery.toLocaleString()} via {paymentMethod === 'mpesa_stk' ? 'M-Pesa STK' : paymentMethod === 'card' ? 'Card' : 'Delivery'}</span>
              </button>
            </div>
          )}

          {/* STATE: INITIATING STK PUSH SPINNER */}
          {gatewayState === 'initiating_stk' && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
              <div className="text-base font-bold text-stone-900 font-serif">
                Connecting to Safaricom Daraja Gateway...
              </div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Dispatching STK push to <strong className="font-mono text-stone-800">{customerPhone}</strong>. Please have your mobile phone ready.
              </p>
            </div>
          )}

          {/* STATE: WAITING USER PIN (SAFARICOM SIM TOOLKIT SIMULATOR) */}
          {gatewayState === 'waiting_user_pin' && (
            <div className="py-4 space-y-6">
              <div className="text-center space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  STK Push Dispatched
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Simulated Safaricom Phone Prompt
                </h3>
                <p className="text-xs text-stone-500">
                  In a production environment, this prompt appears directly on your Safaricom phone screen:
                </p>
              </div>

              {/* The Classic Safaricom SIM Toolkit Card */}
              <div className="max-w-sm mx-auto bg-stone-900 text-white rounded-2xl p-6 space-y-5 border border-emerald-500/40 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                  <div className="w-6 h-6 rounded bg-emerald-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                    M
                  </div>
                  <div className="text-xs font-mono font-bold tracking-wider text-emerald-400">
                    SAFARICOM M-PESA
                  </div>
                </div>

                <div className="text-xs font-mono leading-relaxed text-stone-300">
                  Do you want to pay <strong className="text-emerald-400">KES {totalWithDelivery.toLocaleString()}</strong> to <strong className="text-white">KITCH ORGANIC HONEY LTD</strong> Paybill 882109 Acc. INV-1049?
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-stone-400">
                    Enter M-Pesa PIN:
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={simulatedPin}
                    onChange={e => setSimulatedPin(e.target.value)}
                    placeholder="••••"
                    className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-center text-xl tracking-[0.5em] font-mono text-white focus:outline-hidden focus:border-emerald-500"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setGatewayState('idle')}
                    className="py-2 text-xs font-mono rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAuthorizeSimulatedMpesa}
                    className="py-2 text-xs font-mono font-bold rounded bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-xs"
                  >
                    Send PIN
                  </button>
                </div>

                <div className="text-[10px] text-center text-stone-500 font-mono">
                  Safaricom Daraja API Sandbox Simulator
                </div>
              </div>
            </div>
          )}

          {/* STATE: VERIFYING CALLBACK */}
          {gatewayState === 'verifying_callback' && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-amber-600 animate-spin mx-auto" />
              <div className="text-base font-bold text-stone-900 font-serif">
                Verifying Safaricom M-Pesa Callback...
              </div>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Reconciling M-Pesa transaction with bank ledger and allocating reserved honey jars from apiary batch.
              </p>
            </div>
          )}

          {/* STATE: SUCCESS SCREEN & RECEIPT */}
          {gatewayState === 'success' && confirmedOrder && (
            <div className="py-2 space-y-5">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Payment Successful!
                </h3>
                <p className="text-xs text-stone-600">
                  Order <strong>{confirmedOrder.orderNumber}</strong> has been confirmed and allocated.
                </p>
              </div>

              {/* Authentic Kenyan M-Pesa SMS Confirmation View */}
              {confirmedOrder.mpesaReceiptNumber && (
                <div className="p-4 bg-emerald-950 text-emerald-100 rounded-xl font-mono text-xs leading-relaxed space-y-2 border border-emerald-800/80 shadow-inner">
                  <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-800 pb-2">
                    <span>M-PESA TRANSACTION RECEIPT</span>
                    <span>{confirmedOrder.mpesaReceiptNumber}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200">
                    "{confirmedOrder.mpesaReceiptNumber} Confirmed. Ksh{confirmedOrder.totalKES.toLocaleString()}.00 sent to KITCH ORGANIC HONEY LTD on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}. Transaction cost, Ksh0.00."
                  </p>
                </div>
              )}

              {/* Delivery Logistics Status Card */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>Delivery Logistics</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-stone-400 block">Recipient:</span>
                    <span className="font-semibold text-stone-800">{confirmedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Phone:</span>
                    <span className="font-mono text-stone-800">{confirmedOrder.customerPhone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block">Delivery Address:</span>
                    <span className="text-stone-800">{confirmedOrder.deliveryAddress} ({confirmedOrder.county})</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block">Estimated Arrival:</span>
                    <span className="font-medium text-emerald-800">{confirmedOrder.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Items & Batch Codes */}
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                    Harvest Jars Dispatched:
                  </span>
                  <div className="space-y-1">
                    {confirmedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span>{it.quantity}x {it.productName}</span>
                        <span className="font-mono text-stone-500">Batch #{it.batchNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close / Return Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold"
              >
                Done · Return to Store
              </button>
            </div>
          )}

          {/* STATE: FAILED */}
          {gatewayState === 'failed' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Payment Verification Failed
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {errorMessage || 'The payment could not be validated with the gateway. Please try again or switch to Cash / M-Pesa on Delivery.'}
              </p>
              <button
                type="button"
                onClick={() => setGatewayState('idle')}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
              >
                Retry Payment
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
