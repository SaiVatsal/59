import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'browse', // 'browse' | 'post' | 'my-claims' | 'impact'
  selectedCategory: 'All',
  maxDistance: 10, // miles

  impactStats: {
    mealsRescued: 3410,
    co2DivertedKg: 8940,
    landfillWeightKg: 4280,
    activeCharities: 42
  },

  listings: [
    {
      id: 'FOOD-101',
      title: 'Artisanal Sourdough & French Baguettes',
      donorName: 'St. Germain Bakery & Cafe',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      portions: '45 Loaves',
      weightKg: 28,
      temperature: 'Ambient',
      distance: 0.8,
      expiresInHours: 2.5,
      pickupAddress: '420 Bleecker St, West Village',
      status: 'Available', // 'Available' | 'Claimed' | 'Completed'
      claimedBy: null,
      otpCode: '8492',
      urgent: true,
      notes: 'Freshly baked this morning. Packaged in sanitized brown paper bags.'
    },
    {
      id: 'FOOD-102',
      title: 'Organic Hydroponic Greens & Heirloom Tomatoes',
      donorName: 'Verdant Urban Farms',
      category: 'Produce',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      portions: '60 kg Fresh Produce',
      weightKg: 60,
      temperature: 'Chilled (4°C)',
      distance: 1.4,
      expiresInHours: 6.0,
      pickupAddress: '88 Hudson Square Dock B',
      status: 'Available',
      claimedBy: null,
      otpCode: '3190',
      urgent: false,
      notes: 'Crisp romaine, butterhead lettuce, and vine-ripened tomatoes.'
    },
    {
      id: 'FOOD-103',
      title: 'Catered Mediterranean Buffet Trays',
      donorName: 'Grand Hyatt Executive Banquets',
      category: 'Prepared Meals',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      portions: '120 Portions',
      weightKg: 45,
      temperature: 'Hot Insulated Cambros',
      distance: 2.1,
      expiresInHours: 1.5,
      pickupAddress: '109 E 42nd St Loading Bay 4',
      status: 'Available',
      claimedBy: null,
      otpCode: '9021',
      urgent: true,
      notes: 'Lemon herb roasted chicken, saffron rice pilaf, grilled Mediterranean vegetables.'
    },
    {
      id: 'FOOD-104',
      title: 'Pasture-Raised Whole Milk & Greek Yogurts',
      donorName: 'Green Valley Dairy Distribution',
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
      portions: '80 Units',
      weightKg: 35,
      temperature: 'Refrigerated (2°C)',
      distance: 3.5,
      expiresInHours: 12.0,
      pickupAddress: '710 11th Ave Cold Storage Depot',
      status: 'Available',
      claimedBy: null,
      otpCode: '4512',
      urgent: false,
      notes: 'Best before date within 48 hours. Sealed unopened crates.'
    }
  ],

  myClaims: [],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setMaxDistance: (dist) => set({ maxDistance: dist }),

  claimSurplus: (listingId, recipientOrg = 'Hope Shelter Kitchen') => set((state) => {
    const listing = state.listings.find(l => l.id === listingId);
    if (!listing) return state;

    const updatedListing = {
      ...listing,
      status: 'Claimed',
      claimedBy: recipientOrg,
      claimedAt: 'Just now'
    };

    return {
      listings: state.listings.map(l => l.id === listingId ? updatedListing : l),
      myClaims: [updatedListing, ...state.myClaims],
      impactStats: {
        ...state.impactStats,
        mealsRescued: state.impactStats.mealsRescued + parseInt(listing.portions) || state.impactStats.mealsRescued + 30,
        co2DivertedKg: state.impactStats.co2DivertedKg + Math.floor(listing.weightKg * 2.5),
        landfillWeightKg: state.impactStats.landfillWeightKg + listing.weightKg
      }
    };
  }),

  completePickup: (listingId) => set((state) => ({
    listings: state.listings.map(l => l.id === listingId ? { ...l, status: 'Completed' } : l),
    myClaims: state.myClaims.map(l => l.id === listingId ? { ...l, status: 'Completed' } : l)
  })),

  addListing: (newListing) => set((state) => {
    const created = {
      id: `FOOD-${Math.floor(105 + Math.random() * 900)}`,
      status: 'Available',
      claimedBy: null,
      distance: 1.2,
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      image: newListing.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      ...newListing
    };
    return {
      listings: [created, ...state.listings],
      activeTab: 'browse'
    };
  })
}));
