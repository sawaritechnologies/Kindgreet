import React, { useState } from 'react';
import {
  Zap,
  ShoppingBag,
  Clock,
  Star,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
  Search,
  ShoppingCart,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Flame,
  ArrowRight,
  UserCheck,
  Check,
  X,
  Truck,
  HeartHandshake
} from 'lucide-react';
import { QuickProduct, QuickCategory, QuickOrderItem, QuickOrder, UserProfile } from '../types';

interface QuickCommerceProps {
  products: QuickProduct[];
  currentUser: UserProfile;
  onPlaceOrder: (newOrder: QuickOrder) => void;
  activeOrders: QuickOrder[];
}

export const QuickCommerce: React.FC<QuickCommerceProps> = ({
  products,
  currentUser,
  onPlaceOrder,
  activeOrders
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuickCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'social_rating' | 'eta' | 'price_low'>('social_rating');
  const [cartItems, setCartItems] = useState<QuickOrderItem[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<QuickOrder | null>(null);

  // Filter & Sort Products (Preference given to high seller social rating by default!)
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSeller = p.sellerStoreName.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSeller && !matchTags) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'social_rating') {
        // Preference to sellers with high social rating!
        if (a.isPreferredSeller && !b.isPreferredSeller) return -1;
        if (!a.isPreferredSeller && b.isPreferredSeller) return 1;
        return b.sellerSocialRating - a.sellerSocialRating;
      }
      if (sortBy === 'eta') {
        return a.etaMins - b.etaMins;
      }
      if (sortBy === 'price_low') {
        return a.price - b.price;
      }
      return 0;
    });

  // Cart Handlers
  const handleAddToCart = (product: QuickProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuickOrderItem[]
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const newOrder: QuickOrder = {
      id: `ord_${Date.now()}`,
      items: cartItems,
      totalAmount: totalCartAmount + 1.5, // 1.50 eco-delivery fee
      deliveryAddress: 'Oakridge Sector 4, House 12B (GPS Pin)',
      status: 'ON_THE_WAY',
      estimatedArrival: '8-10 mins',
      courierName: 'Sarah Lin (Verified Samaritan Courier)',
      courierRating: 4.98,
      createdAt: 'Just now'
    };

    onPlaceOrder(newOrder);
    setPlacedOrderDetails(newOrder);
    setIsOrderPlaced(true);
    setCartItems([]);
    setShowCartDrawer(false);
  };

  return (
    <div className="space-y-6">
      {/* Zepto/Blinkit Style Neon Express Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-xs">
                <Zap className="w-4 h-4 fill-slate-950 text-slate-950 animate-pulse" />
                <span>KindDrop Express • 10-Min Commerce</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Seller Rating Preference Active</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Instant Essentials & Emergency Supplies Delivered by High-Rating Neighbors
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Order fresh food salvage, medicine kits, hot sourdough, and power banks. Sellers with <strong className="text-amber-300">Social Rating 4.8★+</strong> get priority placement, verified badges, and express dispatch!
            </p>
          </div>

          {/* Quick Cart Pill Floating Button */}
          {totalCartCount > 0 && (
            <button
              onClick={() => setShowCartDrawer(true)}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition transform active:scale-95 shrink-0 border border-emerald-400/30"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-amber-400" />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-950">
                  {totalCartCount}
                </span>
              </div>
              <div className="text-left">
                <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                  View Express Basket
                </div>
                <div className="text-sm font-black font-mono">${totalCartAmount.toFixed(2)}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Seller Rating Preference Rule Notice Box */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-50 to-emerald-50 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black shrink-0 shadow-2xs">
            👑
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-xs">
              Social Rating Preference Engine Enabled
            </h4>
            <p className="text-slate-600 font-medium text-[11px]">
              Sellers with 4.8★+ ratings are ranked first, ensuring high trust, quality assurance, and sub-10-minute delivery.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] bg-white font-bold text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
            Top Seller Bonus: +20 Karma / Sale
          </span>
        </div>
      </div>

      {/* Active Orders Tracker Banner (If any) */}
      {activeOrders.length > 0 && (
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2 text-emerald-400">
              <Truck className="w-4 h-4 animate-bounce" />
              <span>Active 10-Minute Express Orders ({activeOrders.length})</span>
            </span>
            <span className="text-slate-400 text-[10px]">GPS Tracking Active</span>
          </div>

          <div className="space-y-2">
            {activeOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <span>Order #{ord.id.slice(-5)}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                      ⚡ ETA: {ord.estimatedArrival}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Courier: <strong className="text-white">{ord.courierName}</strong> ({ord.courierRating}★)
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono font-bold text-amber-300 text-sm">
                  ${ord.totalAmount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories & Sorting Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sourdough, medicine kits, avocados, chargers..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Rank By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none"
            >
              <option value="social_rating">👑 Top Social Rating Seller (Preference)</option>
              <option value="eta">⚡ Fastest Delivery ETA</option>
              <option value="price_low">💵 Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          {[
            { id: 'ALL', label: 'All Items' },
            { id: 'GROCERIES', label: '🥦 Fresh Groceries' },
            { id: 'MEDICINE', label: '🩹 Medicine & Aid' },
            { id: 'MEALS', label: '🍲 Hot Meals & Sourdough' },
            { id: 'EMERGENCY_TOOLS', label: '🔦 Emergency Tools' },
            { id: 'TECH_ESSENTIALS', label: '⚡ Tech & Chargers' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => {
          const cartItem = cartItems.find((ci) => ci.product.id === p.id);
          const qtyInCart = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={p.id}
              className={`bg-white border rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all duration-200 hover:shadow-md ${
                p.isPreferredSeller
                  ? 'border-amber-300 ring-2 ring-amber-100/60'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Image + ETA Banner Overlay */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-100">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />

                  {/* 10-Min Delivery ETA Badge */}
                  <span className="absolute top-2 left-2 bg-slate-950/85 text-amber-300 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-md border border-white/10">
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>⚡ {p.etaMins} MINS</span>
                  </span>

                  {/* High Social Rating Seller Preference Pill */}
                  {p.isPreferredSeller && (
                    <span className="absolute bottom-2 left-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <span>👑 Preferred Seller ({p.sellerSocialRating}★)</span>
                    </span>
                  )}
                </div>

                {/* Seller Store info */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={p.seller.avatar}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-bold text-slate-800 text-[11px] truncate max-w-[150px]">
                      {p.sellerStoreName}
                    </span>
                  </div>

                  <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{p.sellerSocialRating}★</span>
                  </span>
                </div>

                {/* Title & Unit */}
                <h3 className="font-extrabold text-slate-900 text-sm leading-snug mb-1">
                  {p.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                  {p.unit} • Stock: {p.stock}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 mb-3">
                  {p.description}
                </p>
              </div>

              {/* Price & Add To Cart Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-mono font-black text-slate-900">
                    ${p.price.toFixed(2)}
                  </span>
                  {p.originalPrice && (
                    <span className="text-xs font-mono text-slate-400 line-through">
                      ${p.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {qtyInCart > 0 ? (
                  <div className="flex items-center gap-2 bg-emerald-600 text-white rounded-xl px-2 py-1 shadow-xs">
                    <button
                      onClick={() => handleUpdateQuantity(p.id, -1)}
                      className="p-1 hover:bg-emerald-700 rounded-lg transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-xs px-1">{qtyInCart}</span>
                    <button
                      onClick={() => handleUpdateQuantity(p.id, 1)}
                      className="p-1 hover:bg-emerald-700 rounded-lg transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Drawer Modal */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 flex flex-col justify-between h-full max-h-[600px] animate-fade-in space-y-4">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
                  <h3 className="font-black text-base text-slate-900">
                    Your Express 10-Min Basket
                  </h3>
                </div>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs space-y-2">
                  <p>Your basket is empty.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cartItems.map((ci) => (
                    <div key={ci.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={ci.product.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-slate-800">{ci.product.title}</h4>
                          <p className="text-[10px] text-slate-500 font-medium">
                            ${ci.product.price.toFixed(2)} × {ci.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(ci.product.id, -1)}
                          className="p-1 hover:bg-slate-200 rounded"
                        >
                          <Minus className="w-3 h-3 text-slate-700" />
                        </button>
                        <span className="font-bold font-mono text-xs px-1">{ci.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(ci.product.id, 1)}
                          className="p-1 hover:bg-slate-200 rounded"
                        >
                          <Plus className="w-3 h-3 text-slate-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            {cartItems.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-mono font-bold">${totalCartAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eco Courier Fee (10-Min Express)</span>
                    <span className="font-mono font-bold">$1.50</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-slate-900 text-sm pt-1 border-t border-slate-100">
                    <span>Grand Total</span>
                    <span className="font-mono text-emerald-700">${(totalCartAmount + 1.5).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Place 10-Minute Express Order</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {isOrderPlaced && placedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-9 h-9 fill-amber-400 text-amber-400 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-slate-900">
                10-Minute Order Dispatched!
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Order #{placedOrderDetails.id.slice(-5)} is on its way.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-left space-y-1.5">
              <div className="flex justify-between font-bold text-slate-800">
                <span>ETA Arrival:</span>
                <span className="text-emerald-600">{placedOrderDetails.estimatedArrival}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Assigned Courier:</span>
                <span className="font-semibold">{placedOrderDetails.courierName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Address:</span>
                <span className="font-semibold">{placedOrderDetails.deliveryAddress}</span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderPlaced(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md transition"
            >
              Track Live Courier GPS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
