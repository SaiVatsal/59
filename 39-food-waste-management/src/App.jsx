import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Leaf,
  Clock,
  MapPin,
  Heart,
  Truck,
  PlusCircle,
  ShieldCheck,
  AlertTriangle,
  Award,
  Sparkles,
  TreeDeciduous,
  CheckCircle2,
  Package,
  QrCode,
  Flame,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    maxDistance,
    setMaxDistance,
    impactStats,
    listings,
    myClaims,
    claimSurplus,
    completePickup,
    addListing
  } = useStore();

  const [postTitle, setPostTitle] = useState('');
  const [postDonor, setPostDonor] = useState('');
  const [postCategory, setPostCategory] = useState('Prepared Meals');
  const [postPortions, setPostPortions] = useState('');
  const [postWeight, setPostWeight] = useState('');
  const [postTemp, setPostTemp] = useState('Chilled (4°C)');
  const [postExpires, setPostExpires] = useState('3.0');
  const [postAddress, setPostAddress] = useState('');
  const [postNotes, setPostNotes] = useState('');

  const [claimModalListing, setClaimModalListing] = useState(null);
  const [recipientOrg, setRecipientOrg] = useState('Downtown Hope Kitchen');

  const categories = ['All', 'Prepared Meals', 'Produce', 'Bakery', 'Dairy'];

  const filteredListings = listings.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDist = item.distance <= maxDistance;
    return matchesCat && matchesDist;
  });

  const urgentItemsCount = listings.filter(l => l.status === 'Available' && l.expiresInHours <= 3.0).length;

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postDonor.trim()) return;
    addListing({
      title: postTitle,
      donorName: postDonor,
      category: postCategory,
      portions: postPortions || '50 Portions',
      weightKg: Number(postWeight) || 20,
      temperature: postTemp,
      expiresInHours: Number(postExpires) || 3.0,
      pickupAddress: postAddress || 'Main Street Kitchen Bay',
      urgent: Number(postExpires) <= 3.0,
      notes: postNotes || 'Handle with clean food transport containers.'
    });

    setPostTitle('');
    setPostDonor('');
    setPostPortions('');
    setPostWeight('');
    setPostAddress('');
    setPostNotes('');
  };

  const handleConfirmClaim = () => {
    if (claimModalListing) {
      claimSurplus(claimModalListing.id, recipientOrg);
      setClaimModalListing(null);
      setActiveTab('my-claims');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf7] text-stone-800 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top Header */}
      <header className="bg-[#14532d] text-white border-b border-emerald-900 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-[#14532d] shadow-md shadow-emerald-900/40">
              <Leaf className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block leading-tight">HarvestRescue</span>
              <span className="text-[10px] text-emerald-300 font-mono font-semibold uppercase tracking-wider">
                SURPLUS FOOD & WASTE DIVERSION MATRIX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-[#0f3d21] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'browse' ? 'bg-emerald-500 text-[#14532d] font-bold shadow-sm' : 'text-emerald-100 hover:text-white'
                }`}
              >
                Available Surplus
              </button>
              <button
                onClick={() => setActiveTab('my-claims')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === 'my-claims' ? 'bg-emerald-500 text-[#14532d] font-bold shadow-sm' : 'text-emerald-100 hover:text-white'
                }`}
              >
                <span>My Pickups</span>
                {myClaims.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-900 text-[10px] font-mono font-bold flex items-center justify-center">
                    {myClaims.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === 'impact' ? 'bg-emerald-500 text-[#14532d] font-bold shadow-sm' : 'text-emerald-100 hover:text-white'
                }`}
              >
                Eco Impact
              </button>
            </nav>

            <button
              onClick={() => setActiveTab('post')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" /> Post Surplus
            </button>
          </div>
        </div>
      </header>

      {/* Perishable Urgency Alert Bar */}
      {urgentItemsCount > 0 && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-center gap-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
          <span className="font-bold">CRITICAL EXPIRY ALERT:</span>
          <span>{urgentItemsCount} surplus food batches expiring in less than 3 hours. Rapid pickup required!</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* SURPLUS LISTINGS BROWSE */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-stone-500">Category:</span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-[#14532d] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
                <span>Radius: {maxDistance} miles</span>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={maxDistance}
                  onChange={e => setMaxDistance(Number(e.target.value))}
                  className="accent-emerald-600 cursor-pointer w-28"
                />
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredListings.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col sm:flex-row group"
                >
                  <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {item.urgent && (
                      <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" /> {item.expiresInHours}h left
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      {item.distance} mi away
                    </span>
                  </div>

                  <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono font-semibold text-stone-400">{item.temperature}</span>
                      </div>

                      <h3 className="font-bold text-base text-stone-900 leading-snug">{item.title}</h3>
                      <p className="text-xs text-stone-600 font-medium">Donor: {item.donorName}</p>
                      <p className="text-xs text-stone-500 leading-relaxed">{item.notes}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-stone-500">Yield: <strong className="text-stone-900">{item.portions}</strong></span>
                        <span className="text-stone-500">Weight: <strong className="text-emerald-700">{item.weightKg} kg</strong></span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-stone-500 font-mono truncate max-w-[140px] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" /> {item.pickupAddress}
                        </span>

                        {item.status === 'Available' ? (
                          <button
                            onClick={() => setClaimModalListing(item)}
                            className="px-4 py-2 bg-[#14532d] hover:bg-[#0f3d21] text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
                          >
                            <HandHeart className="w-3.5 h-3.5" /> Claim Surplus
                          </button>
                        ) : (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-mono font-bold rounded-lg">
                            Claimed ({item.claimedBy || 'Reserved'})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MY CLAIMS & ACTIVE PICKUPS */}
        {activeTab === 'my-claims' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Active Rescue Pickups & Verifications</h2>
              <p className="text-xs text-stone-500 font-mono">Present OTP verification codes to food donors upon arrival</p>
            </div>

            {myClaims.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3">
                <Leaf className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-stone-800">No active surplus claims</h3>
                <p className="text-xs text-stone-500">Browse available surplus food listings in your radius to rescue meals.</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="px-5 py-2.5 bg-[#14532d] text-white text-xs font-bold rounded-xl mt-2"
                >
                  Browse Surplus
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myClaims.map(claim => (
                  <div key={claim.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full">
                          {claim.status}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">ID: {claim.id}</span>
                      </div>
                      <h3 className="font-bold text-base text-stone-900">{claim.title}</h3>
                      <p className="text-xs text-stone-600">Donor: {claim.donorName} • {claim.pickupAddress}</p>
                      <div className="text-xs font-mono text-stone-500 flex items-center gap-4">
                        <span>Quantity: <strong>{claim.portions}</strong></span>
                        <span>Estimated Weight: <strong>{claim.weightKg} kg</strong></span>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-center space-y-2 min-w-[200px]">
                      <span className="text-[10px] font-mono text-stone-500 uppercase block font-bold">PICKUP OTP PASSCODE</span>
                      <div className="text-2xl font-mono font-extrabold text-[#14532d] tracking-widest bg-white py-1 px-3 rounded-xl border border-stone-200">
                        {claim.otpCode}
                      </div>

                      {claim.status === 'Claimed' ? (
                        <button
                          onClick={() => completePickup(claim.id)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Pickup
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold font-mono block">Pickup Completed ✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ECO IMPACT DASHBOARD */}
        {activeTab === 'impact' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Collective Sustainability & Hunger Relief Impact</h2>
              <p className="text-xs text-stone-500 font-mono">Quantified metrics on landfill diversion and greenhouse gas emission prevention</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-stone-500 uppercase">Meals Rescued</span>
                <div className="text-3xl font-extrabold text-[#14532d]">{impactStats.mealsRescued.toLocaleString()}</div>
                <span className="text-[11px] text-emerald-600 font-mono">Direct to food banks</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-stone-500 uppercase">CO2 Emissions Avoided</span>
                <div className="text-3xl font-extrabold text-emerald-600">{impactStats.co2DivertedKg.toLocaleString()} kg</div>
                <span className="text-[11px] text-stone-500 font-mono">~ 3.5 metric tons CO2e</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-stone-500 uppercase">Landfill Diversion</span>
                <div className="text-3xl font-extrabold text-amber-700">{impactStats.landfillWeightKg.toLocaleString()} kg</div>
                <span className="text-[11px] text-stone-500 font-mono">Organic waste salvaged</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-mono text-stone-500 uppercase">Partner Charities</span>
                <div className="text-3xl font-extrabold text-stone-900">{impactStats.activeCharities}</div>
                <span className="text-[11px] text-emerald-600 font-mono">Verified distribution hubs</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-stone-900 font-mono uppercase">Emission Abatement Equivalence</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#f0fdf4] rounded-2xl border border-emerald-100 flex items-center gap-3">
                  <TreeDeciduous className="w-8 h-8 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950 block">402 Seedling Trees</span>
                    <span className="text-emerald-700">Grown for 10 years carbon offset</span>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                  <Truck className="w-8 h-8 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-950 block">21,400 Miles</span>
                    <span className="text-amber-700">Of gasoline car emissions saved</span>
                  </div>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-950 block">100% Edible Nutrients</span>
                    <span className="text-stone-600">Zero food safety incidents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST SURPLUS DONOR FORM */}
        {activeTab === 'post' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Post Food Surplus Batch</h2>
              <p className="text-xs text-stone-500 font-mono">Publish edible food items from your restaurant, grocery, or event</p>
            </div>

            <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Food Description / Batch Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 Fresh Croissants & Scones"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Donor Business / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Le Pain Bakery"
                    value={postDonor}
                    onChange={e => setPostDonor(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Food Category</label>
                  <select
                    value={postCategory}
                    onChange={e => setPostCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Prepared Meals">Prepared Meals</option>
                    <option value="Bakery">Bakery & Grains</option>
                    <option value="Produce">Fresh Produce</option>
                    <option value="Dairy">Dairy & Eggs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Estimated Portions</label>
                  <input
                    type="text"
                    placeholder="e.g. 40 portions"
                    value={postPortions}
                    onChange={e => setPostPortions(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={postWeight}
                    onChange={e => setPostWeight(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Expiry Window (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="3.5"
                    value={postExpires}
                    onChange={e => setPostExpires(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Pickup Address / Loading Bay</label>
                <input
                  type="text"
                  placeholder="e.g. 520 Broadway, Loading Dock 2"
                  value={postAddress}
                  onChange={e => setPostAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Special Handling / Allergen Notes</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Contains gluten. Packed in clean insulated bins."
                  value={postNotes}
                  onChange={e => setPostNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600 font-sans"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Food Surplus Listing
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* CLAIM CONFIRMATION MODAL */}
      {claimModalListing && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <HandHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900">Confirm Surplus Reservation</h3>
                <span className="text-xs text-stone-500 font-mono">Instant matching to recipient organization</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-100 space-y-1 text-xs font-mono">
              <div className="font-bold text-stone-900">{claimModalListing.title}</div>
              <div className="text-stone-500">{claimModalListing.donorName}</div>
              <div className="text-emerald-700 font-bold pt-1">
                {claimModalListing.portions} ({claimModalListing.weightKg} kg)
              </div>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <label className="text-stone-600 font-bold">Claiming Charity / Organization Name</label>
              <input
                type="text"
                value={recipientOrg}
                onChange={e => setRecipientOrg(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setClaimModalListing(null)}
                className="w-1/2 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClaim}
                className="w-1/2 py-2.5 bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Confirm Claim & Get OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4 text-center text-xs font-mono text-stone-500">
        HARVESTRESCUE • CIRCULAR FOOD RECOVERY • ZERO-WASTE CHARITABLE LOGISTICS
      </footer>
    </div>
  );
}

function HandHeart(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 15 6 6" />
      <path d="M19.5 8.5c.7-.7 1.5-1.5 1.5-2.5A3.5 3.5 0 0 0 17.5 2.5c-1.3 0-2.4.6-3 1.5-.6-.9-1.7-1.5-3-1.5A3.5 3.5 0 0 0 8 6c0 1 .8 1.8 1.5 2.5l5 5 5-5Z" />
    </svg>
  );
}
