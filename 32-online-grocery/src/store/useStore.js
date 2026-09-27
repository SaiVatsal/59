import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'catalog', // 'catalog' | 'cart' | 'tracking' | 'admin'
  selectedCategory: 'All',
  searchQuery: '',

  categories: ['All', 'Organic Produce', 'Artisanal Dairy', 'Rustic Bakery', 'Pantry & Grains', 'Cold-Pressed Juices'],

  products: [
    {
      id: 'g-01',
      title: 'Heirloom Organic Strawberries',
      category: 'Organic Produce',
      price: 6.50,
      unit: '400g punnet',
      origin: 'Sweet Valley Farm, CA',
      isOrganic: true,
      zone: 'Chilled (4°C)',
      stock: 35,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
      description: 'Sweet, sun-ripened heirloom strawberries picked at peak sugar content without synthetic pesticides.'
    },
    {
      id: 'g-02',
      title: 'Artisanal Sourdough Country Loaf',
      category: 'Rustic Bakery',
      price: 7.20,
      unit: '800g loaf',
      origin: 'Hearthstone Mill & Bakery',
      isOrganic: true,
      zone: 'Ambient',
      stock: 18,
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
      description: '36-hour slow fermented wild sourdough with a deep golden blistered crust and open airy crumb.'
    },
    {
      id: 'g-03',
      title: 'Grass-Fed Whole Jersey Milk',
      category: 'Artisanal Dairy',
      price: 5.40,
      unit: '1 Litre Glass Bottle',
      origin: 'Clover Meadows Dairy',
      isOrganic: true,
      zone: 'Chilled (3°C)',
      stock: 42,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
      description: 'Non-homogenized rich golden whole milk with natural cream-line cap from pasture-raised Jersey cows.'
    },
    {
      id: 'g-04',
      title: 'Organic Hass Avocados (Pack of 4)',
      category: 'Organic Produce',
      price: 8.90,
      unit: '4-pack (approx 800g)',
      origin: 'Ojai Valley Orchards',
      isOrganic: true,
      zone: 'Ambient',
      stock: 50,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
      description: 'Creamy, rich Hass avocados, perfectly balanced for guacamole, artisan salads, or morning toast.'
    },
    {
      id: 'g-05',
      title: 'Raw Wildflower Meadow Honey',
      category: 'Pantry & Grains',
      price: 12.50,
      unit: '500g glass jar',
      origin: 'Highland Apiaries',
      isOrganic: true,
      zone: 'Ambient',
      stock: 22,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
      description: 'Unfiltered, unpasteurized botanical honey preserving live natural floral enzymes and pollen.'
    },
    {
      id: 'g-06',
      title: 'Cold-Pressed Green Radiance Juice',
      category: 'Cold-Pressed Juices',
      price: 7.90,
      unit: '350ml glass',
      origin: 'Harvest Press Lab',
      isOrganic: true,
      zone: 'Chilled (2°C)',
      stock: 28,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
      description: 'Hydraulic cold-pressed organic kale, crisp cucumber, celery, green apple, ginger, and lemon.'
    }
  ],

  cart: [
    { productId: 'g-01', quantity: 2, substitution: 'organic_match' },
    { productId: 'g-02', quantity: 1, substitution: 'call_first' }
  ],

  selectedDeliverySlot: 'Tomorrow, 8:00 AM - 11:00 AM (Fresh Morning)',
  deliverySlots: [
    { id: 'slot-1', label: 'Today, 5:00 PM - 7:00 PM (Express)', fee: 4.99 },
    { id: 'slot-2', label: 'Tomorrow, 8:00 AM - 11:00 AM (Fresh Morning)', fee: 0.00 },
    { id: 'slot-3', label: 'Tomorrow, 2:00 PM - 5:00 PM (Eco Saver)', fee: 0.00 }
  ],

  appliedCoupon: null,
  couponInput: '',
  couponDiscount: 0,

  orders: [
    {
      id: 'ORD-7721',
      date: 'Today, 09:14 AM',
      itemsCount: 3,
      total: 26.70,
      slot: 'Today, 5:00 PM - 7:00 PM (Express)',
      status: 'In Climate-Controlled Van', // 'Harvesting' | 'Packed (Cold-Chain)' | 'In Climate-Controlled Van' | 'Delivered'
      temperature: '3.8°C (Optimal)',
      driverName: 'Liam Patterson'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDeliverySlot: (slot) => set({ selectedDeliverySlot: slot }),

  addToCart: (productId) => set((state) => {
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return {
      cart: [...state.cart, { productId, quantity: 1, substitution: 'organic_match' }]
    };
  }),

  updateCartQty: (productId, qty) => set((state) => {
    if (qty <= 0) {
      return { cart: state.cart.filter(item => item.productId !== productId) };
    }
    return {
      cart: state.cart.map(item =>
        item.productId === productId ? { ...item, quantity: qty } : item
      )
    };
  }),

  updateItemSubstitution: (productId, sub) => set((state) => ({
    cart: state.cart.map(item =>
      item.productId === productId ? { ...item, substitution: sub } : item
    )
  })),

  applyCoupon: (code) => set((state) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HARVEST20') {
      return { appliedCoupon: 'HARVEST20 (20% OFF)', couponDiscount: 0.20 };
    }
    if (clean === 'FRESH10') {
      return { appliedCoupon: 'FRESH10 ($10 OFF)', couponDiscount: 10 };
    }
    alert('Invalid coupon code. Try "HARVEST20" or "FRESH10".');
    return state;
  }),

  placeOrder: (total) => set((state) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      itemsCount: state.cart.reduce((sum, i) => sum + i.quantity, 0),
      total,
      slot: state.selectedDeliverySlot,
      status: 'Packed (Cold-Chain)',
      temperature: '3.4°C (Optimal)',
      driverName: 'Liam Patterson'
    };
    return {
      orders: [newOrder, ...state.orders],
      cart: [],
      activeTab: 'tracking'
    };
  }),

  advanceOrderStatus: (orderId) => set((state) => ({
    orders: state.orders.map(o => {
      if (o.id === orderId) {
        let nextStatus = 'Delivered';
        if (o.status === 'Harvesting') nextStatus = 'Packed (Cold-Chain)';
        else if (o.status === 'Packed (Cold-Chain)') nextStatus = 'In Climate-Controlled Van';
        return { ...o, status: nextStatus };
      }
      return o;
    })
  }))
}));
