import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Wrench,
  ShieldCheck,
  Star,
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Zap,
  PhoneCall,
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  UserCheck
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories,
    providers,
    bookings,
    createBooking,
    markBookingCompleted
  } = useStore();

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [bookDate, setBookDate] = useState('2026-09-28');
  const [bookSlot, setBookSlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [bookHours, setBookHours] = useState(2);
  const [bookAddress, setBookAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [bookNotes, setBookNotes] = useState('Inspect leaking pipe under kitchen sink.');
  const [isEmergency, setIsEmergency] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filtered providers
  const filteredProviders = providers.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    createBooking({
      providerId: selectedProvider.id,
      date: bookDate,
      slot: bookSlot,
      hours: bookHours,
      address: bookAddress,
      notes: bookNotes,
      isEmergency
    });
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
    }, 1600);
  };

  const openBookingModal = (provider) => {
    setSelectedProvider(provider);
    setBookSlot(provider.slots[0]);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col selection:bg-sky-600 selection:text-white">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('services')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-display font-black tracking-tight text-slate-900">
                  PRO<span className="text-sky-600">FIXER</span>
                </span>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Verified Home Services Network
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'services', label: 'Explore Services', icon: Wrench },
                { id: 'my-bookings', label: 'My Bookings', icon: Calendar },
                { id: 'provider-desk', label: 'Provider Console', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-sky-50 text-sky-800 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                    {tab.id === 'my-bookings' && (
                      <span className="bg-sky-100 text-sky-800 text-xs px-2 py-0.5 rounded-full font-bold">
                        {bookings.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Background-Checked Pros</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: EXPLORE SERVICES & PROS ================= */}
        {activeTab === 'services' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-8 md:p-12 shadow-xl border border-sky-700/30">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Trusted Local Contractors
                </div>
                <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight">
                  Expert Home Repairs & Maintenance On-Demand
                </h1>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  Book top-rated licensed plumbers, master electricians, HVAC technicians, and deep cleaners with upfront pricing and escrow protection.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-slate-900">
                Browse Service Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 group ${
                      selectedCategory === cat.name
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-sky-500 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                    <span className="font-bold text-xs">{cat.name}</span>
                    {cat.avgRate && (
                      <span className={`text-[10px] ${selectedCategory === cat.name ? 'text-sky-100' : 'text-slate-400'}`}>
                        from {cat.avgRate}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Providers Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-bold text-slate-900">
                  Featured Verified Professionals ({filteredProviders.length})
                </h2>
                <span className="text-xs text-slate-500 font-semibold">
                  Guaranteed arrival window
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((pro) => (
                  <div
                    key={pro.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center gap-4">
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-600 shadow-sm"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display font-bold text-base text-slate-900">
                              {pro.name}
                            </h3>
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="inline-block bg-sky-50 text-sky-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-0.5">
                            {pro.badge}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-slate-800">{pro.rating}</span>
                            <span>({pro.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {pro.bio}
                      </p>

                      {/* Meta stats */}
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">RATE</span>
                          <span className="font-display font-extrabold text-slate-900 text-base">
                            ${pro.hourlyRate}/hr
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 block text-[10px]">JOBS DONE</span>
                          <span className="font-display font-bold text-emerald-700">
                            {pro.completedJobs}+
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Book Action */}
                    <button
                      onClick={() => openBookingModal(pro)}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-sky-600/20 transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      Book Appointment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MY BOOKINGS ================= */}
        {activeTab === 'my-bookings' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-display font-black text-slate-900">
              My Service Bookings & Active Dispatches
            </h1>

            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={b.providerAvatar}
                      alt={b.providerName}
                      className="w-14 h-14 rounded-2xl object-cover border border-sky-600"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-700">{b.id}</span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            b.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-slate-900">
                        {b.serviceCategory} with {b.providerName}
                      </h3>
                      <div className="text-xs text-slate-500">
                        📅 {b.date} · {b.slot}
                      </div>
                      <div className="text-xs text-slate-400">📍 {b.address}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="text-xl font-display font-black text-slate-900">
                      ${b.totalCost.toFixed(2)}
                    </div>
                    {b.status === 'Confirmed' ? (
                      <button
                        onClick={() => markBookingCompleted(b.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                      >
                        Sign Off Job Complete
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Paid & Escrow Released
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROVIDER DESK ================= */}
        {activeTab === 'provider-desk' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-display font-black text-slate-900">
                Contractor Earnings & Dispatch Console
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your daily route, job completion sign-offs, and instant weekly Stripe payouts.
              </p>
            </div>

            {/* Metric Row */}
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Weekly Net Payout</span>
                <div className="text-2xl font-display font-black text-slate-900">$1,420.00</div>
                <span className="text-[11px] text-emerald-600 font-bold">Auto-transfers Monday</span>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Jobs Completed (WTD)</span>
                <div className="text-2xl font-display font-black text-sky-700">8 Services</div>
                <span className="text-[11px] text-slate-500">100% 5-star feedback</span>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Average Customer Rating</span>
                <div className="text-2xl font-display font-black text-amber-500">4.95 / 5.0</div>
                <span className="text-[11px] text-slate-500">Top 1% in Metro</span>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Availability Status</span>
                <div className="text-2xl font-display font-black text-emerald-600">Online 🟢</div>
                <span className="text-[11px] text-slate-500">Receiving instant bookings</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= BOOKING MODAL ================= */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-slate-200 shadow-2xl space-y-6">
            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-2xl font-display font-black text-slate-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-slate-600">
                  {selectedProvider.name} is scheduled for your service. Escrow payment placed on hold.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-sky-600">
                      Schedule Service
                    </span>
                    <h3 className="text-xl font-display font-black text-slate-900">
                      Book {selectedProvider.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Service Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Estimated Hours
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={bookHours}
                        onChange={(e) => setBookHours(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Time Slot Window
                    </label>
                    <select
                      value={bookSlot}
                      onChange={(e) => setBookSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                    >
                      {selectedProvider.slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Service Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookAddress}
                      onChange={(e) => setBookAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Job Description & Problem Details
                    </label>
                    <input
                      type="text"
                      value={bookNotes}
                      onChange={(e) => setBookNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  {/* Emergency Rush dispatch */}
                  <label className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-amber-900 block">
                        Emergency Rush Dispatch (+25%)
                      </span>
                      <span className="text-amber-700">Contractor dispatched in under 60 minutes</span>
                    </div>
                  </label>

                  {/* Pricing Total Breakdown */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>
                        Labor ({bookHours} hrs × ${selectedProvider.hourlyRate}/hr)
                      </span>
                      <span>${bookHours * selectedProvider.hourlyRate}</span>
                    </div>
                    {isEmergency && (
                      <div className="flex justify-between text-amber-700">
                        <span>Emergency Dispatch Fee</span>
                        <span>+${(bookHours * selectedProvider.hourlyRate * 0.25).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>ProFixer Property Protection Insurance</span>
                      <span>+$15.00</span>
                    </div>
                    <div className="flex justify-between font-display font-extrabold text-slate-900 text-sm pt-2 border-t border-slate-200">
                      <span>Total Escrow Hold</span>
                      <span className="text-sky-700">
                        $
                        {(
                          bookHours * selectedProvider.hourlyRate +
                          (isEmergency ? bookHours * selectedProvider.hourlyRate * 0.25 : 0) +
                          15
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition active:scale-95"
                  >
                    Confirm & Reserve Appointment
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-500 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-sky-400" />
            <span className="font-display font-bold text-white">PROFIXER HOME SERVICES</span> · Project 59 / 59
          </div>
          <div>Port 3059 · Verified Provider Booking & Escrow Platform</div>
        </div>
      </footer>
    </div>
  );
}
