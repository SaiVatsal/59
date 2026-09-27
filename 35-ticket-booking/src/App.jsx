import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Film,
  Ticket,
  Clock,
  Sparkles,
  QrCode,
  CheckCircle2,
  Tv,
  Popcorn,
  Coffee,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Layers,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedEventId,
    setSelectedEvent,
    selectedShowtime,
    setSelectedShowtime,
    events,
    seats,
    selectedSeatIds,
    toggleSeat,
    concessions,
    updateConcessionQty,
    appliedCoupon,
    applyCoupon,
    confirmBooking,
    bookedTickets
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];

  // Pricing calculations
  const seatsTotal = selectedSeatIds.reduce((sum, sId) => {
    const seatObj = seats.find(s => s.id === sId);
    return sum + (seatObj ? seatObj.price : 0);
  }, 0);

  const concessionsTotal = concessions.reduce((sum, c) => sum + (c.price * c.quantity), 0);
  const rawSubtotal = seatsTotal + concessionsTotal;
  const discount = appliedCoupon ? rawSubtotal * 0.20 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discount);

  return (
    <div className="min-h-screen bg-[#090514] text-zinc-100 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Cinema Header */}
      <header className="bg-[#090514]/90 backdrop-blur border-b border-purple-900/60 sticky top-0 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-rose-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-600/30">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white">STARLIGHT</span>
              <span className="text-[10px] font-mono font-bold bg-purple-950 border border-purple-800 text-purple-300 px-2 py-0.5 rounded">
                IMAX 70MM ARENA
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">REAL-TIME CONCURRENCY SEAT-LOCKING MATRIX</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 bg-purple-950/60 border border-purple-900/80 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'browse' ? 'bg-purple-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Showtimes
          </button>
          <button
            onClick={() => setActiveTab('seats')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'seats' ? 'bg-purple-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Seat Map ({selectedSeatIds.length})
          </button>
          <button
            onClick={() => setActiveTab('concessions')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'concessions' ? 'bg-purple-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Gourmet Bar
          </button>
          <button
            onClick={() => setActiveTab('pass')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'pass' ? 'bg-purple-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Digital Pass ({bookedTickets.length})
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* SHOWTIMES & EVENT BROWSER */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            <div className="border-b border-purple-900/60 pb-3">
              <h1 className="font-display font-black text-2xl text-white">Select Experience & Showtime</h1>
              <p className="text-xs text-zinc-400 font-mono">High-frame-rate laser projection, uncompressed 128-channel spatial acoustics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map(ev => (
                <div
                  key={ev.id}
                  className={`bg-[#1a0b2e]/80 border rounded-3xl overflow-hidden transition flex flex-col justify-between ${
                    selectedEventId === ev.id ? 'border-purple-500 purple-glow' : 'border-purple-900/60 hover:border-purple-700'
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={ev.poster} alt={ev.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-mono text-purple-300 border border-purple-800">
                      {ev.genre}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-rose-400 font-semibold">{ev.rating}</div>
                      <h3 className="font-display font-bold text-lg text-white leading-tight">{ev.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">{ev.synopsis}</p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {ev.formats.map(f => (
                          <span key={f} className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded border border-purple-800 text-purple-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-purple-900/60">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase block">Available Showtimes</span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                        {ev.showtimes.map(st => (
                          <button
                            key={st}
                            onClick={() => {
                              setSelectedEvent(ev.id);
                              setSelectedShowtime(st);
                              setActiveTab('seats');
                            }}
                            className={`p-2 rounded-xl text-[11px] transition text-left truncate ${
                              selectedEventId === ev.id && selectedShowtime === st
                                ? 'bg-purple-600 text-white font-bold'
                                : 'bg-purple-950/70 border border-purple-900 text-zinc-300 hover:text-white hover:border-purple-600'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERACTIVE SEAT-MAP VIEW */}
        {activeTab === 'seats' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-purple-900/60 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">{selectedShowtime}</span>
                <h2 className="font-display font-black text-2xl text-white">{currentEvent.title}</h2>
              </div>
              <div className="bg-rose-950/60 border border-rose-800 px-3 py-1.5 rounded-xl font-mono text-xs text-rose-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Seats Held for 07:48</span>
              </div>
            </div>

            {/* Cinema Screen Curve */}
            <div className="text-center space-y-2">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-purple-500 via-rose-500 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
              <span className="text-[11px] font-mono text-zinc-400 tracking-widest uppercase">
                ★ 70MM DUAL-LASER CURVED SCREEN ★
              </span>
            </div>

            {/* Seat Grid */}
            <div className="bg-[#1a0b2e]/60 border border-purple-900/80 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-8 gap-3 max-w-lg mx-auto">
                {seats.map(seat => {
                  const isSelected = selectedSeatIds.includes(seat.id);
                  const isOccupied = seat.status === 'occupied';

                  return (
                    <button
                      key={seat.id}
                      disabled={isOccupied}
                      onClick={() => toggleSeat(seat.id)}
                      className={`h-10 rounded-lg text-xs font-mono font-bold transition flex flex-col items-center justify-center ${
                        isOccupied
                          ? 'bg-purple-950/40 text-purple-900 border border-purple-950 cursor-not-allowed'
                          : isSelected
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-105'
                          : seat.tier === 'VIP Recliner'
                          ? 'bg-purple-700/80 hover:bg-purple-600 text-purple-100 border border-purple-500'
                          : 'bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800'
                      }`}
                    >
                      <span>{seat.id}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-purple-900/60 text-xs font-mono text-zinc-400 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-purple-700 border border-purple-500"></div>
                  <span>VIP Recliner ($28)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-purple-950 border border-purple-800"></div>
                  <span>Standard ($16.50)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-rose-500"></div>
                  <span>Your Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-purple-950/40 border border-purple-950"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </div>

            {/* Quick action proceed bar */}
            <div className="bg-[#1a0b2e] border border-purple-900 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 block">Selected Seats ({selectedSeatIds.length})</span>
                <span className="font-bold text-white text-base">
                  {selectedSeatIds.join(', ') || 'None selected'} — <span className="text-purple-400">${seatsTotal.toFixed(2)}</span>
                </span>
              </div>
              <button
                disabled={selectedSeatIds.length === 0}
                onClick={() => setActiveTab('concessions')}
                className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                Proceed to Gourmet Bar <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* GOURMET CONCESSIONS & CHECKOUT */}
        {activeTab === 'concessions' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-purple-900/60 pb-3">
              <h2 className="font-display font-black text-2xl text-white">Artisanal Cinema Concessions</h2>
              <p className="text-xs text-zinc-400 font-mono">Pre-order gourmet snacks delivered directly to your recliner.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Concessions options */}
              <div className="lg:col-span-2 space-y-4">
                {concessions.map(cnc => (
                  <div key={cnc.id} className="bg-[#1a0b2e] border border-purple-900 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400">
                        {cnc.name.includes('Popcorn') ? <Popcorn className="w-6 h-6" /> : <Coffee className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{cnc.name}</div>
                        <div className="text-xs font-mono text-purple-400">${cnc.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-purple-950 border border-purple-900 p-1 rounded-xl text-xs font-mono">
                      <button
                        onClick={() => updateConcessionQty(cnc.id, -1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="font-bold text-white px-1.5">{cnc.quantity}</span>
                      <button
                        onClick={() => updateConcessionQty(cnc.id, 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order checkout sidebar */}
              <div className="bg-[#1a0b2e] border border-purple-900 rounded-2xl p-6 space-y-5 h-fit">
                <h3 className="font-display font-bold text-white text-base pb-3 border-b border-purple-900">
                  Ticket & Concession Summary
                </h3>

                <div className="space-y-2.5 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>Seats ({selectedSeatIds.length}x)</span>
                    <span className="text-white font-bold">${seatsTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gourmet Concessions</span>
                    <span className="text-white font-bold">${concessionsTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>Discount (20% OFF)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-purple-900 flex justify-between text-sm font-bold text-white">
                    <span>Final Amount</span>
                    <span className="text-purple-400">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Promo Code</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. PREMIERE20"
                      value={inputCoupon}
                      onChange={e => setInputCoupon(e.target.value)}
                      className="flex-1 bg-purple-950 border border-purple-900 rounded-xl px-3 py-1.5 text-xs font-mono uppercase text-zinc-200 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => applyCoupon(inputCoupon)}
                      className="px-3 py-1.5 bg-purple-800 hover:bg-purple-700 text-white rounded-xl text-xs font-mono font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => confirmBooking(finalTotal)}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" /> Confirm & Issue Digital Pass
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIGITAL PASS VIEW */}
        {activeTab === 'pass' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="border-b border-purple-900/60 pb-3 text-center">
              <span className="text-xs font-mono text-purple-400 uppercase">Booking Confirmed & Synchronized</span>
              <h2 className="font-display font-black text-2xl text-white">Your Starlight Digital Pass</h2>
            </div>

            {bookedTickets.map(pass => (
              <div
                key={pass.id}
                className="bg-gradient-to-b from-[#24103f] to-[#120624] border border-purple-600/60 rounded-3xl p-6 space-y-6 shadow-2xl purple-glow relative overflow-hidden font-mono"
              >
                <div className="flex items-center justify-between border-b border-purple-800/80 pb-3">
                  <span className="text-xs font-bold text-purple-300">STARLIGHT CINEMA PASS</span>
                  <span className="text-[10px] text-zinc-400">{pass.id}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl text-white font-sans">{pass.title}</h3>
                  <p className="text-xs text-rose-400 font-bold">{pass.showtime}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-purple-950/60 p-3.5 rounded-2xl border border-purple-800/60">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">HALL</span>
                    <span className="text-zinc-200 font-bold">{pass.hall}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">RESERVED SEATS</span>
                    <span className="text-purple-300 font-bold">{pass.seats.join(', ')}</span>
                  </div>
                </div>

                {/* Animated QR Mockup */}
                <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2">
                  <img src={pass.qrCodeData} alt="QR Pass" className="w-36 h-36" />
                  <span className="text-[10px] text-zinc-600 font-bold tracking-widest">SCAN AT GATE SCANNER</span>
                </div>

                <div className="text-center text-[11px] text-zinc-400">
                  Total Settlement: <strong className="text-white">${pass.totalPaid.toFixed(2)}</strong> (Encrypted Auth)
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-950 bg-black/60 py-6 px-4 text-center text-xs font-mono text-zinc-500">
        STARLIGHT CINEMA • 70MM IMAX & ARENA ACOUSTICS • REAL-TIME SEAT LOCKING ENGINE
      </footer>
    </div>
  );
}
