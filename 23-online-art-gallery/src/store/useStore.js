import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'gallery', // 'gallery' | 'auctions' | 'exhibitions' | 'artists' | 'collection'

  selectedCategory: 'All',
  categories: ['All', 'Oil on Linen', 'Sculptural Bronze', 'Mixed Media Assemblage', 'Textile Tapestry'],

  artworks: [
    {
      id: 'art-01',
      title: 'Nocturne in Ochre & Bone',
      artist: 'Hélène de Montmirail',
      medium: 'Oil and cold wax on Belgian linen',
      dimensions: '180 × 140 cm (2025)',
      price: 14500,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      category: 'Oil on Linen',
      featured: true,
      inStock: true,
      provenance: 'Acquired directly from the artist’s Paris studio. Certified original with archival varnish.'
    },
    {
      id: 'art-02',
      title: 'Monolith IV: Terrene Resonance',
      artist: 'Kaito Takahashi',
      medium: 'Cast patinated bronze on volcanic basalt base',
      dimensions: '65 × 30 × 30 cm, 28 kg',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      category: 'Sculptural Bronze',
      featured: true,
      inStock: true,
      provenance: 'Edition 2 of 5. Cast at the Kyoto Art Foundry. Signed and numbered with Certificate of Authenticity.'
    },
    {
      id: 'art-03',
      title: 'Strata & Silicate Whispers',
      artist: 'Astrid Lindholm',
      medium: 'Hand-dyed raw wool, unspun silk, and brass leaf',
      dimensions: '210 × 160 cm',
      price: 8900,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
      category: 'Textile Tapestry',
      featured: false,
      inStock: true,
      provenance: 'Solo Exhibition at Stockholm Biennale of Contemporary Fiber Arts.'
    }
  ],

  liveAuctions: [
    {
      id: 'auc-101',
      title: 'Vesper Light over the Solstice Sea',
      artist: 'Laurent Mercier',
      medium: 'Pigment and gold leaf on gessoed oak panel',
      startingBid: 6000,
      currentBid: 9800,
      bidCount: 14,
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      timeLeft: '02h 45m 18s',
      reserveMet: true
    },
    {
      id: 'auc-102',
      title: 'Ephemeral Equilibrium',
      artist: 'Valeria Solano',
      medium: 'Carved Carrara marble & blackened steel',
      startingBid: 12000,
      currentBid: 16500,
      bidCount: 21,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1000&q=80',
      timeLeft: '06h 12m 44s',
      reserveMet: true
    }
  ],

  artists: [
    {
      id: 'art-h-montmirail',
      name: 'Hélène de Montmirail',
      origin: 'Paris, France',
      bio: 'Known for meditative chromatic abstractions, Montmirail investigates the interplay of mineral pigments, bone soot, and natural light.',
      representation: 'Atelier Vernissage Exclusive',
      worksCount: 18,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'art-k-takahashi',
      name: 'Kaito Takahashi',
      origin: 'Kyoto, Japan',
      bio: 'Takahashi bridges ancient lost-wax casting methods with brutalist monolithic geometries, casting heavily textured bronze with bespoke chemical patinas.',
      representation: 'Tokyo / Paris Salon',
      worksCount: 9,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  ],

  acquiredCollection: [],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  placeBid: (auctionId, bidAmount) => set((state) => ({
    liveAuctions: state.liveAuctions.map(auc => {
      if (auc.id === auctionId) {
        return {
          ...auc,
          currentBid: Number(bidAmount),
          bidCount: auc.bidCount + 1
        };
      }
      return auc;
    })
  })),

  purchaseArtwork: (artwork) => set((state) => ({
    acquiredCollection: [
      {
        ...artwork,
        acquiredDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        certificateHash: `0xART-${Math.floor(100000 + Math.random() * 900000)}`
      },
      ...state.acquiredCollection
    ],
    artworks: state.artworks.map(a => a.id === artwork.id ? { ...a, inStock: false } : a)
  })),

  submitArtwork: (artData) => set((state) => {
    const newArt = {
      id: `art-${Date.now()}`,
      title: artData.title,
      artist: artData.artist,
      medium: artData.medium,
      dimensions: artData.dimensions || 'Variable Dimensions',
      price: Number(artData.price || 5000),
      image: artData.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      category: artData.category || 'Oil on Linen',
      featured: false,
      inStock: true,
      provenance: 'Consigned by the artist for exclusive gallery representation.'
    };
    return { artworks: [newArt, ...state.artworks] };
  })
}));
