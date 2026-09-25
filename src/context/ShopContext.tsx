import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  UserSubscription, 
  KenyanCounty, 
  SubscriptionBoxPlan,
  PaymentGatewayState 
} from '../types';
import { INITIAL_PRODUCTS, SUBSCRIPTION_PLANS, KENYAN_COUNTIES } from '../data/honeyData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartReservationSecondsRemaining: number;
  selectedCounty: KenyanCounty;
  deliveryFee: number;
  totalWithDelivery: number;
  orders: Order[];
  subscriptions: UserSubscription[];
  loyaltyPoints: number;
  redeemedPoints: number;
  
  // UI states
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isSubscriptionBuilderOpen: boolean;
  selectedPlanForBuilder: SubscriptionBoxPlan | null;
  isSubscriptionPortalOpen: boolean;
  isInventoryManagerOpen: boolean;
  selectedProductForDetail: Product | null;
  activeOrderForTracking: Order | null;
  
  // Actions
  addToCart: (productId: string, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => boolean;
  clearCart: () => void;
  setSelectedCounty: (county: KenyanCounty) => void;
  setRedeemedPoints: (points: number) => void;
  
  // Order & Payment
  processOrderCheckout: (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'mpesa_stk' | 'card' | 'airtel' | 'cod';
  }) => Promise<{ success: boolean; order?: Order; error?: string }>;
  
  // Subscriptions
  subscribeToPlan: (plan: SubscriptionBoxPlan, details: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    county: string;
    deliveryAddress: string;
    frequency: 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly';
    paymentMethod: 'mpesa_ratiba' | 'card_recurring';
    selectedVarieties: string[];
  }) => Promise<{ success: boolean; subscription?: UserSubscription }>;
  pauseSubscription: (subId: string) => void;
  resumeSubscription: (subId: string) => void;
  cancelSubscription: (subId: string) => void;
  skipNextDelivery: (subId: string) => void;
  
  // Inventory admin controls & real-time simulation
  restockProduct: (productId: string, additionalUnits: number, newBatch?: string) => void;
  simulateLiveCustomerOrder: () => void;
  
  // UI setters
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  openSubscriptionBuilder: (plan: SubscriptionBoxPlan) => void;
  setIsSubscriptionBuilderOpen: (open: boolean) => void;
  setIsSubscriptionPortalOpen: (open: boolean) => void;
  setIsInventoryManagerOpen: (open: boolean) => void;
  setSelectedProductForDetail: (product: Product | null) => void;
  setActiveOrderForTracking: (order: Order | null) => void;
  
  // Store administrator authentication
  isAdminAuthenticated: boolean;
  adminLogin: (keyOrPass: string) => boolean;
  adminLogout: () => void;
  updateAdminPassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PRODUCTS = 'kitch_honey_products_v1';
const LOCAL_STORAGE_KEY_CART = 'kitch_honey_cart_v1';
const LOCAL_STORAGE_KEY_ORDERS = 'kitch_honey_orders_v1';
const LOCAL_STORAGE_KEY_SUBS = 'kitch_honey_subs_v1';
const LOCAL_STORAGE_KEY_POINTS = 'kitch_honey_points_v1';
const LOCAL_STORAGE_KEY_ADMIN = 'kitch_admin_auth_v1';
const LOCAL_STORAGE_KEY_ADMIN_PASS = 'kitch_admin_custom_pass_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state with live inventory
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS) || localStorage.getItem('asali_wild_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure image links are intact
        return INITIAL_PRODUCTS.map(initial => {
          const matched = parsed.find((p: Product) => p.id === initial.id);
          return matched ? { ...initial, stock: matched.stock, reserved: matched.reserved } : initial;
        });
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CART) || localStorage.getItem('asali_wild_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart reservation timeout (10 minutes countdown)
  const [cartReservationSecondsRemaining, setCartReservationSecondsRemaining] = useState(600);

  // 3. Kenyan county for delivery
  const [selectedCounty, setSelectedCounty] = useState<KenyanCounty>(KENYAN_COUNTIES[0]);

  // 4. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS) || localStorage.getItem('asali_wild_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed an authentic Kenyan completed order
    return [
      {
        id: 'ord-nbi-1049',
        orderNumber: 'KTC-2026-0891',
        items: [
          {
            productId: 'prod-baringo-acacia',
            productName: 'Baringo Golden Wild Acacia Honey (500g)',
            quantity: 1,
            unitPriceKES: 1150,
            batchNumber: 'BRG-AC-2026-09A'
          },
          {
            productId: 'prod-kakamega-rainforest',
            productName: 'Kakamega Forest Raw Canopy Honey (500g)',
            quantity: 1,
            unitPriceKES: 1350,
            batchNumber: 'KKM-FOR-2026-07D'
          }
        ],
        subtotalKES: 2500,
        deliveryFeeKES: 200,
        discountKES: 0,
        totalKES: 2700,
        customerName: 'Amina Wanjiku',
        customerPhone: '+254 722 984 312',
        deliveryAddress: 'Riverside Drive, Westlands, Nairobi',
        county: 'Nairobi',
        paymentMethod: 'mpesa_stk',
        paymentStatus: 'completed',
        mpesaReceiptNumber: 'QJH729XLM4',
        createdAt: '2026-09-23T14:30:00.000Z',
        estimatedDelivery: 'Same-day express rider delivered',
        deliveryStatus: 'delivered'
      }
    ];
  });

  // 5. Active Subscriptions
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SUBS) || localStorage.getItem('asali_wild_subs_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'sub-active-001',
        planId: 'sub-explorer',
        planTitle: 'The Terroir Discovery Box',
        customerName: 'David Kariuki',
        customerPhone: '+254 714 882 109',
        customerEmail: 'david.kariuki@gmail.com',
        county: 'Nairobi',
        deliveryAddress: 'Lavington Green, Nairobi',
        frequency: 'monthly',
        priceKES: 2400,
        status: 'active',
        nextBillingDate: '15th October 2026',
        nextDispatchDate: '16th October 2026',
        paymentMethod: 'mpesa_ratiba',
        mpesaSubscriptionCode: 'MPESA-RAT-44910',
        selectedVarieties: ['Baringo Wild Acacia', 'Kakamega Rainforest'],
        createdAt: '2026-08-15'
      }
    ];
  });

  // 6. Loyalty points
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_POINTS) || localStorage.getItem('asali_wild_points_v1');
      return saved ? JSON.parse(saved) : 340;
    } catch {
      return 340;
    }
  });
  const [redeemedPoints, setRedeemedPoints] = useState(0);

  // UI modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubscriptionBuilderOpen, setIsSubscriptionBuilderOpen] = useState(false);
  const [selectedPlanForBuilder, setSelectedPlanForBuilder] = useState<SubscriptionBoxPlan | null>(null);
  const [isSubscriptionPortalOpen, setIsSubscriptionPortalOpen] = useState(false);
  const [isInventoryManagerOpen, setIsInventoryManagerOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [activeOrderForTracking, setActiveOrderForTracking] = useState<Order | null>(null);

  // Store Administrator Authentication State
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN_PASS);
      return saved || 'kitch2026';
    } catch {
      return 'kitch2026';
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  const adminLogin = (keyOrPass: string): boolean => {
    const val = keyOrPass.trim();
    // Validate against customizable admin password
    if (val === adminPassword) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const updateAdminPassword = (currentPassword: string, newPassword: string): { success: boolean; error?: string } => {
    if (currentPassword.trim() !== adminPassword) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }
    const cleanNewPass = newPassword.trim();
    setAdminPassword(cleanNewPass);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ADMIN_PASS, cleanNewPass);
    } catch {}
    return { success: true };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setIsInventoryManagerOpen(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ADMIN);
    } catch {}
  };

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBS, JSON.stringify(subscriptions));
    } catch {}
  }, [subscriptions]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_POINTS, JSON.stringify(loyaltyPoints));
    } catch {}
  }, [loyaltyPoints]);

  // Cart reservation countdown timer
  useEffect(() => {
    if (cart.length === 0) {
      setCartReservationSecondsRemaining(600);
      return;
    }

    const timer = setInterval(() => {
      setCartReservationSecondsRemaining(prev => {
        if (prev <= 1) {
          // Release reservation
          setProducts(prevProducts =>
            prevProducts.map(p => {
              const itemInCart = cart.find(c => c.product.id === p.id);
              if (itemInCart) {
                return {
                  ...p,
                  stock: p.stock + itemInCart.quantity,
                  reserved: Math.max(0, p.reserved - itemInCart.quantity)
                };
              }
              return p;
            })
          );
          setCart([]);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cart]);

  // Calculate totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.priceKES * item.quantity), 0);
  
  // Free delivery threshold for Nairobi (orders over KES 3,500)
  const isFreeDeliveryEligible = selectedCounty.zone === 'nairobi_express' && cartSubtotal >= 3500;
  const deliveryFee = isFreeDeliveryEligible ? 0 : selectedCounty.feeKES;
  const discountAmount = Math.min(redeemedPoints, cartSubtotal);
  const totalWithDelivery = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Cart actions with real-time stock reservation
  const addToCart = (productId: string, quantity = 1): boolean => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
      return false;
    }

    // Deduct available stock & increment reserved
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            stock: p.stock - quantity,
            reserved: p.reserved + quantity
          };
        }
        return p;
      })
    );

    // Update cart
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === productId);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, reservedAt: Date.now() }];
    });

    // Reset reservation countdown
    setCartReservationSecondsRemaining(600);
    return true;
  };

  const removeFromCart = (productId: string) => {
    const cartItem = cart.find(item => item.product.id === productId);
    if (!cartItem) return;

    // Return reserved stock back to available pool
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            stock: p.stock + cartItem.quantity,
            reserved: Math.max(0, p.reserved - cartItem.quantity)
          };
        }
        return p;
      })
    );

    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, newQuantity: number): boolean => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    const cartItem = cart.find(item => item.product.id === productId);
    const product = products.find(p => p.id === productId);
    if (!cartItem || !product) return false;

    const diff = newQuantity - cartItem.quantity;
    if (diff > 0) {
      // Need more stock
      if (product.stock < diff) return false;
      setProducts(prev =>
        prev.map(p => {
          if (p.id === productId) {
            return {
              ...p,
              stock: p.stock - diff,
              reserved: p.reserved + diff
            };
          }
          return p;
        })
      );
    } else if (diff < 0) {
      // Releasing stock
      const releaseAmount = Math.abs(diff);
      setProducts(prev =>
        prev.map(p => {
          if (p.id === productId) {
            return {
              ...p,
              stock: p.stock + releaseAmount,
              reserved: Math.max(0, p.reserved - releaseAmount)
            };
          }
          return p;
        })
      );
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    return true;
  };

  const clearCart = () => {
    // Release all stock
    setProducts(prev =>
      prev.map(p => {
        const item = cart.find(c => c.product.id === p.id);
        if (item) {
          return {
            ...p,
            stock: p.stock + item.quantity,
            reserved: Math.max(0, p.reserved - item.quantity)
          };
        }
        return p;
      })
    );
    setCart([]);
  };

  // Order processing
  const processOrderCheckout = async (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'mpesa_stk' | 'card' | 'airtel' | 'cod';
  }): Promise<{ success: boolean; order?: Order; error?: string }> => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty' };
    }

    // Generate random M-Pesa receipt code format: Q + 2 letters + 7 alphanumerics
    const randomChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let mpesaCode = 'Q';
    for (let i = 0; i < 9; i++) {
      mpesaCode += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    const orderNumber = `KTC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: `${item.product.name} (${item.product.weightGrams}g)`,
        quantity: item.quantity,
        unitPriceKES: item.product.priceKES,
        batchNumber: item.product.quality.batchNumber
      })),
      subtotalKES: cartSubtotal,
      deliveryFeeKES: deliveryFee,
      discountKES: redeemedPoints,
      totalKES: totalWithDelivery,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      deliveryAddress: orderData.deliveryAddress,
      county: selectedCounty.name,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'completed',
      mpesaReceiptNumber: orderData.paymentMethod === 'mpesa_stk' ? mpesaCode : undefined,
      createdAt: new Date().toISOString(),
      estimatedDelivery: selectedCounty.estimatedDelivery,
      deliveryStatus: 'order_confirmed'
    };

    // Permanently convert reserved stock to sold stock
    setProducts(prev =>
      prev.map(p => {
        const item = cart.find(c => c.product.id === p.id);
        if (item) {
          return {
            ...p,
            reserved: Math.max(0, p.reserved - item.quantity)
          };
        }
        return p;
      })
    );

    // Award loyalty points (1 point per KES 20 spent)
    const earnedPoints = Math.floor(totalWithDelivery / 20);
    setLoyaltyPoints(prev => prev - redeemedPoints + earnedPoints);
    setRedeemedPoints(0);

    // Record order
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setActiveOrderForTracking(newOrder);

    return { success: true, order: newOrder };
  };

  // Subscription management
  const openSubscriptionBuilder = (plan: SubscriptionBoxPlan) => {
    setSelectedPlanForBuilder(plan);
    setIsSubscriptionBuilderOpen(true);
  };

  const subscribeToPlan = async (
    plan: SubscriptionBoxPlan,
    details: {
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      county: string;
      deliveryAddress: string;
      frequency: 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly';
      paymentMethod: 'mpesa_ratiba' | 'card_recurring';
      selectedVarieties: string[];
    }
  ): Promise<{ success: boolean; subscription?: UserSubscription }> => {
    const randomChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ratibaCode = 'MPESA-RAT-';
    for (let i = 0; i < 5; i++) {
      ratibaCode += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    const nextBilling = new Date();
    nextBilling.setDate(nextBilling.getDate() + (details.frequency === 'biweekly' ? 14 : details.frequency === 'monthly' ? 30 : 60));
    
    const nextDispatch = new Date(nextBilling);
    nextDispatch.setDate(nextDispatch.getDate() + 1);

    const newSub: UserSubscription = {
      id: `sub-${Date.now()}`,
      planId: plan.id,
      planTitle: plan.title,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerEmail: details.customerEmail,
      county: details.county,
      deliveryAddress: details.deliveryAddress,
      frequency: details.frequency,
      priceKES: plan.priceKES,
      status: 'active',
      nextBillingDate: nextBilling.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      nextDispatchDate: nextDispatch.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      paymentMethod: details.paymentMethod,
      mpesaSubscriptionCode: ratibaCode,
      selectedVarieties: details.selectedVarieties,
      createdAt: new Date().toISOString()
    };

    setSubscriptions(prev => [newSub, ...prev]);
    setLoyaltyPoints(prev => prev + plan.loyaltyPointsPerCycle);
    return { success: true, subscription: newSub };
  };

  const pauseSubscription = (subId: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === subId ? { ...sub, status: 'paused' } : sub)
    );
  };

  const resumeSubscription = (subId: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === subId ? { ...sub, status: 'active' } : sub)
    );
  };

  const cancelSubscription = (subId: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === subId ? { ...sub, status: 'cancelled' } : sub)
    );
  };

  const skipNextDelivery = (subId: string) => {
    setSubscriptions(prev =>
      prev.map(sub => {
        if (sub.id === subId) {
          const d = new Date();
          d.setDate(d.getDate() + 30);
          return {
            ...sub,
            nextBillingDate: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            nextDispatchDate: new Date(d.getTime() + 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          };
        }
        return sub;
      })
    );
  };

  // Inventory Restock & Real-time Simulation
  const restockProduct = (productId: string, additionalUnits: number, newBatch?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            stock: p.stock + additionalUnits,
            quality: newBatch ? { ...p.quality, batchNumber: newBatch, harvestDate: 'September 2026' } : p.quality
          };
        }
        return p;
      })
    );
  };

  const simulateLiveCustomerOrder = () => {
    // Random product with available stock
    const availableProducts = products.filter(p => p.stock > 1);
    if (availableProducts.length === 0) return;
    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    
    // Deduct 1 unit
    setProducts(prev =>
      prev.map(p => {
        if (p.id === randomProduct.id) {
          return { ...p, stock: Math.max(0, p.stock - 1) };
        }
        return p;
      })
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        cartCount,
        cartSubtotal,
        cartReservationSecondsRemaining,
        selectedCounty,
        deliveryFee,
        totalWithDelivery,
        orders,
        subscriptions,
        loyaltyPoints,
        redeemedPoints,
        isCartOpen,
        isCheckoutOpen,
        isSubscriptionBuilderOpen,
        selectedPlanForBuilder,
        isSubscriptionPortalOpen,
        isInventoryManagerOpen,
        selectedProductForDetail,
        activeOrderForTracking,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setSelectedCounty,
        setRedeemedPoints,
        processOrderCheckout,
        openSubscriptionBuilder,
        subscribeToPlan,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        skipNextDelivery,
        restockProduct,
        simulateLiveCustomerOrder,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsSubscriptionBuilderOpen,
        setIsSubscriptionPortalOpen,
        setIsInventoryManagerOpen,
        setSelectedProductForDetail,
        setActiveOrderForTracking,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        updateAdminPassword
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
