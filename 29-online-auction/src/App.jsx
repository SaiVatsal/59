import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import {
  Gavel,
  Flame,
  Clock,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Bell,
  CheckCircle2,
  PlusCircle,
  Truck,
  ArrowUpRight,
  Sliders,
  DollarSign,
  User,
  Zap
} from 'lucide-react';

function formatTime(seconds) {
  if (seconds <= 0) return 'AUCTION ENDED';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}h ${remMins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }
  return `${remMins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
}

export default function App() {
  const {
    activeTab,
    setActiveTab,
    user,
    notifications,
    selectedCategory,
    setSelectedCategory,
    categories,
    lots,
    wonLots,
    placeBid,
    setProxyBid,
    tickTimers,
    createListing,
    settleEscrow
  } = useStore();

  const [selectedLotForProxy, setSelectedLotForProxy] = useState(null);
  const [proxyAmountInput, setProxyAmountInput] = useState('');
  const [customBidInput, setCustomBidInput] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);

  // New listing form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Fine Art');
  const [newStartBid, setNewStartBid] = useState('');
  const [newReserve, setNewReserve] = useState('');
  const [newDuration, setNewDuration] = useState('1800');
  const [newCondition, setNewCondition] = useState('Pristine Archival');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');

  // Live timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      tickTimers();
    }, 1000);
    return () => clearInterval(timer);
  }, [tickTimers]);

  const filteredLots = lots.filter(l =>
    selectedCategory === 'All' ? true : l.category === selectedCategory
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newStartBid) return;
    createListing({
      title: newTitle,
      category: newCategory,
      startingBid: newStartBid,
      reservePrice: newReserve || newStartBid,
      durationSeconds: Number(newDuration),
      condition: newCondition,
      description: newDesc,
      image: newImage || undefined
    });
    setNewTitle('');
    setNewStartBid('');
    setNewReserve('');
    setNewDesc('');
    setNewImage('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col">
      {/* Top Ticker Header */}
      <header className="border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Gavel className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-wider text-white">APEX</span>
                <span className="text-xs font-mono font-bold bg-red-950/80 border border-red-800 text-red-400 px-1.5 py-0.5 rounded">LIVE AUCTIONS</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">HIGH-STAKES ESCROW & REAL-TIME PROXY SYSTEM</p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                activeTab === 'live' ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Live Floor ({lots.length})
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                activeTab === 'seller' ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Consign & List
            </button>
            <button
              onClick={() => setActiveTab('won')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                activeTab === 'won' ? 'bg-red-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Won & Escrow ({wonLots.length})
            </button>
          </nav>

          {/* User info & Notifications */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-xs font-bold font-mono uppercase text-zinc-300">Live Outbid Alerts</span>
                    <span className="text-[10px] text-zinc-500">{notifications.length} updates</span>
                  </div>
                  <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="text-xs p-2 rounded bg-zinc-950/70 border border-zinc-800/80">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-zinc-200 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <User className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{user.name}</div>
                <div className="text-[10px] text-zinc-400 font-mono">
                  Escrow: <span className="text-emerald-400 font-semibold">${user.balance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* LIVE FLOOR VIEW */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            {/* Category selection */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                <span>Anti-Sniping Safeguard Active (Auto +60s on last-minute bids)</span>
              </div>
            </div>

            {/* Auction Lots Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLots.map(lot => (
                <div
                  key={lot.id}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition flex flex-col"
                >
                  {/* Image & Badges */}
                  <div className="relative h-64 bg-zinc-950 overflow-hidden group">
                    <img
                      src={lot.image}
                      alt={lot.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    {/* Top tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-black/80 backdrop-blur border border-zinc-700 text-zinc-300 font-mono text-xs px-2.5 py-1 rounded-md">
                        {lot.id}
                      </span>
                      <span className="bg-zinc-900/90 text-zinc-300 text-xs px-2.5 py-1 rounded-md border border-zinc-800">
                        {lot.category}
                      </span>
                    </div>

                    {/* High bidder tag */}
                    <div className="absolute top-3 right-3">
                      {lot.isUserHighest ? (
                        <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" /> YOU ARE HIGH BIDDER
                        </span>
                      ) : (
                        <span className="bg-red-950/80 border border-red-800 text-red-400 font-mono text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> OUTBID
                        </span>
                      )}
                    </div>

                    {/* Bottom floating timer banner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/90 backdrop-blur border border-zinc-800/90 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${lot.timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`} />
                        <span className="text-xs text-zinc-400 font-mono uppercase">Closing in:</span>
                      </div>
                      <span className={`font-mono text-sm font-black tracking-wider ${
                        lot.timeLeft < 120 ? 'text-red-400 font-black' : 'text-white'
                      }`}>
                        {formatTime(lot.timeLeft)}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight mb-1.5">
                        {lot.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                        {lot.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                        <div>Condition: <span className="text-zinc-200">{lot.condition}</span></div>
                        <div>Seller: <span className="text-zinc-200">{lot.seller}</span></div>
                        <div>Reserve Met: <span className={lot.reserveMet ? 'text-emerald-400 font-bold' : 'text-amber-400'}>{lot.reserveMet ? 'YES (Reserve Met)' : 'PENDING'}</span></div>
                        <div>Total Bids: <span className="text-zinc-200">{lot.totalBids} bids</span></div>
                      </div>
                    </div>

                    {/* Current Bid & Actions Box */}
                    <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 space-y-3.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Current Top Offer</span>
                          <div className="font-mono text-2xl font-black text-white tracking-tight">
                            ${lot.currentBid.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Leader</span>
                          <span className="text-xs font-mono text-zinc-300 font-semibold">{lot.highestBidder}</span>
                        </div>
                      </div>

                      {/* Bidding Controls */}
                      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 border-t border-zinc-800/80">
                        {/* Quick Increment Bid */}
                        <button
                          onClick={() => placeBid(lot.id)}
                          className="w-full sm:w-1/2 py-2.5 px-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20 transition active:scale-95"
                        >
                          <Zap className="w-3.5 h-3.5 text-yellow-300" />
                          BID +${lot.minIncrement.toLocaleString()} (${(lot.currentBid + lot.minIncrement).toLocaleString()})
                        </button>

                        {/* Custom Bid / Proxy Modal Button */}
                        <button
                          onClick={() => {
                            setSelectedLotForProxy(lot);
                            setProxyAmountInput(lot.userProxyMax || (lot.currentBid + lot.minIncrement * 3));
                          }}
                          className="w-full sm:w-1/2 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 border border-zinc-700 transition"
                        >
                          <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                          {lot.userProxyMax ? `Auto-Bid: $${lot.userProxyMax.toLocaleString()}` : 'Set Proxy Auto-Bid'}
                        </button>
                      </div>

                      {/* Recent Bid History ticker snippet */}
                      {lot.bidHistory.length > 0 && (
                        <div className="pt-2 border-t border-zinc-900 text-[11px] font-mono flex items-center justify-between text-zinc-500">
                          <span>Latest: {lot.bidHistory[0].bidder} (${lot.bidHistory[0].amount.toLocaleString()})</span>
                          <span>{lot.bidHistory[0].time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SELLER CONSIGNMENT FORM */}
        {activeTab === 'seller' && (
          <div className="max-w-3xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-red-500" /> Consign Asset for Live Auction
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                List high-value horology, fine art, or vehicles with automated reserve safeguards & global bidder verification.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold">Asset Title & Make / Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1957 Omega Speedmaster CK2915 Broad Arrow"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold">Provenance & Condition</label>
                  <input
                    type="text"
                    value={newCondition}
                    onChange={e => setNewCondition(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold">Opening Bid (USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="50000"
                    value={newStartBid}
                    onChange={e => setNewStartBid(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold">Confidential Reserve (USD)</label>
                  <input
                    type="number"
                    placeholder="75000"
                    value={newReserve}
                    onChange={e => setNewReserve(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 font-semibold">Auction Duration</label>
                  <select
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="300">5 Minutes (Flash Demo)</option>
                    <option value="1800">30 Minutes</option>
                    <option value="86400">24 Hours</option>
                    <option value="259200">3 Days</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold">High-Res Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-semibold">Catalog Description & Provenance Notes</label>
                <textarea
                  rows="3"
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Detailed archival description, historical ownership, certificate IDs..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2"
              >
                <Gavel className="w-4 h-4" /> Publish to Live Auction Floor
              </button>
            </form>
          </div>
        )}

        {/* WON LOTS & ESCROW SETTLEMENT */}
        {activeTab === 'won' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Acquisitions & Escrow Vault</h2>
                <p className="text-xs text-zinc-400">Manage post-auction payments, armored courier transit, and title transfer.</p>
              </div>
              <span className="text-xs font-mono bg-emerald-950 border border-emerald-800 text-emerald-400 px-3 py-1 rounded-full">
                {wonLots.length} Active Lot In Custody
              </span>
            </div>

            <div className="space-y-4">
              {wonLots.map(won => (
                <div key={won.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center">
                  <img
                    src={won.image}
                    alt={won.title}
                    className="w-full md:w-48 h-36 object-cover rounded-xl border border-zinc-800"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-red-400 font-bold">{won.id}</span>
                      <span className="text-xs text-zinc-500 font-mono">Won on {won.wonDate}</span>
                    </div>
                    <h3 className="font-bold text-white text-base">{won.title}</h3>
                    <div className="text-xs font-mono text-zinc-400 space-y-1">
                      <div>Hammer Price: <span className="text-white font-bold font-mono text-sm">${won.wonPrice.toLocaleString()}</span></div>
                      <div>Courier: <span className="text-zinc-200">{won.courier}</span></div>
                      <div>Delivery Destination: <span className="text-zinc-300">{won.shippingAddress}</span></div>
                      <div>Status: <span className="text-amber-400 font-semibold">{won.paymentStatus}</span></div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    {won.paymentStatus.includes('Scheduled') ? (
                      <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-4 py-3 rounded-xl flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400" /> Transit in Progress
                      </div>
                    ) : (
                      <button
                        onClick={() => settleEscrow(won.id)}
                        className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" /> Release Escrow Funds
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PROXY BID MODAL */}
      {selectedLotForProxy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="font-bold text-white font-mono text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-500" /> Configure Auto-Bid Agent
              </h3>
              <button
                onClick={() => setSelectedLotForProxy(null)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs text-zinc-300 space-y-2">
              <p className="font-semibold text-white">{selectedLotForProxy.title}</p>
              <p className="text-zinc-400">
                Our proxy algorithm will automatically bid in minimum increments (+${selectedLotForProxy.minIncrement.toLocaleString()}) up to your ceiling whenever you are outbid.
              </p>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-1 font-mono text-[11px]">
                <div>Current Bid: <span className="text-white font-bold">${selectedLotForProxy.currentBid.toLocaleString()}</span></div>
                <div>Min Required Next Bid: <span className="text-zinc-200">${(selectedLotForProxy.currentBid + selectedLotForProxy.minIncrement).toLocaleString()}</span></div>
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <label className="text-zinc-300 font-semibold">Maximum Ceiling Limit ($ USD)</label>
              <input
                type="number"
                value={proxyAmountInput}
                onChange={e => setProxyAmountInput(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-zinc-100 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedLotForProxy(null)}
                className="w-1/2 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setProxyBid(selectedLotForProxy.id, proxyAmountInput);
                  setSelectedLotForProxy(null);
                }}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold rounded-lg shadow-lg shadow-red-600/30 transition"
              >
                Activate Proxy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black/60 py-4 px-6 text-center text-[11px] font-mono text-zinc-500">
        APEX AUCTIONEER VAULT SYSTEM • ENCRYPTED ESCROW • ANTI-SNIPING ENGINE
      </footer>
    </div>
  );
}
