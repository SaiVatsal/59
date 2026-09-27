import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'suites', // 'suites' | 'reservations' | 'admin-rates' | 'analytics'
  selectedLocation: 'All',

  suites: [
    {
      id: 'STE-501',
      title: 'The Imperial Penthouse Suite',
      property: 'Grand Palais Champs-Élysées',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 1450,
      rating: 4.96,
      reviewsCount: 64,
      sqm: 145,
      capacity: '4 Guests • 2 King Beds',
      amenities: ['Private Rooftop Hot Tub', 'Eiffel Tower View', 'Dedicated 24/7 Butler', 'Champagne Bar', 'Hermès Toiletries'],
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      available: true,
      tag: 'Haute Signature'
    },
    {
      id: 'STE-502',
      title: 'Cliffside Infinity Panorama Villa',
      property: 'Aegis Luxury Retreat & Spa',
      location: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 980,
      rating: 4.92,
      reviewsCount: 88,
      sqm: 110,
      capacity: '2 Guests • 1 King Bed',
      amenities: ['Private Heated Plunge Pool', 'Caldera Sunset Deck', 'Sommelier Tasting Access', 'Helipad Transfer'],
      cancellationPolicy: 'Non-refundable (Special Seasonal Rate)',
      available: true,
      tag: 'Best Sunset View'
    },
    {
      id: 'STE-503',
      title: 'Kyoto Zen Courtyard Residence',
      property: 'Aman Kyoto Sanctuary',
      location: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      pricePerNight: 1200,
      rating: 4.98,
      reviewsCount: 42,
      sqm: 125,
      capacity: '3 Guests • Tatami & Western Beds',
      amenities: ['Private Natural Onsen Bath', 'Moss Garden View', 'Kaiseki In-Suite Dining', 'Traditional Tea Master Ceremony'],
      cancellationPolicy: 'Free cancellation up to 7 days before arrival',
      available: true,
      tag: 'Michelin Dining Included'
    }
  ],

  reservations: [
    {
      id: 'RES-9901',
      suiteId: 'STE-501',
      suiteTitle: 'The Imperial Penthouse Suite',
      property: 'Grand Palais Champs-Élysées',
      guestName: 'Lord Harrison Vance',
      checkIn: 'Oct 14, 2026',
      checkOut: 'Oct 18, 2026',
      nights: 4,
      totalAmount: 5800,
      status: 'Confirmed & Guaranteed',
      paymentMethod: 'Amex Centurion •••• 8812',
      specialRequests: 'Dom Pérignon 2012 chilled upon arrival.'
    }
  ],

  analytics: {
    totalRevenue: '$148,200',
    occupancyRate: '94.2%',
    revPar: '$1,180',
    avgStayNights: '3.8 Nights'
  },

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),

  createReservation: (resData) => set((state) => {
    const newRes = {
      id: `RES-${Math.floor(9902 + Math.random() * 9000)}`,
      status: 'Confirmed & Guaranteed',
      ...resData
    };
    return {
      reservations: [newRes, ...state.reservations],
      activeTab: 'reservations'
    };
  }),

  updateSuitePrice: (suiteId, newPrice) => set((state) => ({
    suites: state.suites.map(s => s.id === suiteId ? { ...s, pricePerNight: Number(newPrice) } : s)
  })),

  addSuite: (suiteData) => set((state) => ({
    suites: [
      {
        id: `STE-${Math.floor(504 + Math.random() * 900)}`,
        rating: 5.0,
        reviewsCount: 1,
        available: true,
        image: suiteData.image || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        ...suiteData
      },
      ...state.suites
    ],
    activeTab: 'suites'
  }))
}));
