import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'browse', // 'browse' | 'seats' | 'concessions' | 'pass' | 'history'
  selectedEventId: 'mov-01',
  selectedShowtime: '20:45 (IMAX 70mm Laser)',

  events: [
    {
      id: 'mov-01',
      title: 'Interstellar Odyssey: Beyond the Event Horizon',
      genre: 'Sci-Fi / IMAX 70mm',
      rating: 'PG-13 • 168 min',
      formats: ['IMAX 70mm Laser', 'Dolby Atmos 128ch'],
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      synopsis: 'A groundbreaking cinematic expedition into quantum singularities and relativistic spacetime wormholes.',
      showtimes: ['14:00 (Dolby)', '17:30 (IMAX 70mm Laser)', '20:45 (IMAX 70mm Laser)', '23:15 (Late Night Special)']
    },
    {
      id: 'mov-02',
      title: 'Cyberpunk Symphony: Live Orchestra 2026',
      genre: 'Live Concert & Visuals',
      rating: 'All Ages • 120 min',
      formats: ['Spatial Audio Arena', 'Holographic Stage'],
      poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      synopsis: '80-piece live philharmonic orchestra synchronizing analog synthesizer leads with kinetic laser arrays.',
      showtimes: ['18:30 (Main Hall)', '21:00 (Gala Premiere)']
    },
    {
      id: 'mov-03',
      title: 'Dune: Awakening — Master Edition',
      genre: 'Epic Sci-Fi',
      rating: 'PG-13 • 175 min',
      formats: ['IMAX Dual Laser', 'Motion D-BOX'],
      poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      synopsis: 'The sweeping desert chronicles remastered in expanded 1.43:1 aspect ratio with explosive low-frequency transducers.',
      showtimes: ['15:15 (IMAX)', '19:00 (IMAX Dual Laser)', '22:30 (Night)']
    }
  ],

  // Seat map state (Rows A-F, Cols 1-8)
  seats: [
    { id: 'A1', row: 'A', col: 1, tier: 'VIP Recliner', price: 28, status: 'occupied' },
    { id: 'A2', row: 'A', col: 2, tier: 'VIP Recliner', price: 28, status: 'occupied' },
    { id: 'A3', row: 'A', col: 3, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'A4', row: 'A', col: 4, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'A5', row: 'A', col: 5, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'A6', row: 'A', col: 6, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'A7', row: 'A', col: 7, tier: 'VIP Recliner', price: 28, status: 'occupied' },
    { id: 'A8', row: 'A', col: 8, tier: 'VIP Recliner', price: 28, status: 'occupied' },

    { id: 'B1', row: 'B', col: 1, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B2', row: 'B', col: 2, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B3', row: 'B', col: 3, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B4', row: 'B', col: 4, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B5', row: 'B', col: 5, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B6', row: 'B', col: 6, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B7', row: 'B', col: 7, tier: 'VIP Recliner', price: 28, status: 'available' },
    { id: 'B8', row: 'B', col: 8, tier: 'VIP Recliner', price: 28, status: 'available' },

    { id: 'C1', row: 'C', col: 1, tier: 'Premium Center', price: 22, status: 'occupied' },
    { id: 'C2', row: 'C', col: 2, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C3', row: 'C', col: 3, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C4', row: 'C', col: 4, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C5', row: 'C', col: 5, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C6', row: 'C', col: 6, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C7', row: 'C', col: 7, tier: 'Premium Center', price: 22, status: 'available' },
    { id: 'C8', row: 'C', col: 8, tier: 'Premium Center', price: 22, status: 'occupied' },

    { id: 'D1', row: 'D', col: 1, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D2', row: 'D', col: 2, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D3', row: 'D', col: 3, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D4', row: 'D', col: 4, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D5', row: 'D', col: 5, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D6', row: 'D', col: 6, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D7', row: 'D', col: 7, tier: 'Standard', price: 16.5, status: 'available' },
    { id: 'D8', row: 'D', col: 8, tier: 'Standard', price: 16.5, status: 'available' }
  ],

  selectedSeatIds: ['A3', 'A4'],
  lockTimeRemaining: 480, // seconds

  concessions: [
    { id: 'cnc-1', name: 'White Truffle & Sea Salt Popcorn (Large)', price: 9.50, quantity: 1 },
    { id: 'cnc-2', name: 'Artisan Nitro Cold Brew', price: 6.00, quantity: 2 },
    { id: 'cnc-3', name: 'Belgian Dark Chocolate Mousse Cups', price: 8.00, quantity: 0 }
  ],

  couponCode: '',
  appliedCoupon: null,

  bookedTickets: [
    {
      id: 'TCK-STARLIGHT-9041',
      title: 'Interstellar Odyssey: Beyond the Event Horizon',
      showtime: 'Tonight, 20:45 (IMAX 70mm Laser)',
      seats: ['A3', 'A4'],
      hall: 'Auditorium 1 (IMAX Giant Screen)',
      qrCodeData: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=STARLIGHT-9041-IMAX',
      totalPaid: 77.00,
      buyerName: 'Alex Mercer'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedEvent: (id) => set({ selectedEventId: id }),
  setSelectedShowtime: (st) => set({ selectedShowtime: st }),

  toggleSeat: (seatId) => set((state) => {
    const seat = state.seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'occupied') return state;

    const exists = state.selectedSeatIds.includes(seatId);
    const updated = exists
      ? state.selectedSeatIds.filter(id => id !== seatId)
      : [...state.selectedSeatIds, seatId];

    return { selectedSeatIds: updated };
  }),

  updateConcessionQty: (id, delta) => set((state) => ({
    concessions: state.concessions.map(c =>
      c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c
    )
  })),

  applyCoupon: (code) => set((state) => {
    if (code.trim().toUpperCase() === 'PREMIERE20') {
      return { appliedCoupon: 'PREMIERE20 (20% OFF)' };
    }
    alert('Invalid coupon. Try "PREMIERE20".');
    return state;
  }),

  confirmBooking: (total) => set((state) => {
    const currentEvent = state.events.find(e => e.id === state.selectedEventId) || state.events[0];
    const newPass = {
      id: `TCK-STARLIGHT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: currentEvent.title,
      showtime: state.selectedShowtime,
      seats: state.selectedSeatIds,
      hall: 'Auditorium 1 (IMAX Giant Screen)',
      qrCodeData: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=STARLIGHT-IMAX-PASS',
      totalPaid: total,
      buyerName: 'Alex Mercer'
    };
    return {
      bookedTickets: [newPass, ...state.bookedTickets],
      activeTab: 'pass'
    };
  })
}));
