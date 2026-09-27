import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'terminal', // 'terminal' | 'portfolio' | 'orders' | 'leaderboard' | 'academy'
  selectedSymbol: 'NVDA',
  cashBalance: 65420.00,
  realizedPnL: 4180.50,

  stocks: [
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 128.45,
      change: 5.85,
      changePercent: 4.77,
      open: 123.10,
      high: 129.20,
      low: 122.80,
      volume: '64.2M',
      peRatio: 48.2,
      marketCap: '3.16T',
      sparkline: [122.8, 124.0, 123.5, 126.2, 127.8, 128.45]
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 224.50,
      change: 2.80,
      changePercent: 1.26,
      open: 222.10,
      high: 225.40,
      low: 221.80,
      volume: '42.8M',
      peRatio: 33.4,
      marketCap: '3.42T',
      sparkline: [221.8, 222.5, 223.4, 223.9, 224.1, 224.50]
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 254.10,
      change: -4.30,
      changePercent: -1.66,
      open: 259.00,
      high: 260.50,
      low: 253.20,
      volume: '78.5M',
      peRatio: 64.1,
      marketCap: '810B',
      sparkline: [259.0, 258.2, 256.4, 255.0, 253.8, 254.10]
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 428.80,
      change: 3.40,
      changePercent: 0.80,
      open: 426.00,
      high: 430.20,
      low: 425.10,
      volume: '21.4M',
      peRatio: 36.2,
      marketCap: '3.18T',
      sparkline: [425.5, 426.8, 427.2, 428.0, 428.8]
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 178.20,
      change: 3.10,
      changePercent: 1.77,
      open: 175.40,
      high: 179.00,
      low: 175.10,
      volume: '28.9M',
      peRatio: 24.8,
      marketCap: '2.21T',
      sparkline: [175.2, 176.0, 177.3, 178.2]
    },
    {
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF Trust',
      price: 572.20,
      change: 4.10,
      changePercent: 0.72,
      open: 569.00,
      high: 573.10,
      low: 568.50,
      volume: '54.1M',
      peRatio: 26.5,
      marketCap: '560B',
      sparkline: [568.8, 570.2, 571.5, 572.2]
    }
  ],

  positions: [
    { symbol: 'NVDA', shares: 150, avgPrice: 118.20, currentPrice: 128.45 },
    { symbol: 'AAPL', shares: 80, avgPrice: 215.00, currentPrice: 224.50 }
  ],

  orders: [
    { id: 'ORD-8801', timestamp: 'Today 14:15:22', symbol: 'NVDA', type: 'BUY', shares: 50, price: 128.10, total: 6405.00, status: 'FILLED' },
    { id: 'ORD-8800', timestamp: 'Today 11:32:04', symbol: 'AAPL', type: 'BUY', shares: 80, price: 215.00, total: 17200.00, status: 'FILLED' },
    { id: 'ORD-8799', timestamp: 'Yesterday 15:45:10', symbol: 'TSLA', type: 'SELL', shares: 40, price: 258.50, total: 10340.00, status: 'FILLED' }
  ],

  leaderboard: [
    { rank: 1, handle: 'QuantumAlpha_Vance', roi: 48.6, portfolioValue: 148600, winStreak: 9, badge: 'ELITE QUANT' },
    { rank: 2, handle: 'HyperionTrade_Alex', roi: 34.2, portfolioValue: 134200, winStreak: 6, badge: 'SWING MASTER' },
    { rank: 3, handle: 'MacroHedger_Rostova', roi: 28.9, portfolioValue: 128900, winStreak: 4, badge: 'PRO TRADER' }
  ],

  academyLessons: [
    { id: 'L-1', title: 'Candlestick Mechanics & Order Flow', readTime: '5 min', topic: 'Technical Analysis', level: 'Beginner' },
    { id: 'L-2', title: 'The 1% Risk Rule & Position Sizing', readTime: '8 min', topic: 'Risk Management', level: 'Intermediate' },
    { id: 'L-3', title: 'RSI Divergence & VWAP Reversion', readTime: '10 min', topic: 'Quantitative Strategies', level: 'Advanced' }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSymbol: (sym) => set({ selectedSymbol: sym }),

  executeTrade: (type, symbol, shares, orderType = 'MARKET') => set((state) => {
    const stock = state.stocks.find(s => s.symbol === symbol) || state.stocks[0];
    const numShares = Number(shares);
    const cost = numShares * stock.price;

    if (type === 'BUY') {
      if (cost > state.cashBalance) return state;

      const existingPos = state.positions.find(p => p.symbol === symbol);
      let updatedPositions;

      if (existingPos) {
        const totalShares = existingPos.shares + numShares;
        const totalSpent = (existingPos.shares * existingPos.avgPrice) + cost;
        const newAvg = totalSpent / totalShares;
        updatedPositions = state.positions.map(p =>
          p.symbol === symbol ? { ...p, shares: totalShares, avgPrice: newAvg, currentPrice: stock.price } : p
        );
      } else {
        updatedPositions = [
          ...state.positions,
          { symbol, shares: numShares, avgPrice: stock.price, currentPrice: stock.price }
        ];
      }

      const newOrder = {
        id: `ORD-${Math.floor(8802 + Math.random() * 1000)}`,
        timestamp: new Date().toLocaleTimeString(),
        symbol,
        type: 'BUY',
        shares: numShares,
        price: stock.price,
        total: cost,
        status: 'FILLED'
      };

      return {
        cashBalance: state.cashBalance - cost,
        positions: updatedPositions,
        orders: [newOrder, ...state.orders]
      };
    } else {
      // SELL
      const existingPos = state.positions.find(p => p.symbol === symbol);
      if (!existingPos || existingPos.shares < numShares) return state;

      const profit = (stock.price - existingPos.avgPrice) * numShares;
      const remainingShares = existingPos.shares - numShares;

      let updatedPositions;
      if (remainingShares === 0) {
        updatedPositions = state.positions.filter(p => p.symbol !== symbol);
      } else {
        updatedPositions = state.positions.map(p =>
          p.symbol === symbol ? { ...p, shares: remainingShares } : p
        );
      }

      const newOrder = {
        id: `ORD-${Math.floor(8802 + Math.random() * 1000)}`,
        timestamp: new Date().toLocaleTimeString(),
        symbol,
        type: 'SELL',
        shares: numShares,
        price: stock.price,
        total: cost,
        status: 'FILLED'
      };

      return {
        cashBalance: state.cashBalance + cost,
        realizedPnL: state.realizedPnL + profit,
        positions: updatedPositions,
        orders: [newOrder, ...state.orders]
      };
    }
  })
}));
