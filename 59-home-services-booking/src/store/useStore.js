import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'services', // 'services' | 'book' | 'my-bookings' | 'provider-desk'
  selectedCategory: 'All',
  selectedProviderId: 'PRO-101',

  categories: [
    { id: 'cat-all', name: 'All', icon: '✨' },
    { id: 'cat-plumb', name: 'Plumbing', icon: '🔧', avgRate: '$65/hr', count: '18 Pros' },
    { id: 'cat-elec', name: 'Electrical', icon: '⚡', avgRate: '$75/hr', count: '14 Pros' },
    { id: 'cat-clean', name: 'Deep Cleaning', icon: '🧹', avgRate: '$45/hr', count: '24 Pros' },
    { id: 'cat-hvac', name: 'HVAC & AC Repair', icon: '❄️', avgRate: '$85/hr', count: '10 Pros' },
    { id: 'cat-appliance', name: 'Appliance Repair', icon: '🧺', avgRate: '$60/hr', count: '12 Pros' },
    { id: 'cat-lawn', name: 'Lawn & Gardening', icon: '🌱', avgRate: '$40/hr', count: '16 Pros' }
  ],

  providers: [
    {
      id: 'PRO-101',
      name: 'Marcus Holloway',
      category: 'Plumbing',
      rating: 4.95,
      reviewCount: 184,
      hourlyRate: 65,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      badge: 'Master Certified Plumber',
      verified: true,
      completedJobs: 412,
      bio: '15+ years experience in copper pipe retrofitting, water heater installs, tankless systems, and leak diagnostics.',
      location: 'Metro Area (Within 15 miles)',
      slots: ['Morning (9:00 AM - 12:00 PM)', 'Afternoon (1:00 PM - 4:00 PM)', 'Evening (5:00 PM - 8:00 PM)']
    },
    {
      id: 'PRO-102',
      name: 'Elena Rostova',
      category: 'Electrical',
      rating: 4.92,
      reviewCount: 142,
      hourlyRate: 75,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      badge: 'Licensed Master Electrician',
      verified: true,
      completedJobs: 290,
      bio: 'Specialized in circuit breaker upgrades, EV charger installations, smart home wiring, and surge protection.',
      location: 'North Suburbs (Within 20 miles)',
      slots: ['Morning (9:00 AM - 12:00 PM)', 'Afternoon (1:00 PM - 4:00 PM)']
    },
    {
      id: 'PRO-103',
      name: 'David Tanaka',
      category: 'HVAC & AC Repair',
      rating: 4.88,
      reviewCount: 98,
      hourlyRate: 85,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'EPA Certified HVAC Tech',
      verified: true,
      completedJobs: 180,
      bio: 'High-efficiency heat pumps, refrigerant leak testing, furnace seasonal tune-ups, and smart thermostat sync.',
      location: 'Central & Downtown (Within 10 miles)',
      slots: ['Morning (9:00 AM - 12:00 PM)', 'Afternoon (1:00 PM - 4:00 PM)', 'Evening (5:00 PM - 8:00 PM)']
    },
    {
      id: 'PRO-104',
      name: 'Clara Zimmerman',
      category: 'Deep Cleaning',
      rating: 4.98,
      reviewCount: 220,
      hourlyRate: 45,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Eco-Friendly Cleaning Specialist',
      verified: true,
      completedJobs: 510,
      bio: 'Comprehensive move-in/move-out deep sanitization, hypoallergenic steam cleaning, and post-renovation detailing.',
      location: 'All Districts',
      slots: ['Morning (9:00 AM - 12:00 PM)', 'Afternoon (1:00 PM - 4:00 PM)']
    }
  ],

  bookings: [
    {
      id: 'BK-9901',
      customerName: 'Alexandra Wright',
      serviceCategory: 'Plumbing',
      providerId: 'PRO-101',
      providerName: 'Marcus Holloway',
      providerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      date: 'Tomorrow, Sep 28',
      slot: 'Morning (9:00 AM - 12:00 PM)',
      address: '742 Evergreen Terrace, Apt 4B',
      isEmergency: false,
      status: 'Confirmed',
      hoursEstimated: 2,
      totalCost: 130.00,
      escrowLocked: true,
      notes: 'Kitchen sink pipe dripping into cabinet bottom.'
    },
    {
      id: 'BK-9900',
      customerName: 'Alexandra Wright',
      serviceCategory: 'Electrical',
      providerId: 'PRO-102',
      providerName: 'Elena Rostova',
      providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      date: 'Sep 21, 2026',
      slot: 'Afternoon (1:00 PM - 4:00 PM)',
      address: '742 Evergreen Terrace, Apt 4B',
      isEmergency: false,
      status: 'Completed',
      hoursEstimated: 3,
      totalCost: 225.00,
      escrowLocked: false,
      notes: 'Installed Level 2 Tesla Wall Connector in garage.'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedProviderId: (id) => set({ selectedProviderId: id }),

  createBooking: (data) => set((state) => {
    const provider = state.providers.find(p => p.id === data.providerId) || state.providers[0];
    const hours = Number(data.hours) || 2;
    const baseCost = provider.hourlyRate * hours;
    const emergencyFee = data.isEmergency ? baseCost * 0.25 : 0;
    const total = baseCost + emergencyFee + 15; // + $15 platform insurance

    const newBooking = {
      id: `BK-${Math.floor(9902 + Math.random() * 900)}`,
      customerName: 'Alexandra Wright',
      serviceCategory: provider.category,
      providerId: provider.id,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      date: data.date || 'Tomorrow, Sep 28',
      slot: data.slot || 'Morning (9:00 AM - 12:00 PM)',
      address: data.address || '742 Evergreen Terrace',
      isEmergency: data.isEmergency || false,
      status: 'Confirmed',
      hoursEstimated: hours,
      totalCost: total,
      escrowLocked: true,
      notes: data.notes || 'Routine maintenance and inspection'
    };

    return {
      bookings: [newBooking, ...state.bookings],
      activeTab: 'my-bookings'
    };
  }),

  markBookingCompleted: (bookingId) => set((state) => ({
    bookings: state.bookings.map(b => b.id === bookingId ? { ...b, status: 'Completed', escrowLocked: false } : b)
  }))
}));
