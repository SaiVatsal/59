import React, { useState } from 'react';
import {
  Sparkles,
  Gavel,
  Compass,
  Palette,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Upload,
  Heart,
  Plus
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories,
    artworks,
    liveAuctions,
    artists,
    acquiredCollection,
    placeBid,
    purchaseArtwork,
    submitArtwork
  } = useStore();

  const [selectedArt, setSelectedArt] = useState(null);
  const [showBidModal, setShowBidModal] = useState(null);
  const [bidValue, setBidValue] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    artist: 'Hélène de Montmirail',
    medium: 'Oil on Belgian Linen',
    dimensions: '160 × 120 cm',
    price: 9500,
    category: 'Oil on Linen',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1000&q=80'
  });

  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const filteredArtworks = artworks.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!showBidModal || !bidValue) return;
    placeBid(showBidModal.id, bidValue);
    setShowBidModal(null);
    setBidValue('');
  };

  const handleAcquire = (art) => {
    purchaseArtwork(art);
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
      setSelectedArt(null);
      setActiveTab('collection');
    }, 1200);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title) return;
    submitArtwork(uploadForm);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1c1917] flex flex-col font-sans selection:bg-[#dfd4be]">
      {/* Gallery Header */}
      <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur border-b border-[#dfd4be] px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center font-serif text-lg font-bold">
              V
            </div>
            <div>
              <span className="font-serif text-2xl tracking-widest uppercase font-bold text-[#1c1917] block leading-none">
                Atelier Vernissage
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#78716c] uppercase font-medium">
                Contemporary Fine Art • Curated Auctions • Paris & Kyoto
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6 text-xs tracking-wider uppercase font-semibold text-[#78716c]">
            {[
              { id: 'gallery', label: 'Salon Exhibition' },
              { id: 'auctions', label: 'Live Bidding Lots' },
              { id: 'artists', label: 'Artists & Studios' },
              { id: 'collection', label: `Private Vault (${acquiredCollection.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`transition pb-1 ${
                  activeTab === tab.id
                    ? 'text-[#1c1917] font-bold border-b-2 border-[#1c1917]'
                    : 'hover:text-[#1c1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Consign Action */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 border border-[#1c1917] hover:bg-[#1c1917] hover:text-[#fdfbf7] rounded-full text-xs font-semibold uppercase tracking-wider transition"
          >
            Consign Artwork
          </button>
        </div>
      </header>

      {/* Main Salon Grid */}
      <main className="max-w-7xl mx-auto px-8 py-10 w-full flex-1 space-y-12">
        {/* VIEW 1: GALLERY EXHIBITION */}
        {activeTab === 'gallery' && (
          <div className="space-y-10">
            {/* Curated Editorial Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f7f4ed] border border-[#dfd4be] p-8 md:p-12 rounded-3xl">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#b89f7e] font-bold">
                  Autumn Solstice Retrospective // 2026
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1c1917] leading-tight italic font-normal">
                  The Weight of Mineral Pigments
                </h1>
                <p className="text-sm text-[#78716c] leading-relaxed max-w-xl font-light">
                  A curated assembly of large-scale Belgian linen canvases and cast patinated bronze sculptures exploring geologic time, light refraction, and brutalist restraint.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-semibold tracking-wider uppercase">
                  <span>Curated by Hélène de Montmirail</span>
                  <span>•</span>
                  <span>12 Unique Masterworks</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/5] group cursor-pointer" onClick={() => setSelectedArt(artworks[0])}>
                  <img
                    src={artworks[0].image}
                    alt={artworks[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-6 flex flex-col justify-end text-white">
                    <span className="font-serif text-xl italic">{artworks[0].title}</span>
                    <span className="text-xs text-stone-300 font-light">{artworks[0].artist} • ${artworks[0].price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#dfd4be] pb-4">
              <span className="text-xs tracking-wider uppercase font-bold text-[#78716c] mr-3">Filter by Medium:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition ${
                    selectedCategory === cat
                      ? 'bg-[#1c1917] text-[#fdfbf7]'
                      : 'bg-[#f7f4ed] text-[#78716c] hover:text-[#1c1917]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Large Image-First Artwork Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredArtworks.map((art) => (
                <div
                  key={art.id}
                  className="space-y-4 group cursor-pointer"
                  onClick={() => setSelectedArt(art)}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-200 relative shadow-sm border border-[#dfd4be]">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    {!art.inStock && (
                      <div className="absolute top-4 left-4 bg-[#1c1917] text-[#fdfbf7] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                        Acquired into Private Vault
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-2xl text-[#1c1917] italic group-hover:text-[#b89f7e] transition">
                        {art.title}
                      </h3>
                      <span className="font-sans font-bold text-sm text-[#1c1917]">
                        ${art.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">{art.artist}</p>
                    <p className="text-xs text-[#78716c] font-light italic">{art.medium} — {art.dimensions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE AUCTION LOTS */}
        {activeTab === 'auctions' && (
          <div className="space-y-8">
            <div className="space-y-2 border-b border-[#dfd4be] pb-4">
              <span className="text-[11px] tracking-[0.25em] text-[#b89f7e] uppercase font-bold">Salon Live Bidding</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1c1917]">Active Auction Lots & Timed Sales</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {liveAuctions.map((auc) => (
                <div
                  key={auc.id}
                  className="bg-[#f7f4ed] border border-[#dfd4be] rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm"
                >
                  <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-md">
                    <img src={auc.image} alt={auc.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 animate-pulse" /> {auc.timeLeft}
                      </div>
                      <h3 className="font-serif text-2xl italic text-[#1c1917] leading-tight">{auc.title}</h3>
                      <p className="text-xs font-semibold text-[#78716c]">{auc.artist}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#dfd4be] space-y-1">
                      <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-bold">Current Standing Bid</span>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-2xl font-bold text-[#1c1917]">${auc.currentBid.toLocaleString()}</span>
                        <span className="text-xs text-[#78716c]">{auc.bidCount} Bids Placed</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowBidModal(auc);
                        setBidValue((auc.currentBid + 500).toString());
                      }}
                      className="w-full py-3 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] rounded-xl text-xs font-semibold uppercase tracking-widest transition flex items-center justify-center gap-2"
                    >
                      <Gavel className="w-4 h-4" /> Advance Bid (+$500)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ARTISTS */}
        {activeTab === 'artists' && (
          <div className="space-y-8">
            <div className="space-y-2 border-b border-[#dfd4be] pb-4">
              <span className="text-[11px] tracking-[0.25em] text-[#b89f7e] uppercase font-bold">Roster & Residencies</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1c1917]">Represented Masters & Studios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artists.map((artist) => (
                <div key={artist.id} className="bg-[#f7f4ed] border border-[#dfd4be] rounded-3xl p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={artist.avatar} alt={artist.name} className="w-16 h-16 rounded-full object-cover border border-[#dfd4be]" />
                    <div>
                      <h3 className="font-serif text-2xl text-[#1c1917]">{artist.name}</h3>
                      <span className="text-xs text-[#78716c] font-semibold">{artist.origin} • {artist.representation}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#78716c] leading-relaxed font-light">{artist.bio}</p>
                  <div className="pt-2 flex justify-between text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                    <span>Catalogued Works: {artist.worksCount}</span>
                    <span className="text-[#b89f7e]">View Studio Archive →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: PRIVATE VAULT / ACQUIRED WORKS */}
        {activeTab === 'collection' && (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#dfd4be] pb-4">
              <span className="text-[11px] tracking-[0.25em] text-[#b89f7e] uppercase font-bold">Provenance & Custody</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1c1917]">Your Private Vault Holdings</h2>
            </div>

            {acquiredCollection.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-[#f7f4ed] rounded-3xl border border-[#dfd4be]">
                <Palette className="w-10 h-10 text-[#b89f7e] mx-auto" />
                <p className="font-serif text-2xl italic text-[#1c1917]">No Acquisitions in Vault Yet</p>
                <p className="text-xs text-[#78716c]">Explore the active Salon Exhibition to acquire original canvases and sculptures.</p>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="px-6 py-2.5 bg-[#1c1917] text-[#fdfbf7] rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Browse Exhibition
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acquiredCollection.map((art) => (
                  <div key={art.id} className="bg-white border border-[#dfd4be] rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="flex gap-4">
                      <img src={art.image} alt={art.title} className="w-28 h-28 object-cover rounded-xl" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#b89f7e] block">{art.certificateHash}</span>
                        <h4 className="font-serif text-xl italic text-[#1c1917]">{art.title}</h4>
                        <p className="text-xs text-[#78716c]">{art.artist}</p>
                        <p className="text-xs font-bold text-[#1c1917]">${art.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-[#f7f4ed] rounded-xl text-xs space-y-1">
                      <span className="font-bold text-[#1c1917] block">Custody Certificate</span>
                      <p className="text-[11px] text-[#78716c]">{art.provenance}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ARTWORK DETAIL / PURCHASE MODAL */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdfbf7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#dfd4be] flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img src={selectedArt.image} alt={selectedArt.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#b89f7e]">{selectedArt.category}</span>
                  <button onClick={() => setSelectedArt(null)} className="text-[#78716c] hover:text-[#1c1917]">✕</button>
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl italic text-[#1c1917]">{selectedArt.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mt-0.5">{selectedArt.artist}</p>
                </div>
                <div className="text-xs text-[#78716c] space-y-1">
                  <p><strong>Medium:</strong> {selectedArt.medium}</p>
                  <p><strong>Dimensions:</strong> {selectedArt.dimensions}</p>
                  <p className="text-[11px] leading-relaxed italic pt-1">{selectedArt.provenance}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#dfd4be]">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#78716c] uppercase font-bold">Acquisition Value</span>
                  <span className="font-serif text-2xl font-bold text-[#1c1917]">${selectedArt.price.toLocaleString()}</span>
                </div>

                {purchaseSuccess ? (
                  <div className="py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                    ✓ Provenance Minted & Transferred
                  </div>
                ) : (
                  <button
                    onClick={() => handleAcquire(selectedArt)}
                    disabled={!selectedArt.inStock}
                    className="w-full py-3 bg-[#1c1917] hover:bg-[#292524] disabled:bg-stone-300 text-[#fdfbf7] rounded-xl text-xs font-semibold uppercase tracking-widest transition"
                  >
                    {selectedArt.inStock ? 'Acquire into Vault' : 'Already Sold'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BID MODAL */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdfbf7] rounded-3xl p-6 max-w-sm w-full border border-[#dfd4be] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dfd4be] pb-2">
              <h3 className="font-serif text-xl italic text-[#1c1917]">Place Competitive Bid</h3>
              <button onClick={() => setShowBidModal(null)} className="text-[#78716c]">✕</button>
            </div>
            <form onSubmit={handleBidSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{showBidModal.title}</span>
                <p className="font-bold text-[#1c1917]">Current Bid: ${showBidModal.currentBid.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#1c1917]">Your Bid Amount ($ USD)</label>
                <input
                  type="number"
                  min={showBidModal.currentBid + 100}
                  value={bidValue}
                  onChange={(e) => setBidValue(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#dfd4be] rounded-xl font-mono text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1c1917] text-[#fdfbf7] rounded-xl text-xs font-semibold uppercase tracking-widest"
              >
                Sign & Transmit Bid
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONSIGNMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fdfbf7] rounded-3xl p-6 max-w-md w-full border border-[#dfd4be] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dfd4be] pb-2">
              <h3 className="font-serif text-xl italic text-[#1c1917]">Consign Masterwork to Salon</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#78716c]">✕</button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1c1917]">Artwork Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solstice Cadence in Cobalt"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#dfd4be] rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1917]">Artist</label>
                  <input
                    type="text"
                    value={uploadForm.artist}
                    onChange={(e) => setUploadForm({ ...uploadForm, artist: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#dfd4be] rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#1c1917]">Medium</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#dfd4be] rounded-xl"
                  >
                    <option>Oil on Linen</option>
                    <option>Sculptural Bronze</option>
                    <option>Mixed Media Assemblage</option>
                    <option>Textile Tapestry</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#1c1917]">Valuation / Price ($ USD)</label>
                <input
                  type="number"
                  value={uploadForm.price}
                  onChange={(e) => setUploadForm({ ...uploadForm, price: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#dfd4be] rounded-xl font-mono"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-1/2 py-2.5 bg-stone-200 text-[#1c1917] rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#1c1917] text-[#fdfbf7] rounded-xl font-semibold uppercase tracking-wider"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#dfd4be] bg-[#f7f4ed] py-8 text-center text-xs text-[#78716c] font-serif">
        ATELIER VERNISSAGE • HAUTE ÉDITION FINE ART MARKETPLACE • PARIS / GENEVA / TOKYO
      </footer>
    </div>
  );
}
