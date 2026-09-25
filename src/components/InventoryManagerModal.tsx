import React, { useState } from 'react';
import { X, Database, Plus, RefreshCw, AlertTriangle, ShieldCheck, Activity, PackageCheck, Zap, Lock, LogOut, KeyRound } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { KitchLogo } from './KitchLogo';

interface InventoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryManagerModal: React.FC<InventoryManagerModalProps> = ({ isOpen, onClose }) => {
  const { 
    products, 
    restockProduct, 
    simulateLiveCustomerOrder,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    updateAdminPassword 
  } = useShop();

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [restockAmount, setRestockAmount] = useState<number>(12);
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  // Administrator login form state
  const [adminEmail, setAdminEmail] = useState('admin@kitch.co.ke');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Administrator tabs & password customization state
  const [activeTab, setActiveTab] = useState<'inventory' | 'security'>('inventory');
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passUpdateError, setPassUpdateError] = useState<string | null>(null);
  const [passUpdateSuccess, setPassUpdateSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const success = adminLogin(adminPasscode);
    if (!success) {
      setAuthError('Access denied: Invalid administrator passcode. Real-time inventory tracking is restricted to authorized store managers.');
    } else {
      setAdminPasscode('');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassUpdateError(null);
    setPassUpdateSuccess(null);

    if (newPassInput !== confirmPassInput) {
      setPassUpdateError('New password and confirmation do not match.');
      return;
    }

    if (newPassInput.length < 6) {
      setPassUpdateError('New password must be at least 6 characters.');
      return;
    }

    const res = updateAdminPassword(currentPassInput, newPassInput);
    if (!res.success) {
      setPassUpdateError(res.error || 'Failed to update administrator password.');
    } else {
      setPassUpdateSuccess('Administrator password updated successfully! This new password is now active.');
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setTimeout(() => {
        setPassUpdateSuccess(null);
      }, 4000);
    }
  };

  const handleRestock = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    // Generate new batch code suffix
    const monthLetter = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    const prefix = prod.quality.batchNumber.slice(0, -1);
    const newBatch = `${prefix}${monthLetter}`;

    restockProduct(productId, restockAmount, newBatch);
    setSimulationToast(`Restocked +${restockAmount} jars to ${prod.name} (Batch #${newBatch})`);
    setTimeout(() => setSimulationToast(null), 3000);
  };

  const handleSimulateOrder = () => {
    simulateLiveCustomerOrder();
    const locations = ['Westlands, Nairobi', 'Nyali, Mombasa', 'Milimani, Kisumu', 'Karen, Nairobi', 'Eldoret'];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    setSimulationToast(`Simulated customer order received from ${loc} — stock decremented live!`);
    setTimeout(() => setSimulationToast(null), 3500);
  };

  // If user is not authenticated as administrator, show the security gate
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Restricted Staff Portal
                </div>
                <h2 className="text-lg font-serif font-bold text-white">
                  Store Administrator Access
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gate Content */}
          <div className="p-6 space-y-5">
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
              <strong className="block font-semibold mb-0.5">🔒 Inaccessible to Regular Shoppers</strong>
              Real-time inventory levels, harvest allocations, and apiary batch tracking are restricted exclusively to authorized online store administrators.
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Administrator Email / ID
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="admin@kitch.co.ke"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Admin Passcode / Security Key
                </label>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={e => setAdminPasscode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="••••••••••••"
                  autoFocus
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Unlock Administrator Console</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-[11px] text-stone-500">
            Kitch Organic Honey Ltd · Karen Operations Hub · Staff Security Level 2
          </div>
        </div>
      </div>
    );
  }

  const totalUnitsInStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalUnitsReserved = products.reduce((acc, p) => acc + p.reserved, 0);
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Admin Badge & Logout */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3.5">
            <KitchLogo variant="icon-only" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Kitch Apiary Operations Console
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Admin Session Active</span>
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                {activeTab === 'inventory' ? 'Real-Time Inventory & Batch Tracking' : 'Security & Password Settings'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
              title="Lock and sign out of store administrator console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Console</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="bg-stone-100 px-6 border-b border-stone-200 flex gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'inventory'
                ? 'border-amber-600 text-stone-900 bg-white shadow-2xs rounded-t-lg -mb-[1px]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-600" />
            <span>Inventory & Batch Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-2.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'security'
                ? 'border-amber-600 text-stone-900 bg-white shadow-2xs rounded-t-lg -mb-[1px]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>Admin Password & Security</span>
          </button>
        </div>

        {activeTab === 'security' ? (
          /* Customizable Password Panel */
          <div className="p-6 max-w-xl mx-auto space-y-6">
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Customize Administrator Password</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Set your custom administrator password. Once changed, your new password is saved and immediately required for all future console logins.
              </p>
            </div>

            {passUpdateSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{passUpdateSuccess}</span>
              </div>
            )}

            {passUpdateError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{passUpdateError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 bg-stone-50/80 p-5 rounded-2xl border border-stone-200">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Current Admin Password
                </label>
                <input
                  type="password"
                  value={currentPassInput}
                  onChange={e => setCurrentPassInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  New Custom Password (min 6 characters)
                </label>
                <input
                  type="password"
                  value={newPassInput}
                  onChange={e => setNewPassInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="Enter new custom password"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Confirm New Custom Password
                </label>
                <input
                  type="password"
                  value={confirmPassInput}
                  onChange={e => setConfirmPassInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  placeholder="Re-enter new custom password"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Admin Password</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Real-time Telemetry Metrics Bar */}
            <div className="bg-stone-900 text-stone-100 p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="border-r border-stone-800 pr-2">
            <div className="text-stone-400 text-[10px] uppercase font-sans">Total Available Jars</div>
            <div className="text-2xl font-bold text-white mt-0.5 tabular-nums">
              {totalUnitsInStock}
            </div>
            <div className="text-[10px] text-emerald-400">Ready in Karen Hub</div>
          </div>

          <div className="border-r border-stone-800 pr-2">
            <div className="text-stone-400 text-[10px] uppercase font-sans">Cart Held Reserves</div>
            <div className="text-2xl font-bold text-amber-400 mt-0.5 tabular-nums">
              {totalUnitsReserved}
            </div>
            <div className="text-[10px] text-amber-300">Active customer holds</div>
          </div>

          <div className="border-r border-stone-800 pr-2">
            <div className="text-stone-400 text-[10px] uppercase font-sans">Low Stock Batches</div>
            <div className="text-2xl font-bold text-red-400 mt-0.5 tabular-nums">
              {lowStockCount}
            </div>
            <div className="text-[10px] text-red-300">Requires fresh pull</div>
          </div>

          <div>
            <div className="text-stone-400 text-[10px] uppercase font-sans">KEBS Compliance</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">
              100%
            </div>
            <div className="text-[10px] text-stone-400">KS EAS 36:2018</div>
          </div>
        </div>

        {/* Real-time simulation bar */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-200/80 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <Activity className="w-4 h-4 text-amber-700" />
            <span className="font-semibold">Interactive Real-time Testing:</span>
            <span className="text-stone-500">Test live stock deduction and restocking across the platform</span>
          </div>

          <button
            type="button"
            onClick={handleSimulateOrder}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold text-xs transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Live Kenyan Customer Order</span>
          </button>
        </div>

        {/* Simulation toast */}
        {simulationToast && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{simulationToast}</span>
          </div>
        )}

        {/* Inventory Table */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Variety / Region</th>
                  <th className="p-3">Current Batch</th>
                  <th className="p-3">Moisture</th>
                  <th className="p-3">Stock Available</th>
                  <th className="p-3">Cart Held</th>
                  <th className="p-3 text-right">Restock Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map(product => {
                  const isLow = product.stock <= product.lowStockThreshold;
                  const isOut = product.stock === 0;

                  return (
                    <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                      {/* Product Name */}
                      <td className="p-3">
                        <div className="font-semibold text-stone-900">{product.name}</div>
                        <div className="text-stone-400 text-[11px]">{product.quality.apiaryRegion}</div>
                      </td>

                      {/* Batch Code */}
                      <td className="p-3 font-mono text-stone-700">
                        <div>{product.quality.batchNumber}</div>
                        <div className="text-[10px] text-stone-400">{product.quality.harvestDate}</div>
                      </td>

                      {/* Moisture */}
                      <td className="p-3 font-mono">
                        <span className="text-stone-800 font-semibold">{product.quality.moistureContent}%</span>
                        <span className="text-[10px] text-emerald-600 block">&lt; 19% std</span>
                      </td>

                      {/* Stock */}
                      <td className="p-3 font-mono">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold tabular-nums ${
                            isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-stone-900'
                          }`}>
                            {product.stock} jars
                          </span>
                          {isOut ? (
                            <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-sans font-semibold">
                              Out
                            </span>
                          ) : isLow ? (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-sans font-semibold flex items-center gap-0.5">
                              <AlertTriangle className="w-3 h-3" />
                              Low
                            </span>
                          ) : null}
                        </div>
                        {/* Visual stock progress bar */}
                        <div className="w-24 h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              isOut ? 'w-0' : isLow ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }}
                          />
                        </div>
                      </td>

                      {/* Cart reserved */}
                      <td className="p-3 font-mono text-stone-600 tabular-nums">
                        {product.reserved > 0 ? (
                          <span className="text-amber-800 font-semibold">{product.reserved} held</span>
                        ) : (
                          <span className="text-stone-400">0</span>
                        )}
                      </td>

                      {/* Restock Button */}
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleRestock(product.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors shadow-2xs"
                        >
                          <Plus className="w-3 h-3 text-amber-700" />
                          <span>Add +12 Jars</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audited against Kenya Bureau of Standards (KEBS) KS EAS 36:2018</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
          >
            Close Admin View
          </button>
        </div>
        </>
        )}

      </div>
    </div>
  );
};
