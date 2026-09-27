import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'live', // 'live' | 'seller' | 'won' | 'bids'
  user: {
    name: 'Harrison Vance',
    handle: '@hvance_collector',
    balance: 245000,
    activeBidsCount: 3,
    wonLotsCount: 1
  },

  notifications: [
    { id: 'notif-1', message: 'You have been OUTBID on 1968 Rolex Daytona Ref. 6239! Current bid: $148,000.', time: '2m ago', type: 'outbid' },
    { id: 'notif-2', message: 'Proxy bid triggered: System placed $72,500 on Patek Philippe 5711.', time: '14m ago', type: 'proxy' }
  ],

  selectedCategory: 'All',
  categories: ['All', 'Horology', 'Hypercars', 'Fine Art', 'Rare Memorabilia', 'Haute Joaillerie'],

  lots: [
    {
      id: 'LOT-901',
      title: '1968 Rolex Cosmograph Daytona Ref. 6239 "Paul Newman"',
      category: 'Horology',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      description: 'Iconic exotic white dial with black art-deco sub-dials, Valjoux 722 manual movement, pristine stainless steel case with authentic provenance certification.',
      startingBid: 95000,
      currentBid: 148000,
      reservePrice: 135000,
      reserveMet: true,
      minIncrement: 2000,
      highestBidder: 'Sovereign_99',
      isUserHighest: false,
      userProxyMax: 160000,
      timeLeft: 142, // seconds
      totalBids: 38,
      seller: 'Geneva Vaults & Co.',
      status: 'active', // 'active' | 'ended'
      condition: 'Mint / Original Papers',
      bidHistory: [
        { bidder: 'Sovereign_99', amount: 148000, time: '35s ago' },
        { bidder: 'Harrison Vance (You)', amount: 146000, time: '1m ago' },
        { bidder: 'Monaco_Titan', amount: 142000, time: '2m ago' },
        { bidder: 'ApexWhale', amount: 138000, time: '4m ago' }
      ]
    },
    {
      id: 'LOT-902',
      title: '2023 Koenigsegg Jesko Attack — Bare Carbon Spec',
      category: 'Hypercars',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
      description: '1,600 HP twin-turbo V8, 9-speed Light Speed Transmission (LST), active aerodynamics generating 1,400 kg downforce, 0-60 in 2.5s. 148 delivery miles.',
      startingBid: 2800000,
      currentBid: 3450000,
      reservePrice: 3500000,
      reserveMet: false,
      minIncrement: 50000,
      highestBidder: 'Harrison Vance (You)',
      isUserHighest: true,
      userProxyMax: 3600000,
      timeLeft: 480,
      totalBids: 19,
      seller: 'Scuderia Heritage Beverly Hills',
      status: 'active',
      condition: 'Factory Delivery Condition',
      bidHistory: [
        { bidder: 'Harrison Vance (You)', amount: 3450000, time: '4m ago' },
        { bidder: 'Dubai_PetroKing', amount: 3400000, time: '8m ago' },
        { bidder: 'ZurichCapital', amount: 3300000, time: '15m ago' }
      ]
    },
    {
      id: 'LOT-903',
      title: 'Jean-Michel Basquiat — "Crown of Radiance" (1983)',
      category: 'Fine Art',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      description: 'Acrylic and oilstick on linen canvas, signed on verso. Documented in the Basquiat Estate Catalogue Raisonné. Exhibited at Whitney Biennial.',
      startingBid: 1200000,
      currentBid: 1850000,
      reservePrice: 1750000,
      reserveMet: true,
      minIncrement: 25000,
      highestBidder: 'ManhattanCollector',
      isUserHighest: false,
      userProxyMax: null,
      timeLeft: 890,
      totalBids: 44,
      seller: 'Sotheby Provenance Archives',
      status: 'active',
      condition: 'Museum Restored & Archival Glass',
      bidHistory: [
        { bidder: 'ManhattanCollector', amount: 1850000, time: '1m ago' },
        { bidder: 'TokyoCurator', amount: 1825000, time: '5m ago' },
        { bidder: 'Lord_Kensington', amount: 1800000, time: '12m ago' }
      ]
    },
    {
      id: 'LOT-904',
      title: '1907 Saint-Gaudens Double Eagle Ultra High Relief Gold Coin',
      category: 'Rare Memorabilia',
      image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=80',
      description: 'PCGS PR69 specimen. Lettered edge, Roman numerals (MCMVII). One of only ~20 known examples in private hands.',
      startingBid: 400000,
      currentBid: 620000,
      reservePrice: 600000,
      reserveMet: true,
      minIncrement: 10000,
      highestBidder: 'NumismaticTitan',
      isUserHighest: false,
      userProxyMax: null,
      timeLeft: 35, // urgent
      totalBids: 52,
      seller: 'Smithsonian Numismatic Circle',
      status: 'active',
      condition: 'PCGS Certified PR69',
      bidHistory: [
        { bidder: 'NumismaticTitan', amount: 620000, time: '10s ago' },
        { bidder: 'Harrison Vance (You)', amount: 610000, time: '45s ago' }
      ]
    }
  ],

  wonLots: [
    {
      id: 'LOT-882',
      title: 'Patek Philippe Grandmaster Chime Ref. 6300G',
      wonPrice: 4250000,
      wonDate: '2026-09-24',
      image: 'https://images.unsplash.com/photo-1547996160-71dfabb1d5b1?auto=format&fit=crop&w=1000&q=80',
      seller: 'Geneva Horology Guild',
      paymentStatus: 'Awaiting Escrow Settlement',
      shippingAddress: '432 Park Ave, Penthouse 88, New York, NY 10022',
      courier: 'Brinks Global Armored Diamond Transit'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  // Place manual bid
  placeBid: (lotId, customAmount) => set((state) => {
    const lot = state.lots.find(l => l.id === lotId);
    if (!lot) return state;

    const bidAmount = customAmount || (lot.currentBid + lot.minIncrement);
    if (bidAmount <= lot.currentBid) return state;

    const updatedLots = state.lots.map(l => {
      if (l.id === lotId) {
        const meetsReserve = bidAmount >= l.reservePrice;
        return {
          ...l,
          currentBid: bidAmount,
          reserveMet: meetsReserve,
          highestBidder: 'Harrison Vance (You)',
          isUserHighest: true,
          totalBids: l.totalBids + 1,
          timeLeft: Math.max(l.timeLeft, 60), // anti-sniping 60s extension
          bidHistory: [
            { bidder: 'Harrison Vance (You)', amount: bidAmount, time: 'Just now' },
            ...l.bidHistory
          ]
        };
      }
      return l;
    });

    const newNotification = {
      id: `notif-${Date.now()}`,
      message: `Bid placed! You are now the highest bidder on "${lot.title}" at $${bidAmount.toLocaleString()}.`,
      time: 'Just now',
      type: 'success'
    };

    return {
      lots: updatedLots,
      notifications: [newNotification, ...state.notifications]
    };
  }),

  // Set proxy / auto-bid max
  setProxyBid: (lotId, maxAmount) => set((state) => ({
    lots: state.lots.map(l => l.id === lotId ? { ...l, userProxyMax: Number(maxAmount) } : l),
    notifications: [
      {
        id: `notif-${Date.now()}`,
        message: `Auto-bidding limit configured up to $${Number(maxAmount).toLocaleString()} for ${lotId}.`,
        time: 'Just now',
        type: 'proxy'
      },
      ...state.notifications
    ]
  })),

  // Countdown timer tick down
  tickTimers: () => set((state) => ({
    lots: state.lots.map(l => {
      if (l.status === 'active' && l.timeLeft > 0) {
        const newTime = l.timeLeft - 1;
        // Random live simulation when timer ticks
        return { ...l, timeLeft: newTime };
      }
      return l;
    })
  })),

  // List new item for auction
  createListing: (item) => set((state) => {
    const newLot = {
      id: `LOT-${Math.floor(910 + Math.random() * 80)}`,
      title: item.title,
      category: item.category || 'Fine Art',
      image: item.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      description: item.description,
      startingBid: Number(item.startingBid || 10000),
      currentBid: Number(item.startingBid || 10000),
      reservePrice: Number(item.reservePrice || 15000),
      reserveMet: false,
      minIncrement: Math.round(Number(item.startingBid || 10000) * 0.05),
      highestBidder: 'No bids yet',
      isUserHighest: false,
      userProxyMax: null,
      timeLeft: Number(item.durationSeconds || 3600),
      totalBids: 0,
      seller: 'Harrison Vance (Seller Studio)',
      status: 'active',
      condition: item.condition || 'Authenticated Mint',
      bidHistory: []
    };
    return {
      lots: [newLot, ...state.lots],
      activeTab: 'live'
    };
  }),

  // Complete checkout for won lot
  settleEscrow: (lotId) => set((state) => ({
    wonLots: state.wonLots.map(w => w.id === lotId ? { ...w, paymentStatus: 'Escrow Paid & Transit Scheduled' } : w)
  }))
}));
