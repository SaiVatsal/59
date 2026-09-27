import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Heart,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  DollarSign,
  PlusCircle,
  Share2,
  Lock,
  ArrowRight,
  Download,
  Receipt,
  Sparkles,
  Users,
  CheckCircle2,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    campaigns,
    donations,
    ledgerEntries,
    makeDonation,
    createCampaign
  } = useStore();

  const [selectedDonationCamp, setSelectedDonationCamp] = useState(null);
  const [donateAmount, setDonateAmount] = useState(100);
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  // New Campaign Form
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newCategory, setNewCategory] = useState('Healthcare');
  const [newGoal, setNewGoal] = useState('25000');
  const [newDesc, setNewDesc] = useState('');

  const categories = ['All', 'Healthcare', 'Environment', 'Education'];

  const filteredCampaigns = campaigns.filter(c =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  const totalRaisedAcross = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonorsAcross = campaigns.reduce((sum, c) => sum + c.donorsCount, 0);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!selectedDonationCamp || donateAmount <= 0) return;
    makeDonation({
      campaignId: selectedDonationCamp.id,
      amount: Number(donateAmount),
      donorName,
      isAnonymous
    });
    setSelectedDonationCamp(null);
    setDonateAmount(100);
    setDonorName('');
    setIsAnonymous(false);
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim()) return;
    createCampaign({
      title: newTitle,
      organization: newOrg,
      category: newCategory,
      goal: Number(newGoal) || 20000,
      description: newDesc || 'Community impact campaign for transparent charitable funding.'
    });
    setNewTitle('');
    setNewOrg('');
    setNewDesc('');
  };

  return (
    <div className="min-h-screen bg-[#fffafb] text-stone-800 font-sans flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-rose-950 tracking-tight block leading-tight">CoralHope</span>
              <span className="text-[10px] text-rose-600 font-mono font-bold uppercase tracking-wider">
                TRANSPARENT 501(C)(3) CHARITY MATRIX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-rose-50/80 p-1 rounded-2xl border border-rose-100 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'campaigns' ? 'bg-rose-500 text-white shadow-sm font-bold' : 'text-rose-900 hover:text-rose-600'
                }`}
              >
                Campaigns
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'ledger' ? 'bg-rose-500 text-white shadow-sm font-bold' : 'text-rose-900 hover:text-rose-600'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Transparency Ledger
              </button>
              <button
                onClick={() => setActiveTab('my-donations')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'my-donations' ? 'bg-rose-500 text-white shadow-sm font-bold' : 'text-rose-900 hover:text-rose-600'
                }`}
              >
                Tax Receipts ({donations.length})
              </button>
            </nav>

            <button
              onClick={() => setActiveTab('create-campaign')}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-500/20"
            >
              <PlusCircle className="w-4 h-4" /> Start Campaign
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* CAMPAIGNS BROWSE VIEW */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Global Metrics Hero */}
            <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                  100% PUBLIC AUDIT TRAIL
                </span>
                <h1 className="text-2xl sm:text-3xl font-black leading-tight">Every Cent Traceable on the Direct Impact Ledger</h1>
                <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                  CoralHope eliminates administrative black boxes. Donors receive cryptographic receipts and verifiable vendor disbursement records.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto font-mono text-center">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <span className="text-[10px] text-rose-200 block uppercase">Total Disbursed</span>
                  <span className="text-2xl font-black">${totalRaisedAcross.toLocaleString()}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <span className="text-[10px] text-rose-200 block uppercase">Active Donors</span>
                  <span className="text-2xl font-black">{totalDonorsAcross.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-500">Filter Cause:</span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-white border border-rose-100 text-stone-600 hover:bg-rose-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-stone-500">{filteredCampaigns.length} Active Causes</span>
            </div>

            {/* Campaign Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCampaigns.map(camp => {
                const percent = Math.min(100, Math.round((camp.raised / camp.goal) * 100));

                return (
                  <div
                    key={camp.id}
                    className="bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div className="relative h-48 overflow-hidden bg-rose-50">
                      <img
                        src={camp.image}
                        alt={camp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-rose-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {camp.category}
                      </span>
                      {camp.verified501c3 && (
                        <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> 501(c)(3)
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-stone-400 font-semibold">{camp.organization}</span>
                        <h3 className="font-bold text-base text-stone-900 leading-snug">{camp.title}</h3>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{camp.description}</p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {/* Animated Progress bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="font-bold text-rose-600">${camp.raised.toLocaleString()} raised</span>
                            <span className="text-stone-400">of ${camp.goal.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2.5 bg-rose-50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-1000"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[10px] font-mono text-stone-400">
                            <span>{percent}% Funded</span>
                            <span>{camp.daysLeft} days remaining</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedDonationCamp(camp)}
                          className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" /> Donate Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TRANSPARENCY & AUDIT LEDGER */}
        {activeTab === 'ledger' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-rose-100 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Live Fund Disbursement & Transparency Ledger</h2>
              <p className="text-xs text-stone-500 font-mono">Every dollar tracked directly from escrow pool to vendor invoice payment</p>
            </div>

            <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-rose-100 text-stone-400">
                      <th className="pb-3 font-semibold">Tx ID</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Campaign / Purpose</th>
                      <th className="pb-3 font-semibold">Recipient Vendor</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-50">
                    {ledgerEntries.map(tx => (
                      <tr key={tx.id} className="text-stone-700">
                        <td className="py-3.5 font-bold text-rose-600">{tx.id}</td>
                        <td className="py-3.5 text-stone-400">{tx.date}</td>
                        <td className="py-3.5 font-sans">
                          <div className="font-bold text-stone-900 text-xs">{tx.campaign}</div>
                          <div className="text-[11px] text-stone-500">{tx.purpose}</div>
                        </td>
                        <td className="py-3.5 text-stone-600 font-semibold">{tx.recipient}</td>
                        <td className="py-3.5 font-bold text-rose-700">${tx.amountSpent.toLocaleString()}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                            {tx.auditStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MY DONATIONS & TAX RECEIPTS */}
        {activeTab === 'my-donations' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-rose-100 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Donation History & IRS 501(c)(3) Tax Receipts</h2>
              <p className="text-xs text-stone-500 font-mono">Instant PDF tax deduction receipts with cryptographic proof of contribution</p>
            </div>

            <div className="space-y-4">
              {donations.map(don => (
                <div key={don.id} className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-mono font-bold rounded-full">
                        Contribution Confirmed
                      </span>
                      <span className="text-xs text-stone-400 font-mono">{don.date}</span>
                    </div>

                    <h3 className="font-bold text-base text-stone-900">{don.campaignTitle}</h3>
                    <div className="text-xs font-mono text-stone-500 flex items-center gap-3">
                      <span>Receipt: <strong className="text-rose-600">{don.taxReceiptId}</strong></span>
                      <span>Hash: <code className="text-stone-400">{don.txHash}</code></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-stone-400 font-mono block">Amount</span>
                      <span className="text-2xl font-black text-rose-600 font-mono">${don.amount}</span>
                    </div>

                    <button
                      onClick={() => setActiveReceiptModal(don)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold rounded-xl text-xs transition border border-rose-200 flex items-center gap-1.5"
                    >
                      <Receipt className="w-4 h-4 text-rose-600" /> View Tax PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CREATE CAMPAIGN TAB */}
        {activeTab === 'create-campaign' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-rose-100 pb-3">
              <h2 className="font-bold text-xl text-stone-900">Initiate Non-Profit Charitable Campaign</h2>
              <p className="text-xs text-stone-500 font-mono">Publish verified 501(c)(3) relief causes with automated milestone auditing</p>
            </div>

            <form onSubmit={handleCampaignSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-sm space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Campaign Initiative Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clean Energy Microgrids for Rural Clinics"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-rose-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">501(c)(3) Organization Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SolarHealth International"
                    value={newOrg}
                    onChange={e => setNewOrg(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Impact Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-rose-500"
                  >
                    <option value="Healthcare">Healthcare & Surgeries</option>
                    <option value="Environment">Clean Water & Climate</option>
                    <option value="Education">Education & STEM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Funding Target Goal ($ USD)</label>
                <input
                  type="number"
                  value={newGoal}
                  onChange={e => setNewGoal(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Mission Pitch & Fund Allocation Plan</label>
                <textarea
                  rows="3"
                  placeholder="Explain exactly how donations will be deployed and audited..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-rose-500 font-sans"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Verified Campaign
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* DONATION MODAL */}
      {selectedDonationCamp && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-rose-200">
            <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900">Support This Initiative</h3>
                <span className="text-xs text-rose-600 font-mono">{selectedDonationCamp.organization}</span>
              </div>
            </div>

            <form onSubmit={handleDonationSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-2">
                <label className="text-stone-700 font-bold block">Select Contribution Tier</label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonateAmount(amt)}
                      className={`py-2 rounded-xl font-bold transition border ${
                        donateAmount === amt
                          ? 'bg-rose-500 text-white border-rose-500'
                          : 'bg-rose-50/50 text-stone-800 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Custom Amount ($)</label>
                <input
                  type="number"
                  min="5"
                  value={donateAmount}
                  onChange={e => setDonateAmount(Number(e.target.value))}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900 font-bold text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Donor Name (For Tax Receipt)</label>
                <input
                  type="text"
                  placeholder="e.g. Harrison Vance"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-xl p-2.5 text-stone-900"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="accent-rose-500 rounded"
                />
                <span className="text-stone-600">Make contribution anonymous on public ledger</span>
              </label>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDonationCamp(null)}
                  className="w-1/2 py-2.5 bg-rose-50 text-stone-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-md"
                >
                  Confirm & Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAX RECEIPT MODAL */}
      {activeReceiptModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border-2 border-rose-200 font-mono text-xs">
            <div className="flex justify-between items-start border-b border-rose-100 pb-4">
              <div>
                <span className="text-xs font-black text-rose-600 tracking-wider">OFFICIAL 501(C)(3) TAX RECEIPT</span>
                <h3 className="font-black text-base text-stone-900 font-sans mt-0.5">CoralHope Foundation</h3>
                <span className="text-[10px] text-stone-400">EIN: 84-2910394 • Tax-Exempt Contribution</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block">Receipt No</span>
                <span className="font-bold text-stone-900">{activeReceiptModal.taxReceiptId}</span>
              </div>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Donor Name:</span>
                <span className="font-bold text-stone-900">{activeReceiptModal.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Contribution Date:</span>
                <span className="font-bold text-stone-900">{activeReceiptModal.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cause Designated:</span>
                <span className="font-bold text-rose-900 max-w-[240px] truncate text-right">{activeReceiptModal.campaignTitle}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-rose-200/60">
                <span className="text-stone-700 font-bold">Total Deductible Amount:</span>
                <span className="font-black text-rose-600 text-base">${activeReceiptModal.amount}.00 USD</span>
              </div>
            </div>

            <div className="space-y-1 text-[10px] text-stone-400 leading-relaxed">
              <p>No goods or services were provided in exchange for this contribution other than intangible religious or charitable benefits.</p>
              <p>Cryptographic Audit Proof: {activeReceiptModal.txHash}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveReceiptModal(null)}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-rose-100 bg-white py-6 px-4 text-center text-xs font-mono text-rose-900/60">
        CORALHOPE • 100% AUDITABLE CHARITY MATRIX • DIRECT IMPACT TAX RECEIPTS
      </footer>
    </div>
  );
}
