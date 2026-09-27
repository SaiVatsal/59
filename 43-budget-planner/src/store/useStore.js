import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'overview', // 'overview' | 'categories' | 'goals' | 'transactions' | 'report'
  selectedMonth: 'September 2026',

  monthlyIncome: 8500,

  categories: [
    { id: 'cat-1', name: 'Housing & Utilities', allocated: 2800, spent: 2750, color: '#0d9488', icon: '🏠' },
    { id: 'cat-2', name: 'Groceries & Dining', allocated: 1200, spent: 1340, color: '#f59e0b', icon: '🥑' }, // Overspent
    { id: 'cat-3', name: 'Transportation & Auto', allocated: 600, spent: 480, color: '#0284c7', icon: '🚗' },
    { id: 'cat-4', name: 'Investments & Crypto', allocated: 1800, spent: 1800, color: '#10b981', icon: '📈' },
    { id: 'cat-5', name: 'Entertainment & Tech', allocated: 500, spent: 420, color: '#8b5cf6', icon: '🎮' },
    { id: 'cat-6', name: 'Healthcare & Wellness', allocated: 400, spent: 210, color: '#ec4899', icon: '🩺' }
  ],

  savingsGoals: [
    {
      id: 'GOAL-1',
      title: 'Emergency Rainy Day Fund (6 Mos)',
      target: 25000,
      current: 19500,
      deadline: 'Dec 2026',
      icon: '🛡️',
      color: '#0d9488'
    },
    {
      id: 'GOAL-2',
      title: 'Tokyo & Kyoto Autumn Travel Trip',
      target: 6500,
      current: 4800,
      deadline: 'Nov 2026',
      icon: '✈️',
      color: '#0284c7'
    },
    {
      id: 'GOAL-3',
      title: 'Solar Roof Array Down Payment',
      target: 12000,
      current: 5400,
      deadline: 'Mid 2027',
      icon: '☀️',
      color: '#f59e0b'
    }
  ],

  transactions: [
    { id: 'TX-101', date: 'Sep 26', description: 'Whole Foods Market', category: 'Groceries & Dining', amount: 142.50, type: 'expense' },
    { id: 'TX-102', date: 'Sep 25', description: 'Tech Leadership Monthly Salary', category: 'Income', amount: 8500.00, type: 'income' },
    { id: 'TX-103', date: 'Sep 24', description: 'Vanguard Total Stock Index', category: 'Investments & Crypto', amount: 1800.00, type: 'expense' },
    { id: 'TX-104', date: 'Sep 22', description: 'City Water & Hydro Electric', category: 'Housing & Utilities', amount: 240.00, type: 'expense' },
    { id: 'TX-105', date: 'Sep 20', description: 'Blue Bottle Artisan Coffee', category: 'Groceries & Dining', amount: 24.80, type: 'expense' }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  addTransaction: (tx) => set((state) => {
    const newTx = {
      id: `TX-${Math.floor(106 + Math.random() * 900)}`,
      date: 'Today',
      ...tx
    };

    // Update category spent if expense
    let updatedCategories = state.categories;
    if (tx.type === 'expense') {
      updatedCategories = state.categories.map(cat =>
        cat.name === tx.category ? { ...cat, spent: cat.spent + Number(tx.amount) } : cat
      );
    }

    return {
      transactions: [newTx, ...state.transactions],
      categories: updatedCategories,
      activeTab: 'transactions'
    };
  }),

  updateCategoryBudget: (categoryId, newLimit) => set((state) => ({
    categories: state.categories.map(c => c.id === categoryId ? { ...c, allocated: Number(newLimit) } : c)
  })),

  contributeToGoal: (goalId, amount) => set((state) => ({
    savingsGoals: state.savingsGoals.map(g =>
      g.id === goalId ? { ...g, current: Math.min(g.target, g.current + Number(amount)) } : g
    )
  })),

  addSavingsGoal: (goalData) => set((state) => ({
    savingsGoals: [
      {
        id: `GOAL-${state.savingsGoals.length + 1}`,
        current: 0,
        color: '#0d9488',
        icon: '🎯',
        ...goalData
      },
      ...state.savingsGoals
    ],
    activeTab: 'goals'
  }))
}));
