import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  ShoppingBag,
  Leaf,
  ThermometerSnowflake,
  Clock,
  Truck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  ChevronRight,
  PackageCheck
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    categories,
    products,
    cart,
    addToCart,
    updateCartQty,
    updateItemSubstitution,
    selectedDeliverySlot,
    setDeliverySlot,
    deliverySlots,
    appliedCoupon,
    applyCoupon,
    couponDiscount,
    orders,
    placeOrder,
    advanceOrderStatus
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  // Cart calculations
  const cartItemsDetailed = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartItemsDetailed.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  let discountAmount = 0;
  if (appliedCoupon && couponDiscount < 1) {
    discountAmount = subtotal * couponDiscount;
  } else if (appliedCoupon && couponDiscount >= 1) {
    discountAmount = couponDiscount;
  }

  const selectedSlotObj = deliverySlots.find(s => s.label === selectedDeliverySlot) || deliverySlots[1];
  const deliveryFee = subtotal > 35 ? 0 : selectedSlotObj.fee;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' ? true : p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-slate-800 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium">
        🌱 100% Certified Organic & Cold-Chain Monitored • Free delivery on orders over $35 • Use code <strong className="underline cursor-pointer" onClick={() => applyCoupon('HARVEST20')}>HARVEST20</strong> for 20% off
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('catalog')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-emerald-950 block leading-tight">Harvest & Hearth</span>
              <span className="text-[10px] text-emerald-600 font-semibold tracking-wider uppercase">Farm Direct & Cold-Chain</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search organic berries, artisanal bakery, grass-fed milk..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'catalog' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              Farm Catalog
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'tracking' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              Cold-Chain Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              className="relative px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart (${subtotal.toFixed(2)})</span>
              {cart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-900 text-white text-[10px] flex items-center justify-center font-mono">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {prod.isOrganic && (
                        <span className="bg-emerald-700/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Leaf className="w-3 h-3" /> USDA Organic
                        </span>
                      )}
                      <span className="bg-white/90 backdrop-blur text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ThermometerSnowflake className="w-3 h-3 text-sky-600" /> {prod.zone}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-emerald-700">{prod.origin}</div>
                      <h3 className="font-bold text-slate-900 text-base">{prod.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{prod.description}</p>
                      <div className="text-[11px] text-slate-400 font-mono pt-1">Unit size: {prod.unit}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Price</span>
                        <span className="font-bold text-lg text-emerald-800 font-mono">${prod.price.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => addToCart(prod.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to Basket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CART & CHECKOUT VIEW */}
        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-emerald-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-emerald-950">Your Farm Fresh Basket</h2>
                <p className="text-xs text-slate-500">Configure delivery windows & smart substitution preferences.</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                {cart.length} Unique Farm Goods
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-emerald-100 space-y-3">
                <ShoppingBag className="w-12 h-12 text-emerald-300 mx-auto" />
                <h3 className="font-bold text-lg text-slate-800">Your basket is currently empty</h3>
                <p className="text-xs text-slate-500">Explore our seasonal organic harvests and artisanal pantry items.</p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItemsDetailed.map(item => (
                    <div key={item.productId} className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-3">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-100"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-sm">{item.product.title}</h4>
                          <span className="text-[11px] text-slate-500 font-mono">${item.product.price.toFixed(2)} / {item.product.unit}</span>
                          <div className="text-[10px] text-emerald-700 font-semibold">{item.product.origin}</div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                          <button
                            onClick={() => updateCartQty(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded text-slate-600 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded text-slate-600 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Substitution rule selector */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 text-[11px]">If out-of-stock:</span>
                        <select
                          value={item.substitution}
                          onChange={e => updateItemSubstitution(item.productId, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 text-xs focus:outline-none"
                        >
                          <option value="organic_match">Substitute with Best Organic Match</option>
                          <option value="call_first">Call me before substituting</option>
                          <option value="no_sub">Do not substitute (Refund item)</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  {/* Delivery Slot Selection */}
                  <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" /> Choose Cold-Chain Delivery Slot
                    </h3>
                    <div className="space-y-2">
                      {deliverySlots.map(slot => (
                        <div
                          key={slot.id}
                          onClick={() => setDeliverySlot(slot.label)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                            selectedDeliverySlot === slot.label
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{slot.label}</span>
                          <span className="font-mono font-semibold">
                            {slot.fee === 0 ? 'FREE' : `$${slot.fee.toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary & Checkout Sidebar */}
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 space-y-5 h-fit shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">Order Summary</h3>

                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-mono font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({appliedCoupon})</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Cold-Chain Delivery</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold text-slate-900">
                      <span>Total Amount</span>
                      <span className="font-mono text-emerald-800">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Promo Code</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. HARVEST20"
                        value={inputCoupon}
                        onChange={e => setInputCoupon(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs uppercase focus:outline-none"
                      />
                      <button
                        onClick={() => applyCoupon(inputCoupon)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => placeOrder(total)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                  >
                    Place Farm Order (${total.toFixed(2)}) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COLD-CHAIN DISPATCH TRACKER */}
        {activeTab === 'tracking' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-emerald-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-emerald-950">Cold-Chain Live Dispatch Tracker</h2>
                <p className="text-xs text-slate-500">Real-time IoT temperature telemetry from refrigerated vans to your doorstep.</p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-2xl border border-emerald-100 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-700">{order.id}</span>
                      <div className="text-xs text-slate-500">Placed {order.date} • {order.itemsCount} Organic Items</div>
                    </div>
                    <span className="font-mono font-bold text-base text-slate-900">${order.total.toFixed(2)}</span>
                  </div>

                  {/* Stepper */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className={`p-3 rounded-xl border ${
                      order.status.includes('Packed') || order.status.includes('Van') || order.status === 'Delivered'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <PackageCheck className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      1. Harvested & Chilled
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      order.status.includes('Van') || order.status === 'Delivered'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <Truck className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      2. In Refrigerated Van
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                      3. Delivered Fresh
                    </div>
                  </div>

                  {/* Telemetry metadata */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 block">Van Sensor Temperature</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <ThermometerSnowflake className="w-3.5 h-3.5" /> {order.temperature}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Delivery Chauffeur</span>
                      <span className="font-semibold text-slate-800">{order.driverName}</span>
                    </div>
                    {order.status !== 'Delivered' && (
                      <button
                        onClick={() => advanceOrderStatus(order.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                      >
                        Advance Status
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white py-6 px-4 text-center text-xs text-slate-500">
        HARVEST & HEARTH • 100% TRACEABLE ORGANIC PROVENANCE • CLIMATE-CONTROLLED SUPPLY CHAIN
      </footer>
    </div>
  );
}
