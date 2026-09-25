export interface BatchQualityReport {
  batchNumber: string;
  harvestDate: string;
  moistureContent: number; // e.g. 17.2 (%)
  fructoseGlucoseRatio: number; // e.g. 1.18
  hmfLevel: number; // Hydroxymethylfurfural in mg/kg, e.g. 9.4 (<40 is international standard, <15 is ultra-fresh raw)
  pollenGrainDensity: string; // e.g. "94% Dominant Acacia Nilotica"
  kebsCertificateNo: string; // e.g. "KEBS/SM-09281-2026"
  apiaryRegion: string; // e.g. "Lake Baringo Conservancies"
  leadBeekeeper: string; // e.g. "Lparmaroi Lemashon"
  cooperativeName: string; // e.g. "Baringo Pastoralists Organic Honey CBO"
}

export interface Product {
  id: string;
  name: string;
  swahiliTitle: string;
  slug: string;
  category: 'monofloral' | 'forest' | 'medicinal' | 'infusions' | 'comb';
  tagline: string;
  description: string;
  tastingNotes: string[];
  recommendedUses: string[];
  priceKES: number;
  weightGrams: number;
  stock: number; // Live real-time stock available
  reserved: number; // Stock currently held in active checkouts
  lowStockThreshold: number;
  image: string;
  fallbackColor: string;
  quality: BatchQualityReport;
  featured?: boolean;
}

export interface SubscriptionBoxPlan {
  id: string;
  title: string;
  tagline: string;
  description: string;
  frequencyOptions: ('biweekly' | 'monthly' | 'bimonthly' | 'quarterly')[];
  defaultFrequency: 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly';
  priceKES: number;
  originalValueKES: number;
  image: string;
  includedItems: string[];
  freeDelivery: boolean;
  loyaltyPointsPerCycle: number;
  bestFor: string;
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  planId: string;
  planTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  county: string;
  deliveryAddress: string;
  frequency: 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly';
  priceKES: number;
  status: 'active' | 'paused' | 'cancelled';
  nextBillingDate: string;
  nextDispatchDate: string;
  paymentMethod: 'mpesa_ratiba' | 'card_recurring';
  mpesaSubscriptionCode?: string;
  selectedVarieties: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  reservedAt: number; // Timestamp for timeout
}

export interface KenyanCounty {
  code: string;
  name: string;
  zone: 'nairobi_express' | 'nairobi_metro' | 'major_towns' | 'upcountry';
  feeKES: number;
  estimatedDelivery: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPriceKES: number;
    batchNumber: string;
  }[];
  subtotalKES: number;
  deliveryFeeKES: number;
  discountKES: number;
  totalKES: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  county: string;
  paymentMethod: 'mpesa_stk' | 'card' | 'airtel' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  mpesaReceiptNumber?: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveryStatus: 'order_confirmed' | 'batch_allocated' | 'dispatched_rider' | 'delivered';
}

export type PaymentGatewayState = 
  | 'idle' 
  | 'initiating_stk' 
  | 'waiting_user_pin' 
  | 'verifying_callback' 
  | 'success' 
  | 'failed';
