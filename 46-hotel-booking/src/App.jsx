import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Crown,
  Calendar,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  DollarSign,
  PlusCircle,
  Wine,
  Coffee,
  Wifi,
  Bath,
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedLocation,
    setSelectedLocation,
    suites,
    reservations,
    analytics,
    createReservation,
    updateSuitePrice,
    addSuite
  } = useStore();

  const [bookingModalSuite, setBookingModalSuite] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-10-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-24');
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Admin Rate State
  const [editingSuiteId, setEditingSuiteId] = useState(null);
  const [newRate, setNewRate] = useState('');

  // New Suite Creation State
  const [newTitle, setNewTitle] = useState('');
  const [newProp, setNewProp] = useState('');
  const [newLoc, setNewLoc] = useState('Venice, Italy');
  const [newPrice, setNewPrice] = useState('1100');
  const [newSqm, setNewSqm] = useState('120');

  const locations = ['All', 'Paris, France', 'Santorini, Greece', 'Kyoto, Japan'];

  const filteredSuites = suites.filter(s =>
    selectedLocation === 'All' ? true : s.location === selectedLocation
  );

  const calculateNights = () => {
    const d1 = new Date(checkInDate);
    const d2 = new Date(checkOutDate);
    const diff = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
    return diff || 1;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingModalSuite || !guestName.trim()) return;
    const nights = calculateNights();
    createReservation({
      suiteId: bookingModalSuite.id,
      suiteTitle: bookingModalSuite.title,
      property: bookingModalSuite.property,
      guestName,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      totalAmount: nights * bookingModalSuite.pricePerNight,
      paymentMethod: 'Black Card Concierge Guarantee',
      specialRequests: specialRequests || 'VIP welcome amenities.'
    });
    setBookingModalSuite(null);
    setGuestName('');
    setSpecialRequests('');
  };

  const handleCreateSuiteSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProp.trim()) return;
    addSuite({
      title: newTitle,
      property: newProp,
      location: newLoc,
      pricePerNight: Number(newPrice),
      sqm: Number(newSqm),
      capacity: '2 Guests • 1 Grand King Bed',
      amenities: ['Private Spa', 'Butler Service', 'Limousine Airport Transfer'],
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      tag: 'New Collection'
    });
    setNewTitle('');
    setNewProp('');
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] text-stone-900 font-sans flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Haute Luxury Navigation */}
      <header className="bg-[#4a0404] text-white border-b border-amber-900/60 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-[#4a0404] flex items-center justify-center font-serif font-black shadow-lg text-lg">
              GP
            </div>
            <div>
              <span className="font-serif italic font-bold text-xl text-amber-200 tracking-wide block leading-tight">
                Grand Palais
              </span>
              <span className="text-[10px] text-amber-300/80 font-mono font-semibold uppercase tracking-widest">
                HAUTE LUXURY SUITES & BOUTIQUE RESIDENCES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-[#2a0202] p-1.5 rounded-2xl border border-amber-900/50 text-xs font-serif">
              <button
                onClick={() => setActiveTab('suites')}
                className={`px-4 py-1.5 rounded-xl transition ${
                  activeTab === 'suites' ? 'bg-amber-500 text-[#4a0404] font-bold shadow-md' : 'text-amber-100 hover:text-white'
                }`}
              >
                Suites Collection
              </button>
              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'reservations' ? 'bg-amber-500 text-[#4a0404] font-bold shadow-md' : 'text-amber-100 hover:text-white'
                }`}
              >
                <Crown className="w-3.5 h-3.5" /> Folio Bookings ({reservations.length})
              </button>
              <button
                onClick={() => setActiveTab('admin-rates')}
                className={`px-4 py-1.5 rounded-xl transition ${
                  activeTab === 'admin-rates' ? 'bg-amber-500 text-[#4a0404] font-bold shadow-md' : 'text-amber-100 hover:text-white'
                }`}
              >
                Yield & Rates
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-1.5 rounded-xl transition ${
                  activeTab === 'analytics' ? 'bg-amber-500 text-[#4a0404] font-bold shadow-md' : 'text-amber-100 hover:text-white'
                }`}
              >
                Hotelier Analytics
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* SUITES COLLECTION BROWSE */}
        {activeTab === 'suites' && (
          <div className="space-y-6">
            {/* Header and Destination Filter */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-amber-200/60 pb-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#4a0404]">Curated Sanctuary Residences</h1>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
                  Exclusive penthouses and private villas with bespoke Michelin dining and dedicated concierge staff
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-amber-200 shadow-sm">
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-serif transition ${
                      selectedLocation === loc
                        ? 'bg-[#4a0404] text-amber-200 font-bold shadow-sm'
                        : 'text-stone-700 hover:bg-amber-50'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Suites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredSuites.map(suite => (
                <div
                  key={suite.id}
                  className="bg-white rounded-3xl border border-amber-200/70 overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col justify-between group"
                >
                  <div className="relative h-64 overflow-hidden bg-stone-100">
                    <img
                      src={suite.image}
                      alt={suite.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-[#4a0404]/90 backdrop-blur-md text-amber-200 text-[10px] font-mono font-bold px-3 py-1 rounded-full shadow-md">
                      {suite.tag}
                    </span>
                    <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-lg">
                      {suite.sqm} m² • {suite.capacity}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-800 font-bold">{suite.property}</span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" /> {suite.rating} ({suite.reviewsCount})
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-xl text-[#4a0404] leading-snug">{suite.title}</h3>
                      <p className="text-xs text-stone-500 font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" /> {suite.location}
                      </p>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {suite.amenities.map((amen, aIdx) => (
                          <span key={aIdx} className="px-2.5 py-1 bg-amber-50 text-amber-950 text-[10px] rounded-lg border border-amber-100 font-sans font-medium">
                            {amen}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-amber-100">
                      <div className="flex items-baseline justify-between font-mono">
                        <div>
                          <span className="text-2xl font-serif font-black text-[#4a0404]">${suite.pricePerNight}</span>
                          <span className="text-xs text-stone-500"> / night</span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-sans truncate max-w-[150px]">{suite.cancellationPolicy}</span>
                      </div>

                      <button
                        onClick={() => setBookingModalSuite(suite)}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-[#2a0202] font-serif font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
                      >
                        <Crown className="w-4 h-4" /> Reserve Experience
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESERVATIONS FOLIO */}
        {activeTab === 'reservations' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-amber-200/60 pb-3">
              <h2 className="font-serif font-bold text-2xl text-[#4a0404]">Confirmed Guest Folios & Itineraries</h2>
              <p className="text-xs text-stone-500 font-mono">Guaranteed reservations linked to 24/7 dedicated butler service</p>
            </div>

            <div className="space-y-4">
              {reservations.map(res => (
                <div key={res.id} className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 bg-amber-100 text-amber-950 font-serif font-bold text-xs rounded-full border border-amber-200">
                        {res.status}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">Folio: {res.id}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#4a0404]">{res.suiteTitle}</h3>
                    <p className="text-xs text-stone-600 font-mono">{res.property} • Guest: <strong className="text-stone-900">{res.guestName}</strong></p>
                    <div className="text-xs font-mono text-amber-900 flex items-center gap-4">
                      <span>Stay: {res.checkIn} → {res.checkOut} ({res.nights} Nights)</span>
                    </div>
                    {res.specialRequests && (
                      <p className="text-xs text-stone-500 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                        "{res.specialRequests}"
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-stone-400 font-mono block">Total Folio Balance</span>
                    <span className="text-2xl font-serif font-black text-[#4a0404]">${res.totalAmount.toLocaleString()}.00</span>
                    <span className="text-[10px] text-stone-400 block font-mono pt-0.5">{res.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN RATE MANAGEMENT */}
        {activeTab === 'admin-rates' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-amber-200/60 pb-3">
              <h2 className="font-serif font-bold text-2xl text-[#4a0404]">Dynamic Yield & Suite Rate Adjuster</h2>
              <p className="text-xs text-stone-500 font-mono">Manage seasonal pricing multipliers across European and Asian properties</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suites.map(suite => (
                <div key={suite.id} className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#4a0404] leading-snug">{suite.title}</h4>
                  <p className="text-xs text-stone-500 font-mono">{suite.property}</p>

                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                    <span className="text-[10px] text-amber-800 font-mono block">CURRENT NIGHTLY RATE</span>
                    <div className="text-2xl font-serif font-bold text-[#4a0404]">${suite.pricePerNight}</div>
                  </div>

                  {editingSuiteId === suite.id ? (
                    <div className="flex gap-2 text-xs font-mono">
                      <input
                        type="number"
                        placeholder="New rate"
                        value={newRate}
                        onChange={e => setNewRate(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2 text-stone-900"
                      />
                      <button
                        onClick={() => {
                          if (newRate) updateSuitePrice(suite.id, newRate);
                          setEditingSuiteId(null);
                        }}
                        className="px-4 py-2 bg-[#4a0404] text-amber-200 font-bold rounded-xl"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingSuiteId(suite.id);
                        setNewRate(suite.pricePerNight.toString());
                      }}
                      className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-[#4a0404] font-serif font-bold text-xs rounded-xl transition border border-amber-200"
                    >
                      Update Nightly Tariff
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOTELIER ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-amber-200/60 pb-3">
              <h2 className="font-serif font-bold text-2xl text-[#4a0404]">Hotelier Yield & Occupancy Performance</h2>
              <p className="text-xs text-stone-500 font-mono">Key RevPAR and portfolio metrics for luxury sanctuary assets</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 uppercase">Gross Portfolio Inflow</span>
                <div className="text-2xl font-serif font-bold text-[#4a0404]">{analytics.totalRevenue}</div>
                <span className="text-[11px] text-emerald-700">↑ 18.4% YoY</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 uppercase">Occupancy Velocity</span>
                <div className="text-2xl font-serif font-bold text-amber-700">{analytics.occupancyRate}</div>
                <span className="text-[11px] text-stone-400">Target: 90%+</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 uppercase">RevPAR (Avg Yield)</span>
                <div className="text-2xl font-serif font-bold text-[#4a0404]">{analytics.revPar}</div>
                <span className="text-[11px] text-stone-400">Per available suite</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 uppercase">Average Duration</span>
                <div className="text-2xl font-serif font-bold text-stone-900">{analytics.avgStayNights}</div>
                <span className="text-[11px] text-amber-700">High guest retention</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* RESERVATION MODAL */}
      {bookingModalSuite && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border-2 border-amber-200">
            <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-[#4a0404]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#4a0404]">Reserve {bookingModalSuite.title}</h3>
                <span className="text-xs text-amber-800 font-mono">{bookingModalSuite.property}</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Principal Guest Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne Montgomery"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Arrival Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={e => setCheckInDate(e.target.value)}
                    className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-2.5 text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Departure Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={e => setCheckOutDate(e.target.value)}
                    className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-2.5 text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Special Concierge Requests & Dietary Preferences</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Vintage Champagne preference, gluten-free bakery items, private yacht transfer..."
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-2.5 text-stone-900 font-sans"
                ></textarea>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex justify-between items-center text-sm font-serif">
                <span className="text-stone-700">Estimated Total ({calculateNights()} Nights):</span>
                <span className="text-xl font-bold text-[#4a0404]">
                  ${(calculateNights() * bookingModalSuite.pricePerNight).toLocaleString()}.00
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingModalSuite(null)}
                  className="w-1/2 py-3 bg-stone-100 text-stone-700 font-serif font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2a0202] font-serif font-bold rounded-xl text-xs shadow-md"
                >
                  Confirm & Guarantee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-amber-200 bg-white py-6 px-4 text-center text-xs font-serif text-[#4a0404]/70">
        GRAND PALAIS • HAUTE LUXURY HOSPITALITY NETWORK • PRIVATE SUITES & VILLAS
      </footer>
    </div>
  );
}
